interface VarDumpProps {
  content: string | JSX.Element;
  label?: string;
}

const VarDump = ({ content, label = "" }: VarDumpProps) => {
  return (
    <div className="VarDump">
      {label}
      {label !== "" && <br />}
      {content}
    </div>
  );
};

export default VarDump;
