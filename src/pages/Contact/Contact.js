import React from 'react';

const Contact = () => {
    return (
        <main>
        <section class="hero min-h-screen px-0 lg:px-8">
            <div class="flex justify-center flex-col lg:flex-row-reverse">
                <div class="card shadow-2xl bg-base-100">
                    <div class="card-body">
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Name</span>
                            </label>
                            <input type="text" placeholder="name" class="input input-bordered" />
                        </div>
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Message</span>
                            </label>
                            <textarea class="textarea textarea-bordered h-24" placeholder="Send Message"></textarea>
                        </div>
                        <div class="form-control mt-6">
                            <button class="btn btn-primary">Send</button>
                        </div>
                    </div>
                </div>
                {/* End contact Form */}
                <div class=" lex-shrink-0 w-full max-w-5xl text-center lg:text-left">
                    <h1 class="text-5xl font-bold">Contact now!</h1>
                    <p class="py-6 pr-0 lg:pr-8">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>

                    <div className="flex justify-center gap-1 flex-col lg:flex-row-reverse">
						<div className="flex gap-2 w-full">
							<div className="w-12/12 lg:w-3/12">
                                <h3 className='text-lg font-semibold'>Colaborate</h3>
                                <p>Support@example.com</p>
                                <p>+880-1617892323</p>
							</div>
							<div className="w-12/12 lg:w-3/12">
                                <h3 className='text-lg font-semibold'>Support</h3>
                                <p>Support@example.com</p>
                                <p>+880-1617892323</p>
                            </div>
                            
                            <div className="w-12/12 lg:w-3/12">
                                <h3 className='text-lg font-semibold'>Join our team</h3>
                                <p>Support@example.com</p>
                                <p>+880-1617892323</p>
                            </div>
                            <div className="w-12/12 lg:w-3/12">
                                <h3 className='text-lg font-semibold'>Say hello</h3>
                                <p>Support@example.com</p>
                                <p>+880-1617892323</p>
                            </div>
						</div>
                    </div>
                </div>
                
            </div>
        </section>
        {/* end contact section */}
        <section className='mb-8 px-0 lg:px-8'>

        <div class="hero" style={{backgroundImage: 'url(https://placeimg.com/1000/800/arch)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
        <div class="hero-overlay py-8 bg-opacity-60"></div>
        <div class="hero-content text-center text-neutral-content">
            <div class="max-w-md">
                <h1 class="mb-5 text-5xl font-bold">Looking for new career?</h1>
                <p class="mb-5">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                <button class="btn btn-primary">We are Hiring</button>
            </div>
        </div>
        </div>
        </section>
        </main>
    );
};

export default Contact;