interface VarDumpProps {
  content: string | JSX.Element;
}

const VarDump = ({ content }: VarDumpProps) => {
  return <div className="border-2 border-red-600 text-sm break-words bg-red-950 text-white p-1">{content}</div>;
};

export default VarDump;
