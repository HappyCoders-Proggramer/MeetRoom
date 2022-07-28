import React from 'react';
import { Link } from 'react-router-dom';
import background from "../../Assets/Images/man-computer.png"

const Home = () => {
  return (
    <div class="hero min-h-screen bg-base-200">
      <div class="hero-content flex-col lg:flex-row-reverse">
        <img src={background} class="w-full md:max-w-sm rounded-lg" alt='background' />
        <div>
          <h1 class="min-w-md md:text-5xl font-bold">MeetRoom: Video,Audio conferencing made simple</h1>
          <p class="py-6 md:text-xl">There's lots to love about MeetRoom.Add flexibility, not complexity</p>
          <Link to='/join' class="btn btn-primary">Get Started Meeting</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;