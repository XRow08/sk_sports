"use client";
import { useState } from "react";

export function SearchIcon({ onClick }: { onClick?: () => void }) {
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
      <g clipPath="url(#clip0_626_3978)">
        <path
          d="M30.3332 30.3336L28.6665 28.667M13.6665 21.5837C13.6665 17.2114 17.2109 13.667 21.5832 13.667C25.9554 13.667 29.4998 17.2114 29.4998 21.5837C29.4998 25.9559 25.9554 29.5003 21.5832 29.5003C17.2109 29.5003 13.6665 25.9559 13.6665 21.5837Z"
          className={`${
            !isHover ? "stroke-neutral_11" : "stroke-neutral_12"
          } transition-all duration-300 ease-in-out`}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_626_3978">
          <rect
            width="20"
            height="20"
            fill="white"
            transform="translate(12 12)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
