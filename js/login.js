//Sign In A User//

document.getElementById("signIn").onclick = function(){

    let email= document.getElementById("email").value;
    let Password = document.getElementById("password").value;

     

    firebase.auth().signInWithEmailAndPassword(email, Password).then((usercred)=>{

        window.location.href = "home.html";


    }).catch((error)=>{
        alert(error.message)
    })

       
 
   
}