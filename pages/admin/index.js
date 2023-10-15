import { useState, useEffect } from "react";
import UserService from "@/services/UserService";
import Login from "@/components/Auth/Login";
import Admin from "@/components/Admin";
import Header from "@/components/Header";

const userService = new UserService();

export default function Index() {
  const [estaAutenticado, setEstaAutenticado] = useState(false);
  const token = useState("token");

  useEffect(() => {
    setEstaAutenticado(userService.estaAutenticado());
  }, [token]);

  if (estaAutenticado === null) {
    return <Login />;
  }

  if (estaAutenticado) {
    return (
      <div className="container-principal">
        <Header />
        <Admin />
      </div>
    );
  }
}
