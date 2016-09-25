// Load the env variables
var dotenv = require('dotenv');
dotenv.load();

// Load Twilio information
var twilio = require('twilio');
var accountSid = process.env.TWILIO_ACCOUNT_SID; 
var authToken = process.env.TWILIO_AUTH_TOKEN;  
var client = twilio(accountSid, authToken);

// Using Cron
var cron = require('node-cron');

// Connect to Firebase
var firebase = require('firebase');
firebase.initializeApp({
    databaseURL: "https://remi-b28c1.firebaseio.com"
});

// Grab user and adherance data
var db = firebase.database();
var ref = db.ref("/users")

ref.on("value", function(snapshot){
        var userList = snapshot.numChildren();
        for(var i=0; i<userList; i++){
            var userID = snapshot.child(i).val();
            send_reminders(userID);
        }

    }, function(errorObject){
        console.log("Error connecting to firebase")
})

// Loop through the users and send them reminders
function send_reminders(userID){
    var userRef = db.ref("/" + userID + "/prescriptions")
    userRef.on("value", function(snapshot){
        var drugList = snapshot.numChildren();
        for(var i=0; i<drugList; i++){
            loop_through_adherence(snapshot, i);
        }
    })
}

function loop_through_adherence(snapshot, i){

    var schedule = snapshot.child(i).child("adherence");
    var scheduleList = schedule.numChildren();
    for(var x=0; x<scheduleList; x++){
        // iterate through each schedule 
        var date = schedule.child(x).child("date").val();
        var time = schedule.child(x).child("time").val();
        date = parse_date(date);
        time = parse_time(time);
        var cronFormat = time + " " + date;
        send_twilio(cronFormat);
    }
}

function parse_date(date){
    var newDates = date.split("/")
    var month = newDates[0];
    var day = newDates[1];
    return day + " " + month + " *";
}

function parse_time(time){
    time = JSON.stringify(time)
    if(time.length==3){
        var hour = time.substring(0,1);
        var min = time.substring(1,3);

        if(time.substring(1,2)=="0"){
            min = time.substring(2,3);
        }
        //console.log("0 " + min + " " + hour)
        return "0 " + min + " " + hour;
    } else{
        var hour = time.substring(0,2);
        var min = time.substring(2,4);

        if(time.substring(2,3)=="0"){
            min = time.substring(3,4);
        }
        //console.log("0 " + min + " " + hour)
        return "0 " + min + " " + hour;
    }
}


function send_twilio(cronFormat){
    var task = cron.schedule(cronFormat, function(){
    client.sendMessage({
        to:'+14254718076', 
        from:'+14252875544', 
        body:"Reminder Message from Remi: Don't forget to take your pills!" 
    }, function( err, data ) {
            if(err){
                console.log(err)
                task.destroy();
            } else{
                console.log("Message delivered, stopping schedules")
                task.stop();
            }
        });
    });
}


