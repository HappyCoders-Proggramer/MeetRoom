import React from 'react';
import { useEffect, useState } from 'react';
import Clock from 'react-clock';
import { Link } from 'react-router-dom';
import CreateSingleRoom from '../../ConferenceRoom/ModalConference/CreateSingleRoom';
import CreateGroupRoom from '../../ConferenceRoom/ModalConference/CreateGroupRoom';
import CreateChatRoom from '../../ConferenceRoom/ModalConference/CreateChatRoom';
import CreateBroadcastRoom from '../../ConferenceRoom/ModalConference/CreateBroadcastRoom';
import WatchBg from '../../assets/images/watchbg.jpg';
import 'react-clock/dist/Clock.css';
import 'react-calendar/dist/Calendar.css';

const RoomHome = () => {
    const [value, setValue] = useState(new Date());
    const current = new Date();
    const dayName = current.toString().split(' ')[0];
    const monthName = current.toString().split(' ')[1];
    const date = `${dayName}, ${current.getDate()} ${monthName} ${current.getFullYear()}`;

    useEffect(() => {
        const interval = setInterval(() => setValue(new Date()), 1000);
        return () => {
            clearInterval(interval);
        };
    }, []);
    return (

        <div className='w-full mx-auto cursor-pointer'>
            <div className="flex flex-col lg:flex-row gap-2">
                <div className="card w-12/12 lg:w-8/12 bg-base-100 shadow-xl h-full" style={{ backgroundImage: `url(${WatchBg})`, backgroundSize: 'cover' }}>
                    <div className="card-body bg-clock text-gray-300">
                        <div className="flex flex-col md:flex-row justify-center lg:justify-between mx-auto">
                            <Clock value={value} />
                            <h2 className="card-title text-md lg:text-4xl p-2">{date}</h2>
                        </div>
                    </div>
                </div>

                {/* ======Single Video Calling===== */}
                <div className="card w-12/12 lg:w-4/12 bg-primary text-primary-content">
                    <div className="card-body">
                        <div className="flex justify-start gap-1">
                            <button><CreateSingleRoom /></button>
                        </div>
                        <h2 className="text-xl font-semibold">Single call</h2>
                        <p className='text-sm'>Start Calling</p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-2 py-2">
                {/* ======Group Video Calling===== */}
                <div className="card w-12/12 lg:w-6/12 bg-fuchsia-800 text-primary-content ml-0">
                    <div className="card-body">
                        <div className="flex justify-start gap-1">
                            <button><CreateGroupRoom /></button>
                        </div>
                        <h2 className="text-lg font-semibold">Group Call</h2>
                        <p className='text-sm'>Start Group Calling</p>
                    </div>
                </div>

                {/* ======Chatting Option===== */}
                <div className="card w-12/12 lg:w-6/12 bg-pink-700 text-primary-content ml-0">
                    <div className="card-body">
                        <div className="flex justify-start gap-1">
                            <button><CreateChatRoom /></button>
                        </div>
                        <Link to='/liveChat'><h2 className="text-lg font-semibold">Online Chat</h2></Link>
                        <p className='text-sm'>Start Just Chatting</p>
                    </div>
                </div>

                {/* ======Live BroadCast===== */}
                <div className="card w-12/12 lg:w-6/12 bg-sky-600 text-primary-content ml-0">
                    <div className="card-body">
                        <div className="flex justify-start gap-1">
                            <button><CreateBroadcastRoom /></button>
                        </div>

                        <h2 className="text-lg font-semibold">BroadCast</h2>
                        <p className='text-sm'>Start Just BroadCast</p>
                    </div>
                </div>

                {/* ======Schedule Option===== */}
                <div className="card w-12/12 lg:w-6/12 bg-cyan-700 text-primary-content ml-0">
                    <div className="card-body">
                        <div className="card-actions justify-start">
                            <Link to="/conference/schedule" className="text-lg font-semibold"><i className="fal fa-calendar-alt font-bold text-3xl bg-clock bg-transparent border border-gray-300  p-2"></i></Link>
                        </div>
                        <Link to="/conference/schedule" className="text-lg font-semibold">Schedule</Link>
                        <p className='text-sm'>plan your meeting</p>

                    </div>
                </div>

                {/* ======Share Screen===== */}
                <div className="card w-12/12 lg:w-6/12 bg-violet-600	 text-primary-content ml-0">
                    <div className="card-body">
                        <div className="card-actions justify-start">
                            <i className="fal fa-desktop font-bold text-3xl bg-clock bg-transparent border border-gray-300  p-2"></i>
                        </div>
                        <h2 className="text-lg font-semibold">Share Screen</h2>
                        <p className='text-sm'>show your interface</p>

                    </div>
                </div>

            </div>
        </div>

    );
};

export default RoomHome;