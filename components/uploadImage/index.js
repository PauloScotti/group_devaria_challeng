import { useRef, useEffect } from "react";

export default function UploadImagem({
  className = "",
  setImage,
  imagePreview,
  imagePreviewClassName = "",
  onSetReference,
}) {
  const referenceInput = useRef(null);

  useEffect(() => {
    if (!onSetReference) {
      return;
    }

    onSetReference(referenceInput?.current);
  }, [onSetReference]);

  const openFileSelector = () => {
    referenceInput?.current?.click();
  };

  const onChangeImage = () => {
    if (!referenceInput?.current?.files?.length) {
      return;
    }

    const file = referenceInput?.current?.files[0];
    geImagetUrlAndUploadState(file);
  };

  const geImagetUrlAndUploadState = (file) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onloadend = () => {
      setImage({
        preview: fileReader.result,
        arquivo: file,
      });
    };
  };

  const onDropImage = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      geImagetUrlAndUploadState(file);
    }
  };

  return (
    <div
      className={`uploadImageContainer ${className}`}
      onClick={openFileSelector}
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDropImage}
    >
      {imagePreview && (
        <div className="imagePreviewContainer">
          <picture>
            <source srcSet={imagePreview} type="image/webp" />
            <img
              src={imagePreview}
              alt="Preview da imagem"
              className={imagePreviewClassName}
            />
          </picture>
        </div>
      )}

      <input
        type="file"
        className="hide"
        accept="image/*"
        ref={referenceInput}
        onChange={onChangeImage}
      />
    </div>
  );
}
