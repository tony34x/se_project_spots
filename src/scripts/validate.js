// ---------- ERROR HANDLERS ----------
const showInputError = (formElement, inputElement, errorMsg, settings) => {
  const errorMsgEl = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(settings.inputErrorClass);
  errorMsgEl.textContent = errorMsg;
  errorMsgEl.classList.add(settings.errorClass);
};

const hideInputError = (formElement, inputElement, settings) => {
  const errorMsgEl = formElement.querySelector(`#${inputElement.id}-error`);
  errorMsgEl.textContent = "";
  errorMsgEl.classList.remove(settings.errorClass);
  inputElement.classList.remove(settings.inputErrorClass);
};

// ---------- VALIDATION ----------
const checkInputValidity = (formElement, inputElement, settings) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      settings
    );
  } else {
    hideInputError(formElement, inputElement, settings);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((input) => !input.validity.valid);
};

export const toggleButtonState = (inputList, buttonElement, settings) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(settings.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(settings.inactiveButtonClass);
  }
};

export const resetValidation = (formElement, inputList, settings) => {
  inputList.forEach((input) => {
    hideInputError(formElement, input, settings);
  });
};

// ---------- EVENT LISTENERS ----------
function setEventListeners(formElement, settings) {
  const inputList = Array.from(
    formElement.querySelectorAll(settings.inputSelector)
  );

  const buttonElement = formElement.querySelector(
    settings.submitButtonSelector
  );

  toggleButtonState(inputList, buttonElement, settings);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, settings);
      toggleButtonState(inputList, buttonElement, settings);
    });
  });
}

// ---------- ENABLE ----------
export function enableValidation(settings) {
  const formList = Array.from(
    document.querySelectorAll(settings.formSelector)
  );

  formList.forEach((formElement) => {
    setEventListeners(formElement, settings);
  });
}
