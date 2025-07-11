import React from "react";

// types
interface SvgWrapperProps {
  children: React.ReactNode;
}

export default function SvgWrapper({ children }: SvgWrapperProps) {
  return (
    <svg
      width="90"
      height="90"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      {children}
    </svg>
  );
}
