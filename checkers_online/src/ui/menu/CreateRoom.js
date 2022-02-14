import React, { useEffect } from 'react'
import './CreateRoom.scss'
import { connect } from "react-redux";
import * as Yup from 'yup';
import { Formik, Form } from 'formik'
import { useNavigate } from 'react-router-dom';
import FormikControl from '../formControls/FormikControl'
import { getDoYouHaveTooManyRooms, getYourData } from '../../ducks/users/selectors';
import { createRoomOperation } from '../../ducks/rooms/operations';
import { getIsRoomNameTaken } from '../../ducks/rooms/selectors';
import { addYourDataAction, changeDoYouHaveTooManyRoomsAction, changeYourRoomsNumberAction } from '../../ducks/users/actions';

const CreateRoom = ({
    yourData,
    createRoomOperation,
    isRoomNameTaken,
    doYouHaveTooManyRooms,
    changeDoYouHaveTooManyRoomsAction,
    changeYourRoomsNumberAction,
    addYourDataAction
}) => {
    const navigate = useNavigate()
    const initialValues = {
        roomName: ""
    }

    const validationSchema = Yup.object({
        roomName: Yup.string().required('Required')
    })

    const onSubmit = async ( values, onSubmitProps ) => {
        if(yourData.numberOfRooms > 0){
            changeDoYouHaveTooManyRoomsAction(true)
        } else {
            changeDoYouHaveTooManyRoomsAction(false)
            //zwiekszyc liczbe roomsow lokalnie

            const newRoom = {
                roomName: values.roomName,
                ownerId:  yourData.id,
                board: [
                    [' ', 'r', ' ', 'r', ' ', 'r', ' ', 'r'],
                    ['r', ' ', 'r', ' ', 'r', ' ', 'r', ' '],
                    [' ', 'r', ' ', 'r', ' ', 'r', ' ', 'r'],
                    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                    ['b', ' ', 'b', ' ', 'b', ' ', 'b', ' '],
                    [' ', 'b', ' ', 'b', ' ', 'b', ' ', 'b'],
                    ['b', ' ', 'b', ' ', 'b', ' ', 'b', ' ']
                ],
                whoIsNow: "White",
                playersId: [yourData.id]
            }

            await createRoomOperation({newRoom: newRoom, accessToken: yourData.accessToken}).then((result) => {
                if(result.payload.message === "room created"){
                    changeYourRoomsNumberAction(1)
                }
            })
        }
        
        onSubmitProps.setSubmitting(false);
    }

    //sprawdzic przy odswierzaniu czy zlogowany i odswierzyc yourData

    useEffect(() => {
        if(yourData.nickname === ""){
            const loggedInUser = localStorage.getItem("user");
            if (loggedInUser) {
                const foundedUser = JSON.parse(loggedInUser);
                addYourDataAction(foundedUser)
            } else {
                navigate("/")
            }
        }
        
    }, [addYourDataAction, yourData, navigate]);

    return (
    <div className='create-room-box'>
        <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {
          formik => <Form>
            <div className='room-form'>
              <FormikControl control='input' type='text' label='Room name:' name='roomName'/>
              {isRoomNameTaken &&
                <p className='error'>Room name is taken</p>
              }
              {doYouHaveTooManyRooms &&
                <p className='error'>You already have room</p>
              }
            </div>
            <button type='submit' disabled={ formik.isSubmitting }>Create room</button>
          </Form>
        }
      </Formik>
    </div>
    )
}

const mapStateToProps = (state) => {
    
    return {
        yourData: getYourData(state),
        isRoomNameTaken: getIsRoomNameTaken(state),
        doYouHaveTooManyRooms: getDoYouHaveTooManyRooms(state)
    };
}

const mapDispatchToProps = {
    createRoomOperation,
    changeDoYouHaveTooManyRoomsAction,
    changeYourRoomsNumberAction,
    addYourDataAction
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateRoom);