import { useState } from "react";
import withAutorization from "../../hoc/withAuthorization";

import iconeEdit from "../../public/icons/icon-edit.png";
import Image from "next/image";
import ModalComponent from "../Modal";
import UploadImagem from "../uploadImage";
import PublicInput from "../publicInput";
import Button from "../Button";
import ActionMessage from "../ActionsMessages";
import { checkName } from "../../utils/validation";
import UserService from "@/services/UserService";

const userService = new UserService();

function UpdateUser({ userData, updateUsersList }) {
  const [nome, setNome] = useState(userData.nome);
  const [avatar, setAvatar] = useState(userData.avatar);
  const [actionMessage, setActionMessage] = useState("");
  const [actionClassName, setActionClassName] = useState("");
  const [whileSubmit, setWhileSubmit] = useState(false);

  const checkForm = () => {
    return checkName(nome);
  };

  const onUpdateUser = async (e) => {
    try {
      e.preventDefault();
      setWhileSubmit(true);

      const corpoRequisicao = new FormData();
      corpoRequisicao.append("nome", nome);

      if (avatar.arquivo) {
        corpoRequisicao.append("file", avatar.arquivo);
      }

      setActionMessage("Usuário atualizado com sucesso");
      setActionClassName("save");

      await userService.updateUser(userData.id, corpoRequisicao);

      updateUsersList();
    } catch (error) {
      console.error("Erro ao atualizar o usuário:", error);
    }

    setActionMessage("");
    setActionClassName("hide");
    setWhileSubmit(false);
  };

  return (
    <>
      <div>
        <ActionMessage className={actionClassName} mensage={actionMessage} />
        <ModalComponent
          title="Editar Usuário"
          buttonOpenModal={
            <Image src={iconeEdit} alt="Editar" width={20} height={20} />
          }
          content={
            <form onSubmit={onUpdateUser}>
              <UploadImagem
                imagePreviewClassName="newsImage newsImagePreview"
                imagePreview={avatar?.preview || avatar}
                setImage={setAvatar}
              />
              <PublicInput
                type="text"
                text="Digite o nome do usuário"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
              <Button
                type="submit"
                text="Salvar"
                disable={!checkForm() || whileSubmit}
              />
            </form>
          }
        />
      </div>
    </>
  );
}

export default withAutorization(UpdateUser);
