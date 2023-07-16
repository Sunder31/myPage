import {Card} from './Card.js';
import {initialCards} from './initialCards.js';
import {validationConfig} from "./validationConfig.js";
import {FormValidator} from './FormValidator.js'

// editProfile popup
const editProfile = document.querySelector('.popup_edit-profile');
const openEditPopup = document.querySelector('.profile__edit-button');
const closeEditPopup = editProfile.querySelector('.popup__close-button');

// форма editProfiel
const editProfileFormElement = editProfile.querySelector('.form');
const nameInput = editProfileFormElement.querySelector('.form__input_el_name');
const aboutInput = editProfileFormElement.querySelector('.form__input_el_about');

const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');

// addCardPopup popup
const addCardPopup = document.querySelector('.popup_add-element');
const openAddPopup = document.querySelector('.profile__add-button');
const closeAddPopup = addCardPopup.querySelector('.popup__close-button');

// форма addCardPopup
const addCardFormElement = addCardPopup.querySelector('.form');
const imageName = addCardFormElement.querySelector('.form__input_place-name');
const imageLink = addCardFormElement.querySelector('.form__input_image-link');

// image popup
const imageViewPopup = document.querySelector('.popup_image-view');
const popupImage = imageViewPopup.querySelector('.popup__image');
const popupSubtitle = imageViewPopup.querySelector('.popup__image-subtitle'); 
const closeImagePopup = imageViewPopup.querySelector('.popup__close-button');

// Template
const cardsContainer = document.querySelector('.elements');

// функционал
const openPopup = (popup) => {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupWithEscape)
}

const closePopup = (popup) => {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupWithEscape)
}

const closePopupWithEscape = (evt) => {
    if(evt.key === 'Escape'){
        const currentPopup = document.querySelector('.popup_opened')
        closePopup(currentPopup)
    }
}

// закрытие попапов при нажатии на оверлей
const closePopupByClickOnOverlay = (evt) => {
    if(evt.target !== evt.currentTarget){
        return
    }
    closePopup(evt.target)
}

// Сабмиты форм
const editProfileFormSubmit = (evt) => {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileAbout.textContent = aboutInput.value;

    closePopup(editProfile)
}

const addCardFormSubmit = (evt) => {
    evt.preventDefault();
    const data = {
        link: imageLink.value,
        name: imageName.value,
        alt: imageName.value,
    };

    renderCard(data, cardsContainer);
    closePopup(addCardPopup)

    addCardFormElement.reset()
}

const openImagePopup = (evt) =>{
    popupImage.src = evt.currentTarget.closest('.element__picture').src; 
    popupImage.alt =  evt.currentTarget.closest('.element__picture').alt;
    popupSubtitle.textContent = evt.currentTarget.closest('.element__picture').alt; 

    openPopup(imageViewPopup)
}
// Создание карточки
const createCard = (data) => {
    const card = new Card (data, '#template-item', openImagePopup)
    const cardElement = card.generateCard();
    return cardElement;
}

// добавление карточки на страницу
const renderCard = (data, cardsContainer) => {
    cardsContainer.prepend(createCard(data));
}

// editProfile listeners
openEditPopup.addEventListener('click', () => {
    openPopup(editProfile)
    nameInput.value = profileName.textContent;
    aboutInput.value = profileAbout.textContent;
})

closeEditPopup.addEventListener('click', () => {
    closePopup(editProfile)
})

editProfile.addEventListener('click', closePopupByClickOnOverlay)

editProfile.addEventListener('keydown', closePopupWithEscape)

editProfileFormElement.addEventListener('submit', editProfileFormSubmit)

// addCardPopup listeners
openAddPopup.addEventListener('click', () => {
    openPopup(addCardPopup)
    addCardFormElement.reset()
})

closeAddPopup.addEventListener('click', () => {
    closePopup(addCardPopup)
})

addCardPopup.addEventListener('click', closePopupByClickOnOverlay)

addCardFormElement.addEventListener('submit', addCardFormSubmit)

initialCards.forEach(card => { 
    renderCard(card, cardsContainer)})

// imagePopup listeners
closeImagePopup.addEventListener('click', () => {
    closePopup(imageViewPopup)
});

imageViewPopup.addEventListener('click', closePopupByClickOnOverlay);

const allowEditProfileValidation = new FormValidator(validationConfig, editProfileFormElement);
allowEditProfileValidation.enableValidation();

const allowAddCardValidation = new FormValidator(validationConfig, addCardFormElement);
allowAddCardValidation.enableValidation();