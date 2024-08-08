// =====================================
// #00157
// =====================================

import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ButtonLoading from "../../components/ButtonLoading";
import CustomFieldGlass from "../../components/InputFields/CustomFieldGlass";
import CustomPasswordFieldGlass from "../../components/InputFields/CustomPasswordFieldGlass";
import CustomLoading from "../../components/CustomLoading";
import Swal from "sweetalert2";
import { useAuth } from "../../context/AuthContextV2";
import CustomPasswordField from "../../components/InputFields/CustomPasswordField";
import CustomField from "../../components/InputFields/CustomField";
import { loginUser } from "../../Apis/auth";
import toast from "react-hot-toast";
import CustomToaster from "../../components/CustomToaster";
import axios from "axios";

export default function Login() {
  const {
    user,
    setIsAuthenticated,
    setUser,
    handleClosePopup,
    handleOpenSignUpPopup,
    authPopupOptions,
  } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isCheckingAuthentication, setIsCheckingAuthentication] =
    useState(true);

  useEffect(() => {
    setIsCheckingAuthentication(true);
    if (!user) {
      setIsCheckingAuthentication(false);
    } else {
      Swal("InfoAlready Logged in!", "You are already logged in!", "info");
    }
  }, []);

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = () => {
    setIsLoading(true);
    loginUser(formData)
      .then((res) => {
        if (res.ok === true) {
          if (res?.data?.roles[0]?.name !== "customer") {
            window.location.href = `${
              import.meta.env.VITE_REACT_APP_REDIRECT_URL
            }?token=${res?.data?.token}`;
          } else {
            setIsAuthenticated(true);
            setUser(res?.data);
            localStorage.setItem("user_data", JSON.stringify(res?.data));
            axios.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${res?.data?.token}`;
            setIsLoading(false);
            handleClosePopup();
          }
        }
      })
      .catch((error) => {
        console.log({ error });
        toast.custom((t) => (
          <CustomToaster
            t={t}
            type={"error"}
            text={`ID: #00203 - ${error?.response?.data?.message}`}
            errors={error?.response?.data?.errors}
          />
        ));
        setIsLoading(false);
      });
  };

  if (isCheckingAuthentication) {
    return <CustomLoading h="h-[300px]" />;
  }
  return (
    <div className={`pb-10 mt-5`}>
      <div className=" px-5 sm:px-8 gap-3 sm:gap-6">
        <div data-cy="login-form" className="h-full  w-full">
          <CustomField
            id={"email"}
            label={"Email address"}
            required={true}
            type={"email"}
            name={"email"}
            onChange={(e) => {
              setFormData({
                ...formData,
                email: e.target.value,
              });
            }}
            value={formData?.email}
            placeholder={"Email"}
            error={errors?.email}
            wrapperClassName={`w-full`}
            fieldClassName={`w-full text-black`}
            dataCyLabel={`login_email_label`}
            dataCyInput={`login_email`}
            dataCyError={`login_email_error`}
          />
          <CustomPasswordField
            required={true}
            label={"Password"}
            id="password"
            onChange={(e) => {
              setFormData({
                ...formData,
                password: e.target.value,
              });
            }}
            value={formData?.password}
            placeholder={`Password`}
            name={`password`}
            error={errors?.password}
            wrapperClassName={`w-full`}
            fieldClassName={`w-full text-black`}
            eyeToggleClass="text-primary"
            dataCyLabel={`login_password_label`}
            dataCyInput={`login_password`}
            dataCyError={`login_password_error`}
          />
        </div>
        <div className={`mt-1`}>
          <div
            data-cy="login-action-container"
            className="card-actions flex flex-col w-full items-end justify-between "
          >
            {/* FORGOT PASSWORD  */}
            <NavLink
              data-cy="login_forget_password"
              className={"link link-hover text-right text-sm font-[300]"}
              to={`/auth/forgot-password`}
            >
              Forgot Password?
            </NavLink>

            {/* LOGIN  */}
            <button
              data-cy="login_submit_handler"
              disabled={isLoading}
              onClick={handleSubmit}
              className="btn w-full btn-primary font-semibold hover:scale-105 active:scale-95 rounded-[5px] transition-all duration-200"
            >
              {isLoading ? <ButtonLoading color="text-white" /> : "Login"}
            </button>
          </div>

          <div className={`flex gap-2 items-center my-2`}>
            <div className={`bg-gray-400 w-[45%] py-[0.1px]`}></div>
            <div>or</div>
            <div className={`bg-gray-400 w-[45%] py-[0.1px]`}></div>
          </div>

          {/* REGISTER  */}
          <button
            data-cy="login_register_business"
            disabled={isLoading}
            onClick={() => {
              handleOpenSignUpPopup(authPopupOptions?.forms);
            }}
            className="btn btn-outline  w-full btn-primary font-semibold text-sm sm:text-base hover:scale-105 active:scale-95 rounded-[5px] transition-all duration-200"
          >
            Register A New Garage
          </button>
        </div>
      </div>
    </div>
  );
}
