
//registering A New User//

document.getElementById("signUp").onclick = function(){
    let fullName = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let timeStamp = new Date();

    

    firebase.auth().createUserWithEmailAndPassword(email, password).then((userCred)=>{

        let theuserId = userCred.user.uid;

        firebase.firestore().collection("users").doc(theuserId).set({
            userName:fullName,
            userEmail:email,
            signUptime:timeStamp,
            userId:theuserId,
        }).then(()=>{

            window.location.href = "home.html";

        })
      
        
      
        alert("Account created");
    }).catch((error)=>{
        alert("account not created")
    })
}

//End//

