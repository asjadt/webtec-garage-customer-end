import { useEffect, useState } from "react";
import { formatRole } from "../../utils/formatRole";

export default function StatusCapsule({ text }) {
  const [className, setClassName] = useState("");

  useEffect(() => {
    switch (text) {
      // YELLOW
      case "pending":
        setClassName("bg-yellow-100 text-yellow-600 shadow-yellow-500/20");
        break;

      // BLUE
      case "active":
        setClassName("bg-blue-100 text-blue-600 shadow-blue-500/20");
        break;

      // ORANGE
      case "confirmed":
        setClassName("bg-orange-100 text-orange-600 shadow-orange-500/20");
        break;

      // GREEN
      case "converted_to_job":
        setClassName("bg-green-100 text-green-600 shadow-green-500/20");
        break;
      case "completed":
        setClassName("bg-green-200 text-green-700 shadow-green-500/20");
        break;

      // RED
      case "rejected_by_client":
        setClassName("bg-red-50 text-red-500 shadow-red-500/20");
        break;
      case "rejected_by_garage_owner":
        setClassName("bg-red-100 text-red-600 shadow-red-500/20");
        break;
      case "cancelled":
        setClassName("bg-red-200 text-red-700 shadow-red-500/20");
        break;

      default:
        break;
    }
  }, [text]);
  return (
    <div className={`flex items-center justify-start`}>
      <div
        className={`px-5 py-1 rounded-full text-center font-medium shadow-md ${className}`}
      >
        {formatRole(text)}
      </div>
    </div>
  );
}
