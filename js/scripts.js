// CONSTANS
//#region constans
const bConsoleLog = false;
const MIN_YEAR = 1930;
const MAX_YEAR = 2015;
//#endregion

// EVENT LISTENERS
//#region eventlisteners
document.getElementById("btnValidatePesel").addEventListener("click", validatePeselHandler);
document.getElementById("btnGeneratePesel").addEventListener("click", generatePesel);
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

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
//#endregion

// CLEAR VALIDATION DEVS
//#region clearValidation
function clearValidation()
{
    document.getElementById('divPeselOk').innerHTML = "";
}
//#endregion

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
    
    /*var reg = /^[0-9]{11}$/;
    
    if(reg.test(pesel) == false) 
        return false;
    else
    {*/
        var digits = (""+pesel).split("");    

        if ((parseInt(pesel.substring( 4, 6)) > 31) || (parseInt(pesel.substring( 2, 4)) > 32))
            return false;
         
        var digitssum = (1*parseInt(digits[0]) + 3*parseInt(digits[1]) + 7*parseInt(digits[2]) + 9*parseInt(digits[3]) + 1*parseInt(digits[4]) + 3*parseInt(digits[5]) + 7*parseInt(digits[6]) + 9*parseInt(digits[7]) + 1*parseInt(digits[8]) + 3*parseInt(digits[9]))%10;
        
        FakeDataConsoleLog("digitssum: " + digitssum, "validatePesel");
        if(digitssum==0) digitssum = 10;
        digitssum = 10 - digitssum;
 
        return (parseInt(digits[10])==digitssum);
    //}
}
//#endregion

// GENERATE PESEL
function daysInMonth (month, year) {
    return new Date(year, month, 0).getDate();
}

function getMonthOffset(century) {
    switch (century) {
    case 18: return 80;
    case 19: return 0;
    case 20: return 20;
    case 21: return 40;
    case 22: return 60;
    }
}

function get_control_digit(pesel_digits)
{
    var sum =0;
    var multiply_digits = [1,3,7,9,1,3,7,9,1,3];
    var digits_sum = new Array(10);

    multiply_digits.forEach(function(item, index, array)  {
        digits_sum[index] =  pesel_digits[index] *  multiply_digits[index];
        sum += digits_sum[index]%10;
    })
    FakeDataConsoleLog("sum: " + sum, "generatePesel");
    if(sum%10==0) {
        sum = 10;
        return 10 - sum;    
    }
    else
    {
        return 10 - (sum%10);    
    }
}

function generatePesel()
{
    clearValidation();
    
    var pesel_year = getRandomInt(MIN_YEAR, MAX_YEAR);
    var pesel_month = getRandomInt(1, 12);
    var pesel_day = getRandomInt(1, daysInMonth(pesel_month, pesel_year));

    var century = Math.floor(pesel_year / 100);
    var monthOffset = getMonthOffset(century);
    pesel_month = pesel_month + monthOffset;

    var pesel_string = pesel_year.toString().substring(2) + pesel_month.toString().padStart(2, '0') + pesel_day.toString().padStart(2, '0');

    var pesel_digits = pesel_string.split('');
    
    for (let i = 6; i < 10; i++) {
        pesel_digits[i] = getRandomInt(1, 9);
        pesel_string += pesel_digits[i];
    }

    pesel_digits[10] = get_control_digit(pesel_digits);
    FakeDataConsoleLog("pesel_digits[10]: " + pesel_digits[10], "generatePesel");
    pesel_string += pesel_digits[10];

    
    document.getElementById("txtPesel").value = pesel_string;

    return pesel_string;

}