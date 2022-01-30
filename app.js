const inputContainer = document.querySelector('#inputContainer')
const divGame = document.getElementById('game')
const scoreChart = document.querySelector('#scoreChart')
const scoreTable = document.getElementById('scoreTable')
const player1 = document.querySelector('input[name=player1]');
const player2 = document.querySelector('input[name=player2]');
const player1Color = document.querySelector('input[name=player1Color]')
const player2Color = document.querySelector('input[name=player2Color]')
const backG = document.querySelector('input[name=backG]')
const submitButton = document.querySelector('#sub');
const form = document.querySelector('form');
const section = document.querySelector('section');
const table = document.querySelector('table')

const board = [
    [ null, null, null, null, null, null, null ],
    [ null, null, null, null, null, null, null ],
    [ null, null, null, null, null, null, null ],
    [ null, null, null, null, null, null, null ],
    [ null, null, null, null, null, null, null ],
    [ null, null, null, null, null, null, null ],
];

let dataBase = []
let activePlayer = []

class buildConnect4 {
    constructor(p1,p2, backGround){
        
        this.players = [p1, p2]
        this.cellColor = backGround
        this.createTableCells()
        this.buildIt()
        this.assignHeaderClickEvents()
    }
    
    buildIt(){

        this.createProfile()
        inputContainer.remove()
        this.createScoreBoard()
        activePlayer.push(dataBase[0])
        divGame.style.pointerEvents = 'auto'
    }
   
    createProfile(){
        
        this.players[0]['Wins'] = 0
        this.players[0]['colorMark'] = 'r'
        
        this.players[1]['Wins'] = 0
        this.players[1]['colorMark'] = 'b'
        dataBase.push(this.players[0],this.players[1])
    }
    
    // Creates table for scoreboard.
    createScoreBoard(){
           
        let scoreArray = [
            [null, null],
            [null, null]
        ]
        let scoreTableRow = document.createElement('tr')
        
        scoreChart.appendChild(scoreTableRow)
        let scoreTableHeaderCell1 = document.createElement('th')
        let scoreTableHeaderCell2 = document.createElement('th')
        scoreTableRow.appendChild( scoreTableHeaderCell1)
        scoreTableRow.appendChild( scoreTableHeaderCell2)
        scoreTableRow.classList.add('scoreTableRow')
        scoreTableHeaderCell1.classList.add('scoreTableHeaderCell1')
        scoreTableHeaderCell2.classList.add('scoreTableHeaderCell2')
        scoreTableHeaderCell1.innerText = 'Player'
        scoreTableHeaderCell2.innerText = 'Wins'
    
        globalThis.scoreCells = []
        scoreArray.map((row) => {
            let scoreRow = document.createElement('tr')
            scoreRow.classList.add('scoreRow')
            scoreChart.appendChild(scoreRow)
            row.map(cell => {
                let scoreColumn = document.createElement('td')
                scoreRow.appendChild(scoreColumn)
                scoreColumn.classList.add('scoreColumn');
                scoreCells.push(scoreColumn)  
            })
        })
        scoreCells[0].innerText = `${this.players[0].Name}`
        scoreCells[2].innerText = `${this.players[1].Name}`
        scoreCells[1].innerText = `${this.players[0].Wins}`
        scoreCells[3].innerText = `${this.players[1].Wins}`      
    }
        // This function creates board for game.
        
    createTableCells(){
        //Creates header of board.
        let trr = document.createElement('tr')
        table.appendChild(trr)
        let aa = [null, null, null, null, null, null, null]
        aa.map((a)=>{
            let th = document.createElement('th')
            th.classList.add('boardHeader')
            trr.append(th)
        })
        //Creates body of board.
        globalThis.tdArray = []
        board.forEach(row => {
            let tr = document.createElement('tr')
            
            tr.style.backgroundColor = this.cellColor
            table.appendChild(tr)
            row.forEach( col => {
                let td = document.createElement('td')
                tr.appendChild(td)
                tdArray.push(td)
            })
        })
        divGame.style.pointerEvents = 'none'
        section.style.marginBottom = '350px'
    }
            
        
    assignHeaderClickEvents(){
        const h = document.querySelectorAll('th');
        let headerList = Array.from(h)
        headerList.forEach(hdr => hdr.addEventListener('click', this.dynamics.bind(this)))
    }
     

    dynamics(e){
        this.createPosition(e.target.cellIndex)
        this.checkForWin()
        this.switchPlayer()  
    }
        
