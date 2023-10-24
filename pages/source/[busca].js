import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import NewsService from "@/services/NewsService";
import Link from "next/link";

const newsServices = new NewsService();

export default function Source() {
  const router = useRouter();

  const [listNews, setListNews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!router.query.busca) {
          return;
        }

        const response = await newsServices.source(router.query.busca);

        if (Array.isArray(response.data.resultados)) {
          const formatedNews = response.data.resultados.map((formatedData) => ({
            id: formatedData._id,
            categoria: formatedData.categoria,
            categoriaId: formatedData.categoriaId,
            titulo: formatedData.titulo,
            materia: formatedData.materia,
            url: formatedData.url,
          }));
          setListNews(formatedNews);
        } else {
          console.error(
            "A matriz resultados não está presente na resposta:",
            response
          );
        }
      } catch (error) {
        console.error("Erro ao fazer a busca:", error);
      }
    };

    fetchData();
  }, [router.query.busca]);

  // Função para encontrar e destacar a palavra pesquisada em um texto
  const findAndHighlightText = (text, keyword) => {
    if (text.includes(keyword)) {
      const index = text.indexOf(keyword);
      const start = Math.max(index - 80, 0);
      const end = index + keyword.length + 80;

      let highlightedText = text.substring(start, end);

      let initialText = text.substring(0, 67);
      let finalText = text.substring(text.length - 67, text.length);

      if (text.length > 67 && !highlightedText.includes(initialText)) {
        // Se não for o primeiro trecho e não corresponder aos primeiros 50 caracteres
        highlightedText = "..." + highlightedText;
      }

      // Se não for o último trecho, verifique se o trecho exibido inclui o final do texto
      if (text.length > 67 && !highlightedText.includes(finalText)) {
        highlightedText = highlightedText + "...";
      }

      // Se o trecho incluir o início, não adicione "..."
      if (!text.startsWith("...")) {
        highlightedText = highlightedText.replace(
          keyword,
          `<strong>${keyword}</strong>`
        );
      }

      return highlightedText;
    }
    return text;
  };

  return (
    <div className="container-principal">
      <Header />
      <div className="container-news">
        <h2>Resultado da pesquisa da palavra: {router.query.busca}</h2>
        <div className="container-result">
          {listNews.map((item, index) => (
            <div className="source-result" key={item.id}>
              <Link href={`../article/${item.id}`}>
                <h3>{item.titulo}</h3>
                <p
                  dangerouslySetInnerHTML={{
                    __html: findAndHighlightText(
                      item.materia,
                      router.query.busca
                    ),
                  }}
                ></p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
