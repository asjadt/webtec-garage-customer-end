import React, { Fragment } from "react";
import ParentSidebarMenuItem from "../components/ParentSidebarMenuItem";
import SidebarMenuItem from "../components/SidebarMenuItem";

export default function SidebarGenerator({ links, isNested }) {
  return links.map((lnk, i) => {
    const { title, link, Icon, show, childrens, isScrollable } = lnk;
    return (
      <Fragment key={i}>
        {childrens?.length > 0 ? (
          // IF HAVE SUBMENU
          <>
            {show && (
              <ParentSidebarMenuItem
                total={links.length}
                show={show}
                link={link}
                i={i}
                title={title}
                Icon={Icon}
                childrens={childrens}
                isNested={isNested}
                isScrollable={isScrollable}
              />
            )}
          </>
        ) : (
          // IF HAVE NOT SUBMENU
          <>
            {show && (
              <SidebarMenuItem
                isLast={links?.length === i + 1}
                show={show}
                link={link}
                i={i}
                title={title}
                Icon={Icon}
                childrens={childrens}
                isNested={isNested}
              />
            )}
          </>
        )}
      </Fragment>
    );
  });
}
