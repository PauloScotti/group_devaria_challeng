export default function PublicInput({
    type,
    text,
    value = "",
    showValidationMessage = false,
    validationMessage = "",
    onChange
}) {
    return (
        <div className="publicInputContainer">
            <div className="publicInput">
                <input
                    type={type}
                    placeholder={text}
                    value={value}
                    onChange={onChange}
                />
            </div>

            {showValidationMessage && <p className="validationMessage">{validationMessage}</p>}
        </div>
    );
}