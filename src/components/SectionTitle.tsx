interface SectionTitleProps {
  title: string;
}
const SectionTitle = ({ title }: SectionTitleProps) => {
  return <h3 className="font-bold">{title}</h3>;
};

export default SectionTitle;
