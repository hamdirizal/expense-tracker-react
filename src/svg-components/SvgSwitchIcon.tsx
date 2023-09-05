import { SvgIconProps } from "../types";

const SvgSwitchIcon = ({ color }: SvgIconProps) => {
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
        d="M21 9H9M15 15H3M18 12l2.913-2.913v0a.123.123 0 0 0 0-.174v0L18 6M6 18l-2.913-2.913v0a.123.123 0 0 1 0-.174v0L6 12"
      />
    </svg>
  );
};

export default SvgSwitchIcon;