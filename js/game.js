class Game {

    static XPLAYER = "X";                   // create strings for X, O, blank
    static OPLAYER = "O";                   // static constants are all caps
    static EMPTY = " ";

    static board= [                         // make the game board, an array
        this.EMPTY, this.EMPTY, this.EMPTY,
        this.EMPTY, this.EMPTY, this.EMPTY,
        this.EMPTY, this.EMPTY, this.EMPTY
    ]    
    
    static xPlays(e){                       // logs click (and X) to array element
        let pos = e.srcElement.id;
        console.log(pos);
        this.board[pos] = this.XPLAYER;
        this.oPlays();
        Display.boardRefresh();             // tell the display to update                      
    }


    static reset(){                         // makes the New Game button clear the board
        for(let i = 0; i < Game.board.length; i++){
            this.board[i] = this.EMPTY;     // resets board
        }
        Display.boardRefresh();             // displays the reset board

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



