const setEventListeners = () => {
  const inputList = Array.from(formElement.querySelectorAll(".form__input"));
  const buttonElement = formElement.querySelector(".form__submit");

  toggleButtonState(inputList, buttonElement);
  console.log(inputList);
  console.log(buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};
const enablevalidation = () => {
  const formList = document.querySelectorAll(".modal_form");
  formList.forEach((formEl) => {
    setEventListeners(formEl);
  });
};

enablevalidation();
