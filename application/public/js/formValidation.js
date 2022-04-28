
function matchingPasswords(reEnteredPassword, password) {
    return reEnteredPassword == password
}

function usernameStartsWithLetter(username) {
    const regex = /^[a-zA-Z]/;
    return regex.test(username);
}

function usernameLengthAtleastMin(username) {
    return username.length > 2;
}

function usernameIsOnlyAlphaNumeric(username) {
    const regex = /^[a-zA-Z0-9]+$/;
    return regex.test(username);
}

function passwordLengthAtleastMin(password) {
    return password.length > 7;
}

function passwordHasUpperCaseLetter(password) {
    const regex = /[A-Z]/;
    return regex.test(password);
}

function passwordHasNumber(password) {
    const regex = /\d/;
    return regex.test(password);
}

function passwordHasSpecialCharacter(password) {
    const regex = /(\/\*\-\+\!@#\$\^\&)\./;
    return regex.test(password);
}


function arrayToString(arr) {
    str = "";
    for( i = 0; i < arr.length; i++ )
    {
        str += "-" + arr[i] + "\n";
    }
    return str;
}

function displayErrors() {
    var password = document.getElementById('password').value;
    var username = document.getElementById('username').value;
    var reEnteredPassword = document.getElementById('re-enter-password').value;
    errors = []
    if( !matchingPasswords(reEnteredPassword, password))
    {
        errors.push("passwords don't match\n")
    }
    if( !usernameStartsWithLetter(username) )
    {
        errors.push("Username needs to start with a letter\n");
    }
    if( !usernameIsOnlyAlphaNumeric(username) )
    {
        errors.push("Username can only have letters and numbers\n");
    }
    if( !usernameLengthAtleastMin(username) )
    {
        errors.push("Username isn't long enough. Must have over 3 or more characters\n");
    }
    if( !passwordLengthAtleastMin(password) )
    {
        errors.push("The password needs to be atleast 8 characters long\n");
    }
    if( !passwordHasUpperCaseLetter(password) )
    {
        errors.push("The passwords needs an uppercase letter\n");
    }
    if( !passwordHasNumber(password) )
    {
        errors.push("The password needs a number\n");
    }
    if( !passwordHasSpecialCharacter(password) )
    {
        errors.push("The password needs one of the following special characters ( / * - + ! @ # $ ^ & * ).\n");
    }
    alert(arrayToString(errors));
    return errors.length != 0;
}

function submitForm(event) {
    console.log('went into method');
    if( displayErrors() ) {
        event.preventDefault();
    }
}
