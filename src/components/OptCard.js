import React, { useEffect, useRef } from 'react'
import { Timer } from './Timer'
const remainTable = [1, 4, 7, 2, 5, 8, 3, 6, 9]

export const OptCard = ({ remaining }) => {
    const TimerRef = useRef();
    useEffect(() => {
        TimerRef.current.TimerFunction(1);
    })
    return (
        <div className="card status">
            <div id="game-number">game #1</div>
            <ul className="game-status">
                <li>
                    <Timer ref={TimerRef} />
                </li>

                <li>
                    <div className="vertical-adjust">
                        <span className="material-icons">network_check</span>
                        <span id="game-difficulty-label">Game difficulty</span>
                    </div>
                    <div id="game-difficulty" className="timer">Medium</div>
                </li>
                <li>
                    <div className="vertical-adjust">
                        <span className="material-icons">grid_on</span>
                        <span>Remaining numbers</span>
                    </div>
                    <div className="remain-table">

                        {remainTable.map((row, rowIndex) => (
                            <div className="remain-column">
                                <div className="remain-cell">
                                    <div className="remain-cell-header">{rowIndex + 1}</div>
                                    <div id={`remain-${rowIndex + 1}`} className="remain-cell-content">{remaining[rowIndex]}</div>
                                </div>
                            </div>
                        ))}

                    </div>
                </li>
            </ul>
        </div>
    )
}
