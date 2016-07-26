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
		if(checkForDraw()){
			gameOver=true;
			$("#gameStatus").text("The game has ended in a draw.");
		}
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

function checkForDraw(){
	for(i=1;i<4;i++){
				for(j=1;j<4;j++){					
					if( $.trim($("#"+i+"-"+j).html()) == "" ){						
						return false;
				}	
			}
		}
	return true;	
}

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
	//computerMove();
	playerMove();
}
var squareToMove;
var otherShape;
//this variable holds the square value the ai tried to make an opening diagonal with, and will use to make a double
var diagonalDoubleStart = null;
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
		if(completeColumn(currentShape)!=null || completeRow(currentShape)!=null || completeDiagonal(currentShape)!=null){
			if(completeColumn(currentShape)!=null){
				squareToMove = completeColumn(currentShape);
				$(squareToMove).text(currentShape);
			}else if(completeRow(currentShape)!=null){
				squareToMove = completeRow(currentShape);
				$(squareToMove).text(currentShape);
			}
			else if(completeDiagonal(currentShape)!=null){
				squareToMove = completeDiagonal(currentShape);
				$(squareToMove).text(currentShape);
			}
		}
		else if(completeColumn(otherShape)!=null || completeRow(otherShape)!=null || completeDiagonal(otherShape)!=null){
			if(completeColumn(otherShape)!=null){
				squareToMove = completeColumn(otherShape);
				$(squareToMove).text(currentShape);
			}else if(completeRow(otherShape)!=null){
				squareToMove = completeRow(otherShape);
				$(squareToMove).text(currentShape);
			}
			else if(completeDiagonal(otherShape)!=null){
				squareToMove = completeDiagonal(otherShape);
				$(squareToMove).text(currentShape);
			}
		}
		else if($.trim($("#2-2").html())==''){
			$("#2-2").text(currentShape);
		}
		else if(currentTurn==1 && $.trim($("#2-2").html()) == currentShape){
			squareToMove = pathToDouble(otherShape);
			if(squareToMove!=null){
				$(squareToMove).text(currentShape);
			}else{
				squareToMove = makeRandom();
				$(squareToMove).text(currentShape);
			}		
		}
		else if(currentTurn==2){
			squareToMove = completeDiagonal(otherShape);
			if(squareToMove!=null){
				$(squareToMove).text(currentShape);
			}else if(diagonalDoubleStart!=null){
				squareToMove = makeDouble();
				if(squareToMove!=null){
					$(squareToMove).text(currentShape);
				}else{
					squareToMove = makeRandom();
					$(squareToMove).text(currentShape);
				}
			}else{
				squareToMove = makeRandom();
				$(squareToMove).text(currentShape);
			}
		}
		else{
			squareToMove = makeRandom();
			$(squareToMove).text(currentShape);
			
		}		


		if(currentShape.valueOf() == "X"){
			currentShape = "O";
		}
		else{
			currentShape = "X";
		}
		if(checkForDraw()){
			gameOver=true;
			$("#gameStatus").text("The game has ended in a draw.");
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
function makeRandom(){
	
	for(i=1;i<4;i++){
				for(j=1;j<4;j++){					
					if( $.trim($("#"+i+"-"+j).html()) == "" ){						
						var x = "#"+i+"-"+j;
						return x;
				}	
			}
		}
	return null;	
}


function makeDouble(){
	if(diagonalDoubleStart.valueOf() == "#1-1"){
		return "#1-2";
	}else if(diagonalDoubleStart.valueOf()=="#1-3"){
		return "#2-3";
	}else if(diagonalDoubleStart.valueOf()=="#3-1"){
		return "#2-1";
	}else if(diagonalDoubleStart.valueOf()=="#3-3"){
		return "#3-2";
	}
	else{
		return null;
	}
}
function completeColumn(shape){
	for(i =1; i<4;i++){
		if($("#1-"+i).html().valueOf()==shape){
			if( ($("#1-"+i).html().valueOf() ==  $("#2-"+i).html().valueOf()) && $.trim($("#3-"+i).html()) == "" ){
					return "#3-"+i;
			}
		}
		else if($("#2-"+i).html().valueOf()==shape){
			if( ($("#2-"+i).html().valueOf() ==  $("#3-"+i).html().valueOf()) && $.trim($("#1-"+i).html()) == "" ){
					return "#1-"+i;
			}
		}
		else if($("#1-"+i).html().valueOf()==shape){
			if( ($("#1-"+i).html().valueOf() ==  $("#3-"+i).html().valueOf()) && $.trim($("#2-"+i).html()) == "" ){
					return "#2-"+i;
			}
		}
	}
	return null;
}

function completeRow(shape){
	for(i=1;i<4;i++){
		if($("#"+i+"-1").html().valueOf()==shape){
			if( ($("#"+i+"-1").html().valueOf() ==  $("#"+i+"-2").html().valueOf()) && $.trim($("#"+i+"-3").html()) == "" ){
					return "#"+i+"-3";
			}
		}
		else if($("#"+i+"-2").html().valueOf()==shape){
			if( ($("#"+i+"-2").html().valueOf() ==  $("#"+i+"-3").html().valueOf()) && $.trim($("#"+i+"-1").html()) == "" ){
					return "#"+i+"-1";
			}
		}
		else if($("#"+i+"-3").html().valueOf()==shape){
			if( ($("#"+i+"-1").html().valueOf() ==  $("#"+i+"-3").html().valueOf()) && $.trim($("#"+i+"-2").html()) == "" ){
					return "#"+i+"-2";
			}
		}
	}
	return null;

}
function completeDiagonal(shape){
	
	if($.trim($("#2-2").html())==shape){

		if( ($("#1-1").html().valueOf() ==  $("#2-2").html().valueOf()) && ($.trim($("#3-3").html()) == "")){
			return "#3-3";
		} 
		if( ($("#1-3").html().valueOf() ==  $("#2-2").html().valueOf()) && ($.trim($("#3-1").html())== "")){
			return "#3-1";
		}
		if(($("#3-1").html().valueOf() ==  $("#2-2").html().valueOf()) && ( $.trim($("#1-3").html())== "")){
			return "#1-3";
		} 	
		if(($("#3-3").html().valueOf() ==  $("#2-2").html().valueOf()) && ($.trim($("#1-1").html()) == "")){
			return "#1-1";
		}
	}
	return null;

}
function pathToDouble(otherShape){
	if( $("#1-2").html().valueOf() == otherShape){
		diagonalDoubleStart = "#1-3";
		return "#1-3";
	}else if($("#2-1").html().valueOf() == otherShape){
		diagonalDoubleStart = "#1-1";
		return "#1-1";
	}else if($("#2-3").html().valueOf() == otherShape){
		diagonalDoubleStart = "#3-3";
		return "#3-3";
	}else if($("#3-2").html().valueOf() == otherShape){
		diagonalDoubleStart = "#3-1";
		return ("#3-1");
	}else{
		return null;
	}
}

function playerMove(){
	currentTurn++;
	if(checkForDraw()){
			gameOver=true;
			$("#gameStatus").text("The game has ended in a draw.");
		}
	currentPlayer = 0;
	$("#gameStatus").text("Player to move");
	playerTurn = true;

}

