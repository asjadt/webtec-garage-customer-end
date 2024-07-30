export default function CustomStepper({
  activeStep = 1,
  steps = [
    { id: 1, name: "Employee Details" },
    { id: 2, name: "Emergency Contacts" },
    { id: 3, name: "Recruitment Details" },
    { id: 4, name: "Immigration Details" },
  ],
  onChange = (e) => {
    return e;
  },
}) {
  return (
    <div className={`w-full flex items-center bg-slate-100`}>
      {steps.map((step, index) => (
        <div
          style={{
            clipPath:
              index === 0
                ? "polygon(75% 0%, 100% 50%, 75% 100%, 0% 100%, 0% 100%, 0% 0%)"
                : steps?.length > index + 1
                ? "polygon(75% 0%, 100% 50%, 75% 100%, 0% 100%, 25% 50%, 0% 0%)"
                : "polygon(100% 0%, 100% 100%, 75% 100%, 0% 100%, 25% 50%, 0% 0%)",
            width: `calc(100%/${steps?.length})`,
          }}
          className={`flex h-16 justify-center items-center bg-red-500 `}
          key={step?.id}
        >
          <span>{step?.name}</span>
        </div>
      ))}
    </div>
  );
}
