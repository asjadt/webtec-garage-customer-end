import { default as React, useEffect, useRef, useState } from "react";
import { BsArrowDown } from "react-icons/bs";
import RatingRow from "./RatingRow";
import ButtonLoading from "../../../components/ButtonLoading";
export default function RatingComp({
  questions,

  selectedTag,
  setSelectedTag,

  comment,
  setComment,

  handleSubmitRatting,
  isSubmitting,
}) {
  const [isAnythingElse, setIsAnythingElse] = useState(false);

  return (
    <div className={`py-10`}>
      <div className="w-100">
        <h1 className="text-center font-medium text-xl md:text-2xl text-primary">
          How would you rate us for the following:
        </h1>

        {questions?.map((question, i) => (
          <div key={i}>
            <p className="text-center text-gray-400 fs-5 my-2 my-md-2">
              {i + 1}. {question?.question}
            </p>
            <div className="py-2 ">
              <RatingRow
                key={i}
                setSelectedTag={setSelectedTag}
                question={question}
                selectedTag={selectedTag}
              />
            </div>
          </div>
        ))}

        <div className="w-full">
          {/* REMARK ACTIVE BUTTON  */}
          {!isAnythingElse && (
            <button
              onClick={() => {
                setIsAnythingElse(!isAnythingElse);
              }}
              className={`text-primary text-center w-full`}
            >
              Anything to add?
            </button>
          )}

          {/* REMARK  */}
          {isAnythingElse && (
            <div className={`flex flex-col`}>
              <label className={`label text-sm`} htmlFor="remarks">
                Remarks (optional)
              </label>
              <textarea
                onChange={(e) => setComment(e.target.value)}
                className={`input h-40 pt-5`}
                id="remarks"
                type="text"
                placeholder="remarks"
                rows={30}
              />
            </div>
          )}

          {/* SUBMIT BUTTON  */}
          <div className={` mt-5 flex justify-center items-center`}>
            <button
              disabled={isSubmitting}
              onClick={handleSubmitRatting}
              className={`btn w-40 btn-primary`}
            >
              {isSubmitting ? <ButtonLoading /> : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
