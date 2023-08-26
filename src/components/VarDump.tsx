interface VarDumpProps {
  content: string | JSX.Element;
  label?: string;
}

const VarDump = ({ content, label = "" }: VarDumpProps) => {
  return (
    <div className="border-2 border-red-600 text-sm break-words bg-red-950 text-white p-1 my-2">
      {label}
      {label !== "" && <br />}
      {content}
    </div>
  );
};

export default VarDump;
