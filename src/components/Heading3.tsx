interface Heading3Props {
  title: string;
}
const Heading3 = ({ title }: Heading3Props) => {
  return <h3 className="font-bold">{title}</h3>;
};

export default Heading3;
