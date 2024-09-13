export default function ContactCard({ Icon, title, value, dataAuto }) {
  return (
    <div
      data-auto={`container-${dataAuto}`}
      className={`w-full justify-center items-center h-[200px] md:h-[115px] border flex-col flex gap-1 shadow-lg rounded-xl`}
    >
      <Icon className={`text-primary text-5xl md:text-4xl mt-1`} />
      <h3
        data-auto={`title-${dataAuto}`}
        className={`text-xl font-bold text-center`}
      >
        {title}
      </h3>
      <p
        data-auto={`value-${dataAuto}`}
        className={`text-sm text-gray-400 font-neutral text-center mb-1`}
      >
        {value}
      </p>
    </div>
  );
}
