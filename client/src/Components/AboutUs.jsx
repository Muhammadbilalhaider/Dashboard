import React from "react";

import imgAbout from "../assets/about-us.svg";
import imgGoal from "../assets/goals.svg";
import imgMission from "../assets/mission.svg";
import imgValues from "../assets/our-values.svg";
import imgVision from "../assets/vision.svg";
import imgAboutPoiunt from "../assets/about-points.svg";
import imgStory from "../assets/our-story.svg";
import imgCounter from '../assets/counter.svg'


const AboutUs = () => {
  return (
    <div className="flex flex-col items-center w-full mt-20 px-4 md:px-0 pb-24 md:w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-start lg:gap-20 md:gap-10 ">
        <div className="flex flex-col text-center lg:text-left max-w-lg order-2 lg:order-1 sm:mt-16">
          <h1 className="font-extrabold text-3xl font-interFont">
            Why <span className="lg:relative lg:inline-block text-blue-900">
              SoftwareStudios

            </span>
          </h1>

          <p className="text-xs font-interFont font-normal md:text-base lg:text-lg mt-4">
            We are a delighting team of technology-addicted specialists who use
            their exceptional skills and talent to create CRM & ERP Systems,
            Websites, Online Stores, mobile applications, and branding with
            different levels of complexity. Our work commencement is based on
            steps, from requirements elicitation to future technical support.
          </p>
        </div>
        <div className="flex justify-center lg:justify-start order-2 lg:order-1 items-start mt-7 lg:mt-0">
          <img
            src={imgAbout}
            alt="Visual"
            className="w-60 sm:w-40 md:w-96 lg:w-96 h-auto"
          />
        </div>
      </div>

      <div className="bg-gradient-to-r from-buttonColor via-blue-900 to-buttonColor w-full h-16 mt-4 flex items-center justify-center">
        <p className=" text-cyan-50 text-center md:text-base font-interFont text-xs ">
          SoftwareStudios, a trusted software solutions provider, delivers
          exceptional services, driving development, surpassing expectations,
          and making a positive social impact.
        </p>
      </div>
      <div className="flex flex-col justify-center items-center mt-6 lg:mt-16 lg:mr-20 lg:ml-20">
        <h1 className="font-extrabold text-3xl font-interFont">
          Our <span className="text-blue-900">Strategic</span> Focus
        </h1>
        <p className="text-xs font-interFont font-normal md:text-base lg:text-lg mt-4 text-center">
          Our objective is to provide excellent products and services that
          foster growth, surpass customer expectations, and have a beneficial
          impact on society.
        </p>
        <div className="flex flex-row justify-center items-center space-x-5 lg:space-x-10 mt-4">
          <img className="lg:w-80 w-24 sm:w-40 md:w-56" src={imgVision} alt="Visual" />
          <img className="lg:w-80 w-24 sm:w-40 md:w-56" src={imgMission} alt="Visual" />
          <img className="lg:w-80 w-24 sm:w-40 md:w-56" src={imgGoal} alt="Visual" />
        </div>

        <div className="flex mt-6 lg:mt-16 flex-col justify-center items-center">
          <h1 className="font-black text-3xl lg:text-4xl font-interFont">
            Our <span className="text-blue-900">Core</span> Values
          </h1>
          <p className="text-sm md:text-base lg:text-lg lg:mt-5 mt-2 text-center">
            Our Core Values uphold honesty, transparency, and respect in
            everything we do, fostering a culture of trust and excellence.
          </p>
          <img className="mt-6" src={imgValues} alt="visual" />
        </div>

        <div className="flex flex-col justify-center items-center mt-5 lg:mt-14">
          <h1 className="font-black text-3xl font-interFont">
            Why <span className="text-blue-900">Choose</span> Us
          </h1>
          <p className="text-sm md:text-base lg:text-lg text-center font-interFont font-normal">
            We provide software solutions with expertise, quality, innovation,
            and return on investment.
          </p>
          <img className="mt-5 lg:mt-16 lg:h-96 md:h-60 sm:h-28" src={imgAboutPoiunt} alt="Visual" />
        </div>

        <div className="flex flex-col justify-center items-center mt-5 lg:mt-16 lg:mr-28 lg:ml-28">
          <h1 className="font-black font-interFont text-3xl">
            Our <span className="text-blue-950">Story</span>
          </h1>
          <p className="text-xs font-interFont font-normal md:text-base lg:text-lg mt-2 text-center">
            SoftwareStudios has developed into a comprehensive software solution
            business through hard work and determination, utilising the most
            up-to-date tech stacks and providing top-notch services.
          </p>
          <img className="lg:mt-10 mt-5 lg:w-full lg:pr-28 lg:pl-28 sm:w-80 md:w-auto md:pr-10 md:pl-10" src={imgStory} alt=" " />
        </div>
        <div className="flex flex-col justify-center items-center mt-6">
          <h1 className=" font-black font-interFont text-4xl">About Us</h1>
          <p className="text-xs md:text-base lg:text-lg text-center">
            Our software solutions company strives to exceed expectations and provide great results to ensure the success of our clients.
          </p>
          <img className="lg:w-full w-80 md:w-auto md:pl-4 md:pr-4" src={imgCounter} alt="" />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
