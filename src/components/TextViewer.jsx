export default function TextViewer({ handleClosePopup, text }) {
  console.log({ text });
  return (
    <div className={`w-full mt-0 py-5`}>
      <div
        className={`min-h-[500px] break-words bg-base-200 p-5 rounded-xl overflow-y-auto`}
      >
        {text}
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
