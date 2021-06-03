"use strict";

const player = {
  position: {
    col: 5,
    row: 5
  },
  movesLeft: 12,
  isAlive: true,
  checkVitals: function() {
    const landing = document.getElementById(`cell-${this.position.row}-${this.position.col}`);
    const typeBlock = landing.getAttribute('type');
    if(typeBlock == "hole") {
      this.isAlive = false;
    }
  }
};

const colors = {
  character: "#ffffff",
  ground: "#166e7a",
  wall: "#254d70",
  door: "#52c33f",
  hole: "#201533"
}
const game = {
  render: function() {
    // fill in the colors of the game
    const cells = document.getElementsByClassName('cell');
    Array.from(cells).forEach(cell => {
      const type = cell.getAttribute("type");
      if(type !== null) {
        cell.style.background = colors[type];
      }
      else {
        cell.style.background = colors.ground;
      }
      cell.innerHTML = "";
    });
    this.displayStepsLeft();
    const characterCell = document.getElementById(`cell-${player.position.row}-${player.position.col}`)
    
    const char= document.createElement('div');
    char.setAttribute('type', 'character');
    char.id = "character";
    if(player.isAlive) {
      char.className = "alive";
    }
    else {
      char.className = "dead";
    }
    console.log(char);
    characterCell.appendChild(char);
  },

  displayStepsLeft() {
    const stepsElement = document.getElementsByClassName('steps')[0];
    stepsElement.insertAdjacentHTML("beforeEnd", player.movesLeft+", ");
  },


  movePlayer: function(dir) {
    player.movesLeft--;
    switch(dir){
      case "left": 
        player.position.row--;
        break;
      case "right":
        player.position.row++;
        break;
      case "up": 
        player.position.col--;
        break;
      case "down":
        player.position.col++;
        break;
    }

    player.checkVitals();
    this.render();
  },

  initButtons: function(){
    const buttons = document.getElementsByClassName('control-btn');
    Array.from(buttons).forEach(button => {
      const dir = button.id;
      button.addEventListener('click', (e) =>  this.movePlayer(dir));
    });
  }
};

game.render();
game.initButtons();