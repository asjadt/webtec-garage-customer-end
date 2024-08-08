export default function BenefitCard({ data }) {
  return (
    <div
      className={`flex flex-col justify-center items-center gap-x-2  w-full py-2 px-10`}
    >
      <img src={data?.IconImage} className={`w-12 h-12 mt-1`} alt="" />

      <div className={`flex flex-col`}>
        <h3 className={`text-lg text-center font-semibold`}>{data?.title}</h3>
        <p
          className={`text-xs text-center font-nunito font-medium text-gray-400`}
        >
          {data?.description}
        </p>
      </div>
    </div>
  );
}
