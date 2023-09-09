import Image from 'next/image';
import logoDevanewsMobile from '../../public/images/logo_mobile.svg';
import logoDevanews from '../../public/images/logo.svg';
import hamburguer from '../../public/icons/hamburguer.svg';
import close from '../../public/icons/close.svg';
import { useEffect, useState } from 'react';

export default function Header() {

    const [isMobile, setIsMobile] = useState(false);
    const [showHideMenu, setShowHideMenu] = useState(false);
    const [showHideMenuAlt, setShowHideMenuAlt] = useState('Abrir menu');
    const [menuStatus, setMenuStatus] = useState(false);

    const showHideMenuAction = () => {
        setShowHideMenu(!showHideMenu);
        setMenuStatus(!menuStatus);
    }

    useEffect(() => {
        document.title = "DevaNews";
        if (window.innerWidth <= 992) {
            setIsMobile(true);
        }
    }, []);

    return (
        <>
            <div className="header">
                {
                    isMobile
                        ?
                        <Image
                            src={!showHideMenu ? hamburguer : close}
                            alt={showHideMenuAlt}
                            className='hamburguer'
                            onClick={showHideMenuAction}
                        />
                        :
                        ""
                }
                <Image
                    src={logoDevanewsMobile}
                    alt='Logo DevaNews' />
            </div>
            <div className='menu'>
                <nav className={`nav_icons menu-status-${menuStatus}`}>
                    <ul>
                        <li>
                            {
                                !isMobile
                                    ?
                                    <Image
                                        src={!showHideMenu ? hamburguer : close}
                                        alt={showHideMenuAlt}
                                        className='hamburguer'
                                        onClick={showHideMenuAction}
                                    />
                                    :
                                    ""
                            }
                        </li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </nav>
                <nav className={`nav_menu menu-status-${menuStatus}`}>
                    <ul>
                        <li className='section_title'>Notícias</li>
                        <li><a href='#'>Tecnologia</a></li>
                        <li><a href='#'>Esportes</a></li>
                        <li><a href='#'>Economia</a></li>
                        <li><a href='#'>Games</a></li>
                    </ul>
                </nav>
            </div>
        </>
    )
}