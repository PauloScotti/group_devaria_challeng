import Link from "next/link";

export default function ListNews({ categoria, noticias, categoriaId }) {
  return (
    <div className="container-list-news">
      <div className="section-title">
        <h2>{categoria}</h2>
        <Link href={`section/${categoriaId}`}>
          <span>ver tudo</span> <span>&gt;</span>
        </Link>
      </div>

      <div className="list-news">
        {noticias.map((noticia) => (
          <div className="news" key={noticia.id}>
            <Link href={`article/${noticia.id}`}>
              <div className="figure-box">
                <div className="figure">
                  <figure>
                    <div className="image">
                      <img src={noticia?.url} alt="foto da postagem" />
                    </div>
                  </figure>
                </div>
              </div>
              <h3>{noticia.titulo}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
