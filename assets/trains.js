$(document).ready(function(){
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyDT8AN2z7Q2RlLg19sDQC3ADY7SitD3FXA",
        authDomain: "the-a-train.firebaseapp.com",
        databaseURL: "https://the-a-train.firebaseio.com",
        projectId: "the-a-train",
        storageBucket: "",
        messagingSenderId: "394794933480"
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
    var diffTime = "";
    var firstTimeConverted = "";
    var tRemainder = "";
    

    $("#submitbtn").on('click', function(){
        // prevents overwriting 
        event.preventDefault();

        // add values to the HTML elements
        name = $("#name").val().trim();
        destination = $("#destination").val().trim();
        frequency = $("#frequency").val().trim();
        firstTime = $("#firstTime").val().trim();
        firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
        diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        tRemainder = diffTime % frequency;
        



        console.log("name: " + name);
        console.log("destination: " + destination);
        console.log("frequency: " + frequency);
        console.log("first train: " + firstTime + ", " + typeof(firstTime));

        database.ref().push({
            name: name,
            destination: destination,
            frequency: frequency,
            firstTime: firstTime,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
    });


    database.ref().on('child_added', function(childSnapshot){

        // First Time (pushed back 1 year to make sure it comes before current time)
        var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
        console.log(firstTimeConverted);

        // Current Time
        var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

        // Difference between the times
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);

        // Time apart (remainder)
        var tRemainder = diffTime % frequency;
        console.log(tRemainder);

        console.log((moment().diff(moment(moment(firstTime, "hh:mm").subtract(1, "years")), "minutes") % frequency) + " test");

        // Minute Until Train
        var tMinutesTillTrain = frequency - tRemainder;
        console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

        // Next Train
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
        

        // This acts as a for loop, so for each 'childSnapshot', we're gonna add the info below in a new table row, or <td> 
        $("#table").append("<tr>" + "<td>" + childSnapshot.val().name + "</td>" + "<td>" + childSnapshot.val().destination + "</td>" + "<td>" + childSnapshot.val().frequency + "<td>" + moment(nextTrain).format("hh:mm")  + "</td>" + "<td>" + tRemainder + "</td>" + "</tr>");
    }, function(errorObject){
        console.log("Errors handled: " + errorObject.code);
    })









})