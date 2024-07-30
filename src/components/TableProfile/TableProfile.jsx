import React from "react";
import { getFullImageLink } from "../../utils/getFullImageLink";
import { NavLink } from "react-router-dom";
import { formatRole } from "../../utils/formatRole";

const TableProfile = ({
  img1,
  firstName,
  middleName,
  lastName,
  departments,
  roles,
  email,
  pageLink,
}) => {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-3">
      {/* PROFILE  */}
      {img1 ? (
        <div className={`avatar`}>
          <div className="w-10 rounded-full">
            <img src={`${getFullImageLink(img1)}`} />
          </div>
        </div>
      ) : (
        <div className={`avatar placeholder duration-100`}>
          <div className="w-10 rounded-full bg-primary text-base-300">
            <span>{`${firstName?.slice(0, 1)}${
              middleName ? middleName?.slice(0, 1) : ""
            }${lastName?.slice(0, 1)}`}</span>
          </div>
        </div>
      )}
      {/* NAME AND EMAIL  */}
      <div className="flex flex-col items-center md:items-start">
        <NavLink
          className={`text-primary font-medium flex flex-wrap justify-center md:justify-normal `}
          to={pageLink ? pageLink : ""}
        >
          <span className={`mr-1`}>{firstName}</span>
          <span className={`mr-1`}>{middleName ? middleName : ""}</span>
          <span>{lastName}</span>
        </NavLink>
        <span className="font-semibold text-xs text-gray-500">
          {departments?.map((dep, index) => {
            if (index + 1 < departments?.length) {
              return `${dep?.name},` + " ";
            } else {
              return `${dep?.name}`;
            }
          })}
        </span>
        <span className="text-xs font-medium">
          {roles?.map((r) => formatRole(r?.name)).join()}
        </span>
        <span className="text-xs">{email}</span>
      </div>
    </div>
  );
};

export default TableProfile;
