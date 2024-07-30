import { useLocation } from "react-router-dom";
import Sidebar2 from "../layout/SideBar/Sidebar2";
import LinkWithoutChild from "./LinkWithoutChild";

export default function LinkWithChild({
  total,
  show,
  link,
  i,
  title,
  Icon,
  children,
  isNested,
}) {
  const location = useLocation();
  return (
    <li className={`my-1`}>
      <details className={``}>
        <summary
          className={`py-3 bg-base-300 text-primary ${
            location.pathname.split("/")[1] === link.split("/")[1]
              ? "text-primary bg-gradient-to-r from-primary-content to-transparent"
              : "text-accent"
          }`}
        >
          <Icon /> {title}
        </summary>
        <ul className={`menu-vertical`}>
          <Sidebar2 links={children} isNested={true} />
        </ul>
      </details>
    </li>
  );
}
