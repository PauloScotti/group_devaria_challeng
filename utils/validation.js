const checkName = (name) => {
  return name?.toString().length > 2;
};

const checkEmail = (email) => {
  const emailStr = email?.toString();
  return (
    emailStr.length >= 5 && emailStr.includes("@") && emailStr.includes(".")
  );
};

const checkPassword = (password) => {
  return password?.toString().length > 3;
};

const checkTitle = (title) => {
  return title?.toString().length > 2;
};

const checkText = (text) => {
  return text?.toString().length > 5;
};

const checkCategory = (category) => {
  return category?.toString().length > 12;
};

const checkConfirmPassword = (password, confirm) => {
  return checkPassword(password) && password === confirm;
};

export {
  checkName,
  checkEmail,
  checkPassword,
  checkConfirmPassword,
  checkCategory,
  checkTitle,
  checkText,
};
