import { useState } from "react";
import UploadImagem from "../uploadImage";

import iconImage from "../../public/icons/icon-picture-50.png";
import PublicInput from "../publicInput";
import Button from "../Button";
import ModalComponent from "../Modal";
import ActionMessage from "../ActionsMessages";

export default function RegisterCategory() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [newsImage, setNewsImage] = useState("");
  const [actionMessage, setActionMessage] = useState("");
  const [video, setVideo] = useState("");
  const [date, setDate] = useState("");
  const [whileSubmit, setWhileSubmit] = useState(false);

  const writeNews = (e) => {
    const actualText = e.target.value;

    setText(actualText);
  };

  const onRegister = (e) => {
    e.preventDefault();
    setActionMessage("Salvo com sucesso");
  };

  return (
    <div>
      <ActionMessage className="save" mensage={actionMessage} />
      <ModalComponent
        title="Cadastrar Notícia"
        buttonOpenModal="+ Cadastrar Notícia"
        content={
          <form onSubmit={onRegister}>
            <UploadImagem
              imagePreviewClassName="newsImage newsImagePreview"
              imagePreview={newsImage?.preview || iconImage?.src}
              setImage={setNewsImage}
            />
            <PublicInput
              type="text"
              text="Digite o título da notícia"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              rows={12}
              value={text}
              placeholder="Escreva o texto..."
              onChange={writeNews}
            ></textarea>
            <Button type="submit" text="Cadastrar" disable={whileSubmit} />
          </form>
        }
      />
    </div>
  );
}
