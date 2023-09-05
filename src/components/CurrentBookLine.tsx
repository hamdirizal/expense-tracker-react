import SvgTriangleDownIcon from "../svg-components/SvgTriangleDownIcon";

interface CurrentBookLineProps {
  title: string;
  onSwitch: () => void;
}

const CurrentBookLine = ({ title, onSwitch }: CurrentBookLineProps) => {
  return (
    <div className="CurrentBookLine">
      <button
        type="button"
        onClick={onSwitch}
        className="CurrentBookLine__button"
      >
        {title}
        <span className="CurrentBookLine__icon">
          <SvgTriangleDownIcon color="#333" />
        </span>
      </button>
    </div>
  );
};

export default CurrentBookLine;
