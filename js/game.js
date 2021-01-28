class Game {

    static XPLAYER = "X";                   // create strings for X, O, blank
    static OPLAYER = "O";                   // static constants are all caps
    static EMPTY = " ";
    static gameOver = false;

    static board= [                         // make the game board, an array
        this.EMPTY, this.EMPTY, this.EMPTY,
        this.EMPTY, this.EMPTY, this.EMPTY,
        this.EMPTY, this.EMPTY, this.EMPTY
    ]    
    
    static xPlays(e){                       // logs click (and X) to array element
        if(this.gameOver){
            return;
        } 
        
        Display.setMessage("&nbsp;");
        let pos = e.srcElement.id;
        console.log(pos);
            if(this.board[pos] !== this.EMPTY){  // ensures that X can only be placed in a blank spot
                Display.setMessage ("Your mother smells of elderberries. Pick an empty spot.")
                return;
            }
        this.board[pos] = this.XPLAYER;
        if(this.didXWin()){                 // check if X won, and display message
            Display.boardRefresh();
            Display.setMessage("Congratulations! You win!");
            this.gameOver = true;
            return;
            }
        this.oPlays();
        Display.boardRefresh();             // tell the display to update                      
    } 
 
    static didXWin() {                      // PROBLEM  -- checks whether the human player has won
        let win = true;
        // check the rows:
        for (let i = 0; i < Game.board.length; i += 3){
            win = true;
            for (let j = 0; j < 3; j++) {
                if(Game.board[i + j] !== this.XPLAYER){
                    win = false;
                    break;
                }
            }
            if(win){
                return win;
            } 
        } 
        // check the columns: 
        
        win = true;
        for (let i = 0; i < 3; i ++){
            win = true;
            for (let j = 0; j < Game.board.length; j+= 3) {
                if(Game.board[i + j] !== this.XPLAYER){
                    win = false;
                    break;
                }
            }
            if(win){
                return win;
            } 
        } 

        // check the diagonals:        
        win = true;
        let diag1 = true;
        let diag2 = true;
        for (let i = 0, j = 2; i < this.board.length; i += 4, j +=2){
            if(Game.board[i] !== this.XPLAYER){
                diag1 = false;
            }
            if(Game.board[j] !== this.XPLAYER){
                diag2 = false;
            }
        }
        win = diag1 || diag2
        
        return win;
    
    }

    static tallyBoard(){        // tally the entries on the board for strategy purposes
        let tally = [];         // declare tally, set it equal to an array (for the input from the board)
        let xCount = 0;
        let oCount = 0;
        let eCount = 0;
        let tallyIndex = 0;     // index for the tally
        
        // check the rows:
        for (let i = 0; i < Game.board.length; i += 3){
        win = true;
        for (let j = 0; j < 3; j++) {
            switch(Game.board[i + j]) {
                case this.XPLAYER: 
                    xCount++;
                    break;
                case this.OPLAYER:
                    oCount++;
                    break;
                case this.EMPTY:
                    eCount++;
                    break;
            }
        }
    }

    static reset(){                         // makes the New Game button clear the board
        for(let i = 0; i < Game.board.length; i++){
            this.board[i] = this.EMPTY;     // resets board
        }
        Display.boardRefresh();             // displays the reset board
        this.gameOver = false;
    }  

    static oPlays(){                        // create oPlays method for Computer play
        for(let i = 0; i < Game.board.length; i++){
            if(this.board[i] === this.EMPTY){ // finds empty spot in board to make a play
                this.board[i] = this.OPLAYER; // places an O in that empty spot
                return;                       // stop looking for more empty spaces else it will continue forever
            }
        }
    }
}   
  