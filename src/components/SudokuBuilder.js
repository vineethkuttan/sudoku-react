class Sudoku {
    constructor(Size, noOfMissing) {
        this.size = Size;
        this.matrix = [];
        this.SRN = Math.sqrt(Size);
        for (let i = 0; i < Size; i += 1) {
            this.matrix.push(Array.from({ length: 9 }, () => 0));
        }
        this.missing = noOfMissing;
        this.fillValues();
    }
    removeDigits() {
        let count = this.missing;
        while (count !== 0) {
            let i = Math.floor(Math.random() * 9);
            let j = Math.floor(Math.random() * 9);
            if (this.matrix[i][j] !== 0) {
                count -= 1;
                this.matrix[i][j] = 0;
            }
        }
    }
    fillValues() {
        this.fillDiagonal();
        this.fillRemaining(0, this.SRN);
        this.ans = this.matrix.map(row => row.slice());
        this.removeDigits();
    }
    fillBox(row, col) {
        for (let i = 0; i < this.SRN; i += 1) {
            for (let j = 0; j < this.SRN; j += 1) {
                let randomNumber = Math.floor(Math.random() * 9);
                let boolCheck = true;
                while (!this.unUsedInBox(row, col, randomNumber)) {
                    if (boolCheck) {
                        randomNumber += 1;
                        randomNumber = randomNumber > this.size ? 1 : randomNumber;
                    }
                    else {
                        randomNumber -= 1;
                        randomNumber = randomNumber < 0 ? this.size : randomNumber;
                    }

                }
                boolCheck = !boolCheck;
                this.matrix[row + i][col + j] = randomNumber;
            }
        }
    }
    fillDiagonal() {
        for (let i = 0; i < this.size; i += this.SRN) {
            this.fillBox(i, i);
        }
    }
    unUsedInBox(rowStart, colStart, num) {
        for (let i = 0; i < this.SRN; i += 1) {
            for (let j = 0; j < this.SRN; j += 1) {
                let check = this.matrix[rowStart + i][colStart + j];
                if (check === num) {
                    return false;
                }
            }
        }
        return true;
    }

    CheckIfSafe(i, j, num) {
        return (this.unUsedInRow(i, num) && this.unUsedInCol(j, num) && this.unUsedInBox(i - i % this.SRN, j - j % this.SRN, num));
    }
    unUsedInRow(i, num) {
        for (let j = 0; j < this.size; j += 1) {
            if (this.matrix[i][j] === num) {
                return false;
            }
        }
        return true;
    }
    unUsedInCol(j, num) {
        for (let i = 0; i < this.size; i += 1) {
            if (this.matrix[i][j] === num) {
                return false;
            }
        }
        return true;
    }

    fillRemaining(i, j) {
        if (j >= this.size && i < this.size - 1) {
            i = i + 1
            j = 0
        }
        if (i >= this.size && j >= this.size) {
            return true;
        }
        if (i < this.SRN) {
            if (j < this.SRN) {
                j = this.SRN;
            }
        }
        else if (i < this.size - this.SRN) {
            if (j === Math.trunc(i / this.SRN) * this.SRN) {
                j = j + this.SRN;
            }
        }
        else {
            if (j === this.size - this.SRN) {
                i = i + 1;
                j = 0;
                if (i >= this.size) {
                    return true;
                }
            }
        }
        for (let num = 1; num < this.size + 1; num += 1) {
            if (this.CheckIfSafe(i, j, num)) {
                this.matrix[i][j] = num;
                if (this.fillRemaining(i, j + 1)) {
                    return true;
                }
                this.matrix[i][j] = 0;
            }


        }
        return false;

    }

    issafe(n, row, col) {
        if (this.matrix[row][col] !== 0) {
            return false;
        }
        for (let i = 0; i < this.size; i += 1) {
            if (this.matrix[row][i] === n) {
                return false;
            }
        }
        for (let i = 0; i < this.size; i += 1) {
            if (this.matrix[i][col] === n) {
                return false;
            }
        }
        let StartRow = row - row % this.SRN;
        let StartCol = col - col % this.SRN;
        for (let i = 0; i < this.SRN; i += 1) {
            for (let j = 0; j < this.SRN; j += 1) {
                if (this.matrix[i + StartRow][j + StartCol] === n) {
                    return false;
                }
            }
        }
        return true;
    }
}

export default Sudoku;
const s = new Sudoku(9, 18);
