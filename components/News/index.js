import { useEffect, useState } from "react";
import ListNews from "./News.js";
import NewsService from "@/services/NewsService";

const newsServices = new NewsService();

export default function News() {
  const [listNews, setListNews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await newsServices.getNews();
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

    fetchData();
  }, []); // A dependência vazia [] garante que o useEffect seja executado apenas uma vez, após a montagem inicial.

  // Pré-processar os dados para agrupar notícias por categoria
  const groupedNews = listNews.reduce((acc, news) => {
    if (!acc[news.categoria]) {
      acc[news.categoria] = [];
    }
    acc[news.categoria].push(news);
    return acc;
  }, {});

  return (
    <div className="container-news">
      {Object.keys(groupedNews).map((categoria) => (
        <ListNews
          key={categoria}
          categoria={categoria}
          noticias={groupedNews[categoria]}
          categoriaId={groupedNews[categoria][0].categoriaId}
        />
      ))}
    </div>
  );
}
