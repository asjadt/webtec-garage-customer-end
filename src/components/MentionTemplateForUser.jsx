import { formatRole } from "../utils/formatRole";

export default function MentionTemplateForUser({ user }) {
  return (
    <div
      className={`bg-base-300 text-sm flex gap-2 items-center py-1 hover:bg-primary-content`}
    >
      <div></div>
      <div className={`flex flex-col`}>
        <span className={`text-primary font-bold`}>{user?.display}</span>
        <span className={`text-xs text-gray-400`}>
          {/* {formatRole(`${user?.first_Name}`)} */}
        </span>
      </div>
    </div>
  );
}
