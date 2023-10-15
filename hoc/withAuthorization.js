/* eslint-disable react/display-name */
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import UserService from "@/services/UserService";

const userService = new UserService();

export default function comAutorizacao(Componente) {
  return (props) => {
    const router = useRouter();
    const hasWindow = typeof window !== "undefined";
    const [loggedUser, setLoggedUser] = useState("");

    useEffect(() => {
      if (hasWindow) {
        if (!userService.estaAutenticado()) {
          router.replace("/");
          return null;
        }

        setLoggedUser(userService.obterInformacoesDoUsuarioLogado());
      }
    }, [hasWindow, router]);

    return (
      <>
        <Componente loggedUser={loggedUser} {...props} />
      </>
    );

    return null;
  };
}
