(function() {
  var messages= [];
  fetch("/inbox?username=" + localStorage.getItem("logged_user"))
  .then(response =>
    response.json())
  .then(body => {
    messages = body;
    for (var i = 0; i < messages.length; i++) {
      var li = document.createElement("li");
      var link = document.createElement("a");
      link.textContent = messages[i];
      link.href="/cyphers?message="+messages[i];
      li.appendChild(link);
      document.body.appendChild(li);
    }
  })
  .catch(error =>
    console.error('Error:', error));
}

)();

function sendmsg(){
	document.getElementById("error_text").value = null;
	var e = document.getElementById("dd");
	var dropdownoption = e.options[e.selectedIndex].value;

	if (document.getElementById("key").value.length == 0 && dropdownoption == 3)
     {
		var errormsg1 = "Key is empty!";
  		var splitString = errormsg1.split("");
		document.getElementById("error_text").value = splitString.join("");
		return;
	}
	var key = filterKey(document.getElementById("key").value);
	if(key.length == 0 && dropdownoption == 3)
     {
		var errormsg2 = "Key has no letters!";
		var splitString = errormsg2.split("");
  		document.getElementById("error_text").value = splitString.join("");
		return;
	}
	if(document.getElementById("msgusername").value.length == 0 )
     {
		var errormsg2 = "The username field is empty!";
		var splitString = errormsg2.split("");
  		document.getElementById("error_text").value = splitString.join("");
		return;
	}

  var usermessage = {"username": document.getElementById("msgusername").value,
  "message": document.getElementById("message").value };
  fetch("/sendmsgs", {
    method: 'POST',
    body: JSON.stringify(usermessage),
    headers:{
    'Content-Type': 'application/json'
  }})
  .then(response =>{
    console.log('Success:', JSON.stringify(response))})
  .catch(error =>
    console.error('Error:', error));
}
