
const popupElement = document.querySelector('.popup')

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
const cardTemplate = document.querySelector('#template-item').content;
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

    imageLink.value = '';
    imageName.value = '';
}

const likeCard = (evt) => {
    evt.target.classList.toggle('element__like-button_active');
}

const deleteCard = (evt) => {
    evt.target.closest('.element').remove();
}

const openImage = (evt) =>{
    popupImage.src = evt.currentTarget.closest('.element__picture').src; 
    popupImage.alt =  evt.currentTarget.closest('.element__picture').alt;
    popupSubtitle.textContent = evt.currentTarget.closest('.element__picture').alt; 

    openPopup(imageViewPopup)
}
// Создание карточки
const createCard = (data) => {
    cardElement = cardTemplate.querySelector('.element').cloneNode(true);
    const cardInfo = cardElement.querySelector('.element__picture');
        cardInfo.src = data.link;
        cardInfo.alt = data.name;
    cardElement.querySelector('.element__name').textContent = data.name;
    cardInfo.addEventListener('click', openImage)
    cardElement.querySelector('.element__like-button').addEventListener('click', likeCard)
    cardElement.querySelector('.element__delete-button').addEventListener('click', deleteCard)

    return cardElement
}

// добавление карточки на страниуц
const renderCard = (data, cardsContainer) => {
    const cardElement = createCard(data);
    cardsContainer.prepend(cardElement);
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
    imageLink.value = '';
    imageName.value = '';
})

closeAddPopup.addEventListener('click', () => {
    closePopup(addCardPopup)
})

addCardPopup.addEventListener('click', closePopupByClickOnOverlay)

addCardFormElement.addEventListener('submit', addCardFormSubmit)

initialCards.forEach(cardElement => { renderCard(cardElement, cardsContainer)})

// imagePopup listeners

closeImagePopup.addEventListener('click', () => {
    closePopup(imageViewPopup)
})

imageViewPopup.addEventListener('click', closePopupByClickOnOverlay)