    // This function finds the position in the array that was in the column that was clicked 
    // and then replaces null with the color of the active player.
    createPosition(cIdx){
            // i is for rows and k is for columns of the gameboard.
            
        for(let i = board.length -1; i >= 0; i--){
            for(let k = 0; k < board[i].length; k++){
                if(k == cIdx){
                    if(board[i][k] == null){
                        board[i].splice(k,1,activePlayer[0].colorMark);
                        this.createDot([i,k])
                        return
                    }   
                }
            }
        }
    }
        
        
   
        
    
    tdArray2(arrs){
        let q = []
        arrs.map((each,i) => {
            if(i%7 === 0){
                q.push(arrs.slice(i,i+7)) 
            }
        })
        return q
    }

    createDot(point){
        // let xArr = this.createTableCells
        //  console.log(tdArray)
        // convertedArray contains 2 dimensionl array of each 'td'/column that was created, to insert colored dot in. 
        let convertedArray = this.tdArray2(tdArray)
        let y = point[0]
        let x = point[1]
        let location = convertedArray[y][x]
        if(activePlayer[0].colorMark == 'r'){
            let circ = document.createElement('span')
            circ.style.height = '30px'
            circ.style.width = '30px'
            circ.style.borderRadius =  '50%'
            circ.style.margin = 'auto'
            circ.style.display = 'block'
            circ.style.backgroundColor = this.players[0].Color
            //  circ.classList.add('red')
            location.appendChild(circ)
        }else if(activePlayer[0].colorMark == 'b'){
            let circ = document.createElement('span')
            circ.style.height = '30px'
            circ.style.width = '30px'
            circ.style.borderRadius =  '50%'
            circ.style.margin = 'auto'
            circ.style.display = 'block'
            circ.style.backgroundColor = this.players[1].Color
            // circ.classList.add('blue')
            location.appendChild(circ)
        }
    }
        
        
    checkForWin(){
        
            globalThis.HEIGHT = board.length
            globalThis.WIDTH = board[0].length;
        
            function win(cells) {
                
                return cells.every(
                    ([y, x]) =>
                      y >= 0 &&
                      y < HEIGHT &&
                      x >= 0 &&
                      x < WIDTH &&
                      board[y][x] == activePlayer[0].colorMark
                  );
            }
        
            for(var y = 0; y < HEIGHT; y++) {
                for (var x = 0; x < WIDTH; x++) {
                    //Coordinates to check for win.
                    var horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
                    var vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
                    var diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
                    var diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
                    
                    
                    if (win(horiz) || win(vert) || win(diagDR) || win(diagDL)) {
                        gameOver(this.players )
                    }
                }   
            }
        
            function gameOver(gamers){
                
                divGame.style.pointerEvents = 'none'
                alert(`game over ${activePlayer[0].Name} WON`);
                // Updates database & score chart.
                activePlayer[0].Wins ++
                
                if(activePlayer[0].Name == gamers[0].Name ){
                    scoreCells[1].innerText = `${gamers[0].Wins}`
                }
                if(activePlayer[0].Name == (gamers[1].Wins)){
                    scoreCells[3].innerText = `${gamers[1].Wins}`
                }
                // Creates reset button
                let resetButton = document.createElement('input')
                resetButton.classList.add('resetButton')
                resetButton.type = 'submit'
                resetButton.value = 'RESET'
                scoreTable.appendChild(resetButton)
        
                resetButton.addEventListener('click', function(e){
                    e.preventDefault()
                    // Resets array elements to begin new game.
                    board.forEach( row => {
                        row.forEach(function(part, index, theArray) {
                            theArray[index] = null;
                        })
                    })
                    
                    // Collects all created dots and removes it to begin new game.
                    let dotsFromOldGame = Array.from(document.querySelectorAll(" td > span"))
                    for(let dot of dotsFromOldGame){
                        dot.remove()
                    }
        
                    resetButton.remove()
                    divGame.style.pointerEvents = 'auto'
                    
                })
            }
    }
    switchPlayer(){
        
        if(activePlayer[0] === dataBase[0] ){
            activePlayer.splice(0,1,dataBase[1])
        }else if(activePlayer[0] === dataBase[1] ){
            activePlayer.splice(0,1,dataBase[0])
        }
}
}

class makeProfile{
    constructor(playerName,playerColor){
        this.Name = playerName
        this.Color = playerColor
    }
}

submitButton.addEventListener('click', function(){
    if(player1.value.length!=0 &&
        player2.value.length!=0 &&
        player1Color.value.length!=0 &&
        player2Color.value.length!=0){
            const p1 = new makeProfile(player1.value, player1Color.value)
            const p2 = new makeProfile(player2.value, player2Color.value)
            new buildConnect4(p1, p2,  backG.value)
     }
    
})