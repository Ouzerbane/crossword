
const solution = [];

const hasNoDuplicates = (words) => words.length === new Set(Array.words).size;

function Mysplit(puzzle) {
    return String(puzzle).split('\n').map(line => line.split(''));
}

function deepCopy(matrix) {
    if (!Array.isArray(matrix)) {
        return null;
    }
    return matrix.map(row => [...row]);
}


function countStartPositions(matrix) {
    let count = 0;
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] === '1') {
                count++;
            }else if ( matrix[i][j] === '2'){
               count += 2
            }
        }
    }
    return count;
}

function isValidPuzzle(matrix, words) {
    return !hasNoDuplicates(words) && countStartPositions(matrix) !== words.length;
}

function finish(puzzle) {
    return puzzle.every(row => 
        row.every(cell => !['1', '2', '0'].includes(cell))
    );
}


function checkHorizontal(puzzle, row, col, word) {
    if (col + word.length > puzzle[0].length) return false;
    for (let i = 0; i < word.length; i++) {
        const currentCell = puzzle[row][col + i];
        if (currentCell !== '1' && currentCell !== '2' && 
            currentCell !== '0' && currentCell !== word[i]) {
            return false;
        }
    }
    return true;
}

function checkVertical(puzzle, row, col, word) {
    if (row + word.length > puzzle.length) return false;
    for (let i = 0; i < word.length; i++) {
        const currentCell = puzzle[row + i][col];
        if (currentCell !== '1' && currentCell !== '2' && 
            currentCell !== '0' && currentCell !== word[i]) {
            return false;
        }
    }
    return true;
}


function setWordHorizontally(puzzle, row, col, word) {
    for (let i = 0; i < word.length; i++) {
        puzzle[row][col + i] = word[i];
    }
}

function setWordVertically(puzzle, row, col, word) {
    for (let i = 0; i < word.length; i++) {
        puzzle[row + i][col] = word[i];
    }
}


function solve(puzzle, matrix, words) {
    if (words.length === 0) {
        if (finish(puzzle)) {
            solution.push(deepCopy(puzzle));
        }
        return;
    }

    const word = words[0];
    for (let row = 0; row < puzzle.length; row++) {
        for (let col = 0; col < puzzle[row].length; col++) {
            if (matrix[row][col] !== '1' && matrix[row][col] !== '2') {
                continue;
            }

            // if (checkHorizontal(puzzle, row, col, word)) {
            //     const puzzleCopy = deepCopy(puzzle);
            //     setWordHorizontally(puzzleCopy, row, col, word);
            //     solve(puzzleCopy, matrix, words.slice(1));
            //     if (solution.length > 1) return;
            // }
            if (checkHorizontal(puzzle,row,col,word)){
                const puzzleCopy = deepCopy(puzzle)
                setWordHorizontally(puzzleCopy,row,col,word)
                solve(puzzleCopy,matrix,words.slice(1))
                if (solution.length>1){
                    return
                }
            }

  
            if (checkVertical(puzzle, row, col, word)) {
                const puzzleCopy = deepCopy(puzzle);
                setWordVertically(puzzleCopy, row, col, word);
                solve(puzzleCopy, matrix, words.slice(1));
                if (solution.length > 1) return; 
            }
        }
    }
}


function crosswordSolver(puzzle, words) {
    if (!Array.isArray(words)){
        console.log("Error");
        return 
    }
    const matrix =  Mysplit(puzzle);
   // solution.length = 0;
    
    if (isValidPuzzle(matrix, words)) {
        console.log('Error');
        return;
    }

    solve(matrix, matrix, words);
    
    if (solution.length === 1) {
        console.log(solution[0].map(row => row.join('')).join('\n'));
    } else {
        console.log("Error");
    }
}
const puzzle = '2001\n0..0\n1000\n0..0'
const words = ['casa', 'alan', 'ciao', 'anta']
crosswordSolver(puzzle, words);
