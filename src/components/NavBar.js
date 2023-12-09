import { useState, useEffect, useRef, useContext } from 'react';
import { HintContext } from './MainPage';

export const NavBar = ({ surrender, restart, hint }) => {

    const moreOptionRef = useRef()

    const hintContext = useContext(HintContext);

    const [moreOptionClicked, setMoreOptionClicked] = useState(false)

    window.addEventListener('click', e => {
        if ((moreOptionRef.current !== null && e.target !== null) &&
            (!moreOptionRef.current.contains(e.target))) {
            setMoreOptionClicked(false);
        }
    })

    const Surrender = () => {
        setMoreOptionClicked(!moreOptionClicked)
        surrender();
    }

    const Restart = () => {
        setMoreOptionClicked(!moreOptionClicked)
        restart();

    }
    const Hint = () => {
        setMoreOptionClicked(!moreOptionClicked)
        hintContext.setHint();
    }

    const Check = () => {
        setMoreOptionClicked(!moreOptionClicked)
        hintContext.setCheck();
    }
    return (
        <div>
            <nav className="app-bar">
                <button className="button bar-button hamburger-button">
                    <span className="material-icons">menu</span>
                </button>
                <div className="bar-font title">Sudoku</div>
                <div ref={moreOptionRef} id="moreoption-sec" className="more-option-div more-button" style={{ display: "block" }}>
                    <button onClick={() => setMoreOptionClicked(!moreOptionClicked)} className="button bar-button">
                        <span className="material-icons">more_vert</span>
                    </button>
                    {moreOptionClicked &&
                        <div id="more-option-list" style={{ visibility: "visible", maxHeight: "160px", maxWidth: "160px", minWidth: "160px", opacity: "1" }} className="more-option-list">
                            <button onClick={Hint} ripple-color="#003c8f" className="button nav-item vertical-adjust">Hint</button>
                            <button onClick={Restart} ripple-color="#003c8f" className="button nav-item vertical-adjust">Restart</button>
                            <button onClick={Surrender} ripple-color="tomato" className="button nav-item vertical-adjust">Surrender</button>
                        </div>
                    }
                </div>

                {/* <button id="pause-btn" className="button bar-button more-button" style={{ di: "block" }}>
                    <span id="pause-icon" className="material-icons">pause</span>
                    <span id="pause-text">Pause</span>
                </button> */}
                <button onClick={Check} id="check-btn" className="button bar-button more-button" style={{ display: "block" }}>
                    <span className="material-icons">done_all</span>
                    <span>Check</span>
                </button>
                <button id="isunique-btn" style={{ display: "none" }} className="button bar-button more-button">
                    <span className="material-icons">call_split</span>
                    <span>Is unique</span>
                </button>
                <button id="solve-btn" style={{ display: "none" }} className="button bar-button more-button">
                    <span className="material-icons">border_color</span>
                    <span>Solve</span>
                </button>

            </nav>
        </div>
    )
}

{/* <nav className="app-bar">
    <button onclick="HamburgerButtonClick();" className="button bar-button hamburger-button">
        <span className="material-icons">menu</span>
    </button>
    <div className="bar-font title">Sudoku</div>
    <div id="moreoption-sec" className="more-option-div more-button" style="display: block;">
        <button onclick="moreOptionButtonClick()" className="button bar-button">
            <span className="material-icons">more_vert</span>
        </button>
        <!-- it is important to put these styles in here because if I do not do that it will not work in javaScript-->
        <div id="more-option-list" style="visibility: hidden;max-height: 10px;max-width: 40px;min-width: 40px;" className="more-option-list">
            <button onclick="hintButtonClick()" ripple-color="#003c8f" className="button nav-item vertical-adjust">Hint</button>
            <button onclick="restartButtonClick()" ripple-color="#003c8f" className="button nav-item vertical-adjust">Restart</button>
            <button onclick="SurrenderButtonClick()" ripple-color="tomato" className="button nav-item vertical-adjust">Surrender</button>
        </div>
    </div>

    <button id="pause-btn" onclick="pauseGameButtonClick()" className="button bar-button more-button" style="display: block;">
        <span id="pause-icon" className="material-icons">pause</span>
        <span id="pause-text">Pause</span>
    </button>
    <button id="check-btn" onclick="checkButtonClick()" className="button bar-button more-button" style="display: block;">
        <span className="material-icons">done_all</span>
        <span>Check</span>
    </button>
    <button id="isunique-btn" style="display: none;" onclick="isUniqueButtonClick();" className="button bar-button more-button">
        <span className="material-icons">call_split</span>
        <span>Is unique</span>
    </button>
    <button id="solve-btn" style="display: none;" onclick="solveButtonClick()" className="button bar-button more-button">
        <span className="material-icons">border_color</span>
        <span>Solve</span>
    </button>

</nav> */}