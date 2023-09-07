import { Link } from "react-router-dom";

interface LinkWithEmojiProps {
  to: string;
  label: string;
  emoji: string;
}

const LinkWithEmoji = ({ to, label, emoji }: LinkWithEmojiProps) => {
  return (
    <Link className="LinkWithEmoji" to={to}>
      <span>{emoji}</span>
      <span>{label}</span>
    </Link>
  );
};

export default LinkWithEmoji;
