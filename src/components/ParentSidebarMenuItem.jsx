import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import SidebarGenerator from "../utils/SidebarGenerator";
import { FragmentOutsideClickHandler } from "./FragmentOutsideClickHandler";
import { useNav } from "../context/NavContext";
export default function ParentSidebarMenuItem({
  total,
  show,
  link,
  i,
  title,
  Icon,
  childrens,
  isNested,
  isScrollable,
}) {
  const { isNavOpen, setIsNavOpen } = useNav();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navDropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (
      navDropdownRef.current &&
      !navDropdownRef.current.contains(event.target)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [isFirstime, setIsFirstTime] = useState(true);
  useEffect(() => {
    if (isFirstime) {
      setIsFirstTime(false);
    }
  }, [location.pathname]);
  return (
    <FragmentOutsideClickHandler
      className={`w-full block `}
      onOutsideClick={() => {
        setIsOpen(false);
      }}
      key={i}
    >
      <div className="collapse collapse-arrow rounded-none bg-base-00 ">
        <input
          data-cy={`every-page-input-parent-sidebar-menu-item`}
          type="checkbox"
          name="my-accordion-2"
        />
        <div
          data-cy={`every-page-${title}-dropdown-parent-sidebar-menu-item`}
          className={`collapse-title text-xl pt-7 w-full dropdown-open font-bold ${
            location.pathname.split("/")[1] === link.split("/")[1]
              ? " text-base-300 text-opacity-100 bg-primary "
              : "text-primary"
          } py-3 w-full transition-all duration-150 flex justify-start px-5 items-center gap-4`}
        >
          <span className={`inline-block -mt-5`}>
            <Icon className={`Icon text-2xl`} />
          </span>

          <span
            className={`text-sm text-left duration-300 border-base-100 -mt-5 break-words  `}
          >
            {title}
          </span>
        </div>

        <div className="collapse-content bg-base-100 px-0 pb-0 submenuContainer mb-0">
          <SidebarGenerator links={childrens} isNested={true} />
        </div>
      </div>
    </FragmentOutsideClickHandler>
  );
}
