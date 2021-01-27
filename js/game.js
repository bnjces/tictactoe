class Game {

    static XPLAYER = "X";                   // create strings for X, O, blank
    static OPLAYER = "O";                   // static constants are all caps
    static EMPTY = " ";

    static board= [                         // make the game board, an array
        this.EMPTY, this.EMPTY, this.EMPTY,
        this.EMPTY, this.EMPTY, this.EMPTY,
        this.EMPTY, this.EMPTY, this.EMPTY
    ]    
    
    static xPlays(e){
        let pos = e.srcElement.id;
        console.log(pos);
        this.board[pos] = this.XPLAYER;
        Display.boardRefresh();             // tell the display to update
    }





}