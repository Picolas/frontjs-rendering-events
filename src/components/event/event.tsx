import { CSSProperties } from "react";
import { displayTime } from "../../utils/utils";

interface EventProps {
    id: number;
    start: Date;
    duration: number;
    top: number;
    height: number;
    width: number;
    left: number;
    backgroundColor: any;
}

export const Event = ({ id, start, duration, top, height, width, left, backgroundColor }: EventProps) => {
    const style: CSSProperties = {
        top: `${top}px`,
        height: `${height}px`,
        left: `${left}px`,
        width: `${width}px`,
        backgroundColor: backgroundColor.color,
        boxShadow: `inset 0 0 0 2px ${backgroundColor.darkerColor}`,
    };

    return (
        <div className="event" style={style}>
            {displayTime(start, duration)}
        </div>
    )
}