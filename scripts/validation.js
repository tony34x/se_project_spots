const settings = {
  formSelector: ".modal__form-new-post", // make it disabled//
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-btn",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

// showInputError 1//
const showInputError = (formElement, inputElement, errorMsg, settings) => {
const errorMsgEl = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(settings.inputErrorClass);
  errorMsgEl.textContent = errorMsg;
  errorMsgEl.classList.add(settings.errorClass);
};

// hideInputError 2//
const hideInputError = (formElement, inputElement, settings) => {
const errorMsgEl = formElement.querySelector(`#${inputElement.id}-error`);
  errorMsgEl.textContent = "";
errorMsgEl.classList.remove(settings.errorClass);
inputElement.classList.remove(settings.inputErrorClass);
};

// checkInputValidity//
const checkInputValidity = (formElement, inputElement, settings) => {
  if (!inputElement.validity.valid) {
    showInputError
     (formElement, inputElement, inputElement.validationMessage, settings);
  } else {
    hideInputError(formElement, inputElement, settings);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, settings) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(settings.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(settings.inactiveButtonClass);
  }
};
const resetValidation = (formElement, inputList, settings) => {
  inputList.forEach((input) => {
    hideInputError(formElement, input, settings);
  });
};

function enableValidation(config) {
  // Use config.formSelector instead of ".modal__form"
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    // Pass the config object to setEventListeners.
    setEventListeners(formElement, config);
  });
}

// const inputList = Array.from(
//   formElement.querySelectorAll(inputLis)
// );

//setEventListeners//
function setEventListeners(formElement, config) {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, settings);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      console.log(inputElement);
      checkInputValidity(formElement, inputElement, settings);
      toggleButtonState(inputList, buttonElement, settings);
      console.log(toggleButtonState);
    });
  });
}
enableValidation(settings);
