import React from "react";

const Active = ({ data, disabled, loading, handler }) => {
  return (
    <div className={`md:flex justify-center items-center`}>
      <button
        onClick={() => handler(data?.id)}
        disabled={disabled}
        className="w-20 h-7 flex justify-center items-center py-1 rounded-full bg-success text-base-300 "
      >
        {loading ? (
          <span className="loading loading-spinner loading-xs"></span>
        ) : (
          <>
            <p className={`font-medium`}>Active</p>
          </>
        )}
      </button>
    </div>
  );
};

export default Active;
