var currentShape = "X";
var gameOver = false;
var playerTurn = true;
var aiMode = false;
var currentPlayer = 0;
var currentTurn = 0;
// 0 is player, 1 is ai

$(".square").click(function(){
if(!gameOver && playerTurn){
	var square = event.target;

	if($.trim($(square).html())==''){

		$(square).text(currentShape);

		checkWinningConditions();

		if(currentShape.valueOf() == "X"){
			currentShape = "O";
		}
		else{
			currentShape = "X";
		}
		if(aiMode){
			playerTurn = false;
			computerMove();

		}
	}
}

});


//Clear game
$("#startOver").click(function(){
	currentTurn=0;
	currentShape = "X";
	$(".square").text('');
	gameOver=false;
	$("#gameStatus").text('');
	if(aiMode){
		ai();
	}
});


//Switch between Game Modes
$("#gameMode").click(function(){
	currentTurn=0;
	currentShape = "X";
	if($.trim($("#gameMode").html()) == "PlayerVsAI"){
		$("#gameMode").text("PlayerVsPlayer");
		ai();
	}else{
		$(".square").text('');
		gameOver=false;
		$("#gameStatus").text('');
		aiMode=false;
		$("#gameMode").text("PlayerVsAI");
	}

});




function checkWinningConditions(){
		for(i = 1; i < 4; i++){
			if(checkColumn(i)){
				if(aiMode){
					if(currentPlayer==0){
						$("#gameStatus").text("Human has won.");
					}else{
						$("#gameStatus").text("AI has won.");
					}
					gameOver=true;
					break;
				}
				$("#gameStatus").text("Player " + currentShape + " has won.");
				gameOver=true;
				break;
			}
			if(checkRow(i)){
				if(aiMode){
					if(currentPlayer==0){
						$("#gameStatus").text("Human has won.");
					}else{
						$("#gameStatus").text("AI has won.");
					}
					gameOver=true;
					break;
				}
				$("#gameStatus").text("Player " + currentShape + " has won.");
				gameOver=true;
				break;
			}
		}
		if(checkDiagonals()){
				if(aiMode){
					if(currentPlayer==0){
						$("#gameStatus").text("Human has won.");
					}else{
						$("#gameStatus").text("AI has won.");
					}
					gameOver=true;
					return;
				}
			$("#gameStatus").text("Player " + currentShape + " has won.");
			gameOver=true;
				
		}
}


function checkColumn(column){
	if($.trim($("#1-"+column).html())!=''){
		if( ($("#1-"+column).html().valueOf() ==  $("#2-"+column).html().valueOf()) && ($("#1-"+column).html().valueOf() ==  $("#3-"+column).html().valueOf()) ){
			return true;
		} 
	}
}

function checkRow(row){
	if($.trim($("#"+row+"-1").html())!=''){
		if( ($("#"+row+"-1").html().valueOf() ==  $("#"+row+"-2").html().valueOf()) && ($("#"+row+"-1").html().valueOf() ==  $("#"+row+"-3").html().valueOf()) ){
			return true;
		} 
	}
}

function checkDiagonals(row){

	if($.trim($("#2-2").html())!=''){
		if( ($("#1-1").html().valueOf() ==  $("#2-2").html().valueOf()) && ($("#1-1").html().valueOf() ==  $("#3-3").html().valueOf()) ){
			return true;
		} 

		if( ($("#1-3").html().valueOf() ==  $("#2-2").html().valueOf()) && ($("#1-3").html().valueOf() ==  $("#3-1").html().valueOf()) ){
			return true;
		} 	
	}

}


//AI begins here
function ai(){
	aiMode=true;
	$(".square").text('');
	gameOver=false;
	$("#gameStatus").text('');
	computerMove();
	//playerMove();
}
var squareToMove;
var otherShape;
function computerMove(){

	playerTurn = false;
	
	if(currentShape.valueOf() == "X"){
		 otherShape = "O";
	}
	else{
		otherShape = "X";
	}

	currentPlayer=1;
	if (gameOver){
		return;
	}
	$("#gameStatus").text("AI thinking...");
	setTimeout(function(){
		if($.trim($("#2-2").html())==''){
			$("#2-2").text(currentShape);
		}
		else if(currentTurn==1 && $.trim($("#2-2").html()) == currentShape){
			
			squareToMove = pathToDouble(otherShape);
			if(squareToMove!=null){
				$(squareToMove).text(currentShape);
			}
			
		}
		else{
			squareToMove = completeTriple(otherShape);
			if(squareToMove!=null){
				$(squareToMove).text(currentShape);
			}
		}


		if(currentShape.valueOf() == "X"){
			currentShape = "O";
		}
		else{
			currentShape = "X";
		}

		checkWinningConditions();
		if(gameOver){
			return;
		}else{
			playerMove();
		}
		
		return;
	},2000);

}

function makeDouble(){

}
function completeTriple(otherShape){
	//Diagonals
	if($.trim($("#2-2").html())==currentShape){

		if( ($("#1-1").html().valueOf() ==  $("#2-2").html().valueOf()) && ($.trim($("#3-3").html()) == "")){
			return "#3-3";
		} 
		if( ($("#1-3").html().valueOf() ==  $("#2-2").html().valueOf()) && ($.trim($("#3-1").html())== "")){
			return "#3-1";
		}
		if(($("#3-1").html().valueOf() ==  $("#2-2").html().valueOf()) && ( $.trim($("#1-3").html())== "")){
			return "#1-3";
		} 	
		if(($("#3-3").html().valueOf() ==  $("#2-2").html().valueOf()) && ($.trim(("#1-1").html()) == "")){
			return "#1-1";
		}
	}
	return null;

}
function pathToDouble(otherShape){
	if( $("#1-2").html().valueOf() == otherShape){
		return "#1-1";
	}else if($("#2-1").html().valueOf() == otherShape){
		return "#1-1"
	}else if($("#2-3").html().valueOf() == otherShape){
		return "#1-3";
	}else if($("#3-2").html().valueOf() == otherShape){
		return ("#3-1");
	}else{
		return null;
	}
}

function playerMove(){
		currentTurn++;
	currentPlayer = 0;
	$("#gameStatus").text("Player to move");
	playerTurn = true;

}






