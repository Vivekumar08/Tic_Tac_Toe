let board =[
  ['','','','',''],
  ['','','','',''],
  ['','','','',''],
  ['','','','',''],
  ['','','','',''],
]

let w ;
let h ;

let players=['X','O','+']
let available = [];

let ai ='X';
let human1 ='O';
let human2 ='+';

let currentPlayer;
currentPlayer= human1;


function setup() {
  createCanvas(550, 550);
  w = width / 5;
  h = height / 5;
  // bestMove();
  // nextTurnToHuman1();
    frameRate(30);
    currentPlayer = floor(random(players.length));
    for (let j = 0; j < 5; j++) {
      for (let i = 0; i < 5; i++) {
        available.push([i, j]);
      }
    }
  }

  function equals3(a, b, c) {
    return a == b && b == c && a != '' ;
  }

  function checkWinner() {
    let winner = null;
  
    // horizontal
    for (let i = 0; i < 5; i++) {
      if (equals3(board[i][0], board[i][1], board[i][2])) {
        winner = board[i][0];
      }
      if (equals3(board[i][1], board[i][2],board[i][3])) {
        winner = board[i][2];
      }
      if (equals3(board[i][2],board[i][3],board[i][4])) {
        winner = board[i][4];
      }
    }
  
    // Vertical
    for (let i = 0; i < 5; i++) {
      if (equals3(board[0][i], board[1][i], board[2][i])) {
        winner = board[0][i];
      }
      if (equals3(board[1][i], board[2][i], board[3][i])) {
        winner = board[1][i];
      }
      if (equals3(board[2][i], board[3][i], board[4][i])) {
        winner = board[2][i];
      }
    }
  
    // Diagonal
    if (equals3(board[0][0], board[1][1], board[2][2])) {
      winner = board[0][0];
    }
    if (equals3(board[1][1], board[2][2], board[3][3])) {
      winner = board[1][1];
    }
    if (equals3(board[2][2], board[3][3], board[4][4])) {
      winner = board[2][2];
    }


    if (equals3(board[4][0], board[3][1], board[2][2])) {
      winner = board[4][0];
    }
    if (equals3(board[3][1], board[2][2], board[1][3])) {
      winner = board[3][1];
    }
    if (equals3(board[2][2], board[1][3], board[0][4])) {
      winner = board[2][2];
    }


    if (equals3(board[0][1], board[1][2], board[2][3])) {
      winner = board[0][1];
    }
    if (equals3(board[1][2], board[2][3], board[3][4])) {
      winner = board[1][2];
    }

    if (equals3(board[4][1], board[3][2], board[2][3])) {
      winner = board[2][3];
    }
    if (equals3(board[3][2], board[2][3], board[1][4])) {
      winner = board[3][2];
    }

    if (equals3(board[1][0], board[2][1], board[3][2])) {
      winner = board[2][1];
    }
    if (equals3(board[2][1], board[3][2], board[4][3])) {
      winner = board[2][1];
    }

    if (equals3(board[3][0], board[2][1], board[1][2])) {
      winner = board[2][1];
    }
    if (equals3(board[2][1], board[1][2], board[0][3])) {
      winner = board[2][1];
    }

    if (equals3(board[0][2], board[1][3], board[2][4])) {
      winner = board[0][2];
    }
    if (equals3(board[4][2], board[3][3], board[2][4])) {
      winner = board[4][2];
    }
    if (equals3(board[2][0], board[3][1], board[4][2])) {
      winner = board[2][0];
    }
    if (equals3(board[2][0], board[3][1], board[4][2])) {
      winner = board[2][0];
    }

    let openSpots = 0;
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        if (board[i][j] == '') {
          openSpots++;
        }
      }
    }
  
    if (winner == null && openSpots == 0) {
      return 'tie';
    } else {
      return winner;
    }
  }

  // function mousePressed() {
  //   if (currentPlayer == human1) {
  //     // Human make turn
  //     let i = floor(mouseX / w);
  //     let j = floor(mouseY / h);
  //     // If valid turn
  //     if (board[i][j] == '') {
  //       board[i][j] = human1;
  //       currentPlayer = ai;
  //       bestMove();
  //     }
  //   }
    
  // }
  
  function nextTurn() {

    let index = floor(random(available.length));
    let spot = available.splice(index, 1)[0];
    let i = spot[0];
    let j = spot[1];
    board[i][j] = players[currentPlayer];
    currentPlayer = (currentPlayer + 1) % players.length;
  }

  function draw() {
    background(255);
    strokeWeight(4);
    w=width/5;
    h=height/5;
  
    line(w, 0, w, height);
    line(w * 2, 0, w * 2, height);
    line(w * 3, 0, w * 3, height);
    line(w * 4, 0, w * 4, height);
    line(0, h, width, h);
    line(0, h * 2, width, h * 2);
    line(0, h * 3, width, h * 3);
    line(0, h * 4, width, h * 4);
  
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        let x = w * j + w / 2;
        let y = h * i + h / 2;
        let spot = board[i][j];
        let r = w / 4;
        textSize(32);
        if (spot == players[1]) {
          noFill();
          ellipse(x, y, r * 2);
        } else if (spot == players[0]) {
          line(x - r, y - r, x + r, y + r);
          line(x + r, y - r, x - r, y + r);
        } else if (spot == players[2]) {
          line(x + r/12, y + r, x + r/12, y - r);
          line(x + r, y + r/8, x - r, y + r/8);
        }
      }
    }

    let result = checkWinner();
    if (result != null) {
      noLoop();
      let resultP = createP('');
      resultP.style('font-size', '32pt');
      if (result == 'tie') {
        resultP.html('Tie!');
      } else {
        resultP.html(`${result} wins!`);
      }
    } 
       else {
      nextTurn();
    }
  }