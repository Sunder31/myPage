class Card {
    constructor(data, templateSelector, openImagePopup){
        this._data = data;
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this._openImagePopup = openImagePopup;
    }

    _getTemplate() {
        const card = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
        return card
    }

    _setEventListeners() {
        this._likeButton = this._cardElement.querySelector('.element__like-button');
        this._deleteButton = this._cardElement.querySelector('.element__delete-button');
        this._imageElement = this._cardElement.querySelector('.element__picture');

        this._likeButton.addEventListener('click', this._likeCard);
        this._deleteButton.addEventListener('click', this._deleteCard);
        this._imageElement.addEventListener('click', this._openImagePopup);
    }

    _likeCard = () => {
        this._likeButton.classList.toggle('element__like-button_active');
    }

    _deleteCard = () => {
        this._cardElement.remove()
    }

    generateCard() {
        this._cardElement = this._getTemplate();
        this._setEventListeners();
        this._imageElement.src = this._link;
        this._imageElement.alt = this._name;
        this._cardElement.querySelector('.element__name').textContent = this._name;
       
        return this._cardElement;
    }
}

export {Card}