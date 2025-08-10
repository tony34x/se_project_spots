// showInputError//
const showInputError = (formList, inputElement, errorMsg) => {
  const errorMsgEl = document.querySelector('#${inputElement.id}-error');
  errorMsgEl.textContent = errorMsg;
};

// hideInputError//
const hideInputError = (formList, inputElement, errorMsg) => {
  const errortext = document.querySelector('#${inputElement.id}-error');
  errortext.textContent = "";
  console.log(inputElement);
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

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formList, inputElement);
      //   toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = document.querySelectorAll(".modal_form");
  formList.forEach((formList) => {
    setEventListeners(formList);
  });
};

console.log(inputElement);

enableValidation();
