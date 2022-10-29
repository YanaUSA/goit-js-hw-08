import throttle from "lodash.throttle";

let formData;
const sendDataAfterSubmit = {};

const refs = {
    form: document.querySelector(".feedback-form"),
    input: document.querySelector("input[name=email]"),
    textarea: document.querySelector("textarea[name=message]"),
};

refs.form.addEventListener("submit", onFormSubmit);
refs.form.addEventListener("input", throttle(onFormInputsEntry, 500));

function onFormSubmit(evt) {
    evt.preventDefault();

    if (refs.input.value === "" || refs.textarea.value === "") {
        return alert("Please fill all form fields before submit!")
    }

    // if (!refs.input.value || !refs.textarea.value) {
    //     return alert("Please fill all form fields before submit!")
    // }

    const onSubmitData = new FormData(evt.currentTarget);  

    onSubmitData.forEach((value, name) => {
        sendDataAfterSubmit[name] = value;
    });
    
    console.log(sendDataAfterSubmit)  
    
    evt.currentTarget.reset();
    localStorage.removeItem("feedback-form-state")
};

function onFormInputsEntry(evt) {
    formData = localStorage.getItem("feedback-form-state");
    formData = formData ? JSON.parse(formData) : {};

    formData[evt.target.name] = evt.target.value;
    localStorage.setItem("feedback-form-state", JSON.stringify(formData)) 
    console.log(formData)
};

savingInputsDataBeforeSubmit();

function savingInputsDataBeforeSubmit() {
    let savedFormData = localStorage.getItem("feedback-form-state");
    
    if (savedFormData) {   
        const savedDataParsed = JSON.parse(savedFormData);
        Object.entries(savedDataParsed).forEach(([name, value]) => {
            refs.form.elements[name].value = value;
        });
    };  
};