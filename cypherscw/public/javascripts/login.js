//checks username and password against the fs to log in users
function loginuser()
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
		postData('/login', {username: usernamerequested, password: passwordrequested})
		  .then(data =>
		 {
			  if(data.ok === true){
				  window.location.href = "/cyphers";
				  localStorage.setItem("logged_user", usernamerequested);
			  }
				else {
					var errorsignup1 = "Wrong username or password!";
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
