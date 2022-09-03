import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { v1 as uuid } from "uuid";
import emailjs from 'emailjs-com';

const CreateSingleRoom = (props) => {
    // creating a room id
    // redirecting the user to the correct page
    const singleRoom = useNavigate();
    const create =()=> {
        const id = uuid();
       singleRoom(`/conference/room/${id}`);
    }

    // creating a room id for scheduling a call
    const scheduleID =()=> {
        const id = uuid();
        var url = window.location.href;
        var n = url.lastIndexOf('CreateRoom');
        return url.substring(0, n - 1) + `/room/${id}`;
    }
    
    //sending an email to the user
    const sendEmail = (e)=> {
        e.preventDefault();

        emailjs.sendForm('gmail', 'template_kgfrx5w', e.target, 'user_nAYJJym0KTqRP8NWdzKqS')
            .then((result) => {
                window.location.reload()
            }, (error) => {
                console.log(error.text);
            });
    }
   
       // <!-- Put this part before </body> tag -->
    <div className="px-2">
         <input type="checkbox" id="my-modal-8" class="modal-toggle" />
            <div class="modal modal-bottom sm:modal-middle">
            <div class="modal-box">
                <h3 class="font-bold text-lg">Congratulations random Internet user!</h3>
                <p class="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
                <div class="modal-action">
                <label for="my-modal-6" class="btn">Yay!</label>
                </div>
            </div>
        </div>
    </div>
    return (
        <div className=' items-center justify-center'>
            <label for="my-modal-1" className="hover:cursor-pointer"><i className="fal fa-video font-bold text-3xl bg-clock bg-transparent border border-slate-600 p-2"></i></label>

            <input type="checkbox" id="my-modal-1" className="modal-toggle" />
            
            <div className="modal modal-bottom sm:modal-middle  ">
                <div className="modal-box bg-chat h-auto  mx-auto  ">
                    <h2 className="text-center text-3xl divide-y font-semibold">Single Video Calling</h2>
                    <div className='flex justify-center gap-3'>
                        {/* Cancel Btn */}
                        <div className="modal-action">
                            <label for="my-modal-1" className="btn">Cancel</label>
                            <div className="flex gap-2 items-center">
                            {/* <button className="schedule" onClick={() => setModalShow(true)}> Schedule Call </button> */}
                            <Link to="/conference/schedule" className="btn">Schedule</Link>
                            {/* <button class="btn"> <label for="my-modal-6" class="btn modal-button">Schedule</label> </button> */}
                            {/* <MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)}/> */}

                            <button className="btn"  onClick={()=>create()}> Single Call </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CreateSingleRoom;
