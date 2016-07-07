console.log('tictactoe script loaded');

var player = 1,         //1= player 1, 2= player 2
    player1Wins = 0;   //tracks p1 score
    player2Wins = 0;   //tracks p2 score
    tieGame = 0;        //tracks tie game
    gameRound = 1;     //tracks no. of game

var p1Board = [],   //adds up to 15, wins
    p2Board = [],   //adds up to 15, wins
    tieBoard = [],  //adds up to 45, draw
    totalBoardSum = 0;  //tracks the sum in the game board

var resetBtn = document.getElementsByClassName('resetBtn')[0],
    headerText = document.getElementsByTagName('p'),
    getCells = document.getElementsByClassName('cell');


console.log(resetBtn);
//console.log(headerText);
//console.log(getCells);

function addEvents() {
  //button events
  resetBtn.addEventListener('click', buttonClicked);
  resetBtn.addEventListener('mouseenter', overButton);
  resetBtn.addEventListener('mouseleave', outButton);

  for(var i = 0; i < getCells.length; i++) {

    //cells events
    getCells[i].addEventListener('mouseenter', overCell);
    getCells[i].addEventListener('mouseleave', leaveCell);
    getCells[i].addEventListener('click', mouseClicked);

  }
}

function resetGame() {

  //If game is tie / player 1 wins / player 2 wins -> reset game
  p1Board = [];
  p2Board = [];
  tieBoard = [];
  totalBoardSum = 0;

  //Change text when game over
  if (player1Wins > 0) {
    headerText[0].innerHTML = '<b> Player 1 \n WON! </b>';
    headerText[0].style.color = '#CC111C';
  }
  else if (player2Wins > 0) {
    headerText[0].innerHTML = '<b> Player 2 \n WON! </b>';
    headerText[0].style.color = '#CC111C';
  }
  else if(tieGame > 0) {
    headerText[0].innerHTML = '<b> It was a TIE! </b>';
    headerText[0].style.color = '#9DDA27';
  }

  //loop through all cells and remove content
  for (var i = 0; i < getCells.length; i++) {
    if(getCells[i].hasChildNodes()) {
      getCells[i].removeChild(getCells[i].childNodes[0]);
    }
  }
  addEvents();
}
//WHen mouse enters cell
function overCell(event) {
  //console.log('mouse in!');

  var hoverImg = document.createElement('img');

  if(player === 1) {
    hoverImg.src = 'images/pikachu.gif';
    hoverImg.setAttribute('width', '100%');
    hoverImg.setAttribute('height', '100%');
    hoverImg.style.opacity = '0.5';

  }
  else {
    hoverImg.src = 'images/squirtle.gif';
    hoverImg.setAttribute('width', '100%');
    hoverImg.setAttribute('height', '100%');
    hoverImg.style.opacity = '0.5';
  }

  event.target.appendChild(hoverImg);
  // //console.log(event.target);
}

//When mouse exits cell
function leaveCell(event) {
  //console.log('mouse out!');
  //console.log(event.type);
  this.removeChild(this.childNodes[0]);
}

//When mouse clicked cell
function mouseClicked(event) {
  console.log('mouse clicked!' + event.target);

  //find out which cell is clicked  //change it from string to integer
  var whichCell = parseInt(this.id.slice(this.id.length - 1));
  console.log('Which cell is clicked '+ whichCell);

  //add integer onto board
  tieBoard.splice(0, 0, whichCell);

  //If is player 1, add data onto p1board
  if (player === 1) {
    p1Board.splice(0, 0, whichCell);
    console.log(p1Board);
  }
  else if (player === 2) {
    p2Board.splice(0, 0, whichCell);
    //console.log(p2Board);
  }
  console.log(p1Board.length);
  console.log('Player 1 score ' + player1Wins);
  console.log('Player 2 score ' + player2Wins);

  /*******    Change image, turn then text    ********/
  changeImage();

  checkPlayer1Input();
  checkPlayer2Input();
  checkIfTie();   //check if all board is filled -> TIE

  changeTurn();

  changeText();


  console.log(headerText[0]);
}

