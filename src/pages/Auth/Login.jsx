// =====================================
// #00157
// =====================================

import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ButtonLoading from "../../components/ButtonLoading";
import CustomFieldGlass from "../../components/InputFields/CustomFieldGlass";
import CustomPasswordFieldGlass from "../../components/InputFields/CustomPasswordFieldGlass";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  return (
    <div
      style={{
        backgroundImage: "url(/assets/login.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="relative w-full h-screen flex justify-center items-center overflow-hidden"
    >
      <div
        className={`absolute bg-black top-0 left-0 w-full h-full bg-opacity-50 md:bg-opacity-10`}
      ></div>
      <div
        className={`bg-black bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-10 border border-white border-opacity-25 shadow-xl text-base-100 rounded-xl screen1100:ml-[55%] w-[95%] sm:w-[400px]`}
      >
        <div className="card-body px-5 sm:px-8 gap-3 sm:gap-6">
          <h1 className="font-bold text-3xl mb-5 ">Garage</h1>
          <h2 className="font-bold text-xl text-left">Sign in</h2>
          <div data-cy="login-form" className="h-full  w-full">
            <CustomFieldGlass
              id={"email"}
              label={"Email address"}
              required={true}
              type={"email"}
              name={"email"}
              // onChange={onChangeFormData}
              value={formData?.email}
              placeholder={"Email"}
              error={errors?.email}
              wrapperClassName={`w-full`}
              fieldClassName={`w-full text-black`}
              labelClass=" text-base-100"
              dataCyLabel={`login_email_label`}
              dataCyInput={`login_email`}
              dataCyError={`login_email_error`}
            />
            <CustomPasswordFieldGlass
              required={true}
              label={"Password"}
              id="password"
              // onChange={onChangeFormData}
              value={formData?.password}
              placeholder={`Password`}
              name={`password`}
              error={errors?.password}
              wrapperClassName={`w-full`}
              fieldClassName={`w-full text-black`}
              labelClass=" text-base-100"
              eyeToggleClass="text-primary"
              dataCyLabel={`login_password_label`}
              dataCyInput={`login_password`}
              dataCyError={`login_password_error`}
            />
          </div>

          <div>
            <div
              data-cy="login-action-container"
              className="card-actions flex flex-col w-full items-end justify-between "
            >
              <NavLink
                data-cy="login_forget_password"
                className={"link link-hover text-right text-sm font-[300]"}
                to={`/auth/forgot-password`}
              >
                Forgot Password?
              </NavLink>
              <button
                data-cy="login_submit_handler"
                // disabled={isLoading}
                // onClick={handleSubmit}
                className="btn w-full bg-white text-primary font-semibold hover:scale-105 active:scale-95 rounded-[5px] transition-all duration-200"
              >
                {/* {isLoading ? <ButtonLoading color="text-white" /> : "Login"} */}
                Login
              </button>
            </div>

            {/* {isLoadingReg ? (
              <>
                <div className={`flex gap-2 items-center my-2`}>
                  <div
                    className={`animate-pulse bg-slate-500 w-[45%] py-[0.1px]`}
                  ></div>
                  <div
                    className={`animate-pulse bg-slate-500 w-3 h-3 rounded-full`}
                  ></div>
                  <div
                    className={`animate-pulse bg-slate-500 w-[45%] py-[0.1px]`}
                  ></div>
                </div>
                <div
                  className={`animate-pulse bg-slate-500 w-full py-6 rounded-md`}
                ></div>
              </>
            ) : (
              <>
                {selfRegistrationEnabled === 1 && (
                  <> */}
            <div className={`flex gap-2 items-center my-2`}>
              <div className={`bg-gray-400 w-[45%] py-[0.1px]`}></div>
              <div>or</div>
              <div className={`bg-gray-400 w-[45%] py-[0.1px]`}></div>
            </div>
            <div className="flex items-center">
              {/* <span className="mr-2 font-[300]">Don’t have an account?</span> */}
              <button
                data-cy="login_register_business"
                // disabled={isLoading}
                onClick={() => navigate(`/auth/register`)}
                className="btn  w-full bg-white text-primary font-semibold text-sm sm:text-base hover:scale-105 active:scale-95 rounded-[5px] transition-all duration-200"
              >
                Register A New Business
              </button>
            </div>
            {/* </>
                )}
              </>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
}
