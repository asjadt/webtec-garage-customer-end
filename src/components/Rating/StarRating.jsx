import React from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { FaRegStarHalfStroke, FaStarHalf } from "react-icons/fa6";

const StarRating = ({ rating, maxRating = 5 }) => {
  const fullStars = Math.floor(rating); // Full stars
  const halfStar = rating % 1 !== 0; // Check if there is a half star
  const emptyStars = maxRating - fullStars - (halfStar ? 1 : 0); // Remaining empty stars

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {/* Full stars */}
      {Array.from({ length: fullStars }, (_, index) => (
        <FaStar key={index} className={`text-[#FF8000] mr-1`} />
      ))}

      {/* Half star */}
      {halfStar && <FaRegStarHalfStroke className={`text-[#FF8000] mr-1`} />}

      {/* Empty stars */}
      {Array.from({ length: emptyStars }, (_, index) => (
        <FaRegStar key={index} className={`text-[#c4c4c4] mr-1`} />
      ))}
    </div>
  );
};

export default StarRating;
