import React from "react";

const DeActive = ({ data, loading, handler, disabled }) => {
  return (
    <div className={`md:flex justify-center items-center`}>
      <button
        onClick={() => handler(data?.id)}
        disabled={disabled}
        className={`w-20 h-7 flex justify-center items-center py-1 rounded-full bg-red-500 text-base-300 `}
      >
        {loading ? (
          <span className="loading loading-spinner loading-xs"></span>
        ) : (
          <>
            <p className={`font-medium`}>Deactive</p>
          </>
        )}
      </button>
    </div>
  );
};

export default DeActive;
