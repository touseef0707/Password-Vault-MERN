import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import Architecture from './Architecture';
import PrivacyPolicy from './PrivacyPolicy';
import TermsAndConditions from './TermsAndConditions';
import HowToUse from './HowToUse';

const About = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="h-[352PX] w-full scrollbar-custom overflow-auto p-6 text-white shadow-black shadow-md">
      <div>
        <h1 className="text-3xl font-bold text-center text-cyan-aqua-400 mb-5">ABOUT</h1>

        <div className="w-full flex flex-col gap-8 mt-5">
          {/* Zero-Knowledge Architecture */}
          <div className="w-full">
            <div
              className="flex justify-between items-center cursor-pointer px-4 pb-7 border-b-2"
              onClick={() => toggleAccordion(0)}
            >
              <div className="flex items-center">
                {activeIndex === 0 ? (
                  <ChevronUpIcon className="h-6 w-6 text-white mr-2" />
                ) : (
                  <ChevronDownIcon className="h-6 w-6 text-white mr-2" />
                )}
                <h2 className="text-2xl text-white font-semibold">Zero-Knowledge Architecture</h2>
              </div>
            </div>
            {activeIndex === 0 && <Architecture />}
          </div>

          {/* How to Use */}
          <div className="w-full">
            <div
              className="flex justify-between items-center cursor-pointer px-4 pb-7 border-b-2"
              onClick={() => toggleAccordion(1)}
            >
              <div className="flex items-center">
                {activeIndex === 1 ? (
                  <ChevronUpIcon className="h-6 w-6 text-white mr-2" />
                ) : (
                  <ChevronDownIcon className="h-6 w-6 text-white mr-2" />
                )}
                <h2 className="text-2xl text-white font-semibold">How to Use</h2>
              </div>
            </div>
            {activeIndex === 1 && <HowToUse />}
          </div>

          {/* Privacy Policy */}
          <div className="w-full">
            <div
              className="flex justify-between items-center cursor-pointer px-4 pb-7 border-b-2"
              onClick={() => toggleAccordion(2)}
            >
              <div className="flex items-center">
                {activeIndex === 2 ? (
                  <ChevronUpIcon className="h-6 w-6 text-white mr-2" />
                ) : (
                  <ChevronDownIcon className="h-6 w-6 text-white mr-2" />
                )}
                <h2 className="text-2xl text-white font-semibold">Privacy Policy</h2>
              </div>
            </div>
            {activeIndex === 2 && <PrivacyPolicy />}
          </div>

          {/* Terms and Conditions */}
          <div className="w-full">
            <div
              className="flex justify-between items-center cursor-pointer px-4 pb-7 border-b-2"
              onClick={() => toggleAccordion(3)}
            >
              <div className="flex items-center">
                {activeIndex === 3 ? (
                  <ChevronUpIcon className="h-6 w-6 text-white mr-2" />
                ) : (
                  <ChevronDownIcon className="h-6 w-6 text-white mr-2" />
                )}
                <h2 className="text-2xl text-white font-semibold">Terms and Conditions</h2>
              </div>
            </div>
            {activeIndex === 3 && <TermsAndConditions />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
