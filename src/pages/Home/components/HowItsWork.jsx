import { useState } from "react";
import BenefitCard from "./BenefitCard";
import HowItsWorkCard from "./HowItsWorkCard";
import TextLabelComponent from "../../../components/label/TextLabelComponent";
import Headings from "../../../components/Headings/Headings";

export default function HowItsWork({}) {
  const [benefits, setBenefits] = useState([
    {
      id: 1,
      IconImage: "/assets/Home/Ben1.svg",
      title: "Up to 47% cheaper",
      description: "Versus franchise garages",
    },
    {
      id: 2,
      IconImage: "/assets/Home/Ben2.svg",
      title: "Fully vetted & qualified mechanics",
      description: "Nationwide mechanics",
    },
    {
      id: 3,
      IconImage: "/assets/Home/Ben3.svg",
      title: "1-year warranty",
      description: "On all parts and repairs",
    },
    {
      id: 4,
      IconImage: "/assets/Home/Ben4.svg",
      title: "Same or next-day bookings",
      description: "At your home or office",
    },
  ]);
  const [howItsWorkProcess, setHowItsWorkProcess] = useState([
    {
      id: 1,
      IconImage: "/assets/Home/HowWork1.png",
      title: "Get an instant price quote",
      description:
        "Select your car and location, tell us what's wrong, and we'll give you an instant fixed price in seconds.",
    },
    {
      id: 2,
      IconImage: "/assets/Home/HowWork2.png",
      title: "Pick a date, time & location",
      description:
        "Your mechanic will come to whichever address suits you best, at the date and time of your choice.",
    },
    {
      id: 3,
      IconImage: "/assets/Home/HowWork3.png",
      title: "Mechanic comes to you",
      description:
        "No need to go to the garage - once booked just sit back and relax while the mechanic comes to you.",
    },
  ]);
  return (
    <div className={` mt-60 md:mt-64`}>
      {/* BENEFITS  */}
      <div className={`p-5`}>
        <div className={`flex justify-center items-center mb-5`}>
          <TextLabelComponent
            customClassName={`text-sm font-light`}
            text={"Benefits"}
          />
        </div>
        <Headings level={1} className={`text-3xl text-center mb-10`}>
          Some Of Our Benefits
        </Headings>
        <div className={`w-full flex justify-center items-center`}>
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 w-full gap-5 sm:w-6/7 screen864:w-1/2`}
          >
            {benefits?.map((benefit, i) => (
              <BenefitCard key={i} data={benefit} />
            ))}
          </div>
        </div>
      </div>

      {/* HOW ITS WORKS  */}
      <div className={`p-5`}>
        <div className={`flex justify-center items-center mb-5`}>
          <TextLabelComponent text={"How It Works"} />
        </div>
        <Headings level={1} className={`text-3xl text-center mb-10`}>
          All Done In 3 Simple Steps
        </Headings>
        <div
          className={`grid grid-cols-1 screen864:grid-cols-3 gap-2 screen864:gap-5 w-4/7 md:w-full`}
        >
          {howItsWorkProcess?.map((howItsWork, i) => (
            <HowItsWorkCard key={i} data={howItsWork} />
          ))}
        </div>
      </div>
    </div>
  );
}
