import Image from "next/image";

export default function PublicInput({
  type,
  text,
  value = "",
  showValidationMessage = false,
  validationMessage = "",
  onChange,
  className,
  iconPublicInput = "hide",
  image,
  onClickImage,
}) {
  return (
    <div className="publicInputContainer">
      <div className={`publicInput ${className}`}>
        <input
          type={type}
          placeholder={text}
          value={value}
          onChange={onChange}
        />

        <Image
          src={image}
          alt="imagem do campo"
          className={iconPublicInput}
          width={20}
          height={20}
          onClick={onClickImage}
        />
      </div>

      {showValidationMessage && (
        <p className="validationMessage">{validationMessage}</p>
      )}
    </div>
  );
}
