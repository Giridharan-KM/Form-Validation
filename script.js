const form = document.querySelector('#form')
const username = document.querySelector('#username')
const email = document.querySelector('#email')
const password = document.querySelector('#password')
const cpassword = document.querySelector('#cpassword')

form.addEventListener('submit', (e)=> {
    if(!validateInputs()) {
        e.preventDefault();
    }
    else if(validateInputs){
        alert("Form Submitted Successfully!")
    }
});

function validateInputs() {
    const usernameVal = username.value.trim();
    const emailVal = email.value.trim();
    const passwordVal = password.value.trim();
    const cpasswordVal = cpassword.value.trim();
    let success = true;
// username Validation:
    if(usernameVal === '') {
        success = false;
        setError(username, "Username is required")
    }
    else {
        setSuccess(username)
    }
// email Validation:
    if(emailVal === '') {
        success = false;
        setError(email, "Email is required")
    }
    else if(!validateEmail(emailVal)) {
        success = false;
        setError(email, 'Please enter a valid email')
    }
    else {
        setSuccess(email)
    }
// password Validation:
    if(passwordVal === '') {
        success = false;
        setError(password, 'Password is required')
    }
    else if(passwordVal.length<8) {
        success = false;
        setError(password, 'Password must be atleast 8 character long')
    }
    else {
        setSuccess(password)
    }
// cpassword Validation:
    if(cpasswordVal === '') {
        success = false;
        setError(cpassword, 'Confirm password is required')
    }
    else if(cpasswordVal !== passwordVal) {
        success = false;
        setError(cpassword, 'Password does not match')
    }
    else {
        setSuccess(cpassword)
    }

    return success;

}
//element - password, msg - password is required
function setError(element, message) {
    const inputGroup = element.parentElement;
    const errorElement = inputGroup.querySelector(".error")

    errorElement.innerText = message;
    inputGroup.classList.add('error');
    inputGroup.classList.remove('success');
}

function setSuccess(element) {
    const inputGroup = element.parentElement;
    const errorElement = inputGroup.querySelector(".error")

    errorElement.innerText = "";
    inputGroup.classList.add('success');
    inputGroup.classList.remove('error');
}

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        );
};



// Send data to Google Sheet
form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (validateInputs()) {
        const formData = new FormData();
        formData.append('username', username.value.trim());
        formData.append('email', email.value.trim());
        formData.append('password', password.value.trim());
        formData.append('cpassword', cpassword.value.trim());

        fetch('https://script.google.com/macros/s/AKfycbzfY9ZLQ5jZQ3OI4trIE3tiv7NpKNboH8-FvQFGkRtWLMPO3izR1F0_3T_bovwi4Vyn/exec', {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                alert('Form Submitted Successfully!');
                form.reset();
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Submission failed');
            });
    }
});














