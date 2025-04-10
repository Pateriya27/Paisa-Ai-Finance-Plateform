import React from "react";

export default function IndianFlag({ className }) {
  return (
    <svg
      className={className}
      width="24"
      height="16"
      viewBox="0 0 24 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Saffron (top) */}
      <rect width="24" height="5.33" fill="#FF9933" />
      
      {/* White (middle) */}
      <rect y="5.33" width="24" height="5.33" fill="#FFFFFF" />
      
      {/* Green (bottom) */}
      <rect y="10.66" width="24" height="5.33" fill="#138808" />
      
      {/* Ashoka Chakra */}
      <circle cx="12" cy="8" r="2" fill="#000080" />
      
      {/* 24 spokes */}
      {Array.from({ length: 24 }).map((_, i) => (
        <line
          key={i}
          x1="12"
          y1="8"
          x2={12 + 2 * Math.cos((i * 15 * Math.PI) / 180)}
          y2={8 + 2 * Math.sin((i * 15 * Math.PI) / 180)}
          stroke="#000080"
          strokeWidth="0.5"
        />
      ))}
    </svg>
  );
} 