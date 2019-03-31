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
	if (document.getElementById("key").value.length == 0) 
     {
		alert("Key is empty");
		return;
	}
	var key = filterKey(document.getElementById("key").value);
	if(key.length == 0) 
     {
		alert("Key has no letters");
		return;
	}
	if(isDecrypt) 
     {
		for (var i = 0; i < key.length; i++)
			key[i] = (26 - key[i]) % 26;
	}
	var textElem = document.getElementById("message");
	textElem.value = crypt(textElem.value, key);
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