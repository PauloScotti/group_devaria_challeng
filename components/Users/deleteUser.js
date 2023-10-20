import Image from "next/image";
import withAutorization from "../../hoc/withAuthorization";
import ModalComponent from "../Modal";

import iconTrash from "../../public/icons/icon-trash-50.png";
import Button from "../Button";
import { useState } from "react";
import ActionMessage from "../ActionsMessages";
import UserService from "@/services/UserService";

const userService = new UserService();

function DeleteUser({ id, updateUsersList }) {
  const [whileSubmit, setWhileSubmit] = useState(false);
  const [actionMessage, setActionMessage] = useState("");
  const [actionClassName, setActionClassName] = useState("");

  const onDeleteUser = async (e) => {
    try {
      e.preventDefault();

      setWhileSubmit(true);
      setActionMessage("Usuário deletado com sucesso");
      setActionClassName("delete");

      await userService.deleteUser(id);
      updateUsersList();
    } catch (error) {
      alert("Erro ao deletar o usuário. " + error?.response?.data?.erro);
    }

    setWhileSubmit(false);
    setActionMessage("");
    // setActionClassName("hide");
  };

  return (
    <div>
      <ActionMessage className={actionClassName} mensage={actionMessage} />
      <ModalComponent
        title="Deseja realmente deletar esse usuário?"
        buttonOpenModal={
          <Image src={iconTrash} alt="Deletar" width={20} height={20} />
        }
        content={
          <form onSubmit={onDeleteUser}>
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

export default withAutorization(DeleteUser);
