$(document).ready(function(){
    // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBPbC37ybEKLLfnTDa79E_speeKfVBegBk",
    authDomain: "train-time-3f044.firebaseapp.com",
    databaseURL: "https://train-time-3f044.firebaseio.com",
    projectId: "train-time-3f044",
    storageBucket: "train-time-3f044.appspot.com",
    messagingSenderId: "356705036768"
  };
  firebase.initializeApp(config);

  // declare var database = ... 
  database = firebase.database();

    var name = "";
    var destination = "";
    var frequency = "";
    var firstTime = "";
    var nextArrival = "";
    var minutesAway = "";

    $("#submitbtn").on('click', function(){
        // prevents overwriting 
        event.preventDefault();

        // add values to the HTML elements
        name = $("#name").val().trim();
        destination = $("#destination").val().trim();
        frequency = $("#frequency").val().trim();
        firstTime = $("#firstTime").val().trim();

        console.log("name: " + name);
        console.log("destination: " + destination);
        console.log("frequency: " + frequency);
        console.log("first train: " + first);

        database.ref().push({
            name: name,
            destination: destination,
            frequency: frequency,
            firstTime: firstTime,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
    });


        database.ref().on('child_added', function(childSnapshot){
            //Log info coming out of snapshot
            // console.log(childSnapshot.val().name);
            // console.log(childSnapshot.val().role);
            // console.log(childSnapshot.val().date);
            // console.log(childSnapshot.val().rate);

            // this was all gotten from the moment js website
            var a = moment(); // this stores the current time in a variable
            var b = moment(childSnapshot.val().date); // this stores the date from childSnapshot to a variable
            var months = a.diff(b, 'months'); // subtracts childSnapshot from a, and calculates it in months. 
            console.log(months);


            // This acts as a for loop, so for each 'childSnapshot', we're gonna add the info below in a new table row, or <td> 
            $("#table").append("<tr>" + "<td>" + childSnapshot.val().name + "</td>" + "<td>" + childSnapshot.val().role + "</td>" + "<td>" + childSnapshot.val().date + "<td>" + months + " months" + "</td>" + "<td>" + childSnapshot.val().rate + "</td>" + "<td>" + months * childSnapshot.val().rate + "</td>" + "</tr>");
        }, function(errorObject){
            console.log("Errors handled: " + errorObject.code);
        })









})