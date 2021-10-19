// CONSTANS
//#region constans
const bConsoleLog = true;
//#endregion

// EVENT LISTENERS
//#region eventlisteners
document.getElementById("btnValidatePesel").addEventListener("click", validatePeselHandler);
document.getElementById("txtPesel").addEventListener("click", clearValidation);
//#endregion

// GENERAL USAGE FUNCTIONS
//#region helpers
function FakeDataConsoleLog(text_to_log, function_name)
{
    if (bConsoleLog == true)
    { 
        console.log('Function: ' + function_name);
        console.log('        ' + text_to_log);
    }
}
//#endregion

// CLEAR VALIDATION DEVS
//#region clearValidation
function clearValidation()
{
    document.getElementById('divPeselOk').innerHTML = "";
}


// VALIDATE PESEL
//#region validatePesel
function validatePeselHandler()
{    
        
    var pesel = document.getElementById("txtPesel").value;
    FakeDataConsoleLog("Pesel: " + pesel, "validatePesel2");

    var bPeselOk = validatePesel(pesel);

    if (bPeselOk == true)
    {
        document.getElementById('divPeselOk').innerHTML = "<div  class='alert alert-success mt-3' role='alert'>Pesel jest prawidłowy.</div>";
    }
    else
    {
        document.getElementById('divPeselOk').innerHTML = "<div  class='alert alert-danger mt-3' role='alert'>Pesel nie jest prawidłowy.</div>";
    }  

}


function validatePesel(pesel) {
    
    var reg = /^[0-9]{11}$/;
    
    if(reg.test(pesel) == false) 
        return false;
    else
    {
        var digits = (""+pesel).split("");    

        if ((parseInt(pesel.substring( 4, 6)) > 31) || (parseInt(pesel.substring( 2, 4)) > 12))
            return false;
         
        var digitssum = (1*parseInt(digits[0]) + 3*parseInt(digits[1]) + 7*parseInt(digits[2]) + 9*parseInt(digits[3]) + 1*parseInt(digits[4]) + 3*parseInt(digits[5]) + 7*parseInt(digits[6]) + 9*parseInt(digits[7]) + 1*parseInt(digits[8]) + 3*parseInt(digits[9]))%10;
          
        if(digitssum==0) digitssum = 10;
        digitssum = 10 - digitssum;
 
        return (parseInt(digits[10])==digitssum);
    }
}
//#endregion