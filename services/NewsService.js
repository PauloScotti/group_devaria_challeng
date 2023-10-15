import HttpService from "./HttpService";

export default class NewsService extends HttpService {
  async registerNews(dados) {
    return this.post("/noticia", dados);
  }

  async registerCategory(dados) {
    return this.post("/categoria", dados);
  }

  async getNews() {
    return this.get(`/listarnoticias`);
  }

  async getNewsById(id) {
    return this.get(`/listarnoticias?id=${id}`);
  }

  async getCategory() {
    return this.get(`/listarcategorias`);
  }

  async getNewsByCategory(id) {
    return this.get(`/listarnoticiasporcategoria?id=${id}`);
  }

  async updatetNewsById(id, dados) {
    return this.put(`/noticia?noticiaId=${id}`, dados);
  }

  async updatetCategory(id, dados) {
    return this.put(`/categoria?id=${id}`, dados);
  }

  async deleteNews(id) {
    return this.delete(`/noticia?noticiaId=${id}`);
  }

  async deleteCategory(id) {
    return this.delete(`/categoria?id=${id}`);
  }
}
