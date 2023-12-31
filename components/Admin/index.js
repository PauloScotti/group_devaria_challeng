import NewsService from "@/services/NewsService";
import { useEffect, useState } from "react";
import RegisterNews from "./registerNews";
import Table from "react-bootstrap/Table";
import UpdateNews from "./updateNews";
import DeleteNews from "./deleteNews";

const newsService = new NewsService();

export default function Admin() {
  const [listNews, setListNews] = useState([]);

  var filtro = document.getElementById("filtro-nome");
  var tabela = document.getElementById("lista");
  const sourceOnNewsTable = () => {
    var nomeFiltro = filtro.value;
    for (var i = 1; i < tabela.rows.length; i++) {
      var conteudoCelula = tabela.rows[i].cells[1].innerText;
      var corresponde = conteudoCelula.toLowerCase().indexOf(nomeFiltro) >= 0;
      tabela.rows[i].style.display = corresponde ? "" : "none";
    }
  };

  const fetchData = async () => {
    try {
      const { data } = await newsService.getNews();
      const formatedNews = data.map((formatedData) => ({
        id: formatedData._id,
        categoria: formatedData.categoria,
        categoriaId: formatedData.categoriaId,
        titulo: formatedData.titulo,
        materia: formatedData.materia,
        url: formatedData.url,
      }));
      setListNews(formatedNews);
    } catch (error) {
      console.error("Erro ao obter notícias:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Função para ser chamada após criar ou deletar uma notícia.
  const updateNewsList = () => {
    fetchData(); // Chama a função novamente para atualizar a lista de notícias.
  };

  return (
    <>
      <div className="container-admin">
        <RegisterNews updateNewsList={updateNewsList} />
      </div>
      <div className="container-news admin">
        <Table
          bordered
          hover
          className="vertical-align-middle-desktop"
          id="lista"
        >
          <thead>
            <tr>
              {" "}
              <th>Ações</th>
              <th>
                Título{" "}
                <input
                  size="8"
                  id="filtro-nome"
                  className="sourceOnNewsTable"
                  onChange={sourceOnNewsTable}
                  placeholder="Busca por títulos"
                />
              </th>
              <th>Categoria</th>
              <th>Matéria</th>
            </tr>
          </thead>
          {listNews.map((news, i) => {
            return (
              <tbody key={i}>
                <tr>
                  <td className="action">
                    <UpdateNews
                      newsData={{
                        id: news.id,
                        titulo: news.titulo,
                        categoria: news.categoria,
                        categoriaId: news.categoriaId,
                        materia: news.materia,
                        url: news.url,
                      }}
                      updateNewsList={updateNewsList}
                    />
                    <DeleteNews
                      noticiaId={news.id}
                      updateNewsList={updateNewsList}
                    />
                  </td>
                  <td>{news.titulo}</td>
                  <td>{news.categoria}</td>
                  <td className="text-news-with-limit">{news.materia}</td>
                </tr>
              </tbody>
            );
          })}
        </Table>
      </div>
    </>
  );
}
