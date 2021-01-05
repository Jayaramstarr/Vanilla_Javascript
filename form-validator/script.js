const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');


const showError = (input,error)=>{
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    formControl.querySelector('small').innerText=error; 
}

const showSuccess = (input)=>{
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}


const checkRequired = (inputs)=>{
    inputs.forEach(input => {
        
        if(input.value.trim()=='')
            showError(input,`${getFeildName(input)} cannot be empty`);
        else
            showSuccess(input);

    });
}

const getFeildName = (input)=>{
    return  input.id.charAt(0).toUpperCase()+input.id.slice(1);
}

const checkLength = (input,min,max)=>{
    if(input.value.length<=min)
        return showError(input,`${getFeildName(input)} must be atleast ${min} characters`);
    if(input.value.length>=max)
        return showError(input,`${getFeildName(input)} must be greater ${max} characters`);
    showSuccess(input);
}

const validateEmail = (email)=>{
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(String(email.value.trim()).toLowerCase()))
        showSuccess(email);
    else
        showError(email,"Email is not valid");
}

const checkPasswordMatch = (input1,input2)=>{

    if(input1.value.trim()==input2.value.trim() && input2.value.trim()!='')
        return showSuccess(input2);
    if(input1.value.trim()==input2.value.trim())
        return showError(input2,'');
    showError(input1,"Passwords don't match");
    showError(input2,"Passwords don't match");

}

document.addEventListener('submit',(e)=>{

    e.preventDefault();
    
    checkRequired([username,email,password,password2]);
    checkLength(username,3,15);
    checkLength(password,6,25);
    validateEmail(email);
    checkPasswordMatch(password,password2);


});