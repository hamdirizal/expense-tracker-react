interface Heading1Props {
  title: string;
}
const Heading1 = ({ title }: Heading1Props) => {
  return <h1 className="font-bold text-plus-3">{title}</h1>;
};

export default Heading1;
