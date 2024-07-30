import React from "react";
import { RadialBar, RadialBarChart } from "recharts";

const Rechart = ({ data }) => {
  console.log({ data });
  return (
    <div
      className={` w-full h-full shadow-md rounded-xl flex flex-col lg:flex-row gap-3 justify-center items-center py-3 sm:py-0`}
    >
      <RadialBarChart
        width={200}
        height={200}
        cx="50%"
        cy="50%"
        innerRadius="20%"
        outerRadius="110%"
        barSize={12}
        label={{ position: "insideStart", fill: "#fff" }}
        data={data}
      >
        <RadialBar background clockWise dataKey="uv" />
      </RadialBarChart>
      {/* Legend */}
      <div className={`grid grid-cols-2 gap-3 lg:block`}>
        {data?.map((type, index) => (
          <div className="flex items-center" key={index}>
            <div
              style={{ backgroundColor: type.fill }}
              className={`h-4 w-4 mr-2`}
            ></div>
            <div style={{ color: type.fill }}>{type.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rechart;
