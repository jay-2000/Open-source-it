let currentPlayer = 1, winner;
let playWithCpu = confirm('VS Computer?');
const tableData = [];

const reset = () => { 
    winner = null; 
    currentPlayer = 1;
    for (let i = 0; i < 9; i++) {
        tableData[i].innerText = '';
    }
    playWithCpu = confirm('VS Computer?');
}

const restartBtn = document.querySelector("button");
restartBtn.addEventListener('click', reset);

const checkText = (index) => {
    if (tableData[index].innerText  === '') return true;
    return false;
}

const compareText = (i, j) => {
    if (tableData[i].innerText === tableData[j].innerText) return true;
    return false;
}


const checkWin = () => {
    for ( let i = 0; i < 9; i += 3) {
        if (compareText(i, i+1) && compareText(i, i+2) && !checkText(i)) {
            return tableData[i].innerText;
        }
    }
    for (let i = 0; i < 3; i++){
        if (compareText(i, i+3) && compareText(i, i+6) && !checkText(i)) {
            return tableData[i].innerText;
        }
    }
    if (compareText(0, 4) && compareText(0, 8) && !checkText(0)) {
        return tableData[0].innerText;
    }

    if (compareText(2, 4) && compareText(2, 6) && !checkText(2)) {
        return tableData[2].innerText;
    }
}

const compute = () => {
    for (let i = 0, j = 0; i < 9; i += 3, j++) {
        if (compareText(i, i+1) && !checkText(i) && checkText(i+2)) {
            return i+2;
        }
        if (compareText(i, i+2) && !checkText(i) && checkText(i+1)) {
            return i+1;
        }
        if (compareText(i+1, i+2) && !checkText(i+1) && checkText(i)) {
            return i;
        }
        if (compareText(j, j+3) && !checkText(j) && checkText(j+6)) {
            return j+6;
        }
        if (compareText(j, j+6) && !checkText(j) && checkText(j+3)) {
            return j+3;
        }
        if (compareText(j+3, j+6) && !checkText(j+3) && checkText(j)) {
            return j;
        }
    }

    if (compareText(0, 4) && !checkText(0) && checkText(8)) {
        return 8;
    }
    if (compareText(0, 8) && !checkText(0) && checkText(4)) {
        return 4;
    }
    if (compareText(4, 8) && !checkText(4) && checkText(0)) {
        return 0;
    }
    if (compareText(2, 4) && !checkText(2) && checkText(6)) {
        return 6;
    }
    if (compareText(2, 6) && !checkText(2) && checkText(4)) {
        return 4;
    }
    if (compareText(4, 6) && !checkText(4) && checkText(2)) {
        return 2;
    }
}

for (let i = 0; i < 9; i++) {
    tableData[i] = document.querySelector(`#td${i+1}`);
    tableData[i].addEventListener('click', (e) => {
        if(e.target.innerText === ""){
            if (currentPlayer % 2) {
                e.target.innerText = "X";
            }
            else {
                e.target.innerText = "O";
            }
            currentPlayer++;
        }
        else {
            alert("Position Already Taken!");
        }

        winner = checkWin();
        if (winner){
            setTimeout( () => {
                alert(`${winner} Won`);
                reset();
            }, 50);
        }

        if (currentPlayer === 10) {
            setTimeout( () => {
                alert("Draw!");
                reset();
            }, 50);  
        }

        if (playWithCpu && currentPlayer % 2 === 0 && currentPlayer < 10 && !winner) {
            let index = compute();
            if (index === undefined) {
                index = Math.floor(Math.random() * 9);
                while (!checkText(index)) {
                    index = Math.floor(Math.random() * 9);
                } 
            }
            tableData[index].click();
        }
    });
}