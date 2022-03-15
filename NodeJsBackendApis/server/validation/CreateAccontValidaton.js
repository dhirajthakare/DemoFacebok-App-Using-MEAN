exports.AccontValid = (res)=>{
    var errormessage = {} ;

    let regName = /^[a-zA-z][a-zA-Z _]{2,15}$/;
    let regemail=/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    let passReg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/
    if(res.fname=="" || !regName.test(res.fname) ){
        errormessage.fname = "Your first name is not acceptable ";
    } if(res.lname=="" || !regName.test(res.lname) ){
        errormessage.lname = "Your last name is not acceptable";
    } if(res.email=="" || !regemail.test(res.email) ){
        errormessage.email="Your email is invalid";
    }
    //   if(res.password=="" || !passReg.test(res.password) ){
    //     errormessage.password = "Password Should be betweent 8-15 character which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character"
    // }
     if(res.gender==""){
        errormessage.gender = "Gender should be selected"
    }

var dob = new Date(res.birthOfDate);
var month_diff = Date.now() - dob.getTime();
    var age_dt = new Date(month_diff); 
    var year = age_dt.getUTCFullYear();
    var age = Math.abs(year - 1970);
    // console.log(age);
    if(age < 12 ){
        errormessage.birthOfDate = "Your age must be atleast 12 year";
    }else if(!res.birthOfDate){
        errormessage.birthOfDate = "Birthday is required";
    }
    if(Object.entries(errormessage).length === 0){
        // console.log("right")
    }else{
        throw errormessage;

    }

    
     
}