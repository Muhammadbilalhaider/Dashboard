import React from 'react';
import imgAbout from '../assets/about-us.svg';

const AboutUs = () => {
  return (
    <div className="flex justify-center items-start w-full mt-20 px-4 md:px-0">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center lg:gap-20 md:gap-10 ">
        <div className="flex flex-col text-center lg:text-left max-w-lg order-2 lg:order-1 sm:mt-16">
          <h1 className="font-extrabold text-4xl font-interFont">About Us</h1>
          <p className="text-xs font-interFont font-normal md:text-base lg:text-lg mt-4">
            We are a delighting team of technology-addicted specialists who use their exceptional skills and talent to create CRM & ERP Systems, Websites, Online Stores, mobile applications, and branding with different levels of complexity. Our work commencement is based on steps, from requirements elicitation to future technical support.
          </p>
        </div>
        <div className="flex justify-center lg:justify-start order-2 lg:order-1 items-center mt-7 lg:mt-0">
          <img src={imgAbout} alt="Visual" className="w-60 sm:w-40 md:w-48 lg:w-96 h-auto" />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
