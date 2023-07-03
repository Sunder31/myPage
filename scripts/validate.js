const validationConfig = { 
    formSelector: '.form', 
    inputSelector: '.form__input', 
    submitButtonSelector: '.popup__submit-button', 
    inactiveButtonClass: 'popup__submit-button_disabled', 
    inputErrorClass: 'form__input_type_error', 
    errorClass: 'form__input-error_visible', 
}

const enableValidation = ({formSelector, ...rest}) =>{
    const forms = Array.from(document.querySelectorAll(formSelector))
    forms.forEach((form) => {
        setEventListeners(form, rest)
    })
}

const setEventListeners = (formToValidate, {inputSelector, submitButtonSelector, inactiveButtonClass, ...rest}) => {
    const formInputs = Array.from(formToValidate.querySelectorAll(inputSelector))
    const formButton = formToValidate.querySelector(submitButtonSelector)
    disableButton(formButton, inactiveButtonClass)

    formToValidate.addEventListener('reset', () => {
        disableButton(formButton, inactiveButtonClass);
    })

    formInputs.forEach((input) => {
        input.addEventListener('input', () => {
            checkValidity(input, rest)
            if(hasInvalidInput(formInputs)){
                disableButton(formButton, inactiveButtonClass)
            } else {
                enableButton(formButton, inactiveButtonClass)
            }
        })
    })
}

const checkValidity = (input, {...rest}) => {
    if(input.checkValidity()){
        hideInputError(input, rest)
    } else {
        showInputError(input, rest)
    }
}

const hasInvalidInput = (formInputs) => { 
    return formInputs.some(item => !item.validity.valid) 
} 

const showInputError = (input, {inputErrorClass, errorClass}) => { 
    const inputErrorContainer = document.querySelector(`.${input.id}-error`) 
    inputErrorContainer.textContent = input.validationMessage; 
    input.classList.add(inputErrorClass); 
    inputErrorContainer.classList.add(errorClass); 
}

const hideInputError = (input, {inputErrorClass, errorClass}) => { 
    const inputErrorContainer = document.querySelector(`.${input.id}-error`) 
    inputErrorContainer.textContent = ''; 
    inputErrorContainer.classList.remove(errorClass); 
    input.classList.remove(inputErrorClass); 

}

const enableButton = (button, inactiveButtonClass) => {
    button.classList.remove(inactiveButtonClass)
    button.removeAttribute('disabled', '')
}

const disableButton = (button, inactiveButtonClass) => {
    button.classList.add(inactiveButtonClass)
    button.setAttribute('disabled', '')
}


enableValidation(validationConfig)