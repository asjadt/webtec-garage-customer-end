import React from "react";
import { LuUser2 } from "react-icons/lu";
export default function CustomMultiStepper({ steps = [], currentStep = 1 }) {
  return (
    <ul className="steps w-full ">
      {steps.map((step, index) => (
        <li
          onClick={() => step?.onCLickHandler()}
          role="button"
          key={index}
          data-content={currentStep > step?.serial ? "✓" : null}
          className={`step text-sm ${
            currentStep >= step?.serial ? "step-primary" : "step-custom"
          } `}
        >
          {step?.title}
        </li>
      ))}
    </ul>
  );
}
