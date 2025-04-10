import React from "react";

export function Container({ className, children, ...props }) {
  return (
    <div
      className={`mx-auto w-full max-w-7xl px-5 md:px-10 ${className || ""}`}
      {...props}
    >
      {children}
    </div>
  );
} 