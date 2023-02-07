import { Component } from "react";

class Timer  extends Component {
    constructor(props) {
        super(props)
        this.state = {
            leftTime: this.props.taskTime
        }
    }

    componentDidMount() {
        const { isTimerOn } = this.props

        if (isTimerOn) {
            this.updateTimer()
        }
    }

    componentDidUpdate(prevProps) {
        const { isTimerOn } = this.props

        if (isTimerOn && !prevProps.isTimerOn) {
          this.updateTimer()
        }
        if (!isTimerOn && prevProps.isTimerOn) {
          this.stopUpdateTimer()
        }
    }

    componentWillUnmount() {
        const { isTimerOn } = this.props
    
        if (isTimerOn) {
          this.stopUpdateTimer()
        }
    }

    updateTimer = () => {
        const { leftTime } = this.state

        if (leftTime > 0) {
            this.update = setInterval(() => {
                this.setState(({leftTime}) => ({
                    leftTime: leftTime - 1
                }))
            }, 1000);
        }
        if ( leftTime === 0) {
            clearInterval(this.update)
        }
    }

    stopUpdateTimer = () => {
        const { stopTimer } = this.props
        const { leftTime }  = this.state

        clearInterval(this.update)
        stopTimer(leftTime)
    }

    getTime = (leftTime) => {
        const min = Math.floor(leftTime / 60).toString().padStart(2, "0")
        const sec = Math.floor(leftTime % 60).toString().padStart(2, "0")
        return {min, sec}
    }
    
    render() {
        const { leftTime } = this.state
        const time = this.getTime(leftTime)

        return (
            <span>
              {time.min}:{time.sec}
            </span>
          )
    }

}

export default Timer;