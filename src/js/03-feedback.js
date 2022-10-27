import throttle from "lodash.throttle";

const LOCALSTORAGE_KEY = "feedback-form-state";

const formData = {};

const refs = {
    form: document.querySelector(".feedback-form"),
    input: document.querySelector("input[name=email]"),
    textarea: document.querySelector("textarea[name=message]"),
};

refs.form.addEventListener("submit", onFormSubmit);
refs.textarea.addEventListener("input", throttle(onTextareaInput, 500));

refs.form.addEventListener("input", evt => {

    formData[evt.target.name] = evt.target.value;
    console.log(formData);
});



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

savingTextareaNoteBeforeSubmit();

function savingTextareaNoteBeforeSubmit() {
    const savedMessage = localStorage.getItem("LOCALSTORAGE_KEY");

    if (savedMessage) {    
        refs.textarea.value = savedMessage;
    };  
};


