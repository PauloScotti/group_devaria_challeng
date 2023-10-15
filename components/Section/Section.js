import Image from "next/image";
import imagem from "../../public/images/senna.png";

export default function SectionNews({ id, categoria, titulo }) {
  return (
    <div className="container-list-news">
      <div className="section-title" key={id}>
        <h2>{categoria}</h2>
      </div>
      <div className="list-news section">
        <div className="news">
          <div className="figure-box">
            <div className="figure">
              <figure>
                <div className="image">
                  <Image src={imagem} alt="Imagem da notícia" />
                </div>
              </figure>
            </div>
          </div>
          <h3>{titulo}</h3>
        </div>
      </div>
    </div>
  );
}
