import {CSSProperties} from "react";
import {displayTime} from "../../utils/Event/EventUtils";

interface EventProps {
    id: number;
    start: Date;
    duration: number;
    top: number;
    height: number;
    width: number;
    left: number;
    backgroundColor: string;
}

function EventComponent({ id, start, duration, top, height, width, left, backgroundColor }: EventProps) {
    const style: CSSProperties = {
        top: `${top}px`,
        height: `${height}px`,
        left: `${left}%`,
        width: `${width}%`,
        backgroundColor,
        fontWeight: 'bold',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        border: '1px solid black',
    };

    return (
        <div className="event" style={style}>
            {displayTime(start, duration)}
        </div>
    )
}

export default EventComponent;