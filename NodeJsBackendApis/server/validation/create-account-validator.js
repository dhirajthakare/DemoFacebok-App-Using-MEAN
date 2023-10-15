exports.accountValidation = (res)=>{
    var errorMessage = {} ;

    let regName = /^[a-zA-z][a-zA-Z _]{2,15}$/;
    let regEmail=/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    let passReg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/
    if(res.fname=="" || !regName.test(res.fname) ){
        errorMessage.fname = "Your first name is not acceptable ";
    } if(res.lname=="" || !regName.test(res.lname) ){
        errorMessage.lname = "Your last name is not acceptable";
    } if(res.email=="" || !regEmail.test(res.email) ){
        errorMessage.email="Your email is invalid";
    }
    //   if(res.password=="" || !passReg.test(res.password) ){
    //     errorMessage.password = "Password Should be betweens 8-15 character which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character"
    // }
     if(res.gender==""){
        errorMessage.gender = "Gender should be selected"
    }

var dob = new Date(res.birthOfDate);
var month_diff = Date.now() - dob.getTime();
    var age_dt = new Date(month_diff); 
    var year = age_dt.getUTCFullYear();
    var age = Math.abs(year - 1970);
    // console.log(age);
    if(age < 12 ){
        errorMessage.birthOfDate = "Your age must be at least 12 year";
    }else if(!res.birthOfDate){
        errorMessage.birthOfDate = "Birthday is required";
    }
    if(Object.entries(errorMessage).length === 0){
        // console.log("right")
    }else{
        throw errorMessage;

    }

    
     
}