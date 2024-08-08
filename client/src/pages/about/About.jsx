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
    <div className="h-96 w-full flex items-center justify-center">
      <div className="h-96 w-full scrollbar-custom overflow-auto p-6 bg-cyan-aqua-400 text-white bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 rounded-lg shadow-black shadow-md">
        <h1 className="text-3xl font-bold text-center mb-5">About</h1>

        <div className="w-full flex flex-col gap-4">
          {/* Zero-Knowledge Architecture */}
          <div className="w-full">
            <div
              className="flex justify-between items-center cursor-pointer bg-cyan-aqua-900 p-4 rounded-lg"
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
              className="flex justify-between items-center cursor-pointer bg-cyan-aqua-900 p-4 rounded-lg"
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
              className="flex justify-between items-center cursor-pointer bg-cyan-aqua-900 p-4 rounded-lg"
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
              className="flex justify-between items-center cursor-pointer bg-cyan-aqua-900 p-4 rounded-lg"
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
