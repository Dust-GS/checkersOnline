import React from 'react'
import { connect } from "react-redux";
import { getUserNameById } from '../../ducks/users/selectors';
import './RoomOption.scss'

const RoomOption = ({
    roomName,
    //ownerNickname
}) => {
  return (
    <div>
        {/* {ownerNickname &&
            <div  className='room-option-box'>
                {ownerNickname}
            </div>
        } */}
        <div className='room-option-box'>

        </div>
    </div>
  )
}

const mapStateToProps = (state, params) => {
    return {
        //ownerNickname: getUserNameById(state, params.ownerId)
    };
  }
  
export default connect(mapStateToProps, null)(RoomOption);