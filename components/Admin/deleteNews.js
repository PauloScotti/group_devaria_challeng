import Image from "next/image";
import withAutorization from "../../hoc/withAuthorization";
import ModalComponent from "../Modal";

import iconTrash from "../../public/icons/icon-trash-50.png";
import Button from "../Button";
import NewsService from "@/services/NewsService";
import { useState } from "react";
import ActionMessage from "../ActionsMessages";

const newsService = new NewsService();

function DeleteNews({ noticiaId, updateNewsList }) {
  const [whileSubmit, setWhileSubmit] = useState(false);
  const [actionMessage, setActionMessage] = useState("");
  const [actionClassName, setActionClassName] = useState("");

  const onDeleteNews = async (e) => {
    try {
      e.preventDefault();

      setWhileSubmit(true);
      setActionMessage("Notícia deletada com sucesso");
      setActionClassName("delete");

      await newsService.deleteNews(noticiaId);
      updateNewsList();
    } catch (error) {
      alert("Erro ao deletar a notícia. " + error?.response?.data?.erro);
    }

    setWhileSubmit(false);
    setActionMessage("");
    setActionClassName("hide");
  };

  return (
    <div>
      <ActionMessage className={actionClassName} mensage={actionMessage} />
      <ModalComponent
        title="Deseja realmente deletar essa notícia?"
        buttonOpenModal={
          <Image src={iconTrash} alt="Deletar" width={20} height={20} />
        }
        content={
          <form onSubmit={onDeleteNews}>
            <Button
              type="submit"
              text="Deletar"
              disable={whileSubmit}
              color="red"
            />
          </form>
        }
      />
    </div>
  );
}

export default withAutorization(DeleteNews);
