import React from 'react';
import { connect } from "react-redux";
import { useNavigate } from 'react-router-dom';
import './Register.scss'
import * as Yup from 'yup';
import { Formik, Form } from 'formik'
import FormikControl from '../formControls/FormikControl'
import './Login.scss'
import { loginOperation } from '../../ducks/users/operations';
import { getIsNicknameWrong, getIsPaswordWrong } from '../../ducks/users/selectors';

const Login = ({
  loginOperation,
  isNicknameWrong,
  isPaswordWrong
}) => {

  const initialValues = {
    nickname: "",
    password: ""
  }

  const navigate = useNavigate()

  const validationSchema = Yup.object({
    nickname: Yup.string().required('Required'),
    password: Yup.string().required('Required')
  })

  const onSubmit = async ( values, onSubmitProps ) => {
    await loginOperation(values).then((result) => {
      if(result.payload.message === "log in successful"){
        localStorage.setItem('user', JSON.stringify(result.payload.userData))
        navigate("/menu")
      }
    })
    
    onSubmitProps.setSubmitting(false);
  }

  return <div className='login-box'>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {
          formik => <Form>
            <div className='register-form'>
              <FormikControl control='input' type='text' label='Nickname:' name='nickname'/>
              {isNicknameWrong &&
                <p className='error'>Nickname is wrong</p>
              }
              <FormikControl control='input' type='password' label='Password:' name='password' />
              {isPaswordWrong &&
                <p className='error'>Password incorrect</p>
              }
            </div>
            <button type='submit' disabled={ formik.isSubmitting }>Log in</button>
          </Form>
        }
      </Formik>
  </div>;
}

const mapStateToProps = (state) => {
  return {
    isNicknameWrong: getIsNicknameWrong(state),
    isPaswordWrong: getIsPaswordWrong(state)
  };
}
const mapDispatchToProps = {
  loginOperation
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);