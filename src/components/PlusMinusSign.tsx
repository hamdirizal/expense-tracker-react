const PlusMinusSign = ({ isPlus }: { isPlus: boolean }) => {
  if (isPlus) {
    return <b className="PlusMinusSign">+</b>;
  } else {
    return <b className="PlusMinusSign--isMinus">–</b>;
  }
};

export default PlusMinusSign;
