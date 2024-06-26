import { FC } from 'react';

interface ILogoProps {
  width?: number;
  height?: number;
}

export const Logo: FC<ILogoProps> = ({ width = 512, height = 512 }) => {
  return (
    <svg
      height={`${height}px`}
      viewBox="0 0 512 512"
      width={`${width}px`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <linearGradient
        id="linear0"
        gradientUnits="userSpaceOnUse"
        x1="256"
        x2="256"
        y1="0"
        y2="512"
      >
        <stop offset="0" stopColor="#2af598" />
        <stop offset="1" stopColor="#009efd" />
      </linearGradient>
      <path
        d="m452 0h-392c-33.085938 0-60 26.914062-60 60v392c0 33.085938 26.914062 60 60 60h392c33.085938 0 60-26.914062 60-60v-392c0-33.085938-26.914062-60-60-60zm20 452c0 11.027344-8.972656 20-20 20h-392c-11.027344 0-20-8.972656-20-20v-392c0-11.027344 8.972656-20 20-20h392c11.027344 0 20 8.972656 20 20zm-220.855469-162.855469-102.859375 102.855469h76.714844v40h-145v-145h40v76.714844l102.855469-102.855469zm35.855469-209.144531h145v145h-40v-76.714844l-102.855469 102.859375-28.285156-28.285156 102.855469-102.859375h-76.714844zm0 0"
        fill="url(#linear0)"
      />
    </svg>
  );
};
