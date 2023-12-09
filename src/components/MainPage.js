import React, { useState, useEffect, useReducer } from 'react'
import { NavBar } from './NavBar'
import { PlayArea } from './PlayArea';

export const HintContext = React.createContext()
const reducer = (state) => {
    return !state;
}
export const MainPage = () => {
    const [hint, setHint] = useReducer(reducer, false);
    const [check, setCheck] = useReducer(reducer, false);
    const [reveal, setReveal] = useState(false)
    const Surrender = () => {
        setReveal(true)
    }
    const Restart = () => {
        window.location.reload();
    };
    return (

        <div>
            <HintContext.Provider value={{ hint: hint, setHint: setHint, check: check, setCheck: setCheck }}>
                <NavBar surrender={Surrender} restart={Restart} />
                <PlayArea reveal={reveal} />
            </HintContext.Provider>
        </div>
    )
}
