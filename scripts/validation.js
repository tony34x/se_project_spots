// showInputError 1//
const showInputError = (inputElement, errorMsg) => {
  const errorMsgEl = document.querySelector(`#${inputElement.id}-error`);
  errorMsgEl.textContent = errorMsg;
  errorMsgEl.classList.add('modal__error_visible');
   console.log(1)
};

// hideInputError 2//
const hideInputError = (inputElement) => {
  const errorMsgEl = document.querySelector(`#${inputElement.id}-error`);
  errorMsgEl.textContent = "";
  errorMsgEl.classList.remove('modal__error_visible');
  console.log(2)
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
    disabledbutton(buttonElement);
  } else {
    buttonElement.disabled = false; 
  }
};



const disabledbutton = (buttonElement) => {
 buttonElement.disabled = true;


};

const resetValidation = (inputList ,) => {
  inputList.forEach((input)=> {
    hideInputError(input)
  });
  
};


//setEventListeners//
function setEventListeners(form) {
    const inputList = Array.from(form.querySelectorAll(".modal__input"));
    const buttonElement = form.querySelector(".modal__submit-btn");

    inputList.forEach(input => {
        input.addEventListener("keydown", () => {
            checkInputValidity(input);
        });
    });
}



inputList.forEach((inputElement) => {
  inputElement.addEventListener("input", function () {
    checkInputValidity(inputElement);
    toggleButtonState(inputList, buttonElement);
  });
});

const enableValidation = () => {
  const formList = document.querySelectorAll(".modal__form, .modal__form-new-post");
  formList.forEach((form) => {
    setEventListeners(form);
  });
};

enableValidation();
