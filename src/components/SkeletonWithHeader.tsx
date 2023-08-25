import AppHeader from "./AppHeader";

const SkeletonWithHeader = ({ content }: { content: JSX.Element }) => {
  return (
    <>
      <AppHeader />
      <div data-testid="SkeletonWithHeader">{content}</div>
    </>
  );
};

export default SkeletonWithHeader;
