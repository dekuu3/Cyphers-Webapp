//checks if both username box and pw box are filled, then checks the fs to see if username is already in use
//and adds users to the fs and redirects them to /cyphers
function signupuser()
{
	var usernamerequested = document.getElementById("username_ta").value;
	var passwordrequested = document.getElementById("password_ta").value;

	if(!usernamerequested || !passwordrequested)
	{
		var errorsignup1 = "No fields can be empty!";
		var splitString = errorsignup1.split("");
		document.getElementById("signuperrormsg").value = splitString.join("");
	}
	else
	{
		postData('/signup', {username: usernamerequested, password: passwordrequested})
		  .then(data =>
		 {
			  if(data.ok === true){
				  window.location.href = "/cyphers";
				  localStorage.setItem("logged_user", usernamerequested);
			  }
				else {
					var errorsignup1 = "Username already in use!";
					var splitString = errorsignup1.split("");
			  		document.getElementById("signuperrormsg").value = splitString.join("");
				}
		  }
	  )
		  .catch(error => console.error(error));
	}
}

function postData(url = '', data = {}) {
    return fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {"Content-Type": "application/json",},
        redirect: "follow",
        referrer: "no-referrer",
        body: JSON.stringify(data),
    });
 }
