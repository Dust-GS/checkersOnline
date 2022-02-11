import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { useNavigate } from 'react-router-dom';
import './Register.scss'
import * as Yup from 'yup';
import { Formik, Form } from 'formik'
import FormikControl from '../formControls/FormikControl'
import { getAllUsersOperation, postUserOperation } from '../../ducks/users/operations';
import { getAllUsers, getAreAllUsersInStore, getIsNicknameTaken } from '../../ducks/users/selectors';
import { changeIsNicknameTakenAction } from '../../ducks/users/actions';

const Register = ({
  postUserOperation,
  isNicknameTaken,
  areAllUsersInStore,
  getAllUsersOperation,
  allUsers,
  changeIsNicknameTakenAction
}) => {
  const navigate = useNavigate()
  const initialValues = {
    nickname: "",
    password: ""
  }
 
  const validationSchema = Yup.object({
    nickname: Yup.string().required('Required'),
    password: Yup.string().required('Required')
  })

  const onSubmit = async ( values, onSubmitProps ) => {
    //najpierw sprawdzic czy w store sie nie powtarza nickname
    //await nie dziala z forEach
    let isNameTakenLocalLet = false

    for(const user of allUsers){
      if(user.nickname === values.nickname){
        isNameTakenLocalLet = true
        await changeIsNicknameTakenAction(true)
      }
    }

    if(isNameTakenLocalLet === false){
      postUserOperation(values).then((result) => {
        if(result.payload.message === 'user created'){
          localStorage.setItem('user', JSON.stringify(result.payload.newUser))
          navigate("/menu")
        }
      })
    }
    
    onSubmitProps.setSubmitting(false);
  }

  useEffect(() => {
    if(areAllUsersInStore === false){
      getAllUsersOperation()
    }
  },[areAllUsersInStore, getAllUsersOperation]);

  return <div className='register-box'>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {
          formik => <Form>
            <div className='register-form'>
              <FormikControl control='input' type='text' label='Nickname:' name='nickname'/>
              {isNicknameTaken &&
                <p className='error'>Nickname is taken</p>
              }
              <FormikControl control='input' type='password' label='Password:' name='password' />
            </div>
            <button type='submit' disabled={ formik.isSubmitting }>Register</button>
          </Form>
        }
      </Formik>
  </div>;
}

const mapStateToProps = (state) => {
  return {
    isNicknameTaken: getIsNicknameTaken(state),
    areAllUsersInStore: getAreAllUsersInStore(state),
    allUsers: getAllUsers(state)
  };
}
const mapDispatchToProps = {
  postUserOperation,
  getAllUsersOperation,
  changeIsNicknameTakenAction
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
