import { useEffect, useState } from "react";
import withAutorization from "../../hoc/withAuthorization";
import NewsService from "../../services/NewsService";

import iconeEdit from "../../public/icons/icon-edit.png";
import iconTrash from "../../public/icons/icon-trash-50.png";
import iconPlus from "../../public/icons/icon-plus-24.png";
import iconLess from "../../public/icons/icon-less-24.png";
import Image from "next/image";
import ModalComponent from "../Modal";
import UploadImagem from "../uploadImage";
import PublicInput from "../publicInput";
import Button from "../Button";
import ActionMessage from "../ActionsMessages";
import { checkCategory, checkTitle, checkText } from "../../utils/validation";

const newsService = new NewsService();

function UpdateNews({ newsData, updateNewsList }) {
  const [title, setTitle] = useState(newsData.titulo);
  const [newCategory, setNewCategory] = useState("");
  const [newCategoryClass, setNewCategoryClass] = useState("hide");
  const [text, setText] = useState(newsData.materia);
  const [newsImage, setNewsImage] = useState(newsData.url);
  const [actionMessage, setActionMessage] = useState("");
  const [actionClassName, setActionClassName] = useState("");
  const [categoryAction, setCategoryAction] = useState(false);
  const [categoryToEditId, setCategoryToEditId] = useState("");
  const [categoryActionClass, setCategoryActionClass] = useState("hide");
  const [whileSubmit, setWhileSubmit] = useState(false);
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(
    newsData.categoriaId
  );

  const checkForm = () => {
    return (
      checkTitle(title) && checkText(text) && checkCategory(selectedCategory)
    );
  };

  const writeNews = (e) => {
    const actualText = e.target.value;

    setText(actualText);
  };

  const getCategory = async () => {
    try {
      const { data } = await newsService.getCategory();
      setCategory(data);
    } catch (error) {
      console.error("Erro ao obter categorias:", error);
    }
  };

  const onUpdateNews = async (e) => {
    try {
      e.preventDefault();
      setWhileSubmit(true);
      setActionMessage("Notícia atualizada com sucesso");
      setActionClassName("save");

      const newsToUpdateData = new FormData();
      newsToUpdateData.append("titulo", title);
      newsToUpdateData.append("materia", text);
      newsToUpdateData.append("categoria", selectedCategory);
      newsToUpdateData.append("file", newsImage);

      await newsService.updatetNewsById(newsData.id, newsToUpdateData);

      updateNewsList();
    } catch (error) {
      console.error("Erro ao atualizar a notícia:", error);
    }

    setActionMessage("");
    setActionClassName("hide");
    setWhileSubmit(false);
  };

  const onRegisterCategory = async (e) => {
    try {
      e.preventDefault();

      const registerCategory = await newsService.registerCategory({
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

  const onEditCategory = async (e) => {
    try {
      e.preventDefault();
      setWhileSubmit(true);

      const categoryData = {
        nomeCategoria: newCategory,
      };

      await newsService.updatetCategory(categoryToEditId, categoryData);

      updateNewsList();
      getCategory();
    } catch (error) {
      alert("Erro ao editar a categoria. " + error?.response?.data?.erro);
    }

    setCategoryActionClass("hide");
    setNewCategory(false);
    setWhileSubmit(false);
    setNewCategory("");
  };

  const onDeleteCategory = async (e) => {
    try {
      e.preventDefault();
      setWhileSubmit(true);

      await newsService.deleteCategory(categoryToEditId);

      setCategoryActionClass("hide");
      setNewCategory(false);
      updateNewsList();
    } catch (error) {
      alert("Erro ao editar a categoria. " + error?.response?.data?.erro);
    }

    setWhileSubmit(false);
  };

  const onSelectCategory = (e) => {
    setSelectedCategory(e.target.value);
    setCategoryToEditId(e.target.value);
  };

  const onClickEditCategory = (e) => {
    if (categoryAction === false) {
      if (categoryToEditId === "") {
        setCategoryToEditId(selectedCategory);
      }
      setCategoryActionClass("");
      setCategoryAction(true);
      setNewCategoryClass("hide");
      console.log(categoryToEditId);
    } else {
      setCategoryActionClass("hide");
      setCategoryAction(false);
      setCategoryToEditId("");
    }
  };

  const onAddCategory = (e) => {
    if (newCategoryClass === "hide") {
      setNewCategoryClass("");
      setCategoryActionClass("hide");
      setCategoryAction(false);
      setCategoryToEditId("");
    } else {
      setNewCategoryClass("hide");
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <>
      <div>
        <ActionMessage className={actionClassName} mensage={actionMessage} />
        <ModalComponent
          title="Editar Notícia"
          buttonOpenModal={
            <Image src={iconeEdit} alt="Editar" width={20} height={20} />
          }
          content={
            <form onSubmit={onUpdateNews}>
              <UploadImagem
                imagePreviewClassName="newsImage newsImagePreview"
                imagePreview={newsImage?.preview || newsImage}
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
                value={selectedCategory}
                onChange={onSelectCategory}
              >
                {category.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.nomeCategoria}
                  </option>
                ))}
              </select>
              <Image
                className="add-category"
                src={newCategoryClass === "hide" ? iconPlus : iconLess}
                alt="Adicionar categoria"
                onClick={onAddCategory}
              />
              <Image
                src={categoryAction === false ? iconeEdit : iconLess}
                alt="Editar Categoria"
                width={24}
                height={24}
                onClick={onClickEditCategory}
              />
              <ModalComponent
                title="Realmente deseja deletar a categoria?"
                buttonOpenModal={
                  <Image
                    src={iconTrash}
                    alt="Deletar Categoria"
                    width={24}
                    height={24}
                    onClick={
                      categoryAction === false
                        ? (e) => setCategoryAction(true)
                        : (e) => setCategoryAction(false)
                    }
                  />
                }
                content={
                  <form onSubmit={onDeleteCategory}>
                    <Button
                      type="submit"
                      text="Deletar"
                      disable={whileSubmit}
                      color="red"
                    />
                  </form>
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
              <PublicInput
                type="text"
                text="Digite o novo nome da nova categoria"
                value={newCategory}
                className={`${categoryActionClass} iconPublicInput`}
                onChange={(e) => setNewCategory(e.target.value)}
                image={iconeEdit}
                iconPublicInput=""
                onClickImage={onEditCategory}
              />
              <textarea
                rows={12}
                value={text}
                placeholder="Escreva o texto..."
                onChange={writeNews}
              ></textarea>
              <Button
                type="submit"
                text="Salvar"
                disable={!checkForm() || whileSubmit}
              />
            </form>
          }
        />
      </div>
    </>
  );
}

export default withAutorization(UpdateNews);
