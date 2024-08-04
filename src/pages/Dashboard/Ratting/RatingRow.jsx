import React, { useEffect, useState } from "react";
import {
  FaFaceFrown,
  FaFaceMeh,
  FaRegFaceFrown,
  FaRegFaceGrinBeam,
  FaRegFaceGrinHearts,
  FaRegFaceMeh,
  FaRegFaceSmile,
  FaStar,
} from "react-icons/fa6";
import { GoHeartFill } from "react-icons/go";

export default function RatingRow({ question, setSelectedTag, selectedTag }) {
  const [ratingValue, setRatingValue] = useState(null);
  // SELECT TAG
  const handleSelectTag = (question_id, tag_id, star_value) => {
    selectedTag?.filter(
      (i) => i?.tag_id === tag_id && i?.question_id === question_id
    ).length > 0
      ? setSelectedTag(
          selectedTag?.filter(
            (i) => i?.tag_id !== tag_id || i?.question_id !== question_id
          )
        )
      : setSelectedTag([
          ...selectedTag,
          {
            question_id: question_id,
            tag_id: tag_id,
            star_id: star_value,
          },
        ]);
  };
  // REMOVE TAG
  const removeSelectedItem = (rV, qId) => {
    setSelectedTag(selectedTag.filter((i) => i.question_id !== qId));
  };

  const handleInputChange = ({ event, question, value }) => {
    // IF TYPE RADIO
    if (event.target.type === "radio") {
      // IF CHECKED
      if (event.target.checked) {
        // SET VALUE
        setRatingValue(parseInt(event.target.value));

        // WHEN RATING IS CHANGED THE SELECTED TAG IS RESETTING
        removeSelectedItem(value, question?.id);
      }
      // IF UNCHECKED
      else {
        // CLEAR VALUE
        setRatingValue(null);

        // WHEN RATING IS CHANGED THE SELECTED TAG IS RESETTING
        removeSelectedItem(value, question?.id);
      }
    }
    // IF TYPE RANGE
    else {
      // SET VALUE
      setRatingValue(
        event.target.value === 0 ? null : parseInt(event.target.value)
      );

      // WHEN RATING IS CHANGED THE SELECTED TAG IS RESETTING
      removeSelectedItem(value, question?.id);
    }
  };

  return (
    <div className={``}>
      {/* STAR TYPE  */}
      {question?.type === "star" && (
        <div className={`w-full flex justify-center items-center`}>
          <div className={`max-w-[300px]`}>
            <div className="rating gap-1 rating-md md:rating-lg">
              <span>
                <label htmlFor={`rating-star-1`}>
                  <FaStar
                    className={`text-2xl cursor-pointer md:text-4xl text-yellow-400 ${
                      ratingValue >= 1 ? "opacity-100" : "opacity-20"
                    }`}
                  />
                </label>
                <input
                  onChange={(e) =>
                    handleInputChange({
                      event: e,
                      question: question,
                      value: 1,
                    })
                  }
                  type="radio"
                  id={`rating-star-1`}
                  name={`rating-${question?.id}`}
                  value={1}
                  className="mask mask-heart bg-red-400 hidden"
                />
              </span>

              <span>
                <label htmlFor={`rating-star-2`}>
                  <FaStar
                    className={`text-2xl cursor-pointer md:text-4xl text-yellow-400 ${
                      ratingValue >= 2 ? "opacity-100" : "opacity-20"
                    }`}
                  />
                </label>
                <input
                  onChange={(e) =>
                    handleInputChange({
                      event: e,
                      question: question,
                      value: 1,
                    })
                  }
                  id={`rating-star-2`}
                  type="radio"
                  name={`rating-${question?.id}`}
                  value={2}
                  className="mask mask-heart bg-orange-400 hidden"
                />
              </span>

              <span>
                <label htmlFor={`rating-star-3`}>
                  <FaStar
                    className={`text-2xl cursor-pointer md:text-4xl text-yellow-400 ${
                      ratingValue >= 3 ? "opacity-100" : "opacity-20"
                    }`}
                  />
                </label>
                <input
                  onChange={(e) =>
                    handleInputChange({
                      event: e,
                      question: question,
                      value: 1,
                    })
                  }
                  id={`rating-star-3`}
                  type="radio"
                  name={`rating-${question?.id}`}
                  value={3}
                  className="mask mask-heart bg-yellow-400 hidden"
                />
              </span>

              <span>
                <label htmlFor={`rating-star-4`}>
                  <FaStar
                    className={`text-2xl cursor-pointer md:text-4xl text-yellow-400 ${
                      ratingValue >= 4 ? "opacity-100" : "opacity-20"
                    }`}
                  />
                </label>
                <input
                  onChange={(e) =>
                    handleInputChange({
                      event: e,
                      question: question,
                      value: 1,
                    })
                  }
                  id={`rating-star-4`}
                  type="radio"
                  name={`rating-${question?.id}`}
                  value={4}
                  className="mask mask-heart bg-lime-400 hidden"
                />
              </span>

              <span>
                <label htmlFor={`rating-star-5`}>
                  <FaStar
                    className={`text-2xl cursor-pointer md:text-4xl text-yellow-400 ${
                      ratingValue >= 5 ? "opacity-100" : "opacity-20"
                    }`}
                  />
                </label>
                <input
                  onChange={(e) =>
                    handleInputChange({
                      event: e,
                      question: question,
                      value: 1,
                    })
                  }
                  id={`rating-star-5`}
                  type="radio"
                  name={`rating-${question?.id}`}
                  value={5}
                  className="mask mask-heart bg-green-400 hidden"
                />
              </span>
            </div>
          </div>
        </div>
      )}

      {/* HEART TYPE  */}
      {question?.type === "heart" && (
        <div className={`w-full flex justify-center items-center`}>
          <div className="rating gap-1 rating-md md:rating-lg">
            <span>
              <label htmlFor={`rating-heart-1`}>
                <GoHeartFill
                  className={`text-2xl cursor-pointer md:text-4xl text-red-400 ${
                    ratingValue >= 1 ? "opacity-100" : "opacity-20"
                  }`}
                />
              </label>
              <input
                onChange={(e) =>
                  handleInputChange({
                    event: e,
                    question: question,
                    value: 1,
                  })
                }
                type="radio"
                id={`rating-heart-1`}
                name={`rating-${question?.id}`}
                value={1}
                className="mask mask-heart bg-red-400 hidden"
              />
            </span>

            <span>
              <label htmlFor={`rating-heart-2`}>
                <GoHeartFill
                  className={`text-2xl cursor-pointer md:text-4xl text-orange-400 ${
                    ratingValue >= 2 ? "opacity-100" : "opacity-20"
                  }`}
                />
              </label>
              <input
                onChange={(e) =>
                  handleInputChange({
                    event: e,
                    question: question,
                    value: 1,
                  })
                }
                id={`rating-heart-2`}
                type="radio"
                name={`rating-${question?.id}`}
                value={2}
                className="mask mask-heart bg-orange-400 hidden"
              />
            </span>

            <span>
              <label htmlFor={`rating-heart-3`}>
                <GoHeartFill
                  className={`text-2xl cursor-pointer md:text-4xl text-yellow-400 ${
                    ratingValue >= 3 ? "opacity-100" : "opacity-20"
                  }`}
                />
              </label>
              <input
                onChange={(e) =>
                  handleInputChange({
                    event: e,
                    question: question,
                    value: 1,
                  })
                }
                id={`rating-heart-3`}
                type="radio"
                name={`rating-${question?.id}`}
                value={3}
                className="mask mask-heart bg-yellow-400 hidden"
              />
            </span>

            <span>
              <label htmlFor={`rating-heart-4`}>
                <GoHeartFill
                  className={`text-2xl cursor-pointer md:text-4xl text-lime-400 ${
                    ratingValue >= 4 ? "opacity-100" : "opacity-20"
                  }`}
                />
              </label>
              <input
                onChange={(e) =>
                  handleInputChange({
                    event: e,
                    question: question,
                    value: 1,
                  })
                }
                id={`rating-heart-4`}
                type="radio"
                name={`rating-${question?.id}`}
                value={4}
                className="mask mask-heart bg-lime-400 hidden"
              />
            </span>

            <span>
              <label htmlFor={`rating-heart-5`}>
                <GoHeartFill
                  className={`text-2xl cursor-pointer md:text-4xl text-green-400 ${
                    ratingValue >= 5 ? "opacity-100" : "opacity-20"
                  }`}
                />
              </label>
              <input
                onChange={(e) =>
                  handleInputChange({
                    event: e,
                    question: question,
                    value: 1,
                  })
                }
                id={`rating-heart-5`}
                type="radio"
                name={`rating-${question?.id}`}
                value={5}
                className="mask mask-heart bg-green-400 hidden"
              />
            </span>
          </div>
        </div>
      )}

      {/* EMOJI  */}
      {question?.type !== "star" &&
        question?.type !== "heart" &&
        question?.type === "emoji" && (
          <div className={`w-full flex justify-center items-center`}>
            <div className="rating gap-1 rating-md md:rating-lg">
              <span>
                <label htmlFor={`rating-1`}>
                  <FaRegFaceFrown
                    className={`text-2xl cursor-pointer md:text-4xl text-red-400 ${
                      ratingValue >= 1 ? "opacity-100" : "opacity-20"
                    }`}
                  />
                </label>
                <input
                  onChange={(e) =>
                    handleInputChange({
                      event: e,
                      question: question,
                      value: 1,
                    })
                  }
                  type="radio"
                  id={`rating-1`}
                  name={`rating-${question?.id}`}
                  value={1}
                  className="mask mask-heart bg-red-400 hidden"
                />
              </span>

              <span>
                <label htmlFor={`rating-2`}>
                  <FaRegFaceMeh
                    className={`text-2xl cursor-pointer md:text-4xl text-orange-400 ${
                      ratingValue >= 2 ? "opacity-100" : "opacity-20"
                    }`}
                  />
                </label>
                <input
                  onChange={(e) =>
                    handleInputChange({
                      event: e,
                      question: question,
                      value: 1,
                    })
                  }
                  id={`rating-2`}
                  type="radio"
                  name={`rating-${question?.id}`}
                  value={2}
                  className="mask mask-heart bg-orange-400 hidden"
                />
              </span>

              <span>
                <label htmlFor={`rating-3`}>
                  <FaRegFaceSmile
                    className={`text-2xl cursor-pointer md:text-4xl text-yellow-400 ${
                      ratingValue >= 3 ? "opacity-100" : "opacity-20"
                    }`}
                  />
                </label>
                <input
                  onChange={(e) =>
                    handleInputChange({
                      event: e,
                      question: question,
                      value: 1,
                    })
                  }
                  id={`rating-3`}
                  type="radio"
                  name={`rating-${question?.id}`}
                  value={3}
                  className="mask mask-heart bg-yellow-400 hidden"
                />
              </span>

              <span>
                <label htmlFor={`rating-4`}>
                  <FaRegFaceGrinBeam
                    className={`text-2xl cursor-pointer md:text-4xl text-lime-400 ${
                      ratingValue >= 4 ? "opacity-100" : "opacity-20"
                    }`}
                  />
                </label>
                <input
                  onChange={(e) =>
                    handleInputChange({
                      event: e,
                      question: question,
                      value: 1,
                    })
                  }
                  id={`rating-4`}
                  type="radio"
                  name={`rating-${question?.id}`}
                  value={4}
                  className="mask mask-heart bg-lime-400 hidden"
                />
              </span>

              <span>
                <label htmlFor={`rating-5`}>
                  <FaRegFaceGrinHearts
                    className={`text-2xl cursor-pointer md:text-4xl text-green-400 ${
                      ratingValue >= 5 ? "opacity-100" : "opacity-20"
                    }`}
                  />
                </label>
                <input
                  onChange={(e) =>
                    handleInputChange({
                      event: e,
                      question: question,
                      value: 1,
                    })
                  }
                  id={`rating-5`}
                  type="radio"
                  name={`rating-${question?.id}`}
                  value={5}
                  className="mask mask-heart bg-green-400 hidden"
                />
              </span>
            </div>
          </div>
        )}

      {/* NUMBER SLIDER  */}
      {question?.type !== "star" &&
        question?.type !== "heart" &&
        question?.type === "numbers" && (
          <div className={`w-full flex flex-col justify-center items-center`}>
            <div className={`w-52`}>
              <input
                onChange={(e) =>
                  handleInputChange({
                    event: e,
                    question: question,
                    value: 1,
                  })
                }
                type="range"
                min={0}
                max={5}
                defaultValue={0}
                className="range range-primary"
                step={1}
              />
              <div className="flex w-full justify-between px-2 text-xs">
                <div className={`inline-flex flex-col`}>
                  <span>|</span>
                  <span>0</span>
                </div>
                <div className={`inline-flex flex-col`}>
                  <span>|</span>
                  <span>1</span>
                </div>
                <div className={`inline-flex flex-col`}>
                  <span>|</span>
                  <span>2</span>
                </div>
                <div className={`inline-flex flex-col`}>
                  <span>|</span>
                  <span>3</span>
                </div>
                <div className={`inline-flex flex-col`}>
                  <span>|</span>
                  <span>4</span>
                </div>
                <div className={`inline-flex flex-col`}>
                  <span>|</span>
                  <span>5</span>
                </div>
              </div>
            </div>
          </div>
        )}

      {/* TAG SELECTION  */}
      {ratingValue !== null && (
        <div className={`w-full justify-center flex gap-2 mt-3`}>
          {question?.stars
            ?.find((star) => star?.value === ratingValue)
            ?.tags?.map((tag, i) => (
              // ================ TAGS ==============
              <button
                key={i}
                onClick={() =>
                  handleSelectTag(question?.id, tag?.id, ratingValue)
                }
                className={`cursor-pointer bg-black border border-primary text-sm  px-3 py-2 rounded-md`}
                style={{
                  background: `${
                    selectedTag?.filter(
                      (i) =>
                        i?.tag_id === tag?.id &&
                        i?.question_id === question?.id &&
                        i?.star_id === ratingValue
                    ).length > 0
                      ? "#ff5a3c"
                      : "#fff"
                  }`,
                  color: `${
                    selectedTag?.filter(
                      (i) =>
                        i?.tag_id === tag?.id &&
                        i?.question_id === question?.id &&
                        i?.star_id === ratingValue
                    ).length > 0
                      ? "#ffffff"
                      : "#ff5a3c"
                  }`,
                }}
              >
                {tag?.tag}
              </button>
            ))}
        </div>
      )}
    </div>
  );
}
