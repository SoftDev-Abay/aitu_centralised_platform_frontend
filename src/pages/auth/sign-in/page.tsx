import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { LoginForm } from "@/features/auth/LoginForm";
import { RegisterForm } from "@/features/auth/RegisterForm";

const SlidingHighiter = ({
  active,
  setActive,
}: {
  active: "login" | "register";
  setActive: React.Dispatch<React.SetStateAction<"login" | "register">>;
}) => {
  return (
    <div className="relative flex h-full">
      <div
        className={`absolute top-0 ${
          active === "register" ? "left-0" : "left-[115px]"
        } w-[115px] h-full flex justify-center bg-brand-primary z-0 rounded-md transition-all duration-300`}
      />
      <div
        className="w-[115px] h-full flex bg-transparent justify-center items-center text-lg text-white z-10 cursor-pointer"
        onClick={() => setActive("register")}
      >
        Sign Up
      </div>
      <div
        className="w-[115px] h-full flex justify-center items-center text-lg text-white z-10 cursor-pointer"
        onClick={() => setActive("login")}
      >
        Login
      </div>
    </div>
  );
};

const AuthPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [mode, setMode] = useState<"login" | "register">("login");

  useEffect(() => {
    const queryMode = searchParams.get("mode");
    if (queryMode === "register") setMode("register");
    else setMode("login");
  }, [searchParams]);

  useEffect(() => {
    setSearchParams({ mode });
  }, [mode, setSearchParams]);

  return (
    <div className="flex flex-col min-h-svh w-full">
      <div className="flex justify-between items-center px-6 bg-brand-secondary pl-[26px] pr-[71px] h-[53px]">
        <div className="">
          <img
            src="/logo-white-blue-text.svg"
            className="w-[77px] h-[40px]"
            alt=""
          />
        </div>
        <SlidingHighiter active={mode} setActive={setMode} />
      </div>

      <div className="w-full flex-grow flex flex-col justify-center">
        {mode === "login" ? <LoginForm /> : <RegisterForm />}
      </div>

      <div className="w-full flex justify-center py-3.5 px-2 bg-brand-secondary">
        <div className="text-white text-xl">
          Copyright © Astana IT University 2025.
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
