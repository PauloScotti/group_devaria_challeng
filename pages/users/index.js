import { useState, useEffect } from "react";
import UserService from "@/services/UserService";
import Login from "@/components/Auth/Login";
import Header from "@/components/Header";
import Users from "@/components/Users";

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
        <Users />
      </div>
    );
  }
}
