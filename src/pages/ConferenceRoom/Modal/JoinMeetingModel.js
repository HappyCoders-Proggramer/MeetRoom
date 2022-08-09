
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from "react-router-dom";
import {setIdentity, setRoomId,} from "../../../redux/actions";
import { getRoomExists } from "../../../utils/api";

const JoinMeetingModel = ({ isRoomHost, setIdentityAction, setRoomIdAction }) => {
    const [roomIdValue, setRoomIdValue] = useState("");
    const [nameValue, setNameValue] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    const titleText = isRoomHost ? "Host meeting" : "Join meeting";
  
    let navigate = useNavigate();
    const pushToJoinRoomPage = () => {
        navigate("/room/video");
    };
    
    const handleRoomIdValueChange = (event) => {
        setRoomIdValue(event.target.value);
    };
    
    const handleNameValueChange = (event) => {
        setNameValue(event.target.value);
    };
  
    // const handleConnectionTypeChange = () => {
    //     setConnectOnlyWithAudio(!connectOnlyWithAudio);
    // };

    const handleJoinRoom = async () => {
      setIdentityAction(nameValue);
      if (isRoomHost) {
        createRoom();
      } else {
        await joinRoom();
      }
    };
  
    const joinRoom = async () => {
      const responseMessage = await getRoomExists(roomIdValue);
  
      const { roomExists, full } = responseMessage;
  
      if (roomExists) {
        if (full) {
          setErrorMessage("Meeting is full. Please try again later.");
        } else {
          // join a room !
          setRoomIdAction(roomIdValue);
          navigate("/room");
        }
      } else {
        setErrorMessage("Meeting not found. Check your meeting id.");
      }
    };
  
    const createRoom = () => {
      navigate("/room/video");
    };

    return (
        <div className=' items-center justify-center'>
            <label for="my-modal-3" class="hover:cursor-pointer"><i className="fal fa-plus-square font-bold text-3xl bg-clock bg-transparent border border-gray-400 p-2"></i></label>


            <input type="checkbox" id="my-modal-3" class="modal-toggle" />
            <div class="modal modal-bottom sm:modal-middle  ">
                <div class="modal-box bg-chat h-auto  mx-auto  ">
                    <h2 className="text-center text-2xl divide-y">{titleText}</h2>

                    <input type="text" placeholder="Meeting ID" class="input w-full my-3 bg-slate-800 rounded" 
                    defaultValue={roomIdValue}
                    changeHandler={handleRoomIdValueChange}
                    />
                    <input type="text" placeholder="Enter your Name" class="input bg-slate-800 rounded w-full" 
                    defaultValue={nameValue}
                    changeHandler={handleNameValueChange}
                    />
                    
                    <div className='flex justify-end gap-3'>
                        <div class="modal-action">
                            <label for="my-modal-3" class="btn">Cancel</label>
                        </div>
                        <div class="modal-action">
                            <label for="my-modal-3" class="btn btn-primary">
                                <button for="my-modal-3" class="btn btn-primary" onClick={()=>pushToJoinRoomPage()}>Start Now</button>
                            </label>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

const mapStoreStateToProps = (state) => {
    return {
      ...state,
    };
};

const mapActionsToProps = (dispatch) => {
    return {
      setIdentityAction: (identity) => dispatch(setIdentity(identity)),
      setRoomIdAction: (roomId) => dispatch(setRoomId(roomId)),
      // setConnectOnlyWithAudio: (onlyWithAudio) =>
      // dispatch(setConnectOnlyWithAudio(onlyWithAudio)),
    };
};

export default connect(
    mapStoreStateToProps,
    mapActionsToProps
  )(JoinMeetingModel);
