var quizList=[
{"question": "How many amendments does the Constitution have?", "answers":{
	a: 23,
	b: 26,
	c: 27,
	d: 33,
	e: 36
},"correctAnswer": "c"},
{"question": "The House of Representatives has how many voting members?", "answers":{
	a: 234,
	b: 345,
	c: 352,
	d: 423,
	e: 435
},"correctAnswer": "e"},
{"question": "When is the last day you can send in federal income tax forms?", "answers":{
	a: "March 15",
	b: "April 15",
	c: "April 20",
	d: "May 15",
	e: "May 20"
}, "correctAnswer": "b"},
{"question": "When was the Constitution written?", "answers":{
	a: 1776,
	b: 1780,
	c: 1787,
	d: 1790,
	e: 1793	
}, "correctAnswer": "c"},
{"question": "What territory did the United States buy from France in 1803?", "answers":{
	a: "Ohio",
	b: "Mississippi",
	c: "Michigan",
	d: "Kentucky",
	e: "Lousisana"	
}, "correctAnswer": "e"},
{"question": "Who was President during World War I?", "answers":{
	a: "Woodrow Wilson",
	b: "Franklin D. Roosevelt",
	c: "Theodore Roosevelt",
	d: "Dwight Eisenhower",
	e: "Harry Truman"	
},"correctAnswer": "a"},
{"question": "Which state borders Canada", "answers":{
	a: "Oregon",
	b: "Wyoming",
	c: "Ohio",
	d: "Illinois",
	e: "Massachusetts"	
},"correctAnswer": "c"},
{"question": "What is the name of the National Anthem", "answers":{
	a: "O Say Can You See",
	b: "God Bless America",
	c: "Pledge of Allengiance",
	d: "The Star-Spangled Banner",
	e: "Born in the USA"	
},"correctAnswer": "d"},
{"question": "Which is not a National Holiday?", "answers":{
	a: "Martin Luther King, Jr. Day",
	b: "Presidents’ Day",
	c: "Columbus Day",
	d: "Veterans Day",
	e: "Valentine's Day"	
},"correctAnswer": "e"}
];
	
var questCount=0;
var output = [];
var answers;
var answerCount=0;
var userAnswer="";
var cAnswer="";
var count=25;
var intervalId;

function getQuestions(questions){
	
	for(var i=0; i<questions.length; i++){
		
		answers = [];

		for(letter in questions[i].answers){

			answers.push(
				'<label>'
					+ '<input type="radio" name="question'+i+'" value="'+letter+'">'
					+" "+ letter + ': '
					+ questions[i].answers[letter]
				+ '</label>'+'<br>'
			);
		}
		output.push(
			'<div class="question">' + questions[i].question + '</div>'
			+ '<div class="answers">' + answers.join('') + '</div>'
			
		);
		
	}
	
	return output;
}
function showQuestion(questCount){

	$(".forQuestions").html(output[questCount]);
	startTimer(count);
	$(".subBtn").css("display","block");
	$(".timerBox").css("display","block");

	cAnswer=(quizList[questCount].correctAnswer);

		$("input:radio").on("click", function() {
			userAnswer=$(this).val();
			return cAnswer;
			return userAnswer;
		});	
}

function victoryScreen(){
	$(".subBtn").css("display","none");
	$(".timerBox").css("display","none");
	clearInterval(intervalId);
	count=25;
	$(".forQuestions").html('<img id="correctImg" src="assets/images/green_card2 (1).jpg"/>');
	$(".forQuestions").append('<h3>Correct! A true patriot</h3>');
	questCount++;
	setTimeout(function() {
    showQuestion(questCount);
    }, 5000);
    return count;
}



function loserScreen(){
	$(".forQuestions").empty();
	$(".subBtn").css("display","none");
	$(".timerBox").css("display","none");
	clearInterval(intervalId);
	count=25;
	questCount++;
     $(".forQuestions").html('<h3>The correct answer was: '+cAnswer+'</h3><img id="failImg" src="assets/images/statue-of-liberty-tear-swscan04051.jpg"/>');
     $(".forQuestions").append("<h3>How Could You?</h3>");
	setTimeout(function() {
       showQuestion(questCount);
            }, 5000);
	return count;
}

function finalScreen(){
	$(".forQuestions").empty();
	$(".subBtn").remove();
	$(".timerBox").remove();
	var resultBox=$("<div>");
    resultBox.addClass("results");
    resultBox.html("<p> You got"+" "+answerCount+" "+"correct </p>"+"<p> Still not sure if we are acceepting new Citizens.</p>"+
    	"<button class='reset'>Try Again Anyway?</button>");
    $(".forQuestions").append(resultBox);
    clearInterval(intervalId);
}


function startTimer(count){
  
  $(".timer").text(count+" "+"s");
  intervalId = setInterval(decrease, 1000);

  function decrease(){
  	count--;
  	if (count >= 0) {
    	$(".timer").text(count+" "+"s");
    }
    else {
    	loserScreen();	
    }

  }
}


$(document).ready(function() {
getQuestions(quizList);
showQuestion(questCount);


	$(".subBtn").on("click", function() {
		console.log(questCount);
		if (questCount>7){
				finalScreen();
		}
		else if(cAnswer===userAnswer){
			answerCount++;
			victoryScreen();
		}
		else
			loserScreen();
		});

	$(".reset").on("click", function() {
		getQuestions(quizList);
		showQuestion(questCount);
	});

});     











