import { SvgIconProps } from "../types";

const SgvArrowLeftIcon = ({ color }: SvgIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="800"
      height="800"
      viewBox="0 0 24 24"
    >
      <g
        fill="none"
        stroke={color}
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
      >
        <path d="m7.6 7-5.1 5 5.1 5" data-name="Right" />
        <path d="M21.5 12H4.8" />
      </g>
    </svg>
  );
};

export default SgvArrowLeftIcon;
