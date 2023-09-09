import { useEffect, useState } from 'react';
import senna from '../../public/images/senna.png'
import ListNews from './News.js';


export default function News() {
    const [listNews, setListNews] = useState([]);

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
        const formatedNews = news.map((formatedData) => (
            {
                id: formatedData.id,
                secao: formatedData.secao,
                news: formatedData.news.map((n) => ({
                    image: n.img,
                    title: n.title
                }))
            }
        ));

        setListNews(formatedNews);
    }, []);

    return (
        <div className="container-news">
            {news.map((news) => {
                return (
                    <ListNews
                        key={news.id}
                        {...news}
                    />
                )
            })}
        </div>
    )
}