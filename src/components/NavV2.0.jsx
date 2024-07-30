import LinkWithChild from "./LinkWithChild";
import LinkWithoutChild from "./LinkWithoutChild";

export default function Sidebar2({ props }) {
  return (
    <ul className="menu bg-base-200 w-56 rounded-box">
      <LinkWithoutChild />
      <LinkWithChild />
      <LinkWithoutChild />
    </ul>
  );
}
