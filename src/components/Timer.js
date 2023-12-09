import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react'

export const Timer = forwardRef((props, ref) => {

    const [time, setTime] = useState(Date.now());
    const [intialtime, setIntialtime] = useState(Date.now())
    const [timerOn, setTimerOn] = useState(false);
    const TimerFunction = (timerdata) => {

        (timerdata === 1) ? setTimerOn(1) :
            (timerdata === 2) ? setTimerOn(0) :
                (timerdata === 3) ? setTime(Date.now()) :
                    (timerdata === 4) ? setTimerOn(2) : console.log(timerdata)
    }
    useImperativeHandle(ref, () => ({
        TimerFunction,
    }));

    useEffect(() => {
        let interval = null;
        if (timerOn === 1) {
            setIntialtime(Date.now());
        }
        if (timerOn) {
            interval = setInterval(() => {
                setTime((prevTime) => {
                    return (Date.now() - intialtime)
                })
                // });
            }, 1000);
        } else if (!timerOn) {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [timerOn]);

    return (
        <>

            <div className="vertical-adjust">
                <span className="material-icons">timer</span>
                <span id="timer-label">Time</span>
            </div>
            {
                ((intialtime - time) > 10000) ?
                    <div id="timer" className="timer">{("0" + Math.floor(time / 60000)).slice(-2)}:{("0" + Math.floor((time / 1000) % 60)).slice(-2)}</div> :
                    <div id="timer" className="timer">00:00</div>
            }

        </>
    );
});
