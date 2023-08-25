interface PageTitleProps {
  title: string;
}
const PageTitle = ({ title }: PageTitleProps) => {
  return <h1 className="font-bold text-xl">{title}</h1>;
};

export default PageTitle;
