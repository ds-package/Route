import React from "react";

const Logo = () => {
  return (
    <div>
      <svg
        width="41"
        height="41"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#a)">
          <circle cx="20.5" cy="20.5" r="20" fill="#0E0E0E" />
          <path
            d="M19 20v4M25.843 19.008l.314 2.984M13.899 29.435c1.152 0 2.288.464 3.477.464 1.989 0 3.918-.03 5.897-.232 2.355-.242 5.318-.786 7.082-2.55"
            stroke="#fff"
            strokeWidth="2.439"
            strokeLinecap="round"
          />
        </g>
        <defs>
          <clipPath id="a">
            <path fill="#fff" transform="translate(.5 .5)" d="M0 0h40v40H0z" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};

export default Logo;
