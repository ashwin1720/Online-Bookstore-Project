let myForm = document.getElementById('loginForm');

let errorDiv = document.getElementById('error');
var username = document.getElementById('author_username')
var password = document.getElementById('author_password')
// alert("HELLO")
if (myForm) {
    myForm.addEventListener('submit', (event) => {
     //alert("Hiiiii")
      if (username.value.trim() && password.value.trim()) {
        //alert("Iffffff")
        if (/\s/.test(username.value.trim()) || /\s/.test(password.value.trim())) {
            username.value = '';
        password.value='';
            errorDiv.hidden = false;
        errorDiv.innerHTML = "Space is not allowed inside username or passsword";
        event.preventDefault();
        }
        else if(password.value.trim().length<6){
          username.value-username.value
            password.value='';
            errorDiv.hidden = false;

        errorDiv.innerHTML = "Password Should Be Of Atleast 6 Characters Long.";
        event.preventDefault();

        }
        else if(username.value.trim().length<4){
            username.value='';
            password.value='';
            errorDiv.hidden = false;
            
        errorDiv.innerHTML = "Username Should Be Of Atleast 4 Characters Long.";
        event.preventDefault();
        }
        else{
            return true;
        }

        // myForm.reset();
      } else {
        username.value = '';
        password.value='';
        errorDiv.hidden = false;
        errorDiv.innerHTML = 'You must enter a value';
        textInput.focus();
        event.preventDefault();
      }
    });
  }
  