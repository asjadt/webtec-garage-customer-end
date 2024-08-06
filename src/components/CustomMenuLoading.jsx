export default function CustomMenuLoading() {
  return (
    <div className={` h-full w-full px-2 flex flex-col gap-y-3 py-2`}>
      <div className={`w-full flex gap-x-2`}>
        <div
          className={`h-10 w-10 rounded-md bg-slate-200 animate-pulse`}
        ></div>
        <div
          className={`h-10 flex-1 rounded-md bg-slate-200 animate-pulse`}
        ></div>
      </div>
      <div className={`w-full flex gap-x-2`}>
        <div
          className={`h-10 w-10 rounded-md bg-slate-200 animate-pulse`}
        ></div>
        <div
          className={`h-10 flex-1 rounded-md bg-slate-200 animate-pulse`}
        ></div>
      </div>
      <div className={`w-full flex gap-x-2`}>
        <div
          className={`h-10 w-10 rounded-md bg-slate-200 animate-pulse`}
        ></div>
        <div
          className={`h-10 flex-1 rounded-md bg-slate-200 animate-pulse`}
        ></div>
      </div>
      <div className={`w-full flex gap-x-2`}>
        <div
          className={`h-10 w-10 rounded-md bg-slate-200 animate-pulse`}
        ></div>
        <div
          className={`h-10 flex-1 rounded-md bg-slate-200 animate-pulse`}
        ></div>
      </div>
    </div>
  );
}
