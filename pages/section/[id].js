import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import NewsService from "@/services/NewsService";
import Link from "next/link";

const newsServices = new NewsService();

export default function ListNews() {
  const router = useRouter();

  const [listNews, setListNews] = useState([]);
  const [categoria, setCategoria] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!router.query.id) {
          return;
        }

        const { data } = await newsServices.getNewsByCategory(router.query.id);
        const formatedNews = data.map((formatedData) => ({
          id: formatedData._id,
          categoria: formatedData.categoria,
          titulo: formatedData.titulo,
          materia: formatedData.materia,
          url: formatedData.url,
        }));
        setCategoria(formatedNews.length > 0 ? formatedNews[0].categoria : "");
        setListNews(formatedNews);
      } catch (error) {
        console.error("Erro ao obter notícias:", error);
      }
    };

    fetchData();
  }, [router.query.id]);

  return (
    <div className="container-principal">
      <Header />
      <div className="container-news">
        <div className="container-list-news">
          <div className="section-title">
            <h2>{categoria}</h2>
          </div>
          <div className="list-news section">
            {listNews.map((news, i) => {
              return (
                <div className="news section" key={news.id}>
                  <Link href={`../article/${news.id}`}>
                    <div className="figure-box">
                      <div className="figure">
                        <figure>
                          <div className="image">
                            <img src={news?.url} alt="Imagem da notícia" />
                          </div>
                        </figure>
                      </div>
                    </div>
                    <h3>{news.titulo}</h3>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
