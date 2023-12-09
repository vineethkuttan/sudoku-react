import { useState, useReducer, useEffect, useContext } from 'react'

export const Grid = (props) => {

    const question = props.question;
    const state = props.state;
    const dispatch = props.dispatch;
    const validate = props.validate;
    const dataChecker = (data, rowI, colI) => {
        if (data < "1" || data > "9") {
            if (data !== "?" && data !== "؟") {
                data = "";
                alert("only numbers [1-9] and question mark '?' are allowed!!");
            }
        }
        else {

            dispatch({ type: 'UPDATE', rowIndex: rowI, colIndex: colI, newValue: data })

        }
    }
    return (
        <div>
            <div className="card game">
                <table id="puzzle-grid" ><tbody>
                    {
                        question.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {row.map((col, colIndex) => (
                                    <td key={colIndex}>
                                        <input type="text" className={(validate[rowIndex][colIndex] === 1) ? 'right-cell' : (validate[rowIndex][colIndex] === 0) ? '' : (validate[rowIndex][colIndex] === 3) ? 'worning-cell' : 'wrong-cell'}

                                            value={state[rowIndex][colIndex] ? state[rowIndex][colIndex] : ''} onChange={e => dataChecker(e.target.value, rowIndex, colIndex)} maxLength={1} disabled={question[rowIndex][colIndex]} />
                                    </td>
                                ))}
                            </tr>
                        ))
                    }
                </tbody></table>
            </div>
        </div>
    )
}
