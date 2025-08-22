const settings = {
  formSelector: ".modal__form",  
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-btn",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__error_visible",
  errorClass: "modal__error",
};

// showInputError 1//
const showInputError = (inputElement, errorMsg) => {
  const errorMsgEl = document.querySelector(`#${inputElement.id}-error`);
  errorMsgEl.textContent = errorMsg;
  errorMsgEl.classList.add("settings.errorClass");
  console.log(1);
};

// hideInputError 2//
const hideInputError = (inputElement) => {
  const errorMsgEl = document.querySelector(`#${inputElement.id}-error`);
  errorMsgEl.textContent = "";
  errorMsgEl.classList.remove("settings.errorClass");
  console.log(2);
};

// checkInputValidity//
const checkInputValidity = (inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(inputElement, inputElement.validationMessage);
  } else {
    hideInputError(inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(settings.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(settings.inactiveButtonClass);
  }
};
const resetValidation = (inputList) => {
  inputList.forEach((input) => {
    hideInputError(input);
  });
};



function enableValidation(config) {
  // Use config.formSelector instead of ".modal__form"
  const formList = document.querySelectorAll(config.formSelector);
  formList.forEach((formElement) => {
    // Pass the config object to setEventListeners.
    setEventListeners(formElement, config);
  });
}

//setEventListeners//
function setEventListeners(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(inputElement);
      toggleButtonState(inputList, buttonElement);
      console.log(toggleButtonState)
    });
  });
}
enableValidation(settings);
