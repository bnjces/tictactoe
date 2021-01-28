class Display  {  // Code for the Display below the game, so the player is aware of outcomes.


    static boardRefresh(){   // updates items on screen based on the array
        for (let i = 0; i < Game.board.length; i++){
            document.getElementById(i).innerHTML = Game.board[i].replace(Game.EMPTY, "&nbsp;"); //retrieve entries from array and display in game
        }
    }
    static setMessage (message){
        document.getElementById("message").innerHTML = message;  // retrieve msg below the board
    }  



} 