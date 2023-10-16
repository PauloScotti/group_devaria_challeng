import Image from "next/image";
import logoDevanewsMobile from "../../public/images/logo_mobile.svg";
import hamburguer from "../../public/icons/hamburguer.svg";
import close from "../../public/icons/close.svg";
import login from "../../public/icons/seta-para-a-direita.svg";
import { useEffect, useState } from "react";
import Link from "next/link";
import NewsService from "@/services/NewsService";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import Dropdown from "react-bootstrap/Dropdown";
import UserService from "@/services/UserService";
import { useRouter } from "next/router";

const newsServices = new NewsService();
const userServices = new UserService();

export default function Header() {
  const [isMobile, setIsMobile] = useState(false);
  const [showHideMenu, setShowHideMenu] = useState(false);
  const [showHideMenuAlt, setShowHideMenuAlt] = useState("Abrir menu");
  const [menuStatus, setMenuStatus] = useState(false);
  const [listCategories, setListCategories] = useState([]);
  const [nomeCompleto, setNomeCompleto] = useState("");
  const primeiroNome = nomeCompleto?.split(" ")[0] || "";
  const router = useRouter();

  const TextTooltip = ({ id, children, title }) => (
    <OverlayTrigger overlay={<Tooltip id={id}>{title}</Tooltip>}>
      <a href="#">{children}</a>
    </OverlayTrigger>
  );

  const logout = () => {
    userServices.logout();
    router.push("/");
  };

  const showHideMenuAction = () => {
    setShowHideMenu(!showHideMenu);
    setMenuStatus(!menuStatus);
  };

  useEffect(() => {
    document.title = "DevaNews";
    setNomeCompleto(localStorage?.getItem("nome"));
    if (window.innerWidth <= 992) {
      setIsMobile(true);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await newsServices.getCategory();

        setListCategories(data);
      } catch (error) {
        console.error("Erro ao obter notícias:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="header">
        {isMobile ? (
          <Image
            src={!showHideMenu ? hamburguer : close}
            alt={showHideMenuAlt}
            className="hamburguer"
            onClick={showHideMenuAction}
          />
        ) : (
          ""
        )}
        <Link href="/" alt="Home">
          <Image src={logoDevanewsMobile} alt="Logo DevaNews" />
        </Link>
        {!isMobile && primeiroNome ? (
          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              <span>{primeiroNome}</span>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="/">Home</Dropdown.Item>
              <Dropdown.Item href="/admin">Administrar</Dropdown.Item>
              <Dropdown.Item href="#/" onClick={logout}>
                Sair
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          ""
        )}
      </div>
      <div className="menu">
        <nav className={`nav_icons menu-status-${menuStatus}`}>
          <ul>
            <li>
              {!isMobile ? (
                <Image
                  src={!showHideMenu ? hamburguer : close}
                  alt={showHideMenuAlt}
                  className="hamburguer"
                  onClick={showHideMenuAction}
                />
              ) : (
                ""
              )}
            </li>
            <li></li>
            <li></li>
            <li></li>
            <li>
              {primeiroNome ? (
                <TextTooltip title="Sair" id="t-1">
                  <Image
                    className={"img-logout"}
                    src={login}
                    alt="Sair"
                    width={20}
                    height={20}
                    onClick={logout}
                  />
                </TextTooltip>
              ) : (
                <Link
                  href={primeiroNome ? "#" : "/admin"}
                  alt="Ir para área administrativa"
                >
                  <Image src={login} alt="Login" width={20} height={20} />
                </Link>
              )}
            </li>
          </ul>
        </nav>
        <nav className={`nav_menu menu-status-${menuStatus}`}>
          <ul>
            <li className="section_title">Notícias</li>
            <li>
              <a href="/">Home</a>
            </li>
            {listCategories.map((c, i) => {
              return (
                <li key={i}>
                  <Link
                    onClick={showHideMenuAction}
                    href={`../section/${c._id}`}
                    alt={c.nomeCategoria}
                  >
                    {c.nomeCategoria}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
}
