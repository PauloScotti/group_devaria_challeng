import { Table } from "react-bootstrap";
import RegisterUser from "./registerUser";
import UserService from "@/services/UserService";
import { useEffect, useState } from "react";

import imageAvatar from "../../public/icons/icon-avatar.png";
import UpdateUser from "./updateUser";
import DeleteUser from "./deleteUser";

const userService = new UserService();

export default function Users() {
  const [listUsers, setListUsers] = useState([]);

  const fetchData = async () => {
    try {
      const { data } = await userService.getUsers();
      const formatedUsers = data.map((formatedData) => ({
        id: formatedData._id,
        nome: formatedData.nome,
        email: formatedData.email,
        avatar: formatedData.avatar,
      }));
      setListUsers(formatedUsers);
    } catch (error) {
      console.error("Erro ao obter usuários:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateUsersList = () => {
    fetchData();
  };
  return (
    <>
      <div className="container-admin">
        <RegisterUser updateUsersList={updateUsersList} />
      </div>
      <div className="container-news admin">
        <Table bordered hover className="vertical-align-middle-desktop">
          <thead>
            <tr>
              <th>Ações</th>
              <th>Avatar</th>
              <th>Nome</th>
              <th>E-mail</th>
            </tr>
          </thead>
          {listUsers.map((user, i) => {
            return (
              <tbody key={i}>
                <tr>
                  <td className="action">
                    <UpdateUser
                      userData={{
                        id: user.id,
                        nome: user.nome,
                        avatar: user.avatar,
                      }}
                      updateUsersList={updateUsersList}
                    />
                    <DeleteUser
                      id={user.id}
                      updateUsersList={updateUsersList}
                    />
                  </td>
                  <td>
                    <img
                      className="avatar"
                      src={user?.avatar || imageAvatar?.src}
                      alt="Avatar"
                    />
                  </td>
                  <td>{user.nome}</td>
                  <td>{user.email}</td>
                </tr>
              </tbody>
            );
          })}
        </Table>
      </div>
    </>
  );
}
