import { SvgIconProps } from "../types";

const SvgAddIcon = ({ color }: SvgIconProps) => {
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
        d="M4 12h16m-8-8v16"
      />
    </svg>
  );
};

export default SvgAddIcon;
