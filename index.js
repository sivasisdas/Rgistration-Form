//individual input tag,radio, select tag
const myForm= document.getElementById("reg_form");
const firstName = document.getElementById("first-name");
const lastName = document.getElementById("last-name");
const dob = document.getElementById("dob");
const gender = document.querySelectorAll(".radio");
const email = document.getElementById("email-first");
const newPassword = document.getElementById("new-password");
const checkPassword = document.getElementById("check-password");
const see = document.querySelectorAll(".see");
const popover = document.getElementById("popover");
const add1 = document.getElementById("add-1");
const add2 = document.getElementById("add-2");
const zip = document.getElementById("zip-code");
const countryField = document.getElementById("country");
const stateField = document.getElementById("state");
const cityField = document.getElementById("city");
const phone1 =document.getElementById("phone-1");
const phone2 =document.getElementById("phone-2");
const cgpa_points =document.getElementById("cgpa");
const mark_12 =document.getElementById("mark12");
const grad_mark =document.getElementById("grad-mark");
const degree_marks =document.getElementById("degree-mark");
const gender1 = document.getElementById("radio");

// for showing the modal after completion
const $fullName = document.querySelector(".txtfull-name")
const $date = document.querySelector(".txtdate")
const $gender = document.querySelector(".txtgender")
const $email = document.querySelector(".txtemail")
const $pwd = document.querySelector(".txtpwd")
const $add1 = document.querySelector(".txtadd1")
const $add2 = document.querySelector(".txtadd2")
const $zip = document.querySelector(".txtzip")
const $country = document.querySelector(".txtcountry")
const $state = document.querySelector(".txtstate")
const $city = document.querySelector(".txtcity")
const $phone1 = document.querySelector(".txtphone1")
const $phone2 = document.querySelector(".txtphone2")
const $10th = document.querySelector(".txt10th")
const $12th = document.querySelector(".txt12th")
const $grad = document.querySelector(".txtgrad")
const $degree = document.querySelector(".txtdegree")


// modal
const modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];



// warning tag
const warn = document.getElementsByClassName("warning");

// individual warn tag
const gender_warn= document.getElementById("gender_warn");
const state_warn= document.getElementById("state_warn");
const city_warn= document.getElementById("city_warn");


// buttons
const submit = document.getElementById("submit-btn");
const reset = document.getElementById("reset-btn");

let gender_name; // to capture the gender_value


// Reset The Form--------------------
reset.addEventListener("click",()=>{
    if(confirm("Do You Want to Reset this Form!")){
        location.reload();
    }    
})

// Submit The form--------------------
myForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    console.log("default prevented");
    console.log("country name is :"+ country_name);
    console.log("full name is :"+ `${fname} ${lname}`);
    console.log("gender name is :"+ `${gender_name}`);
    console.log("dob is :"+ `${dob.value}`);


    let isFormValid = 0;

    checkFirstName()
    checkLastName()
    dateOBirth()
    checkEmail()
    checkNewPassword()
    matchNewPassword()
    checkAddress()
    checkZipCode()
    checkPhone1()
    checkPhone2()
    checkMark12()
    checkCgpa10()
    checkGrad()
    checkDegree()

    // check for gender before submit---------------
    if(!gender_warn.classList.contains("success")){
        check_gender();
    }

    // check for location before submit-------------
    if((!state_warn.classList.contains("success"))&&(!city_warn.classList.contains("success"))){
        handleCountryChange();
    }

    
    for(let i = 0; i<warn.length; i++){
        if(warn[i].classList.contains("success")){
            isFormValid++
        }
       
    }
    if(isFormValid == 18){
        $fullName.textContent = `${fname} ${lname}`;
        $date.textContent = `${dob.value}`;
        $gender.textContent = `${gender_name}`;
        $email.textContent = `${emailStr}`;
        $pwd.textContent = `${userPassword}`;
        $add1.textContent = `${addValue1}`;
        $add2.textContent = `${addValue2}`;
        $zip.textContent = `${zipNum}`;
        // $country.textContent = `${countryField.ariaSelected.text}`;
        // $state.textContent = `${stateField.ariaSelected.value}`;
        // $city.textContent = `${cityField.name}`;
        $phone1.textContent = `${ph1}`;
        $phone2.textContent = `${ph2}`;
        $10th.textContent = `${cgpa}`;
        $12th.textContent = `${mark}`;
        $grad.textContent = `${grad}`;
        $degree.textContent = `${degree}`;

        modal.style.display = "block";

        const close = document.getElementById("close").addEventListener("click",()=>{
            location.href = myForm.getAttribute("action");
        })
        

    }
 
});

