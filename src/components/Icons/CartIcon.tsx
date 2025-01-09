"use client";
import { useState } from "react";

export function CartIcon({ onClick }: { onClick: () => void }) {
  const [isHover, setIsHover] = useState(false);
  return (
    <svg
      onClick={onClick}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      width="44"
      height="44"
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`rounded-full transition-all duration-300 ease-in-out cursor-pointer ${
        isHover ? "bg-neutral_5" : ""
      }`}
    >
      <rect
        x="0.5"
        y="0.5"
        width="43"
        height="43"
        rx="21.5"
        className={`${
          !isHover ? "stroke-neutral_6" : "stroke-neutral_8"
        } transition-all duration-300 ease-in-out`}
      />
      <path
        d="M25.3332 17.0003C25.3332 15.1594 23.8408 13.667 21.9999 13.667C20.1589 13.667 18.6666 15.1594 18.6666 17.0003M17.683 30.3337H26.3168C28.4039 30.3337 29.9777 28.4374 29.593 26.386L28.343 19.7194C28.0474 18.1428 26.6709 17.0003 25.0668 17.0003H18.933C17.3289 17.0003 15.9523 18.1428 15.6567 19.7194L14.4067 26.386C14.0221 28.4374 15.5959 30.3337 17.683 30.3337Z"
        className={`${
          !isHover ? "stroke-neutral_11" : "stroke-neutral_12"
        } transition-all duration-300 ease-in-out`}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
