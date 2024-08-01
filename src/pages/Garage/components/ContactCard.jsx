export default function ContactCard({ Icon, title, value }) {
  return (
    <div
      className={`w-full justify-center items-center h-[200px] border flex-col flex gap-1 shadow-lg rounded-xl`}
    >
      <Icon size={50} className={`text-primary`} />
      <h3 className={`text-2xl font-bold text-center`}>{title}</h3>
      <p className={`text-sm text-gray-400 font-neutral text-center`}>
        {value}
      </p>
    </div>
  );
}
