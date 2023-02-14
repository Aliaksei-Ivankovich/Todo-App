import { useState, useEffect } from "react";

import './Timer.css';

const Timer = ({ taskTime, stopTimer }) => {

    const [leftTime, setLeftTile] = useState(taskTime)
    const [timerId, setTimerId] = useState()
    const [isTimerOn, setIsTimerOn] = useState(false)

    useEffect(() => {

        if (isTimerOn) {
            setTimerId(setInterval(updateTimer, 1000))
        }
        if (!isTimerOn && timerId) {
            clearInterval(timerId)
            stopTimer(leftTime)
        }
        return () => {
            clearInterval(timerId)
        }
    }, [isTimerOn])

    useEffect(() => {
        if (leftTime === 0 && timerId) {
            clearInterval(timerId)
            stopTimer(leftTime)
        }
    }, [leftTime])

    const updateTimer = () => {
        setLeftTile((leftTime) => (
            leftTime = leftTime - 1
        ))
    }

    const onTimerPlay = () => {
        setIsTimerOn(true)
    }

    const onTimerStop = () => {
        setIsTimerOn(false)
    }

    const getTime = (leftTime) => {
        const min = Math.floor(leftTime / 60).toString().padStart(2, "0")
        const sec = Math.floor(leftTime % 60).toString().padStart(2, "0")
        return {min, sec}
    }
    
    const time = getTime(leftTime)

    return (
        <>
            <button className="timer__icon icon-play" 
                    onClick={onTimerPlay}
                    disabled={isTimerOn}>
            </button>
            <button className="timer__icon icon-pause"
                    onClick={onTimerStop}
                    disabled={!isTimerOn}>
            </button>
            <span>
                {time.min}:{time.sec}
            </span>
        </>

    )
}

export default Timer;