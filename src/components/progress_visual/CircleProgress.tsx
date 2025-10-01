import React from "react";

type CProps = {
  percentage: number;
  size: number;
  strokeWidth: number;
  font: string;
};

// Function to create the SVG circle path for the progress
const CircleProgress = ({
  percentage,
  size = 100,
  strokeWidth = 10,
  font,
}: CProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="#696969" // background circle color
        strokeWidth={strokeWidth}
        fill="none"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={"#ba2121"}
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`} // Starts at top
      />
      <text
        x="50%"
        y="50%"
        className="lining-nums font-bold"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize={font}
        fill={"white"}
      >
        {Math.round(percentage)}%
      </text>
    </svg>
  );
};

export default CircleProgress;
