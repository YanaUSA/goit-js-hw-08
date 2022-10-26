import throttle from "lodash.throttle";

const LOCALSTORAGE_KEY = "feedback-form-state";

const refs = {
    form: document.querySelector(".feedback-form"),
    input: document.querySelector("input[name=email]"),
    textarea: document.querySelector("textarea[name=message]"),
};

const formData = {};

console.log(formData)

refs.form.addEventListener("submit", onFormSubmit);
refs.form.addEventListener("input", onInputEntry);
refs.textarea.addEventListener("input", throttle(onTextareaInput, 500));



savingTextareaNoteBeforeSubmit();

function onFormSubmit(evt) {
    evt.preventDefault();
    evt.currentTarget.reset();
    localStorage.removeItem("LOCALSTORAGE_KEY")
};


function onTextareaInput(evt) {
    const message = evt.target.value;
    localStorage.setItem("LOCALSTORAGE_KEY", message)

    // console.log(message);
};

function savingTextareaNoteBeforeSubmit() {
    const savedMessage = localStorage.getItem("LOCALSTORAGE_KEY");

    if (savedMessage) {    
        refs.textarea.value = savedMessage;
    };  
};


onInputEntry();

function onInputEntry (evt) {
    formData[evt.target.name] = evt.target.value;
    console.log(formData);
};