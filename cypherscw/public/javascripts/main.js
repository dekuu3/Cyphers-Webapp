
//Encrypt message button - Checks dropdown and picks the correct cypher
function encrypt()
{
    var e = document.getElementById("dd");
    var dropdownoption = e.options[e.selectedIndex].value;
    if(dropdownoption == 1)
        {
            rot13();
        }
    if(dropdownoption == 2)
        {
            transposition();
        }
    if(dropdownoption ==3)
        {
            vigenere();
        }
}

//Decrypt message button - Checks dropdown and picks the correct cypher to decypher
function decrypt()
{
    var e = document.getElementById("dd");
    var dropdownoption = e.options[e.selectedIndex].value;
    if(dropdownoption == 1)
        {
            rot13();
        }
    if(dropdownoption == 2)
        {
            transposition();
        }
    if(dropdownoption ==3)
        {
			var isDecrypt = true;
            vigenere(isDecrypt);
        }
}

//ROT13 cypher - Rotates input message by 13 chars in the alphabet
function rot13()
{
	document.getElementById("error_text").value = null;
	var plain_text = document.getElementById("message").value;
	var cypher_text = [];
	var alphabet =['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']

	for(var idx =0; idx<plain_text.length ; idx++)
	{
		input = alphabet.indexOf(plain_text[idx]);
		if( input == -1 )
		{
			cypher_text.push(plain_text[idx]);
		}
		else
		{
			var coded = (input+13)%26;
			var letter = alphabet[coded];
			cypher_text.push(letter);
		}
	}
document.getElementById("message").value = cypher_text.join("");
}

//Transposition cypher - reverses the input string
function transposition()
{
	document.getElementById("error_text").value = null;
    //gets the user input onto a variable
	var plain_text = document.getElementById("message").value;
    //converts it into an array
    var splitString = plain_text.split("");
    //reverts array
    var reverseArray = splitString.reverse();

    //joins the now reversed chars, and adds it to output
document.getElementById("message").value = reverseArray.join("");
}

//Vigenère cipher encryption/decription.
function vigenere(isDecrypt)
{
	document.getElementById("error_text").value = null;
	if (document.getElementById("key").value.length == 0)
     {
		var errormsg1 = "Key is empty!";
  		var splitString = errormsg1.split("");
		document.getElementById("error_text").value = splitString.join("");
		return;
	}
	var key = filterKey(document.getElementById("key").value);
	if(key.length == 0)
     {
		var errormsg2 = "Key has no letters!";
		var splitString = errormsg2.split("");
  		document.getElementById("error_text").value = splitString.join("");
		return;
	}
	if(isDecrypt)
     {
		for (var i = 0; i < key.length; i++)
			key[i] = (26 - key[i]) % 26;
	}
	var textElem = document.getElementById("message");
	textElem.value = crypt(textElem.value, key);
	document.getElementById("error_text").value = null;
}

//Returns the result the Vigenère encryption on the given text with the given key
function crypt(input, key)
{
	var output = "";
	for (var i = 0, j = 0; i < input.length; i++)
     {
		var c = input.charCodeAt(i);
		if (isUppercase(c))
          {
			output += String.fromCharCode((c - 65 + key[j % key.length]) % 26 + 65);
			j++;
		}
          else if (isLowercase(c))
          {
			output += String.fromCharCode((c - 97 + key[j % key.length]) % 26 + 97);
			j++;
		}
          else
          {
			output += input.charAt(i);
		}
	}
     return output;
}

//Returns an array of numbers, each in the range [0, 26), representing the given key
//The key is case-insensitive, and non-letters are ignored.
function filterKey(key) {
	var result = [];
	for (var i = 0; i < key.length; i++)
     {
		var c = key.charCodeAt(i);
		if (isLetter(c))
			result.push((c - 65) % 32);
	}
	return result;
}

// Tests whether the specified character code is a letter
function isLetter(c)
{
	return isUppercase(c) || isLowercase(c);
}

// Tests whether the specified character code is an uppercase letter - 65 is character code for 'A'. 90 is 'Z'.
function isUppercase(c)
{
	return 65 <= c && c <= 90;
}

// Tests whether the specified character code is a lowercase letter - 97 is character code for 'a'. 122 is 'z'.
function isLowercase(c)
{
	return 97 <= c && c <= 122;
}

//checks if theres any webstorage available in the broswer
function storageAvailable(type)
{
	try
	{
		var storage = window[type], x = '__storage_test__';
		storage.setItem(x, x);
		storage.removeItem(x);
		return true;
	}
	catch(e)
	{
		return e instanceof DOMException && (
			e.code === 22 ||
			e.code === 1014 ||
			e.name === 'QuotaExceededError' ||
			e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
			storage.length !== 0;
	}
}

//Calls storageAvailable function with the value localStorage or sessionstorage to see which is available to use.
function signupuser()
{
	uservalidation();

	//var myname = localStorage.getItem('username');
	//console.log(myname);
}

//checks if user exists before adding to webstorage
function uservalidation()
{
	var i;
	var usernamerequested = document.getElementById("username_ta").value;
	var passwordrequested = document.getElementById("password_ta").value;
	postData('/test', {username: usernamerequested, password: passwordrequested})
	  .then(data => {
		  if(data.ok === true){
			  window.location.href = "/cyphers";
		  }
			else {
			alert("Username already exists.")		
			}
	  }
	  ) // JSON-string from `response.json()` call
	  .catch(error => console.error(error));



//se as 2 textareas tiverem cheias do this
	if(localStorage.getItem(usernamerequested) !== null)
	{
		console.log(usernamerequested + " -  username already exists, choose another one");
	}
	else
	{
		if(storageAvailable('localStorage'))
		{
			// //localStorage.setItem('username', usernamerequested);
			// var tempusername = JSON.parse(localStorage.getItem(usernamerequested)) || [];
			// var temppassword = JSON.parse(localStorage.getItem(passwordrequested)) || [];
	      // tempusername.push(usernamerequested);
			// temppassword.push(passwordrequested);
			localStorage.setItem(usernamerequested, passwordrequested);
	      console.log(localStorage.getItem('username'));
		}
		else
		{
			console.log("There's no storage available.");
		}
	}
}

function test12345()
{

	var dropd = document.getElementById("username_ta").value;
    var drophistory = JSON.parse(localStorage.getItem(dropd)) || [];
    drophistory.push(dropd);
    localStorage.setItem("username", JSON.stringify(drophistory));
	 console.log(drophistory);


}

function postData(url = '', data = {}) {
  // Default options are marked with *
    return fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
 }

/*
var j_str = '{" firstname ":" simon "}';
var j_obj = JSON.parse(j_str);
console.log(j_obj);
console.log(j_str);


console.log("local storage");
for (i = 0; i < localStorage.length; i++)   {
    console.log(localStorage.key(i) + "=[" + localStorage.getItem(localStorage.key(i)) + "]");
}
*/
