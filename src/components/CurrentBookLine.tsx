interface CurrentBookLineProps {
  title: string;
  onSwitch: () => void;
}

const CurrentBookLine = ({ title, onSwitch }: CurrentBookLineProps) => {
  return (
    <div className="CurrentBookLine">
      <span className="CurrentBookLine__title">{title}</span>
      <button type="button" onClick={onSwitch} className="ButtonLink">switch book</button>
    </div>
  );
};

export default CurrentBookLine;
