import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { useNav } from "../context/NavContext";

export default function SidebarMenuItem({
  isNested,
  show,
  link,
  i,
  title,
  Icon,
  isLast = false,
}) {
  const { isNavOpen } = useNav();
  return (
    <Fragment key={i}>
      {show && (
        <div
          className={`flex items-center w-full justify-start`}
        >
          <NavLink
            data-cy={`all-page-${title}-button-sidebar-menu-item`}
            data-tip={!isNavOpen ? title : ""}
            key={i}
            to={link}
            className={({ isActive }) =>
              ` w-full transition-all font-semibold duration-200 flex items-center gap-3 justify-start py-3 px-5
              ${
                isActive
                  ? `${
                      isNested
                        ? "text-base-300 bg-primary border-y border-base-300"
                        : " text-base-300 text-opacity-100 bg-primary activeNavLink "
                    }`
                  : `${
                      isNested
                        ? "text-primary hover:text-base hover:bg-primary-content border-y border-primary-content"
                        : "text-primary"
                    }`
              }`
            }
          >
            {!isNested ? (
              <span className={`inline-block `}>
                <Icon className={`Icon text-2xl`} />
              </span>
            ) : (
              ""
            )}

            <span
              className={` text-sm duration-300  border-base-100 break-words text-left`}
            >
              {title}
            </span>
          </NavLink>
        </div>
      )}
    </Fragment>
  );
}
