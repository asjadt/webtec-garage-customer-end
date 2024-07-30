import LinkWithChild from "../../components/LinkWithChild";
import LinkWithoutChild from "../../components/LinkWithoutChild";

export default function Sidebar2({ links, isNested }) {
  return links.map((lnk, i) => {
    const { title, link, Icon, show, childrens, isScrollable } = lnk;

    if (childrens?.length > 0) {
      return (
        <>
          {show && (
            <LinkWithChild
              total={links.length}
              key={i}
              show={show}
              link={link}
              i={i}
              title={title}
              Icon={Icon}
              children={childrens}
              isNested={isNested}
            />
          )}
        </>
      );
    } else {
      return (
        <ul>
          {show && (
            <LinkWithoutChild
              isLast={links?.length === i + 1}
              key={i}
              show={show}
              link={link}
              i={i}
              title={title}
              Icon={Icon}
              children={childrens}
              isNested={isNested}
            />
          )}
        </ul>
      );
    }
  });
}
