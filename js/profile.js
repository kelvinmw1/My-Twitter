// find out who is logged in using id
firebase.auth().onAuthStateChanged((user)=>{
    if(user){

        // getting user id 
        let userId = user.uid;
        let userEmail = user.email;
        

        // read data from firestore using userid

        firebase.firestore().collection("users").doc(userId).get().then((doc)=>{

            // get username based on the logic above

            let theUserName = doc.data().userName;
            var thebio = doc.data().bio;
            var thesite = doc.data().site;
            
        

            // set the element to contain the username date and email retrived above

            document.getElementById("username").innerText = theUserName
            document.getElementById("userbio").innerText = thebio
            document.getElementById("usersite").innerText = thesite

               //show username on text input
        document.getElementById("editname").value = theUserName;
        })

        //edit account
        document.getElementById("editchanges").onclick = function(){

           var editname = document.getElementById("editname").value;
           var editbio = document.getElementById("editbio").value;
           var editsite = document.getElementById("editsite").value;
           

            //save changes

            firebase.firestore().collection("users").doc(userId).update({

                userName:editname,
                bio:editbio,
                site:editsite,
    

            }).then(()=>{
                window.location.reload();
            })
        }  //upload profile photo
            document.getElementById("profilephoto").onclick = function(){
                //get files from html
                let myphoto = document.getElementById("profilepic").files[0];
                //storage reference

                let storageref = firebase.storage().ref();
                let uploadtask = storageref.child("photo/").child(Math.random() + myphoto.name).put(myphoto);

                uploadtask.on('state_changed', (snapshot)=>{
                    let uploadprogress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(uploadprogress)
                },(error)=>{
                    //handle unsuccessful uploads
                }, ()=>{
                    //handle successful uploads
                    console.log("image uploaded successfully")

                    //getting download url/ image / file link
                    uploadtask.snapshot.ref.getDownloadURL().then((downloadURL)=>{
                        console.log(downloadURL)

                        //updating the image uploaded to my firestore
                        firebase.firestore().colletion("users").doc(userId).update({
                            profilephoto:downloadURL
                        }).then(()=>{
                            console.log("profile picture uploaded successfully")
                            window.location.reload();
                        })
                    })
                })
            }

        
        
           
             


     
    }
})