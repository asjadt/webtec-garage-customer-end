// ===========================================
// #00137
// ===========================================
import React from "react";

export default function CustomPageLoading({ h = "h-[100vh]" }) {
  return (
    <div
      className={`${h} w-full flex justify-center items-center bg-transparent`}
    >
      <button
        className={`bg-primary`}
        style={{
          border: "none",
          color: "white",
          padding: " 2rem 4rem",
          fontSize: "3rem",
          borderRadius: "100px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transition: "transform 0.2s",
          minHeight: "3.5rem",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: ".25rem",
          }}
          class="button-loader"
        >
          <div
            style={{
              width: ".8rem",
              height: ".8rem",
              backgroundColor: "white",
              borderRadius: "50%",
              animation: "1.2s infinite ease-in-out pageLoad",
              animationDelay: "-0.32s",
            }}
          ></div>
          <div
            style={{
              width: ".8rem",
              height: ".8rem",
              backgroundColor: "white",
              borderRadius: "50%",
              animation: "1.2s infinite ease-in-out pageLoad",
              animationDelay: "-0.16s",
            }}
          ></div>
          <div
            style={{
              width: ".8rem",
              height: ".8rem",
              backgroundColor: "white",
              borderRadius: "50%",
              animation: "1.2s infinite ease-in-out pageLoad",
              animationDelay: "-0.32s",
            }}
          ></div>
        </div>
      </button>
    </div>
  );
}