// // When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
  }

// name is checked at validName and the event.target is sent to create the result

// first Name--------------------------------------------
let fname;
const checkFirstName = ()=>{
    fname = firstName.value.trim();
    if(fname == ""){
        setErrorMsg(firstName, "Please enter first name")
    }else{

        validateName(firstName,fname)
    }
}
    
// last Name-------------------------------------------------
let lname;
const checkLastName = ()=>{
    lname = lastName.value.trim();
    if(lname == ""){
        setErrorMsg(lastName, "Please enter last name")
    }else{

        validateName(lastName,lname)
    }
}
    

// Name Validation +++++++++++++++++++++++++++++

function validateName(target,name){
    let regex = /^([a-zA-Z\s]){3,}$/g;
    if(regex.test(name)){
        
        setCorrectMsg(target);
        
    }else{
        
        setErrorMsg(target, "Please enter valid value");
        
    }    
}

// Date Validation +++++++++++++++++

const dateOBirth = ()=>{
    let date = dob.value.replaceAll("-","");
    let year = date.slice(0,4);
    if(date == ""){
        setErrorMsg(dob,"please enter ur DOB");
    }else{
        if((year >= 1950)&&(year <=2010)){
           setCorrectMsg(dob);
        }else{
          setErrorMsg(dob,"Input a date between 1950 and 2010");
        }
    }
}

// gender-------------------------------
const check_gender = ()=>{
    console.log("gender is:"+event.target.value);
    if(event.target.value !== undefined){
        gender_name= event.target.value;
        console.log("jimy");
        setCorrectMsg(gender1);
        
    }else if(event.target.value==undefined){

        setErrorMsg(gender1,"Please select your gender");
    }
    
}

// Email - Verification ++++++++++++++++++++++++++++++++
let emailStr;
const checkEmail = ()=>{
    let regex = /^[A-Za-z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/g;
    emailStr = email.value.trim();
    if(emailStr == ""){
        setErrorMsg(email,"please enter a valid Email")
    }else{
        if(regex.test(emailStr)){
            setCorrectMsg(email);
        }else{
            setErrorMsg(email,"Please enter email in abc@xyx.com format")
        }
    }
}
 
// password verification +++++++++++++++++++++++

// pop when focus---------------------------
newPassword.addEventListener("focus", ()=>{
    popover.style.display = "block";
});

// close when blur--------------------------
newPassword.addEventListener("blur", ()=>{
    popover.style.display = "none";
});

// checking new Password vaidation ----------------
let userPassword;
const checkNewPassword=()=>{
    userPassword = newPassword.value;
    console.log(userPassword);
    let regex  = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!*_])(?!.*\s).{8,30}$/g;
    let elem = newPassword.nextElementSibling;

    if(userPassword == ""){
        setErrorMsg(elem, "Please enter a new Password");
        checkPassword.setAttribute("disabled", true);
        checkPassword.value = "";
        checkPassword.style = "none"
        document.getElementById("check-password_warn").innerText ="";
    }else{
        if(regex.test(userPassword)){
            checkPassword.removeAttribute("disabled")
            setCorrectMsg(elem);
        }else{
            setErrorMsg(elem, "Please enter a valid Password");
        }
    }
}

// matching the user Input Password ----------------

const matchNewPassword = () =>{
    let checkUserPassword = checkPassword.value;
    console.log("Check User Password is: "+checkUserPassword);
    console.log("new password in check box is:"+ newPassword.value);
    let elem = checkPassword.nextElementSibling;
    if(checkUserPassword == ""){
        setErrorMsg(elem, "Please match the Password")
    }else{
        if(checkUserPassword == newPassword.value){
            setCorrectMsg(elem);
        }else{
            setErrorMsg(elem,"Do not match")
        }
    }
    
}
    
// to see the new and check Password -------------------------
see.forEach(look=>{
    console.log(look);
    look.addEventListener("click",(e)=>{
        if(look.classList.contains("fa-eye-slash")){
            look.classList.replace("fa-eye-slash", "fa-eye")
            e.target.previousElementSibling.type = "text"; 
        }else{
            look.classList.replace("fa-eye", "fa-eye-slash")
            e.target.previousElementSibling.type = "password";
        }
    })
    
})


// Address  Validation ++++++++++++++++++++++++++
let addValue1;
const checkAddress= () =>{
    addValue1 = add1.value.trim();
    if(addValue1 == ""){
        setErrorMsg(add1,"Please enter your address")
    }else{
        if(addValue1.length < 3){
            setErrorMsg(add1, "Please fill the complete address")
        }else{
            setCorrectMsg(add1)
        }
    }
}

