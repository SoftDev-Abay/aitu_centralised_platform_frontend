import { RegisterForm } from "@/features/auth/RegisterForm";

import { useState } from "react";

const SlidingHighiter = () => {
  const [isRight, setIsRight] = useState(false);

  const toggleSlide = () => {
    setIsRight((prev) => !prev);
  };

  return (
    <div className="relative flex h-full" onClick={toggleSlide}>
      <div
        className={`absolute top-0 ${
          isRight ? "left-[115px]" : "left-0"
        } w-[115px] h-full flex justify-center bg-brand-primary z-0 rounded-md transition-all duration-300`}
      />
      <div className="w-[115px] h-full flex bg-transparent justify-center items-center text-lg text-white z-10">
        Sign Up
      </div>
      <div className="w-[115px] h-full flex justify-center items-center text-lg text-white z-10">
        Login
      </div>
    </div>
  );
};

const SignInPage = () => {
  return (
    <div className="flex flex-col min-h-svh w-full ">
      {/* <div className="flex flex-col min-h-svh w-full p-6 md:p-10"> */}
      <div className=" flex justify-between items-center px-6 bg-brand-secondary pl-[26px] pr-[71px] h-[53px]">
        <div className="">
          <img
            src="/logo-white-blue-text.svg"
            className="w-[77px] h-[40px] "
            alt=""
          />
        </div>
        <SlidingHighiter />
      </div>
      <div className="w-full flex-grow flex flex-col justify-center">
        {/* <div className="w-full max-w-sm"> */}
        <RegisterForm />
      </div>
      <div className="w-full flex justify-center py-3.5 px-2 bg-brand-secondary ">
        <div className=" text-white text-xl ">
          Copyright © Astana IT University 2025.
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
