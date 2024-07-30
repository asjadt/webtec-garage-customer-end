import { convertTo12HourFormat } from "../utils/convertTo12HourFormat";

export default function TimingViewer({ handleClosePopup, data }) {
  return (
    <div className={`w-full py-5`}>
      <div
        className={`min-h-[500px] flex flex-col w-full p-5 rounded-xl overflow-y-auto`}
      >
        <div
          className={`flex gap-2 items-center w-full bg-base-100 p-5 font-bold`}
        >
          <div className={`w-[10%]`}>#</div>
          <div className={`w-[45%]`}>Start At</div>
          <div className={`w-[45%]`}>End At</div>
        </div>

        {data.map((timing, index) => (
          <div
            key={index}
            className={`flex gap-2 items-center p-5 border-y hover:bg-base-200 cursor-pointer ${
              index % 2 ? "bg-base-100" : "bg-base-300"
            }`}
          >
            <div className={`w-[10%]`}>{index + 1}</div>
            <div className={`w-[45%]`}>
              {convertTo12HourFormat(timing?.in_time)}
            </div>
            <div className={`w-[45%]`}>
              {convertTo12HourFormat(timing?.out_time)}
            </div>
          </div>
        ))}
      </div>
      {/* SUBMIT BUTTON  */}
      <div className="flex flex-col md:flex-row w-full justify-center md:justify-end items-center mt-5 gap-2">
        <button
          onClick={handleClosePopup}
          className="btn w-full md:btn-wide btn-primary"
        >
          Close
        </button>
      </div>
    </div>
  );
}
