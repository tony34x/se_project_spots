// showInputError//
const showInputError = (formList, inputElement, errorMsg) => {
  const errorMsgEl = document.querySelector(`#${inputElement.id}-error`);
  errorMsgEl.textContent = errorMsg;
  console.log(inputElement);
};

// hideInputError//
const hideInputError = (formList, inputElement, errorMsg) => {
  const errorMsgEl = document.querySelector(`#${inputElement.id}-error`);
  errorMsgEl.textContent = "";
};

// checkInputValidity//
const checkInputValidity = (formList, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formList, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formList, inputElement);
  }
};
//setEventListeners//
const setEventListeners = (formList) => {
  const inputList = Array.from(formList.querySelectorAll(".modal__input"));
  const buttonElement = formList.querySelector(".modal__submit-btn");

 const toggleButtonState = (inputList, buttonElement) => {
  if (!inputElement.validity.valid) {
}

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formList, inputElement);
        toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = document.querySelectorAll(".modal__form");
  formList.forEach((formList) => {
    setEventListeners(formList);
    console.log(formList);
  });
};

console.log("it working");

enableValidation();
