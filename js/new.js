document.getElementById("register").onclick = function(){
    var fullName = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var timeStamp = new Date();

    

    firebase.auth().createUserWithEmailAndPassword(email, password).then((userCred)=>{

        let userid = userCred.user.uid;

        firebase.firestore().collection("users").doc(userid).set({
            userName:fullName,
            userEmail:email,
            signUptime:timeStamp,
            userid:userid
        }).then(()=>{

            window.location.href = "home.html";

        })
      
        
      
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