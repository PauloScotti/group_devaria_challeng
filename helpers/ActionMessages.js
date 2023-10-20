export class ActionMensages {
  static show() {
    document.querySelector(".show")?.classList.remove("hide");
  }

  static hide() {
    setTimeout(() => {
      document.querySelector(".show")?.classList.add("hide");
    }, 3000);
  }
}
