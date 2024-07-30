export default function Stepper({ currentStep, steps }) {
  return (
    <div className="w-full flex justify-center my-4 pt-5 transition-all duration-200 bg-black">
      {steps.map((step, index) => (
        <div
          key={index}
          className={`flex-1 left-1/2 -translate-x-[110%] relative`}
        >
          <div
            className={`step  ${
              currentStep >= index + 1 ? "step-primary" : ""
            }`}
          >
            <div className="step-content">
              <div className="z-20 step-title inline-block relative">
                <div
                  className={`duration-200 border-4 absolute left-1/2 -translate-x-1/2 step-number w-8 h-8 rounded-full flex font-medium justify-center items-center  ${
                    currentStep >= index + 1
                      ? `${
                          currentStep === index + 1
                            ? "bg-primary text-base-300 "
                            : "bg-green-500 text-base-300 "
                        }`
                      : `bg-base-100`
                  } `}
                >
                  {index + 1}
                </div>
                <span className={`pt-10 block`}>{step}</span>
              </div>
            </div>
          </div>

          {index < steps.length - 1 && (
            <div
              className={`z-10 w-full h-2 absolute left-8 top-3 duration-200 ${
                currentStep > index + 1 ? "bg-green-500" : "bg-gray-200"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
