import React from 'react';

const About = () => {
    return (
        <main className='px-2 lg:px-6 min-h-screen'>
            <div class="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
                <div class="space-y-6 md:space-y-0 md:flex md:gap-6 lg:gap-12">
                    <div class="md:5/12 lg:w-5/12">
                        <img src="https://tailus.io/sources/blocks/left-image/preview/images/startup.png" alt="image" loading="lazy" width="" height=""/>
                    </div>
                    <div class="md:7/12 lg:w-6/12 lg:pt-2">
                        <h2 class="text-2xl text-gray-900 font-bold md:text-4xl">MeetRoom</h2>
                        <p class="mt-4 text-gray-600"> MeetRoom is an online video conferencing platform that powers all of your communication needs, including meetings, chat, fileshare and online events.</p>
                        <p class="mt-4 text-gray-600"> Upcomming new brand as a video conferencing world. This application will be unique and available for everyone with all features.Our application also will be available for android and ios in future.</p>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default About;