export default function ActionMessage({ className, mensage }) {
  console.log(className + " " + mensage);
  return (
    <div className={`hide show action-message ${className}`}>
      <p>{mensage}</p>
    </div>
  );
}
