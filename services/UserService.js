import HttpService from "./HttpService";

export default class UserService extends HttpService {
  async login(credentials) {
    const { data } = await this.post("/login", credentials);

    localStorage.setItem("nome", data.nome);
    localStorage.setItem("email", data.email);

    if (data.token) {
      localStorage.setItem("token", data.token);
    }

    const user = await this.get("/usuario");

    if (user.data.avatar) {
      localStorage.setItem("avatar", user.data.avatar);
    }

    localStorage.setItem("id", user.data._id);
  }

  async logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("nome");
    localStorage.removeItem("email");
    localStorage.removeItem("avatar");
    localStorage.removeItem("id");
  }

  async registerUser(dados) {
    return this.post("/cadastro", dados);
  }

  async updateLoggedUser(dados) {
    return this.put(`/usuario`, dados);
  }

  async updateUser(id, dados) {
    return this.put(`/adminusuario?id=${id}`, dados);
  }

  async deleteUser(id) {
    return this.delete(`/adminusuario?id=${id}`);
  }

  async getUser() {
    return this.get(`/usuario`);
  }

  async getUsers() {
    return this.get(`/listarusuarios`);
  }

  estaAutenticado() {
    return localStorage.getItem("token");
  }

  obterInformacoesDoUsuarioLogado() {
    return {
      id: localStorage.getItem("id"),
      nome: localStorage.getItem("nome"),
      email: localStorage.getItem("email"),
      avatar: localStorage.getItem("avatar"),
    };
  }
}
