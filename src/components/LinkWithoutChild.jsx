import { NavLink } from "react-router-dom";

export default function LinkWithoutChild({
  link,
  i,
  title,
  Icon,
  children,
  isNested,
}) {
  return (
    <li className={``}>
      <NavLink to={link} className={`py-3 text-primary `}>
        {/* <Icon /> */}
        {title}
      </NavLink>
    </li>
  );
}
