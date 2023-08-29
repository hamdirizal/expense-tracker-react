interface Heading2Props {
  title: string;
}
const Heading2 = ({ title }: Heading2Props) => {
  return <h3 className="text-white-text text-plus-2">{title}</h3>;
};

export default Heading2;
