class Sudoku {

    constructor(matrix) {
        this.grid = matrix;
    }

    inputNum(x, y, num) {
        this.grid[x][y] = num;
    }

    createRCBLists(x, y) {
        // "listR" contains all the numbers in a given row "x"
        var listR = this.grid[x];

        // "listC" contains all the numbers in a given column "y"
        var listC = [];
        for (let i = 0; i < 9; i++) {
            listC.push(this.grid[i][y])
        }

        // "listB" contains all the numbers in a given cell's box
        var listB = [];
        var listMR = [];
        var listMC = [];
        var modR = (x + 1) % 3;
        var modC = (y + 1) % 3;
        if (modR == 0) {
            var listMR = [x, x - 1, x - 2];
        }
        else if (modR == 1) {
            listMR = [x, x + 1, x + 2];
        }
        else {
            listMR = [x - 1, x, x + 1];
        }

        if (modC == 0) {
            listMC = [y, y - 1, y - 2];
        }

        else if (modC == 1) {
            listMC = [y, y + 1, y + 2];
        }
        else {
            listMC = [y - 1, y, y + 1];
        }
        for (let i = 0; i < listMR.length; i++) {
            for (let j = 0; j < listMC.length; j++) {
                listB.push(this.grid[listMR[i]][listMC[j]]);
            }
        }

        return [listR, listC, listB];
    }

    checkNum(x, y, num) {
        if (this.grid[x][y] != 0) {
            return false;
        }

        var lists = this.createRCBLists(x, y);
        var listR = lists[0];
        var listC = lists[1];
        var listB = lists[2];


        if (listR.includes(num)) {
            return false;
        }
        else if (listC.includes(num)) {
            return false;
        }
        else if (listB.includes(num)) {
            return false;
        }
        else {
            return true;
        }
        
    }

    locateEmpty() {
        for (let x = 0; x < 9; x++) {
            for (let y = 0; y < 9; y++) {
                if (this.grid[x][y] == 0) {
                    return [x, y];
                }
            }
        }
    }

    solve() {
        let emptyLoc = this.locateEmpty();
        if (!emptyLoc) {
            return true;
        }
        else {
            var x = emptyLoc[0];
            var y = emptyLoc[1];   
        }

        for (let i = 1; i < 10; i++) {
            if (this.checkNum(x, y, i)) {
                this.inputNum(x, y, i);

                if (this.solve()) {
                    return true;
                }

                this.inputNum(x, y, 0);
            }
        }
        
        return false;
    }

    returnArray() {
        return this.grid;
    }
}

export default Sudoku;