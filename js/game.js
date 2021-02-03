class Game {

    static gameOver = false;
    static XPLAYER = "X";       // create strings for X, O, blank
    static OPLAYER = "O";       // static constants are all caps
    static EMPTY = " "
    static TALLYXPLAYER = 0;    // array index into tally for xCount
    static TALLYOPLAYER = 1;    // array index into tally for oCount
    static TALLYBSQUARE = 2;    // array index into tally for empty Count
    static TALLYBINDEX = 3;     // location of last empty square
    static board = [            // make the game board, an array
        this.EMPTY, this.EMPTY, this.EMPTY,
        this.EMPTY, this.EMPTY, this.EMPTY,
        this.EMPTY, this.EMPTY, this.EMPTY
    ]

    static xPlays(e){           // logs click (and X) to array element
        if(this.gameOver){
            return;
        }
        Display.setMessage("&nbsp;");
        let pos = e.srcElement.id;
        console.log(pos);
        if(this.board[pos] !== this.EMPTY){ // ensures that X can only be placed in a blank spot
            Display.setMessage("Your mother smells of elderberries. Pick an empty spot.");
            return;
        }
        this.board[pos] = this.XPLAYER;
        if(this.didWin(this.XPLAYER)){      // check if X won, and display message
            Display.boardRefresh();
            Display.setMessage("Congratulations, you won!");
            this.gameOver = true;
            return;
        }
        this.oPlays();
        let result = this.tallyBoard();
        if(this.didWin(this.OPLAYER)){
            Display.boardRefresh();
            Display.setMessage("You get nothing! You lose, good day sir!");
            var img = document.createElement('img'); 
            img.src ='https://media2.giphy.com/media/10h8CdMQUWoZ8Y/giphy-downsized-large.gif'; 
            document.getElementById("message").appendChild(img); 
            this.gameOver = true;
        }
        Display.boardRefresh();             // tell the display to update
    }

    static didWin(thePlayer){               // checks whether the human player has won
        let player;
        if(thePlayer === this.XPLAYER){
            player = this.TALLYXPLAYER;
        } else {
            player = this.TALLYOPLAYER;
        }
        let tally = this.tallyBoard();
        for(let i = 0; i < tally.length; i++){
            if(tally[i][player] === 3){
                return true;
            }
        }
        return false;
    }

    static reset(){
        for(let i = 0; i < Game.board.length; i++){
            this.board[i]  =  this.EMPTY;
        }
        Display.boardRefresh();
        this.gameOver = false;
    }

    static tallyBoard(){

        let tally = [];
        let xCount = 0;
        let oCount = 0;
        let eCount = 0;
        let emptyBox;
        let tallyIndex = 0;

        // check the rows
        for(let i = 0; i < this.board.length; i += 3){
            for( let j = 0; j < 3; j++){
               switch(Game.board[i + j] ) {
                   case this.XPLAYER:
                       xCount++;
                       break;
                    case this.OPLAYER:
                        oCount++;
                        break;
                    case this.EMPTY:
                        eCount++;
                        emptyBox = i + j;
                        break;
               } 
            }
            tally[tallyIndex++] = [xCount, oCount, eCount, emptyBox];
            xCount = 0;
            oCount = 0;
            eCount = 0;
        }

        xCount = 0;
        oCount = 0;
        eCount = 0;
        // check the columns
        for(let i = 0; i < 3; i++){
            for( let j = 0; j < this.board.length; j += 3){
                switch(Game.board[i + j] ) {
                    case this.XPLAYER:
                        xCount++;
                        break;
                     case this.OPLAYER:
                         oCount++;
                         break;
                     case this.EMPTY:
                         eCount++;
                         emptyBox = i + j;
                         break;
                } 
            }
            tally[tallyIndex++] = [xCount, oCount, eCount, emptyBox];
            xCount = 0;
            oCount = 0;
            eCount = 0;
        }

       // check the diagonals
       xCount = 0;
       oCount = 0;
       eCount = 0;
       let xCount1 = 0;
       let oCount1 = 0;
       let eCount1 = 0;
       let emptyBox1;
   for(let i = 0, j = 2; i < this.board.length; i += 4 , j += 2){
                switch (Game.board[i]){
                    case this.XPLAYER:
                        xCount++;
                        break;
                     case this.OPLAYER:
                         oCount++;
                         break;
                     case this.EMPTY:
                         eCount++;
                         emptyBox = i;
                         break;
                }

                switch(Game.board[j]) {
                    case this.XPLAYER:
                        xCount1++;
                        break;
                     case this.OPLAYER:
                         oCount1++;
                         break;
                     case this.EMPTY:
                         eCount1++;
                         emptyBox1 = j;
                         break;
                }               
        }
        tally[tallyIndex++] = [xCount, oCount, eCount, emptyBox];
        tally[tallyIndex++] = [xCount1, oCount1, eCount1, emptyBox1];
        return tally;
    }

    static reset(){
        for(let i = 0; i < Game.board.length; i++){
            this.board[i]  =  this.EMPTY;
        }
        Display.boardRefresh();
        this.gameOver = false;
    }


    static oCanWin(){
        let tally = this.tallyBoard();
        for(let i = 0; i < tally.length; i++){
            if(tally[i][this.TALLYOPLAYER] === 2 &&
               tally[i][this.TALLYBSQUARE] === 1 ){
                return tally[i][this.TALLYBINDEX];
            }
        }
        return -1;
    }

    static oCanBlock(){
        let tally = this.tallyBoard();
        for(let i = 0; i < tally.length; i++){
            if(tally[i][this.TALLYXPLAYER] === 2 &&
               tally[i][this.TALLYBSQUARE] === 1 ){
                return tally[i][this.TALLYBINDEX];
            }
        }
        return -1;
    }

     /* static oGrabCenter();{              // utter nonsense connected to center square, delete
        let centerSquare = this.board[4];
    } */

    static oPlays(){
        //First, check if next move can win
        let winSquare = this.oCanWin();
        if( winSquare > -1){
            this.board[winSquare] = this.OPLAYER;
            return;   
        }

        //If a winning move is not available, is a block available
        let blockSquare = this.oCanBlock();
        if( blockSquare > -1){
            this.board[blockSquare] = this.OPLAYER;
            return;   
        }
        /* // If center square is blank, O plays it : this section is breaking everything
        let centerSquare = this.oGrabCenter();
        if (centerSquare = this.EMPTY;) {
            this.board[4] = this.OPLAYER;
            return;
        }
        */
           
        /* terrible initial attempt, delete this filth
        if (this.board[4]  ===  this.EMPTY;){
            this.board[4] = this.OPLAYER;
            return;
        } */ 


        //Pick the next available open square
        for(let i = 0; i < Game.board.length; i++){
            if(this.board[i] === this.EMPTY){
                this.board[i] = this.OPLAYER;
                return;
            } 
        }
    Display.boardRefresh();         // Tie game display message! 
    Display.setMessage("It's a tie. Please try a new game."); 
    this.gameOver = true;                   // Tie game reset. 
    }
}