firebase.auth().onAuthStateChanged((user)=>{

    if(user){
        console.log("user is logged in");

        //logic

        //check user id

        var userId = user.uid;
        var userEmail = user.email;
        console.log(userId);
        console.log(userEmail);



         //logging out a user
        document.getElementById("logout").onclick = function(){

            firebase.auth().signOut().then(()=>{
                window.location.href = "index.html";
            })
        }









    }else{
        window.location.href = "index.html";
    }

    

})