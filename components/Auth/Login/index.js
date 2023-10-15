import Image from "next/image";
import logo_devanews from "../../../public/images/logo.svg";
import { useState } from "react";
import PublicInput from "@/components/publicInput";
import { checkEmail, checkPassword } from "@/utils/validation";
import UserService from "../../../services/UserService";
import Button from "@/components/Button";
import { useRouter } from "next/router";

const userService = new UserService();

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const router = useRouter();

  const checkForm = () => {
    return checkEmail(email) && checkPassword(password);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!checkForm()) {
      return;
    }
    setMessage(true);
    setDisabled(true);

    try {
      await userService.login({
        login: email,
        senha: password,
      });

      router.push("/admin");
    } catch (error) {
      alert("Erro ao realizar o login. " + error?.response?.data?.erro);
    }

    setDisabled(false);
    setMessage(false);
  };

  return (
    <div className="container_auth">
      <div className="logo">
        <Image src={logo_devanews} alt="Logo DevaNews" />
      </div>
      <div className="form">
        <form onSubmit={onSubmit}>
          <PublicInput
            type="text"
            text="Login"
            value={email}
            onChange={(e) => setEmail(e?.target.value)}
            validationMessage="O login informado é inválido"
            showValidationMessage={email && !checkEmail(email)}
          />
          <PublicInput
            type="password"
            text="Senha"
            value={password}
            onChange={(e) => setPassword(e?.target.value)}
            validationMessage="A senha informada é inválida"
            showValidationMessage={password && !checkPassword(password)}
          />
          <Button
            disabled={!checkForm() || disabled}
            type="submit"
            text={message ? "...carregando" : "Entrar"}
          />
        </form>
      </div>
    </div>
  );
}
