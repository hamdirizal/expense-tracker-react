import { SvgIconProps } from "../types";

const SvgMinusIcon = ({ color }: SvgIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="800"
      height="800"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke={color}
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M9 12h6"
      />
      <path
        stroke={color}
        stroke-width="2"
        d="M3 12c0-7.412 1.588-9 9-9s9 1.588 9 9-1.588 9-9 9-9-1.588-9-9Z"
      />
    </svg>
  );
};

export default SvgMinusIcon;