// address optional ------------------------------------
let addValue2;
add2.addEventListener("change",()=>{
    addValue2 = add2.value.trim();
    if(addValue2.length > 3){
        setCorrectMsg(add2);
    }
})

// Zip code +++++++++++++++++++++++++++++++++++++++++
let zipNum;
const checkZipCode = ()=>{
    zipNum = zip.value
    if(zipNum == ""){
        setErrorMsg(zip, "please enter a zip code")
    }else{
        if(zipNum.length < 6){
            setErrorMsg(zip, "please set 6 digit code")
        }else{
            if(zipNum.length >= 6){
                zip.value = zipNum.substring(0,6)
                setCorrectMsg(zip)
            }
        
        }
    }
}

// Location+++++++++++++++++++++++++++++++++++++++++++

// cascading dropdown

document.onreadystatechange = () =>{
    if(document.readyState === "complete"){
        initApplication();
    }
    
};

const initApplication = () =>{
    populateCountryList();
}

// options are created here-------------------------------------------
const createOptionElement = (location) =>{
    const option = document.createElement("option");
    option.value = location.id;
    option.text = location.name;
    return option;
};

// populating counties list-------------------------------
function populateCountryList(){
    countries.forEach(country =>{
            const option = createOptionElement(country);
            countryField.appendChild(option);
        
        }
        
    )
    
};

// selecting country-------------------------------------------
let country_name;
const handleCountryChange = ()=>{
    const countryId = countryField.value;
    country_name = countryField.text;
    if (countryId == 0) {
        setErrorMsg(countryField, "Please select your country");
    }else{
        setCorrectMsg(countryField);
    }
    populateStateList(countryId);
    handleStateChange()     //for showing error in state fields if the country is changed
    populateCityList();
    handleCityChange();     //for showing error in city fields if the country is changed
}


// Populating the state list----------------------------------------

function populateStateList(countryId){
    
    stateField.innerHTML = '<option value="0">Select State</option>';
    if(countryId){
        states.forEach(state =>{
            if (state.countryId == countryId){  
                const option = createOptionElement(state)
                stateField.appendChild(option);
            }
        
        })
    }
    
}

// selecting state-------------------------------------------
const handleStateChange = ()=>{
    const stateId = stateField.value;
    if (stateId == 0) {
        setErrorMsg(stateField, "Please select your state");
    }else{
        setCorrectMsg(stateField);
    }
    populateCityList(stateId);
    handleCityChange();          //for showing error in city fields if the state is changed
}

// populating the city list---------------------------------
function populateCityList(stateId){
    cityField.innerHTML = '<option value="0">Select City</option>';
    if (stateId) {
        cities.forEach(city=>{
            if(city.stateId == stateId){
                const option = createOptionElement(city);
                cityField.appendChild(option);
            }
        })
    }
}

//  selecting city-------------------------------------------
const handleCityChange = ()=>{
    const cityId = cityField.value;
    if (cityId == 0) {
        setErrorMsg(cityField, "Please select your state");
    }else{
        setCorrectMsg(cityField);
    }
}
    

// Phone Number Validation +++++++++++++++++++++++++++

// phone 1 -------------------------------------------
let ph1;
const checkPhone1 = ()=>{
    ph1 = phone1.value;
    if(ph1 == ""){
        setErrorMsg(phone1,"Please enter your phone number")
    }else{
        if(ph1.length < 10){
            setErrorMsg(phone1, "please set 10 digit code")
        }else{
            if(ph1.length >= 10){
                phone1.value = ph1.substring(0,10)
                setCorrectMsg(phone1)
            }
        
        }
    }
}


// phone 2---------------------------------------------
let ph2;
const checkPhone2 = ()=>{
    ph2 = phone2.value;
    if(ph2 ==""){
        setErrorMsg(phone2,"Please enter your phone number");
    }else{    
        if(ph2.length < 10){
            setErrorMsg(phone2, "please set 10 digit code")
        }else{
            if(ph2.length >= 10){
                phone2.value = ph2.substring(0,10)
                setCorrectMsg(phone2)
            }
        
        }
    }
    
}

// 10th CGPA validation+++++++++++++++++++++++++++++++++++++
let cgpa;
const checkCgpa10 = () =>{
    cgpa  = cgpa_points.value;
    if(cgpa == ""){
        setErrorMsg(cgpa_points,"Please enter your 10th CGPA")
    }else{
        if((cgpa > 0 ) && (cgpa <= 10)){
            setCorrectMsg(cgpa_points)
        }else{
            if(cgpa > 10){
                setCorrectMsg(cgpa_points)
                cgpa_points.nextElementSibling.textContent="Correct, Range 0 - 10";
                cgpa_points.value = 10
            }
        
        }
    }
}

