import React from 'react';

const Join = () => {
    return (
        <div className='h-full'>
            <h2 className='text-center text-4xl pt-8 pb-2'>Joining Now</h2>
            <div className="flex items-center justify-center py-8">
                <div class="form-control w-full max-w-xs py-4">
                    <p className='text-sm py-2'>Meeting ID or Personal Link Name</p>
                    <form className='flex gap-1'>
                        <input type="text" placeholder="Id or Link" class="input input-bordered w-full max-w-xs" />
                        <input type="submit" value="Join" class="btn" />
                    </form>
                    <p className='text-sm py-2'>By clicking "Join", you agree to our Terms of Services and Privacy Statement</p>
                </div>
            </div>
            
        </div>
    );
};

export default Join;