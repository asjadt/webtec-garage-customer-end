// ===================================
// ID: 1094
// ===================================

import * as React from "react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { getRatingQuestion, postClientRatting } from "../../../Apis/ratingapi";
import CustomLoading from "../../../components/CustomLoading";
import CustomToaster from "../../../components/CustomToaster";
import { decryptID } from "../../../utils/encryptAndDecryptID";
import RatingComp from "./RatingComp";
import Swal from "sweetalert2";
import GoBackButton from "../../../components/GoBackButton";

// let val = { comment: "", description: "", rate: 16, values: [] };

export default function Rating() {
  const navigate = useNavigate();
  const { encGarageID, encJobID } = useParams();
  const garageId = decryptID(encGarageID);
  const jobId = decryptID(encJobID);

  const [isLoading, setIsLoading] = useState(true);
  const [questions, setQuestions] = useState([]);

  // THIS STATE IS FOR "values" FIELD
  const [selectedTag, setSelectedTag] = useState([]);

  // THIS STATE IS FOR "comment" FIELD
  const [comment, setComment] = useState("");

  useEffect(() => {
    setIsLoading(true);
    getRatingQuestion(garageId)
      .then((res) => {
        if (res?.length > 0) {
          const publicQuestion = res?.filter((data) => data.is_active == 1);
          setQuestions(
            publicQuestion?.map((question) => {
              return {
                id: question?.id,
                question: question?.question,
                rating: "0",
                stars: question?.stars,
                type: question?.type,
              };
            })
          );
          setIsLoading(false);
        } else {
          setQuestions([]);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        toast.custom((t) => (
          <CustomToaster
            t={t}
            type={"error"}
            text={`ID: #00203 - ${error?.response?.data?.message}`}
            errors={error?.response?.data?.errors}
          />
        ));
        setIsLoading(false);
      });
  }, [garageId]);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const saveRatting = () => {
    setIsSubmitting(true);
    const numberOfOneStar = selectedTag
      ?.map((i) => ({ qId: i?.question_id, rVale: i?.star_id }))
      ?.filter((i) => i?.rVale === 1)?.length;
    const numberOfTwoStar = selectedTag
      ?.map((i) => ({ qId: i?.question_id, rVale: i?.star_id }))
      ?.filter((i) => i?.rVale === 2)?.length;
    const numberOfThreeStar = selectedTag
      ?.map((i) => ({ qId: i?.question_id, rVale: i?.star_id }))
      ?.filter((i) => i?.rVale === 3)?.length;
    const numberOfFourStar = selectedTag
      ?.map((i) => ({ qId: i?.question_id, rVale: i?.star_id }))
      ?.filter((i) => i?.rVale === 4)?.length;
    const numberOfFiveStar = selectedTag
      ?.map((i) => ({ qId: i?.question_id, rVale: i?.star_id }))
      ?.filter((i) => i?.rVale === 5)?.length;
    if (localStorage.getItem("user_data")) {
      const postData = {
        description: "",
        rate:
          1 * numberOfOneStar +
          2 * numberOfTwoStar +
          3 * numberOfThreeStar +
          4 * numberOfFourStar +
          (5 * numberOfFiveStar) /
            (numberOfOneStar +
              numberOfTwoStar +
              numberOfThreeStar +
              numberOfFourStar +
              numberOfFiveStar),
        comment: comment,
        values: selectedTag,
      };

      postClientRatting(jobId, postData)
        .then((res) => {
          setIsSubmitted(true);
          setIsSubmitting(false);

          Swal.fire({
            title: "Success!",
            text: `${res.message}`,
            icon: "success",
            confirmButtonText: "Ok",
            customClass: {
              title: "text-primary",
              container: "",
              popup: "bg-base-300 shadow-xl rounded-xl border border-primary",
              icon: "text-red-500",
              cancelButton: "bg-green-500",
            },
          }).then(() => {
            navigate(`/my-account/my-jobs`);
          });
        })
        .catch((error) => {
          setIsSubmitting(false);
          toast.custom((t) => (
            <CustomToaster
              t={t}
              type={"error"}
              text={`ID: #00203 - ${error?.response?.data?.message}`}
              errors={error?.response?.data?.errors}
            />
          ));
        });
    } else {
      setIsSubmitting(false);

      navigate(`/my-account`);
    }
  };

  const handleSubmitRatting = (e) => {
    if (
      Array.from(new Set(selectedTag?.map((i) => i?.question_id)))?.length ===
      questions?.length
    ) {
      saveRatting();
    } else {
      Swal.fire({
        title: "Error!",
        text: "Please select at lest 1 answer of each question.",
        icon: "error",
        confirmButtonText: "Ok",
        customClass: {
          title: "text-primary",
          container: "",
          popup: "bg-base-300 shadow-xl rounded-xl border border-primary",
          icon: "text-red-500",
          cancelButton: "bg-green-500",
        },
      });
    }
  };

  return (
    <div>
      {isLoading ? (
        <CustomLoading />
      ) : (
        <div className={`h-[calc(100vh-130px)] py-10`}>
          <>
            {/* IF NO RATING FOUND  */}
            {!(questions?.length > 0) ? (
              <div
                className={`relative flex flex-col gap-5 justify-center items-center w-full h-[500px]`}
              >
                <h2 className="text-2xl text-center">No Question Available</h2>
                <GoBackButton />
              </div>
            ) : (
              <div className=" items-center flex w-100 justify-center flex-col">
                <div
                  className={`max-w-[600px] px-5 rounded-xl border border-primary shadow-lg mb-10`}
                >
                  <RatingComp
                    handleSubmitRatting={handleSubmitRatting}
                    isSubmitting={isSubmitting}
                    questions={questions}
                    setSelectedTag={setSelectedTag}
                    selectedTag={selectedTag}
                    comment={comment}
                    setComment={setComment}
                  />
                </div>
              </div>
            )}
          </>
        </div>
      )}
    </div>
  );
}