// 12th Marks ++++++++++++++++++++++++++++++++++++++++++++++++++++++
let mark;
const checkMark12 = ()=>{
    mark  = mark_12.value;
    // console.log(typeof mark);
    // console.log( mark > 10 ? (mark+10): "romy"); 
    if(mark == ""){
        setErrorMsg(mark_12,"Please enter your 12th marks")
    }else{
        if((mark > 0 ) && (mark <= 100)){
            // console.log("mark : "+ mark);
            setCorrectMsg(mark_12)
        }else{
            if(mark > 100){
                setCorrectMsg(mark_12)
                mark_12.nextElementSibling.textContent="Correct, Range 0 - 100";
                mark_12.value = 100;
            }
        }
    }
}
    
// Graduation Mark+++++++++++++++++++++++++++++++++++++++++++++++++++
let grad;
const checkGrad=()=>{
    grad  = grad_mark.value;
    if(grad == ""){
        setErrorMsg(grad_mark,"Please enter your Grad. marks")
    }else{
        if((grad > 0 ) && (grad <= 10)){
            // console.log("grad : "+ grad);
            setCorrectMsg(grad_mark)
        }else{
            if(grad > 10){
                setCorrectMsg(grad_mark)
                grad_mark.nextElementSibling.textContent="Correct, Range 0 - 10";
                grad_mark.value = 10;           
            }
        
        }
    }
}
 
// Degree Marks ++++++++++++++++++++++++++++++++++++++++++++++++++++++
let degree;
const checkDegree = ()=>{
    degree  = degree_marks.value;
    if(degree == ""){
        setErrorMsg(degree_marks,"Please enter your degree. marks")
    }else{
        if((degree > 0 ) && (degree <= 10)){
            // console.log("degree : "+ degree);
            setCorrectMsg(degree_marks)
        }else{
            if(degree > 10){
                setCorrectMsg(degree_marks)
                degree_marks.nextElementSibling.textContent="Correct, Range 0 - 10";
                degree_marks.value = 10;
            }
        }
    }
}

// for valid+++++++++++++++++++++++++++++++++++++++++++++++
function setCorrectMsg(target){

    let elem = target.nextElementSibling;
    elem.textContent = "Correct";
    target.style.border="2px solid green"


    // adding or removing class  for submitting
    if(elem.classList.contains("error")){
        elem.classList.replace("error","success");
    }else{
        elem.classList.add("success");
    }

    // for gender
    if(elem.id == "gender_warn"){
        target.style.border = "none";
    }

    // for Password
    if(elem.id == "new-password_warn" || elem.id == "check-password_warn"){
        target.style.border = "none";
        target.previousElementSibling.style.border = "2px solid green";
    }

}

// for invalid++++++++++++++++++++++++++++++++++++++++++++++
function setErrorMsg(target, msg){
    let elem = target.nextElementSibling;
    elem.textContent = msg;
    target.style.border="2px solid red"

    // adding or removing class  for submitting
    if(elem.classList.contains("success")){
        elem.classList.replace("success","error");
    }else{
        elem.classList.add("error");
    }

    // for gender
    if(elem.id == "gender_warn"){
        target.style.border = "none";
    }

    // for password
    if(elem.id == "new-password_warn" || elem.id == "check-password_warn"){
        target.style.border = "none";
        target.previousElementSibling.style.border = "2px solid red";
    }
}

// all the event triggers----------------------
firstName.addEventListener("keyup", checkFirstName);
lastName.addEventListener("keyup", checkLastName);
dob.addEventListener("change", dateOBirth);
email.addEventListener("keyup", checkEmail);
newPassword.addEventListener("keyup", checkNewPassword);
checkPassword.addEventListener("keyup",matchNewPassword);
add1.addEventListener("change",checkAddress);
zip.addEventListener("keyup",checkZipCode);
countryField.addEventListener("change", handleCountryChange);
stateField.addEventListener("change", handleStateChange);
cityField.addEventListener("change",handleCityChange);
phone1.addEventListener("input",checkPhone1);
phone2.addEventListener("change",checkPhone2);
mark_12.addEventListener("keyup",checkMark12);
cgpa_points.addEventListener("change",checkCgpa10);
grad_mark.addEventListener("input",checkGrad);
degree_marks.addEventListener("input",checkDegree);


