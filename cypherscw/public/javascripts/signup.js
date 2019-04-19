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

//validates user, checks if all boxes are filled and then adds to db if successfull
function signupuser()
{
	var i;
	var usernamerequested = document.getElementById("username_ta").value;
	var passwordrequested = document.getElementById("password_ta").value;

	if(!usernamerequested || !passwordrequested)
	{
		alert("Must write username and password!");
	}
	else
	{
		postData('/test', {username: usernamerequested, password: passwordrequested})
		  .then(data =>
		 {
			  if(data.ok === true){
				  window.location.href = "/cyphers";
			  }
				else {
				alert("username already exists")
				}
		  }
		  ) // JSON-string from `response.json()` call
		  .catch(error => console.error(error));
	}
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

function loginuser()
{

}
