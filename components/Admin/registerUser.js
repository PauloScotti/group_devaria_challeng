import { useState } from "react";
import Button from "../../components/Button";
import PublicInput from "../../components/publicInput";
import UploadImage from "../../components/uploadImage";
import {
  checkEmail,
  checkPassword,
  checkName,
  checkConfirmPassword,
} from "../../utils/validation";
import UserService from "../../services/UserService";

import imageAvatar from "../../public/icons/icon-avatar.png";
import ActionMessage from "../ActionsMessages";
import ModalComponent from "../Modal";

const usuarioService = new UserService();

export default function RegisterUser() {
  const [imagem, setImagem] = useState(null);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmacaoSenha, setConfirmacaoSenha] = useState("");
  const [whileSubmit, setWhileSubmit] = useState(false);
  const [actionMessage, setActionMessage] = useState("");
  const [actionClassName, setActionClassName] = useState("");

  const checkForm = () => {
    return (
      checkName(nome) &&
      checkEmail(email) &&
      checkPassword(senha) &&
      checkConfirmPassword(senha, confirmacaoSenha)
    );
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!checkForm()) {
      return;
    }

    setWhileSubmit(true);
    setActionMessage("Salvo com sucesso");
    setActionClassName("save");

    try {
      const corpoReqCadastro = new FormData();
      corpoReqCadastro.append("nome", nome);
      corpoReqCadastro.append("email", email);
      corpoReqCadastro.append("senha", senha);

      if (imagem?.arquivo) {
        corpoReqCadastro.append("file", imagem.arquivo);
      }

      await usuarioService.registerUser(corpoReqCadastro);
    } catch (error) {
      alert("Erro ao cadastrar usuario. " + error?.response?.data?.erro);
    }

    setWhileSubmit(false);
    setActionMessage("");
    setActionClassName("hide");
  };

  return (
    <div>
      <ActionMessage className={actionClassName} mensage={actionMessage} />
      <ModalComponent
        title="Cadastrar Usuário"
        buttonOpenModal="Cadastrar Usuário"
        content={
          <form onSubmit={onSubmit}>
            <UploadImage
              imagePreviewClassName="userImagePreview"
              imagePreview={imagem?.preview || imageAvatar?.src}
              setImage={setImagem}
            />
            <PublicInput
              type="text"
              text="Digite o nome do usuário"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <PublicInput
              type="text"
              text="Digite o e-mail do usuário"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <PublicInput
              type="password"
              text="Digite a senha do usuário"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            <PublicInput
              type="password"
              text="Digite a confirmação da senha do usuário"
              value={confirmacaoSenha}
              onChange={(e) => setConfirmacaoSenha(e.target.value)}
            />
            <Button
              type="submit"
              text="Cadastrar"
              disable={!checkForm() || whileSubmit}
            />
          </form>
        }
      />
    </div>
  );
}
