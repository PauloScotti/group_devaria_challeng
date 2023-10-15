import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Link from "next/link";
import NewsService from "@/services/NewsService";

const newsServices = new NewsService();

export default function Article() {
  const router = useRouter();

  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!router.query.id) {
          return;
        }

        const data = await newsServices.getNewsById(router.query.id);

        setNewsData(data["data"][0]);
      } catch (error) {
        console.error("Erro ao obter notícia:", error);
      }
    };

    fetchData();
  }, [router.query.id]);

  console.log(newsData);

  return (
    <div className="container-principal">
      <Header />
      <div className="container-news">
        <div className="content-news">
          <div className="sections">
            <div className="link-sections">
              <Link href="/" alt="Home">
                Home
              </Link>
            </div>
            <div className="link-sections">
              <Link
                href={`../section/${newsData.categoriaId}`}
                alt={newsData.categoriaId}
              >
                {newsData.categoria}
              </Link>
            </div>
          </div>
          <h1>{newsData.titulo}</h1>
          <p>{newsData.data}</p>
          <div className="article-image">
            <img src={newsData.url} alt="Imagem da notícia" />
          </div>
          <pre>
            <p>{newsData.materia}</p>
          </pre>
        </div>
      </div>
    </div>
  );
}
