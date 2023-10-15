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
    localStorage.setItem("id", user.data._id);
  }

  async logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("nome");
    localStorage.removeItem("email");
    localStorage.removeItem("id");
  }

  async registerUser(dados) {
    return this.post("/cadastro", dados);
  }

  async updateUser(dados) {
    return this.put(`/usuario`, dados);
  }

  async getUser() {
    return this.get(`/usuario`);
  }

  estaAutenticado() {
    return localStorage.getItem("token");
  }

  obterInformacoesDoUsuarioLogado() {
    return {
      id: localStorage.getItem("id"),
      nome: localStorage.getItem("nome"),
      email: localStorage.getItem("email"),
    };
  }
}
