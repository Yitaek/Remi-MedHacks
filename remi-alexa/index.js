// Alexa and Firebase 
var alexa = require('alexa-app');
var firebase = require('firebase');
var moment = require('moment');
var SampleDrugs = require('./SampleDrugs')

// Starting the App
var app = new alexa.app();

// Launch the Alexa app 
app.launch(function(request, response){
	// TODO: Change default user to match the app-id 

	response.say("Hello, my name is raymi, your friendly health bot.");
	response.say("How can I help you?")
	response.shouldEndSession(false);

});

app.intent('GetPrescriptionIntent', 
	{
		"slots": {},
		"utterances": [
			"{for the|what is my|give me the|remind me} prescription information",
			"{tell me|remind me} about my {prescription|drug} information"
		]
	},
	function(request, response) {
		firebase.initializeApp({
		  databaseURL: "https://remi-b28c1.firebaseio.com"
		});
		prescription_overview(response);
		return false;
	}
);

app.intent('GetPharmacyIntent', 
	{
		"slots": {},
		"utterances": [
			"where can I get my refills",
			"where is my pharmacy",
			"is my pharmacy open"
		]
	},
	function(request, response) {
		firebase.initializeApp({
		  databaseURL: "https://remi-b28c1.firebaseio.com"
		});
		pharmacy_overview(response);
		return false;
	}
)

app.dictionary = {
	"drugs": SampleDrugs.drugName
};

app.intent('GetDrugInfoIntent',
	{
		"slots": {"DRUGNAME":"LITERAL"},
		"utterances": [
			"{give me|tell me} more about {drugs|DRUGNAME}",
			"what should I {know|be aware} about {drugs|DRUGNAME}"
		]
	},
	function(request, response) {
		firebase.initializeApp({
		  databaseURL: "https://remi-b28c1.firebaseio.com"
		});
		var drug = request.slot('DRUGNAME')
		drug_overview(drug, response);
		return false;
	}
)

function drug_overview(drug, response){
	var db = firebase.database();
	var ref = db.ref("/" + drug)

	ref.on("value", function(snapshot){
		var checkEmpty = snapshot.numChildren();

		if(checkEmpty == 0){
			response.say("This drug is not on our database")
			response.shouldEndSession(false);
			response.send();
		} else{
			response.say("Here are some useful information on " + drug + ".")
			list_drug_information(snapshot, response);
			response.send();
		}
	}, function(errorObject){
		response.say("Attempted to access unpopulated data")
		response.send();
	})
}

function list_drug_information(snapshot, response){
	response.say("Common side-effects include: ")
	for(var i=0; i < snapshot.child("side-effects").numChildren(); i++){
		var sideEffects = snapshot.child("side-effects").child(i).val();
		if(i == snapshot.child("side-effects").numChildren() - 1){
			response.say(" and " + sideEffects + ".")
		} else{
			response.say(sideEffects + ",")
		}

	}
	return false;
}

function pharmacy_overview(response){
	var day = moment().format('dddd');
	var db = firebase.database();
	var ref = db.ref("/p0")

	ref.on("value", function(snapshot){
		var pharmacy = snapshot.child("name").val();
		var openOrClosed = find_open_or_closed(snapshot);
		response.say("Your pharmacy, " + pharmacy + " is now " + openOrClosed + ".")

		var address = snapshot.child("address").val();
		var storetime = find_store_time(snapshot);

		if(openOrClosed=="open"){
			response.say("You can pick up your prescription at " + address + " between " + storetime + " today.")
		} else{
			response.say("You can pick up your prescription at " + address + " between " + storetime + " tomorrow.")
		}

		response.send();

		//TODO: if store is closed get tomorrow's data correctly
	})

	return;
}

function find_store_time(snapshot){
	var day = moment().format('dddd');   
	var storetime = snapshot.child("hours").child(day).val();

	return storetime;
}

function find_open_or_closed(snapshot){

	var storetime = find_store_time(snapshot);

	// Find out current time
	var timeNow = moment().format('h A')
	var timeSplit = timeNow.split(' ');
	var AMPM = timeSplit[1];
	var time = timeNow[0];

	// Get storetime data
	var storeHours = storetime.split("-")
	var openTime = storeHours[0].replace('AM', '')
	var closeTime = storeHours[1].replace('PM', '')

	if(AMPM == "PM"){
		if(time < closeTime){
			return "open"
		} else{
			return "closed"
		}
	} else if (AMPM == "AM"){
		if(time > openTime){
			return "open"
		} else{
			return "closed" 
		}
	} else {
		return "not providing store hour information"
	}
}

function prescription_overview(response){

	var db = firebase.database();

	response.say("Here is your prescription overview: ")

	get_drug_list(db, response)

	return;

}

function get_drug_list(db, response){
	var ref = db.ref("/u0/prescriptions");
	ref.on("value", function(snapshot){
		var drug_count = JSON.stringify(snapshot.numChildren());
		response.say("You are currently prescribed " + drug_count + " drugs.")
		for(var i=0; i < snapshot.numChildren(); i++){
			list_prescription_info(snapshot, response, i);
		}
		response.send();
	})

	return false;
}

function list_prescription_info(snapshot, response, i){
	// Get drug generic name
	var drug_name = snapshot.child(i).child("name").val();

	// Get dosage information
	var dosage = snapshot.child(i).child("dosage").val();

	// Get frequency information
	var freq = snapshot.child(i).child("frequency").val();
	freq = map_freq_to_instruction(freq);

	// Get duration
	var duration = snapshot.child(i).child("duration").val();
	response.say("You should take " + dosage + " of " + drug_name + freq + " for " + duration + ".");

	// get instructions
	var instructions = snapshot.child(i).child("instructions").val();
	response.say("Please " + instructions + ".");

	// Get refill information
	var refills = snapshot.child(i).child("refills").val();

	// Get last filled information
	var lastFilled = snapshot.child(i).child("lastFilled").val();

	// Get expiration date information 
	var expiration = snapshot.child(i).child("expiration").val();

	response.say("You have " + refills + " refills left, last refilled on " + lastFilled + ".")
	response.say("Your drug is set to expire on " + expiration + ".");

	response.send();

	return false;
}

function map_freq_to_instruction(freq){
	var phrase = freq.split(" ")
	var num = phrase[0];
	var frequency = phrase[1];
	if(num=="1"){
		num = "once"
	} else if (num=="2"){
		num = "twice"
	} else{
		num = num + " times";
	}

	return " " + num + " " + frequency;
}


// Connect to lambda
exports.handler = app.lambda();

if ((process.argv.length === 3) && (process.argv[2] === 'schema')){
	console.log (app.schema ());
    console.log (app.utterances ());
}