import { useEffect, useState } from "react";
import UploadImage from "../uploadImage";

import iconImage from "../../public/icons/icon-picture-50.png";
import iconPlus from "../../public/icons/icon-plus-24.png";
import iconLess from "../../public/icons/icon-less-24.png";
import PublicInput from "../publicInput";
import Button from "../Button";
import ModalComponent from "../Modal";
import ActionMessage from "../ActionsMessages";
import NewsService from "@/services/NewsService";
import Image from "next/image";
import { checkCategory, checkTitle, checkText } from "../../utils/validation";

const newsServices = new NewsService();

export default function RegisterNews({ updateNewsList }) {
  const [title, setTitle] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newCategoryClass, setNewCategoryClass] = useState("hide");
  const [text, setText] = useState("");
  const [newsImage, setNewsImage] = useState("");
  const [actionMessage, setActionMessage] = useState("");
  const [actionClassName, setActionClassName] = useState("");
  const [whileSubmit, setWhileSubmit] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const checkForm = () => {
    return (
      checkTitle(title) && checkText(text) && checkCategory(selectedCategory)
    );
  };

  const writeNews = (e) => {
    const actualText = e.target.value;

    setText(actualText);
  };

  const getCategories = async () => {
    try {
      const { data } = await newsServices.getCategory();
      setCategories(data);
    } catch (error) {
      console.error("Erro ao obter categorias:", error);
    }
  };

  const onRegisterNews = async (e) => {
    try {
      e.preventDefault();

      setWhileSubmit(true);
      setActionMessage("Salvo com sucesso");
      setActionClassName("save");

      const newsData = new FormData();
      newsData.append("titulo", title);
      newsData.append("materia", text);
      newsData.append("categoriaId", selectedCategory);
      newsData.append("file", newsImage.arquivo);

      await newsServices.registerNews(newsData);
      updateNewsList();
    } catch (error) {
      alert("Erro ao cadastrar a notícia. " + error?.response?.data?.erro);
    }

    setActionMessage("");
    setTitle("");
    setText("");
    setNewsImage("");
    setWhileSubmit(false);
    setActionClassName("hide");
  };

  const onRegisterCategory = async (e) => {
    try {
      e.preventDefault();

      const registerCategory = await newsServices.registerCategory({
        nomeCategoria: newCategory,
      });

      const category = document.getElementById("category");

      let option = new Option(
        newCategory,
        registerCategory.data._id,
        false,
        true
      );

      category.appendChild(option);
      setNewCategoryClass("hide");
      setNewCategory("");
    } catch (error) {
      alert("Erro ao cadastrar a categoria. " + error?.response?.data?.erro);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div>
      <ActionMessage className={actionClassName} mensage={actionMessage} />
      <ModalComponent
        title="Cadastrar Notícia"
        buttonOpenModal="Cadastrar Notícia"
        content={
          <form onSubmit={onRegisterNews}>
            <UploadImage
              imagePreviewClassName="newsImage newsImagePreview"
              imagePreview={newsImage?.preview || iconImage?.src}
              setImage={setNewsImage}
            />
            <PublicInput
              type="text"
              text="Digite o título da notícia"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            Categoria:{" "}
            <select
              name="category"
              id="category"
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Selecione uma categoria</option>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.nomeCategoria}
                </option>
              ))}
            </select>
            <Image
              className="add-category"
              src={newCategoryClass === "hide" ? iconPlus : iconLess}
              alt="Adicionar categoria"
              onClick={
                newCategoryClass === "hide"
                  ? (e) => setNewCategoryClass("")
                  : (e) => setNewCategoryClass("hide")
              }
            />
            <PublicInput
              type="text"
              text="Digite o nome da nova categoria"
              value={newCategory}
              className={`${newCategoryClass} iconPublicInput`}
              onChange={(e) => setNewCategory(e.target.value)}
              image={iconPlus}
              iconPublicInput=""
              onClickImage={onRegisterCategory}
            />
            <textarea
              rows={12}
              value={text}
              placeholder="Escreva o texto..."
              onChange={writeNews}
            ></textarea>
            <Button
              type="submit"
              text="Cadastrar"
              disable={!checkForm() || whileSubmit}
            />
          </form>
        }
      />
    </div>
  );
}
