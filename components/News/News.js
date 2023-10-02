import Image from "next/image";
import { useState } from "react";
import imagem from '../../public/images/senna.png'
import Link from "next/link";

export default function ListNews({
    id,
    secao,
    news
}) {
    const [dataNews, setDataNews] = useState(news)

    return (
        <div className="container-list-news">
            {<div className="section-title" key={id}>
                <h2>{secao}</h2>
                <Link href={`section?id=${id}`}><span>ver tudo</span> <span>&gt;</span></Link>
            </div>}
            <div className="list-news">
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