import React from 'react';

const SingleCall = () => {
    return (
        <div className="my-20 text-center">
            <div class="card w-96 mx-auto bg-base-100 shadow-2xl">
                <h2 className="text-4xl"> Single Calling Page</h2>
                <div class="card-body flex flex-row justify-content-space-between align-items-center">
                    <div className=' flex-1 text-8xl'>
                        <i class="fas fa-user"></i>
                    </div>
                    <div className='flex-1 text-green-700 text-5xl mt-8'>
                        <i class="fal fa-phone-alt"></i>
                    </div>
                    <div className='flex-1 text-8xl'>
                        <i class="fas fa-user"></i>
                    </div>
                </div>
                <div class="card-body flex flex-row justify-content-space-between align-items-center my-8 ">
                    <div className=' flex-1 text-green-700 text-4xl'>
                        <i class="fal fa-phone-alt"></i>
                    </div>
                    <div className='flex-1 text-pink-700 text-4xl'>
                        <i class="far fa-sms"></i>
                    </div>
                    <div className='flex-1 text-red-700 text-4xl'>
                        <i class="fal fa-phone-alt"></i>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleCall;