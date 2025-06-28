const initialCards = [
  {
    name: "golden gate bridge",
    link: " https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
];


const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditModal = document.querySelector("#edit-profile-modal");
const profileEditModalCloseButton =
profileEditModal.querySelector(".modal__close-btn");
const cardsList = document.querySelector(".cards__list");
const addcardmodal =document.querySelector("#add-card-modal")


const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");


const profileEditForm = profileEditModal.querySelector(".modal__form");


const nameInput = document.querySelector("#profile-name-input");
const descriptionInput = document.querySelector("#profile-description-input");

const previewModal = document.querySelector("#preview-modal");
const previewModalCloseBth = previewModal.querySelector(".modal__close-btn");
const previewImageEl = previewModal.querySelector(".modal__image");
const previewcaption = previewModal.querySelector(".modal__caption");
const profileaddbutton = document.querySelector(".profile__add-button")


//to use
function openModal(modal) {
  modal.classList.add("modal_opened");
}
// to use
function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closeModal(profileEditModal);
}

function handleProfileEditButtonClick() {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
}

function getCardElement(data) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardlikebutton = cardElement.querySelector(".card__like-button");

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  console.log(data);

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  cardlikebutton.addEventListener("click", () => {
    cardlikebutton.classList.toggle("card__like-button_active");
  });

//still working//

//addcardbutton.addEventListener("click", function (){
 // addcardModal.classList.add("modal_opened");
  
//});


//addCardcloseBtn.addEventListener("click", function () {
 // addcardModal.classList.remove("modal_opened")
//});


  cardDeleteButton.addEventListener("click", () => {
    cardDeleteButton.closest(".card").remove();
  });

  cardImage.addEventListener("click", () => {
    cardImage.classList.add(cardImage);
  });

  cardImage.addEventListener("click", () => {
    previewImageEl.src = data.link;
    previewImageEl.alt = data.link;
    openModal(previewModal);
  });

  return cardElement;
}

previewModalCloseBth.addEventListener("click", () => {
  closeModal(previewModal);
});


profileEditButton.addEventListener("click", handleProfileEditButtonClick);

profileEditModalCloseButton.addEventListener("click", () => {
  closeModal(profileEditModal);
});


//still working//

const newpostbutton = document.querySelector(".profile__add-button");
// const profileaddButton = cardElement.querySelector(".card__image");
newpostbutton.addEventListener("click",() => {
  openModal(addcardmodal)
})

// profileaddButton.addEventListener("submit", function (event) {
//   evt.preventDefault();
//  console.log(captionInput.value);
//   console.log(linkInput.value);
//   const cardElement = getCardElement({});
//   cardsList.prepend(cardElement);
//  addcardModal.classList.remove(".modal_opened")
// });




// Keep your card rendering//
initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardsList.prepend(cardElement);
  console.log(cardData);
});
