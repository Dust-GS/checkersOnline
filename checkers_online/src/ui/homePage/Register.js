import React from 'react';
import { connect } from "react-redux";
import './Register.scss'
import * as Yup from 'yup';
import { Formik, Form } from 'formik'
import FormikControl from '../formControls/FormikControl'
import { postUserOperation } from '../../ducks/users/operations';



const Register = ({
  postUserOperation
}) => {
  const initialValues = {
    nickname: "",
    password: ""
  }

  const validationSchema = Yup.object({
    nickname: Yup.string().required('Required'),
    password: Yup.string().required('Required')
  })

  const onSubmit = async ( values, onSubmitProps ) => {
    //console.log(values)
    postUserOperation(values)
    onSubmitProps.setSubmitting(false);
  }

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
              <FormikControl control='input' type='password' label='Password:' name='password' />
            </div>
            <button type='submit' disabled={ formik.isSubmitting }>Register</button>
          </Form>
        }
      </Formik>
  </div>;
}

const mapDispatchToProps = {
  postUserOperation
}

export default connect(null, mapDispatchToProps)(Register);
