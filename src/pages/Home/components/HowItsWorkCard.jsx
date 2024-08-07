export default function HowItsWorkCard({ data }) {
  return (
    <div
      className={`flex flex-col gap-5 justify-center items-center  w-full py-5 screen724:px-10 sm:px-5 rounded-md  `}
    >
      <img src={data?.IconImage} className={`w-auto h-20 mt-1`} alt="" />

      <div className={`flex flex-col gap-3`}>
        <h3 className={`text-2xl screen864:text-2xl text-center font-semibold`}>
          {data?.title}
        </h3>
        <p
          className={`sm:px-20 screen864:px-0 text-md screen864:text-lg text-center font-nunito font-medium text-gray-400`}
        >
          {data?.description}
        </p>
      </div>
    </div>
  );
}