function changeTurn() {

  if( player === 1 ) {
    player = 2;
  }
  else {
    player = 1;
  }
}

function changeImage() {
  //var img = document.createElement('img');

  if( player === 1 ) {
    event.target.style.opacity = '1';
    var pikachuAudio = new Audio('audio/pikachu.mp3');
    pikachuAudio.play();
    //img.src = 'images/pikachu.gif';
    //img.setAttribute('width', '100%');
    //img.setAttribute('height', '100%');
  }
  else {
    event.target.style.opacity = '1';
    var squirtleAudio = new Audio('audio/squirtle.mp3');
    squirtleAudio.play();
    // img.src = 'images/squirtle.gif';
    // img.setAttribute('width', '100%');
    // img.setAttribute('height', '100%');
  }
  //event.target.appendChild(img);
  event.target.removeEventListener('click', mouseClicked);
  event.target.parentNode.removeEventListener('mouseenter', overCell);
  event.target.parentNode.removeEventListener('mouseleave', leaveCell);
}

function changeText() {

  //Change turn text
  if (player === 1) {
    headerText[1].innerText = 'Player 1 \n It\'s your turn!';
    headerText[1].style.fontSize = '110%';
  }
  else {
    headerText[1].innerText = 'Player 2 \n It\'s your turn!';
    headerText[1].style.fontSize = '110%';

  }




}

function checkIfTie() {
  totalBoardSum += tieBoard[0];

  if (totalBoardSum == 45) {
    tieGame++;
    alert('GAME OVER! TIE GAME.');
    resetGame();
  }
  //console.log('totalBoardSum is = ' + totalBoardSum);
}

function checkPlayer1Input() {

  for (i = 0; i < p1Board.length; i++) {
    for (j = i + 1; j < p1Board.length; j++) {
      for (k = j + 1; k < p1Board.length; k++) {
        var totalSum = p1Board[i] + p1Board[j] + p1Board[k]; //if add to 15
        //adds to 15 with mininum of 3 combinations
        if (totalSum == 15 && p1Board.length >= 3) {

          player1Wins++;
          alert('GAME OVER! PLAYER 1 WINS.');
          resetGame();
          //console.log( p1Board[i], p1Board[j], p1Board[k] );
        }
        // else if (totalSum == 15 && p1Board.length == 4) {
        //
        //   player1Wins++;
        //   alert('GAME OVER! PLAYER 1 WINS.');
        //   resetGame();
        //   //console.log( p1Board[i], p1Board[j], p1Board[k] );
        // }
      }
    }
  }
}

function checkPlayer2Input() {

  for (i = 0; i < p2Board.length; i++) {
    for (j = i + 1; j < p2Board.length; j++) {
      for (k = j + 1; k < p2Board.length; k++) {
        var totalSum = p2Board[i] + p2Board[j] + p2Board[k];

        if (totalSum == 15 && p2Board.length >= 3) {

          player2Wins++;
          alert('GAME OVER! PLAYER 2 WINS.');
          resetGame();
          //console.log( p2Board[i], p2Board[j], p2Board[k] );
        }
        // else if (totalSum == 15 && p2Board.length == 4) {
        //
        //   player2Wins++;
        //   alert('GAME OVER! PLAYER 2 WINS.');
        //   resetGame();
        //   //console.log( p2Board[i], p2Board[j], p2Board[k] );
        // }
      }
    }
  }
}

function buttonClicked() {
  resetGame();

  player = 1;
  player1Wins = 0;
  player2Wins = 0;
  tieGame = 0;
  gameRound = 1;

  headerText[0].innerHTML = 'Game 1';
  headerText[1].innerHTML = 'Player 1 start';
}

function overButton(event) {
  event.target.style.backgroundColor = '#3C454A';
  event.target.style.color = '#FCECC8';

  // resetBtn.removeEventListener('mouseenter', overButton);
  // resetBtn.addEventListener('mouseleave', outButton);

}

function outButton(event) {
  event.target.style.backgroundColor = 'buttonface';
  event.target.style.color = 'buttontext';

  // resetBtn.removeEventListener('mouseleave', outButton);
  // resetBtn.addEventListener('mouseenter', outButton);

}

addEvents();
