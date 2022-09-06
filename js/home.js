firebase.auth().onAuthStateChanged((user)=>{

    if(user){
        console.log("user is logged in");
        

       

        //check user id

        var userId = user.uid;
        var userEmail = user.email;
        var userName = user.userName;

        
        //send tweet
        document.getElementById("tweet").onclick = function(){

            let tweet = document.getElementById("tweetvalue").value;
            

            let timestamp = new Date();

           

           let sendtweet = firebase.firestore().collection("tweets").doc();
            sendtweet.set({

                theTweet:tweet,
                tweetTime:timestamp,
                userId:userId,
                tweetId:sendtweet.id

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

               // pulling all tweets


        firebase.firestore().collection("tweets").get().then((querySnapshot)=>{

            var content = '';

            querySnapshot.forEach((doc)=>{
                var theTweet = doc.data().theTweet;
                var theId = doc.data().userId;

                if(theuserid == theId){

                    
                    content += '<div class="distweet">'; 
                            content += '<p class="tweetusername">'+theusername+'</p>'
                            content += '<p class="usertweet">'+theTweet+'</p>'

                            content +='<div class="tweeticons">'
                                content += '<i class="fa fa-comment-o" aria-hidden="true"></i>'
                                content += '<i class="fa fa-retweet" aria-hidden="true"></i>'
                                content += '<i class="fa fa-heart-o" aria-hidden="true"></i>'
                                content += '<i class="fa fa-share-alt" aria-hidden="true"></i>'
                                content += '<i class="fa fa-ellipsis-v" aria-hidden="true"data-bs-toggle="modal" data-bs-target="#exampleModal"></i>'
                               

                            content +='</div>'
                    content += '</div>';
                }
    
            })

            $("#alltweets").append(content);

        })

            })
        })

        


    }else{
        window.location.href = "index.html";
    }

    

})