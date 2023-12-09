import React, { useState, useEffect, useReducer, useContext } from 'react'
import { Grid } from './Grid'
import { HintContext } from './MainPage';
import Sudoku from './SudokuBuilder';
import { OptCard } from './OptCard';

let SudokuObj = new Sudoku(9, 45);
let initialGrid = SudokuObj.matrix;
let ansGrid = SudokuObj.ans;
let validate = [];
for (let i = 0; i < 9; i += 1) {
    validate.push(Array.from({ length: 9 }, () => 0));
}
let ArrCount = Array.from({ length: 9 }, () => 9)
for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
        if (initialGrid[i][j] !== 0) {
            ArrCount[initialGrid[i][j] - 1] -= 1;
        }
    }

}

const Validatereducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE':
            const updatedArray = state.map((row, rowIndex) =>
                rowIndex === action.rowIndex
                    ? row.map((col, colIndex) =>
                        colIndex === action.colIndex ? action.newValue : col
                    )
                    : row
            );
            return updatedArray;
        case 'REVERT':
            let validate = [];
            for (let i = 0; i < 9; i += 1) {
                validate.push(Array.from({ length: 9 }, () => 0));
            }
            return validate;
        default:
            return state;
    }
}
const Gridreducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE':
            if (action.newValue < 1 || action.newValue > 9) {
                window.alert("only numbers [1-9] are allowed!!")
                return state;
            }
            else {
                const updatedArray = state.map((row, rowIndex) =>
                    rowIndex === action.rowIndex
                        ? row.map((col, colIndex) =>
                            colIndex === action.colIndex ? action.newValue : col
                        )
                        : row
                );
                return updatedArray
            }
        default:
            return state;
    }
}

export const PlayArea = ({ reveal }) => {

    const hintContext = useContext(HintContext);
    const hint = hintContext.hint;
    const setHint = hintContext.setHint;
    const check = hintContext.check;
    const setCheck = hintContext.setCheck;
    const [question, setQuestion] = useState(initialGrid)
    const [Remaining, setRemaining] = useState(ArrCount)
    const [answer, setAnswer] = useState(ansGrid);
    const [state, griddispatch] = useReducer(Gridreducer, question)
    const [Validate, validatedispatch] = useReducer(Validatereducer, validate)
    // this.ans = this.matrix.map(row => row.slice());
    useEffect(() => {
        if (hint) {
            for (let i = 0; i < 9; i++) {
                for (let j = 0; j < 9; j++) {
                    if (state[i][j] !== answer[i][j]) {
                        griddispatch({ type: 'UPDATE', rowIndex: i, colIndex: j, newValue: answer[i][j] })
                        break;
                    }
                }
                if (hint) {
                    setHint(false);
                    break;
                }
            }
        }
        else if (check) {
            for (let i = 0; i < 9; i++) {
                for (let j = 0; j < 9; j++) {
                    if (state[i][j] !== question[i][j]) {
                        if (state[i][j] == answer[i][j]) {
                            validatedispatch({ type: 'UPDATE', rowIndex: i, colIndex: j, newValue: 1 })
                        }
                        else if (SudokuObj.CheckIfSafe(i, j, state[i][j])) {
                            validatedispatch({ type: 'UPDATE', rowIndex: i, colIndex: j, newValue: 3 })
                        }
                        else {

                            validatedispatch({ type: 'UPDATE', rowIndex: i, colIndex: j, newValue: 2 })
                        }
                    }
                }
            }
            setCheck(false);
        }
        else {

            const TArrCount = Array.from({ length: 9 }, () => 9);
            for (let i = 0; i < 9; i++) {
                for (let j = 0; j < 9; j++) {
                    if (state[i][j]) {
                        TArrCount[state[i][j] - 1] -= 1;
                    }
                }

            }
            setRemaining(TArrCount)
        }
    }, [state, hint, check])
    useEffect(() => { }, [Remaining])
    return (
        <div className="body" id="sudoku">
            {
                reveal ? <Grid question={answer} state={answer} /> : <Grid question={question} state={state} dispatch={griddispatch} validate={Validate} />
            }
            {
                reveal ? <OptCard remaining={Array.from({ length: 9 }, () => 0)} /> : <OptCard remaining={Remaining} />
            }

        </div>
    )
}
