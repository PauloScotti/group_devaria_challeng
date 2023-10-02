import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import senna from '../../public/images//senna.png';
import Header from "@/components/Header";
import Link from "next/link";
import Image from "next/image";

export default function ListNews() {
    const router = useRouter();
    const id = router.query.id;

    const [listNews, setListNews] = useState([]);
    const [section, setSection] = useState('Tecnologia');

    const news = [
        {
            id: 1,
            secao: 'Ciência',
            news: [
                {
                    img: { senna },
                    title: 'Sonda da NASA fotografa lander da missão Chandrayaan-3 na Lua',
                    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, asperiores. Minima enim autem molestiae rem repellat nobis, iusto tenetur, et, exercitationem accusantium sapiente expedita vero? Magni inventore placeat dolorem voluptates. Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, asperiores. Minima enim autem molestiae rem repellat nobis, iusto tenetur, et, exercitationem accusantium sapiente expedita vero? Magni inventore placeat dolorem voluptates.'
                },
                {
                    img: { senna },
                    title: 'Covid longa: névoa mental tem relação com coágulo sanguíneo',
                    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, asperiores. Minima enim autem molestiae rem repellat nobis, iusto tenetur, et, exercitationem accusantium sapiente expedita vero? Magni inventore placeat dolorem voluptates. Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, asperiores. Minima enim autem molestiae rem repellat nobis, iusto tenetur, et, exercitationem accusantium sapiente expedita vero? Magni inventore placeat dolorem voluptates.'
                },
                {
                    img: { senna },
                    title: 'Covid longa: névoa mental tem relação com coágulo sanguíneo',
                    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, asperiores. Minima enim autem molestiae rem repellat nobis, iusto tenetur, et, exercitationem accusantium sapiente expedita vero? Magni inventore placeat dolorem voluptates. Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, asperiores. Minima enim autem molestiae rem repellat nobis, iusto tenetur, et, exercitationem accusantium sapiente expedita vero? Magni inventore placeat dolorem voluptates.'
                },
                {
                    img: { senna },
                    title: 'Covid longa: névoa mental tem relação com coágulo sanguíneo',
                    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, asperiores. Minima enim autem molestiae rem repellat nobis, iusto tenetur, et, exercitationem accusantium sapiente expedita vero? Magni inventore placeat dolorem voluptates. Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, asperiores. Minima enim autem molestiae rem repellat nobis, iusto tenetur, et, exercitationem accusantium sapiente expedita vero? Magni inventore placeat dolorem voluptates.'
                },
                {
                    img: { senna },
                    title: 'Covid longa: névoa mental tem relação com coágulo sanguíneo',
                    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, asperiores. Minima enim autem molestiae rem repellat nobis, iusto tenetur, et, exercitationem accusantium sapiente expedita vero? Magni inventore placeat dolorem voluptates. Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, asperiores. Minima enim autem molestiae rem repellat nobis, iusto tenetur, et, exercitationem accusantium sapiente expedita vero? Magni inventore placeat dolorem voluptates.'
                },
                {
                    img: { senna },
                    title: 'Covid longa: névoa mental tem relação com coágulo sanguíneo',
                    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, asperiores. Minima enim autem molestiae rem repellat nobis, iusto tenetur, et, exercitationem accusantium sapiente expedita vero? Magni inventore placeat dolorem voluptates. Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, asperiores. Minima enim autem molestiae rem repellat nobis, iusto tenetur, et, exercitationem accusantium sapiente expedita vero? Magni inventore placeat dolorem voluptates.'
                }
            ]
        },
        {
            id: 2,
            secao: 'Política',
            news: [
                {
                    img: { senna },
                    title: 'Destaque da NASA: aglomerado estelar brilhante é a foto astronômica do dia',
                    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, asperiores. Minima enim autem molestiae rem repellat nobis, iusto tenetur, et, exercitationem accusantium sapiente expedita vero? Magni inventore placeat dolorem voluptates. Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, asperiores. Minima enim autem molestiae rem repellat nobis, iusto tenetur, et, exercitationem accusantium sapiente expedita vero? Magni inventore placeat dolorem voluptates.'
                }
            ]
        },
        {
            id: 3,
            secao: 'Tecnologia',
            news: [
                {
                    img: { senna },
                    title: 'Ingenuity voa pela 56ª vez e pousa em novo lugar em Marte',
                    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, asperiores. Minima enim autem molestiae rem repellat nobis, iusto tenetur, et, exercitationem accusantium sapiente expedita vero? Magni inventore placeat dolorem voluptates. Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, asperiores. Minima enim autem molestiae rem repellat nobis, iusto tenetur, et, exercitationem accusantium sapiente expedita vero? Magni inventore placeat dolorem voluptates.'
                }
            ]
        },
        {
            id: 4,
            secao: 'Games',
            news: [
                {
                    img: { senna },
                    title: 'Ingenuity voa pela 56ª vez e pousa em novo lugar em Marte',
                    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, asperiores. Minima enim autem molestiae rem repellat nobis, iusto tenetur, et, exercitationem accusantium sapiente expedita vero? Magni inventore placeat dolorem voluptates. Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, asperiores. Minima enim autem molestiae rem repellat nobis, iusto tenetur, et, exercitationem accusantium sapiente expedita vero? Magni inventore placeat dolorem voluptates.'
                }
            ]
        },
    ]

    useEffect(() => {
        const formatedNewsSection = news.map((formatedSectionData) => (
            {
                id: formatedSectionData.id,
                secao: formatedSectionData.secao,
                news: formatedSectionData.news.map((n) => ({
                    image: n.img,
                    title: n.title,
                    text: n.text
                }))
            }
        ));

        const newsBySection = formatedNewsSection.map((n) => n.id === id)

        setListNews(formatedNewsSection);
    }, []);

    return (
        <div className="container-principal">
            <Header />
            <div className="container-news">
                <div className="content-news">
                    <div className="sections">
                        <div className="link-sections">
                            <Link href='/' alt='Home'>Home</Link>
                        </div>
                        <div className="link-sections">
                            <Link href='/' alt={section}>{section}</Link>
                        </div>
                    </div>
                    <h1>Título</h1>
                    <p>29 de Setembro de 2023</p>
                    <div className="article-image">
                        <Image
                            src={senna}
                            alt="Imagem da notícia"
                        />
                    </div>
                    <pre>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, asperiores. Minima enim autem molestiae rem repellat nobis, iusto tenetur, et, exercitationem accusantium sapiente expedita vero? Magni inventore placeat dolorem voluptates. Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, asperiores. Minima enim autem molestiae rem repellat nobis, iusto tenetur, et, exercitationem accusantium sapiente expedita vero? Magni inventore placeat dolorem voluptates.</p>

                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, asperiores. Minima enim autem molestiae rem repellat nobis, iusto tenetur, et, exercitationem accusantium sapiente expedita vero? Magni inventore placeat dolorem voluptates. Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, asperiores. Minima enim autem molestiae rem repellat nobis, iusto tenetur, et, exercitationem accusantium sapiente expedita vero? Magni inventore placeat dolorem voluptates.</p>
                    </pre>
                </div>
            </div>
        </div>

    )
}