# To start this api start server.js using nodemon or any other method
# To Edit a Movie Info 
send a patch request Using Postman to  **url/movies/MovieId**

**With postman===>body===>raw**
and follow this :-
 
 [{ 	

"propName" : "(Name Of The Property You Want To Change)","value":"(New Value Of The Proprtty)"

 }]

 ## You Can Use It To Change Many Atrributes At The Same Time 

 [{ 	

"propName" : "(Name Of The Property You Want To Change)","value":"(New Value Of The Proprtty)"

 }],{ 	

"propName" : "(Name Of The Property You Want To Change)","value":"(New Value Of The Proprtty)"

 }.{ 	

"propName" : "(Name Of The Property You Want To Change)","value":"(New Value Of The Proprtty)"

 },...etc]
 # To Delete A movie :-
 
 send a delete Request using PostMan To **url/movies/MovieId**

 ### Every movie has a unique id which was qiven by "Mongoose" 

  **In This Project The Default url is http://localhost:3000**
  >Use Your Mongoose account info To access Database
  #### Good luck 
  
