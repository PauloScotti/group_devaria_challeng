import Image from "next/image";
import { useState } from "react";
import imagem from '../../public/images/senna.png'

export default function SectionNews({
    news
}) {
    const [dataNews, setDataNews] = useState(news)

    return (
        <div className="container-list-news">
            {<div className="section-title" key={news.id}>
                <h2>Tecnologia</h2>
            </div>}
            <div className="list-news section">
                {dataNews.map((n, i) => {
                    return (
                        <div className="news" key={i}>
                            <div className="figure">
                                <Image
                                    src={imagem}
                                    alt="Imagem da notícia" />
                            </div>
                            <h3>{n.title}</h3>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}