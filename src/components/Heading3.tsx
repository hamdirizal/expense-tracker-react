interface Heading3Props {
  title: string;
}
const Heading3 = ({ title }: Heading3Props) => {
  return <h3 className="text-white-text text-plus-1">{title}</h3>;
};

export default Heading3;
