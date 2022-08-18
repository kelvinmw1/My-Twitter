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

        document.getElementById("twt").onclick = function(){

            let tweet = document.getElementById("tweetvalue").value;

            let timestamp = new Date();

            firebase.firestore().collection("tweets").doc().set({

                theTweet:tweet,
                tweetTime:timestamp
            }).then(()=>{
                window.location.reload();

            }).catch((error)=>{
                
            })

        }









    }else{
        window.location.href = "index.html";
    }

    

})