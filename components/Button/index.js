export default function Button({
  type = "button",
  text,
  color = "primary",
  disable = false,
  onClick,
}) {
  return (
    <button
      type={type}
      className={`btn ${color}`}
      disabled={disable}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
