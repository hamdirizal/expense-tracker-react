import { SvgIconProps } from "../types";

const SvgTriangleDownIcon = ({ color }: SvgIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="800"
      height="800"
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        fill={color}
        d="m8.728 15.795-5-8A1.5 1.5 0 0 1 5 5.5h10a1.5 1.5 0 0 1 1.272 2.295l-5 8a1.5 1.5 0 0 1-2.544 0Z"
      />
    </svg>
  );
};

export default SvgTriangleDownIcon;
