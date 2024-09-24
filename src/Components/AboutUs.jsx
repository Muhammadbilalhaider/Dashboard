import React from 'react';
import imgAbout from '../assets/about-us.svg';

const AboutUs = () => {

  return (
    <div className="flex flex-col items-center w-full mt-20 px-4 md:px-0">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-start lg:gap-20 md:gap-10 ">
        <div className="flex flex-col text-center lg:text-left max-w-lg order-2 lg:order-1 sm:mt-16">
          <h1 className="font-extrabold text-3xl font-interFont">Why Choose Us</h1>
          <p className="text-xs font-interFont font-normal md:text-base lg:text-lg mt-4">
            We are a delighting team of technology-addicted specialists who use their exceptional skills and talent to create CRM & ERP Systems, Websites, Online Stores, mobile applications, and branding with different levels of complexity. Our work commencement is based on steps, from requirements elicitation to future technical support.
          </p>
        </div>
        <div className="flex justify-center lg:justify-start order-2 lg:order-1 items-start mt-7 lg:mt-0">
          <img src={imgAbout} alt="Visual" className="w-60 sm:w-40 md:w-48 lg:w-96 h-auto" />
        </div>
      </div>

      <div className='bg-gradient-to-r from-buttonColor via-blue-900 to-buttonColor w-full h-16 mt-4 flex items-center justify-center'>
        <p className=' text-cyan-50 text-center md:text-base lg:text-lg font-interFont text-xs'>SoftwareStudios, a trusted software solutions provider, delivers exceptional services, driving development, surpassing expectations, and making a positive social impact.</p>
      </div>
      <div className='flex flex-col items-center mt-1 '>
        <h1 className="font-extrabold text-3xl font-interFont">Our Strategic Focus</h1>
        <p className="text-xs font-interFont font-normal md:text-base lg:text-lg mt-4">
          Our objective is to provide excellent products and services that foster growth, surpass customer expectations, and have a beneficial impact on society.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
