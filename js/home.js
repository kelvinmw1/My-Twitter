firebase.auth().onAuthStateChanged((user)=>{

    if(user){
        console.log("user is logged in");

        //logic

        //check user id

        var userId = user.uid;
        var userEmail = user.email;
        console.log(userId);
        console.log(userEmail);

         //send tweet
        document.getElementById("twt").onclick = function(){

            let tweet = document.getElementById("tweetvalue").value;

            let timestamp = new Date();

           

            firebase.firestore().collection("tweets").doc().set({

                theTweet:tweet,
                tweetTime:timestamp,
                userId:userId

            }).then(()=>{
                window.location.reload();

            }).catch((error)=>{
                
            })

        }
        //end

        //logging out a user
        
        document.getElementById("logout").onclick = function(){

            firebase.auth().signOut().then(()=>{
                window.location.href = "index.html";
            })
        }
        //end

        //pulling all users from the user collection and retrieve the user id
        //use the retrieved id to compare with the id from the tweet collection to find out who tweeted

        firebase.firestore().collection("users").get().then((allusers)=>{
            allusers.forEach((theuser)=>{
                var theuserid = theuser.data().userId;
                var theusername = theuser.data().userName;

            })
        })

        //pulling all tweets

        firebase.firestore().collection("tweets").get().then((querySnapshot)=>{

            var content = '';

            querySnapshot.forEach((doc)=>{
                var theTweet = doc.data().theTweet;
                var theId = doc.data().userId;

                if(theuserid == theId){

                    content += '<div class="distweet">';  
                
                            content +='<div class="matweet">'
                                content += '<p class="img"></p>';
                                content +='<h1>  </h1>';
                                content +='<h2></h2>';
                                content +='<h3></h3>';
                            content +='</div>'

                            content += '<p class="tweetusername">'+userName+'</p>'
                            content += '<p>'+theTweet+'</p>'

                            content +='<div class="maneno">'
                                content += '<i class="fa fa-comment-o" aria-hidden="true"></i>'
                                content += '<i class="fa fa-retweet" aria-hidden="true"></i>'
                                content += '<i class="fa fa-heart-o" aria-hidden="true"></i>'
                                content += '<i class="fa fa-share-alt" aria-hidden="true"></i>'

                            content +='</div>'

                    content += '</div>';
                }
    
            })

            $("#alltweets").append(content);

        })


    }else{
        window.location.href = "index.html";
    }

    

})