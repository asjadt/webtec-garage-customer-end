export default function CustomBarChart({
  title = "Today",
  color = "#ff5500",
  value = 0,
  FormateValue = {},
}) {
  return (
    <div className={`rounded-md lg:rounded-full shadow-md flex flex-col lg:flex-row gap-y-1 lg:gap-x-3 items-start lg:items-center justify-center px-2 py-1`}>
      {/* TITLE AND VALUE  */}
      <div className={`flex items-center justify-between lg:justify-normal w-full lg:w-[68%] px-2 md:w-2/5  gap-x-3 font-bold`}>
        <span className={`text-xs md:text-xs`}>{title}</span>
        <span className="text-[10px] md:text-sm">
          <FormateValue />
        </span>
      </div>


      {/* BAR  */}
      <div title={`${value}%`} className={`flex-grow bg-base-100 w-full h-[10px] rounded-full items-center justify-center`}>
        <div
          style={{
            width: `${value}%`,
            height: "10px",
            backgroundColor: color,
            borderRadius: "5px",
          }}
        ></div>
      </div>



    </div>
  );
}
