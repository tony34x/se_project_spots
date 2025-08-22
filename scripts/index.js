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
const profileEditModalCloseButton = profileEditModal.querySelector(".modal__close-btn");

// card  and images and caption //
const cardsList = document.querySelector(".cards__list");
const addcardmodal = document.querySelector("#add-card-modal");
const newpostaddcard = document.querySelector("#new_post-add-card");
const cardSubmitbutton = document.querySelector(".modal__submit-btn");
const modalsubmit = document.querySelector("#card-Submit-button");
const imagelinkurl = document.querySelector("#image-link_url");
const captioninput = document.querySelector("#caption_input");
// Define the addCardModal

// profile//
const nameInput = document.querySelector("#profile-name-input");
const descriptionInput = document.querySelector("#profile-description-input");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileaddbutton = document.querySelector(".profile__add-button");

// form //
const profileEditForm = profileEditModal.querySelector(".modal__form");

// Preview modal //
const previewModal = document.querySelector("#preview-modal");
const previewModalCloseBth = previewModal.querySelector(".modal__close-btn");
const previewImageEl = previewModal.querySelector(".modal__image");
const previewcaption = previewModal.querySelector(".modal__caption");

//to use
function openModal(modal) {
  modal.classList.add("modal_opened");
}
// to use
function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

profileEditForm.addEventListener("submit", handleProfileFormSubmit);

function handleProfileFormSubmit(evt) {
  evt.preventDefault(); // create card modal has the same issue - it does not have preventDefaut
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

  cardImage.src = data.link; //cardImage of the card
  cardImage.alt = data.name; //cardImage of the card name
  cardTitle.textContent = data.name;

  cardlikebutton.addEventListener("click", () => {
    cardlikebutton.classList.toggle("card__like-button_active");
  });

  cardDeleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImage.addEventListener("click", () => {
    cardImage.classList.add("cardImage");
  });

  cardImage.addEventListener("click", () => {
    previewImageEl.src = data.link;
    previewImageEl.alt = data.link;
    openModal(previewModal);
  });

  return cardElement;
}

profileEditButton.addEventListener("click", handleProfileEditButtonClick);

profileEditModalCloseButton.addEventListener("click", () => {
  closeModal(profileEditModal);
});

const newpostbutton = document.querySelector(".profile__add-button");
newpostbutton.addEventListener("click", () => {
  openModal(addcardmodal);
});

const newPostCloseButton = addcardmodal.querySelector(".modal__close-btn");
newPostCloseButton.addEventListener("click", () => {
  closeModal(addcardmodal);
});
//previewModal//
previewModalCloseBth.addEventListener("click", () => {
  closeModal(previewModal);
});

const imageUrl = document.getElementById("image-link_url").value;

newpostaddcard.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const formData = new FormData(evt.target);
  const cardData = Object.fromEntries(formData);

  // TODO: create card
  const cardElement = getCardElement(cardData);
  cardsList.prepend(cardElement);
  closeModal(addcardmodal);
  toggleButtonState(inputList, buttonElement);
  newpostaddcard.reset();
});

// Keep your card rendering//
initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardsList.prepend(cardElement);
  console.log(cardData);
});
