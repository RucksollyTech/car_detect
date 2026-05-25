type TruncateTextProps = {
  text: string;
  maxLength?: number;
};

export default function TruncateText({
  text,
  maxLength = 14,
}: TruncateTextProps) {
  const truncated =
    text.length > maxLength
      ? `${text.slice(0, maxLength)}...`
      : text;

  return <span>
    <span className="md:hidden">{truncated}</span>
    <span className="hidden md:inline">{text}</span>
  </span>;
}