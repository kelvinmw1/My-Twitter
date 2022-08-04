document.getElementById("register").onclick = function(){
    var fullName = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    firebase.auth().createUserWithEmailAndPassword(email, password).then((userCred)=>{
      
        window.location.href = "home.html";
      
        alert("Account created");
    }).catch((error)=>{
        alert("account not created")
    })


}

document.getElementById("signin").onclick = function(){
    var userName = document.getElementById("username").value;
    var loginPassword = document.getElementById("loginpass").value;

     

    firebase.auth().signInWithEmailAndPassword(userName, loginPassword).then((usercred)=>{
        
         console.log("loggedin");

        window.location.href = "home.html";


    }).catch((error)=>{
        alert(error.message)
    })

       
 
   
}