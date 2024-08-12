export default function GarageCardLoading() {
  return (
    <div
      className={`md:flex relative h-auto items-center overflow-hidden md:space-x-2 space-y-3 md:space-y-0 border w-full rounded-md p-3  shadow-lg`}
    >
      {/* LOCO  */}
      <div
        className={`w-full relative bg-slate-300 animate-pulse md:w-[250px] h-[150px] md:h-full object-cover rounded-md`}
      >
        <div
          className={`absolute  bg-slate-500 animate-pulse rounded-[5px] shadow-md bottom-4 left-4 md:bottom-4 md:right-4 w-12 h-12`}
        ></div>
      </div>

      <div className={`flex-grow space-y-1  md:px-5 text-sm lg:text-base`}>
        {/* NAME  */}
        <div className={`bg-slate-300 animate-pulse w-1/2 h-7 rounded-md`}>
          {" "}
        </div>
        {/* RATTING  */}
        <div
          className={`bg-slate-300 animate-pulse w-[100px] h-5 rounded-md`}
        ></div>
        {/* TIME  */}
        <div
          className={`bg-slate-300 animate-pulse w-[200px] h-5 rounded-md`}
        ></div>
        {/* ADDRESS  */}
        <div
          className={`bg-slate-300 animate-pulse w-10/12 h-5 rounded-md`}
        ></div>
        <div className={`flex gap-x-1 md:gap-x-3 items-center justify-start`}>
          {/* WIFI  */}
          <div
            className={`bg-slate-300 animate-pulse w-24 h-5 rounded-full`}
          ></div>
          {/* REMOTE  */}
          <div
            className={`bg-slate-300 animate-pulse w-24 h-5 rounded-full`}
          ></div>
        </div>
        {/* BUTTONS  */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-[5px] pt-2 right-0`}
        >
          <div
            className={`bg-slate-300 animate-pulse w-full h-8 rounded-md`}
          ></div>
          <div
            className={`bg-slate-300 animate-pulse w-full h-8 rounded-md`}
          ></div>
          <div
            className={`bg-slate-300 animate-pulse w-full h-8 rounded-md`}
          ></div>
        </div>
      </div>
    </div>
  );
}
