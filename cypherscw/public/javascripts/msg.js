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
