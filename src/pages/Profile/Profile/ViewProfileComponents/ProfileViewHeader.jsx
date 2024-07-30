// ===========================================================
// #00285
// ===========================================================

import moment from "moment";
import React from "react";
import toast from "react-hot-toast";
import { CgGenderFemale, CgGenderMale } from "react-icons/cg";
import { FaRegClock } from "react-icons/fa";
import { HiOutlineClipboard } from "react-icons/hi";
import { LuWallet } from "react-icons/lu";
import { MdPhoneEnabled } from "react-icons/md";
import { TbCalendarCheck } from "react-icons/tb";
import CustomToaster from "../../../../components/CustomToaster";
import Headings from "../../../../components/Headings/Headings";
import ShortInfoOfProfile from "../../../../components/ShortInfoOfProfile";
import { formatNumberWithCommas } from "../../../../utils/formatNumberWithCommas";
import { getFullImageLink } from "../../../../utils/getFullImageLink";
import useViewProfileContext from "./useViewProfileContext";

export default function ProfileViewHeader() {
  const { userInfo, data, formData, setFormData, isLoading, setIsLoading } =
    useViewProfileContext();
  const currency = JSON.parse(localStorage.getItem("userData"))?.business
    ?.currency;
  const business = JSON.parse(localStorage.getItem("userData"))?.business;

  return (
    <div className="h-full border-2 border-primary-content flex-col p-5 shadow-md rounded-xl bg-base-300 items-center flex justify-start  gap-5 md:gap-10 w-full">
      <div className="flex flex-col items-center  justify-center gap-5 w-full ">
        <div className="flex flex-col items-center gap-2">
          {/* PROFILE PIC  */}
          <div className="avatar">
            <div className="w-44 group relative rounded-full shadow-md">
              {isLoading ? (
                <div className="w-full h-full flex justify-center items-center">
                  <span className="loading-spinner loading text-primary"></span>
                </div>
              ) : (
                <>
                  {userInfo?.image ? (
                    <img
                      src={
                        formData?.image
                          ? `${getFullImageLink(formData?.image)}`
                          : `${getFullImageLink(userInfo?.image)}`
                      }
                      alt={`${userInfo?.first_Name} ${
                        userInfo?.middle_Name ? userInfo?.middle_Name : ""
                      } ${userInfo?.last_Name}`}
                    />
                  ) : (
                    <div className="bg-base-100 text-primary font-semibold text-2xl h-full w-full flex justify-center items-center">
                      {`${userInfo?.first_Name?.slice(0, 1)}${
                        userInfo?.middle_Name
                          ? userInfo?.middle_Name?.slice(0, 1)
                          : ""
                      }${userInfo?.last_Name?.slice(0, 1)}`}
                    </div>
                  )}
                </>
              )}

              {/* IMAGE UPLOAD BUTTON  */}
              {!isLoading && (
                <label
                  htmlFor="upload_image"
                  className="cursor-pointer group-hover:bottom-0 duration-200 absolute -bottom-10 left-1/2 -translate-x-1/2 px-5 py-2 text-base-300 rounded-full bg-primary"
                >
                  Upload
                </label>
              )}
              <input
                onChange={(e) => {
                  if (
                    e.target.files[0] &&
                    e.target.files[0]?.size > 5 * 1024 * 1024
                  ) {
                    // File size exceeds 5MB, show error message
                    toast.custom((t) => (
                      <CustomToaster
                        t={t}
                        type={"error"}
                        text={`File size exceeds the limit of 5MB`}
                      />
                    ));
                  } else {
                    setIsLoading(false);

                    // uploadUserProfile(e.target.files[0])
                    //   .then((res) => {
                    //     updateProfile({
                    //       ...formData,
                    //       image: res?.full_location,
                    //     })
                    //       .then((res) => {
                    //         console.log({ res });
                    //         setFormData({ ...formData, image: res?.image });
                    //         setIsLoading(false);
                    //       })
                    //       .catch((error) => {
                    //         console.log({ error });
                    //         setIsLoading(false);
                    //       });
                    //     console.log({ res });
                    //   })
                    //   .catch((error) => {
                    //     setIsLoading(false);
                    //     handleApiError(error, '#00119');
                    //   });
                  }
                }}
                className="hidden"
                id="upload_image"
                type="file"
              />
            </div>
          </div>
        </div>

        {/* BASIC INFO  */}
        <div className="flex flex-col items-center gap-2">
          <Headings className={`text-center text-primary`} level={2}>
            {formData?.first_Name}{" "}
            {formData?.middle_Name ? formData?.middle_Name : ""}{" "}
            {formData?.last_Name}
          </Headings>

          {business?.name && (
            <div>
              <h2 className="py-1 text-center px-5 rounded-full text-sm text-base-300 bg-primary">
                {/* {formatRole(userInfo?.roles[0]?.name)} -{" "} */}
                {business?.name ? business?.name : ""}
              </h2>
            </div>
          )}
        </div>
      </div>

      {/* IMPORTANT INFO  */}
      <div className="flex gap-8 flex-col w-full">
        <div className="flex gap-8 flex-col sm:flex-row lg:flex-col justify-center w-full">
          {userInfo?.user_id && (
            <ShortInfoOfProfile
              Icon={CgGenderFemale}
              title={userInfo.user_id}
              subTitle={"Employee ID"}
              iconClass={`text-primary`}
              IconBgClass={`bg-primary-content`}
            />
          )}
          {/* <ShortInfoOfProfile
            Icon={MdPhoneEnabled}
            title={userInfo.phone ? userInfo.phone + "" : ""}
            subTitle={"Phone"}
            iconClass={`text-primary`}
            IconBgClass={`bg-primary-content`}
          /> */}
        </div>
        {userInfo?.user_id && (
          <div className="flex gap-8 flex-col sm:flex-row lg:flex-col justify-center w-full">
            {userInfo.departments.length > 0 && (
              <ShortInfoOfProfile
                Icon={HiOutlineClipboard}
                title={
                  userInfo.departments.length > 0
                    ? userInfo.departments[0]?.name
                    : ""
                }
                subTitle={"Department"}
                iconClass={`text-primary`}
                IconBgClass={`bg-primary-content`}
              />
            )}
            {userInfo.salary_per_annum && (
              <ShortInfoOfProfile
                Icon={LuWallet}
                title={`${currency} ${
                  formatNumberWithCommas(userInfo.salary_per_annum)
                    ? formatNumberWithCommas(userInfo.salary_per_annum)
                    : 0
                }`}
                titleClass={`text-green-500`}
                subTitle={"Salary"}
                iconClass={`text-primary`}
                IconBgClass={`bg-primary-content`}
              />
            )}
          </div>
        )}
        {userInfo?.user_id && (
          <div className="flex gap-8 flex-col sm:flex-row lg:flex-col justify-center w-full">
            {userInfo.work_shifts && (
              <ShortInfoOfProfile
                Icon={FaRegClock}
                title={userInfo.work_shifts}
                subTitle={"Work Shift"}
                iconClass={`text-primary`}
                IconBgClass={`bg-primary-content`}
              />
            )}
            {userInfo.joining_date && (
              <ShortInfoOfProfile
                Icon={TbCalendarCheck}
                title={moment(userInfo.joining_date).format("Do MMMM YYYY")}
                subTitle={"Joining date"}
                iconClass={`text-primary`}
                IconBgClass={`bg-primary-content`}
              />
            )}
          </div>
        )}
        <div className="flex gap-8 flex-col sm:flex-row lg:flex-col justify-center w-full">
          {userInfo.gender && (
            <ShortInfoOfProfile
              Icon={userInfo.gender === "male" ? CgGenderMale : CgGenderFemale}
              title={
                userInfo.gender.slice(0, 1).toUpperCase() +
                userInfo.gender.slice(1)
              }
              subTitle={"Gender"}
              iconClass={`text-primary`}
              IconBgClass={`bg-primary-content`}
            />
          )}
          {userInfo.phone && (
            <ShortInfoOfProfile
              Icon={MdPhoneEnabled}
              title={userInfo.phone}
              subTitle={"Phone"}
              iconClass={`text-primary`}
              IconBgClass={`bg-primary-content`}
            />
          )}
        </div>
      </div>
    </div>
  );
}
