class FormValidator {
    constructor(config, formElement) {
        this._formElement = formElement;
        this._formSelector = config.formSelector;
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;
        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        this._submitButton = this._formElement.querySelector(this._submitButtonSelector);
    }

    _showInputError(input){
        const inputError = this._formElement.querySelector(`.${input.id}-error`)
        inputError.textContent = input.validationMessage;
        input.classList.add(this._inputErrorClass);
        inputError.classList.add(this._errorClass);
    }

    _hideInputError(input){
        const inputError = this._formElement.querySelector(`.${input.id}-error`)
        inputError.textContent = '';
        input.classList.remove(this._inputErrorClass);
        inputError.classList.remove(this._errorClass);
    }

    _checkValidity(input){
        if(input.checkValidity()){
            this._hideInputError(input)
        } else {
            this._showInputError(input)
        }
    }

    _hasInvalidInput(){ 
        return this._inputList.some(item => {
            return !item.validity.valid
        })
    } 

    _enableButton(){
        this._submitButton.classList.remove(this._inactiveButtonClass)
        this._submitButton.removeAttribute('disabled', '')
    }
    
    _disableButton(){
        this._submitButton.classList.add(this._inactiveButtonClass)
        this._submitButton.setAttribute('disabled', '')
    }

    _setEventListeners() {
        this._inputList.forEach(input => {
            input.addEventListener('input', () => {
                this._checkValidity(input)
                if(this._hasInvalidInput()){
                    this._disableButton();
                }else {
                    this._enableButton();
                }
            })
        })

        this._formElement.addEventListener('reset', () =>{
            this._disableButton();
        })
    }

    enableValidation() {
        this._disableButton();
        this._setEventListeners();
    }
    
}

export {FormValidator}