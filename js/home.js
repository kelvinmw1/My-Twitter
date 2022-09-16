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
                let tweetId = doc.data().tweetId;

                if(theuserid == theId){

                    
                    content += '<div class="distweet">'; 
                            content += '<p class="tweetusername">'+theusername+'</p>'
                            content += '<p class="usertweet">'+theTweet+'</p>'

                            content +='<div class="tweeticons">'
                                content += '<i class="fa fa-comment-o" onclick = "commentmodal(\'' +tweetId+ '\')" aria-hidden="true" data-bs-toggle="modal" data-bs-target="#commentmodal"></i>'
                                content += '<i class="fa fa-retweet" aria-hidden="true"></i>'
                                content += '<i class="fa fa-heart-o" aria-hidden="true"></i>'
                                content += '<i class="fa fa-share-alt" aria-hidden="true"></i>'
                                content += '<i class="fa fa-ellipsis-v" onclick = "viewmodal(\'' +tweetId+ '\')" aria-hidden="true"data-bs-toggle="modal" data-bs-target="#viewmodal"></i>'
                               

                            content +='</div>'
                    content += '</div>';
                }
                
    
            })
                

            $("#alltweets").append(content);
            

        }) 

            })
        })//delete a tweet

        window.viewmodal = function(tweetId){
            
            document.getElementById("deletebtn").onclick = function(){
                firebase.firestore().collection("tweets").doc(tweetId).delete().then(()=>{
                    window.location.href = "home.html"
                })
            }
             //edit a tweet
        document.getElementById("savechanges").onclick = function(){
            let edittweet = document.getElementById("edittweet").value;
            firebase.firestore().collection("tweets").doc(tweetId).update({
                theTweet:edittweet
            }).then(()=>{
                window.location.reload();
            })
               
        }
        //like a tweet

        // document.getElementById("likebtn").onclick = function(){
        //     console.log("mine")
        //     //read tweets
        //     firebase.firestore().collection("tweets").doc(tweetId).get().then((doc)=>{
        //         let totallikes = doc.data().likes;
        //         let addLikes = totallikes + 1;

        //         console.log("addLikes")

        //         firebase.firestore().collection("tweets").doc(tweetId).update({
        //             likes:addLikes


        //         }).then(()=>{
        //             window.location.reload();

        //         })
        //     })
        // }
      
        }
        //commenting
        window.commentmodal = function(tweetId){

            //setting the tweet container to be blank whenever i open a new modal
            document.getElementById("allcomments").innerHTML = '';
           
            
            document.getElementById("commentbtn").onclick = function(){
                let comment = document.getElementById("comment").value;
                let timestamp = new Date();

                let addcomment = firebase.firestore().collection("comments").doc();
                addcomment.set({
                
                    userId:userId,
                    comment:comment,
                    commentId:addcomment.id,
                    tweetId:tweetId,
                    timestamp:timestamp
    
                }).then(()=>{
                    window.location.reload();
                })

    
            }
            //end
            //read comments
            firebase.firestore().collection("comments").where("tweetId", "==", tweetId).get().then((querySnapshot) =>{
                
                let content = '';

                querySnapshot.forEach((doc) =>{
                    
                    let comment = doc.data().comment;
                    console.log(comment);

                    content += '<div>';
                        content += '<p>'+comment+'</p>';
                    content += '</div>';        
                
                })

                $("#allcomments").append(content);
                })

        }
       


        


    }else{
        window.location.reload();
    }

    

})

