import React from 'react';
import {DAY_END_HOUR, DAY_START_HOUR} from "../../constants/constants";

interface HourLabelsProps {
    containerHeight: number;
}

function HourLabels({ containerHeight }: HourLabelsProps) {
    const calendarStart = DAY_START_HOUR; // 09:00
    const calendarEnd = DAY_END_HOUR; // 21:00
    const hours = [];

    for (let i = calendarStart; i <= calendarEnd; i++) {
        hours.push({hour: i, minutes: 0});
        if (i < calendarEnd) {
            hours.push({hour: i, minutes: 30});
        }
    }

    const hourHeight = (containerHeight / ((calendarEnd - calendarStart) * 2));

    return (
        <div className="hour-labels">
            {hours.map(({hour, minutes}) => (
                <li key={`${hour}:${minutes}`} style={{ height: `${hourHeight}px` }}>
                    {minutes === 0 && <span className="hour-label">{hour}:00</span>}
                    <span className={`dotted-line ${minutes === 0 ? 'hour-line' : 'half-hour-line'}`} />
                </li>
            ))}
        </div>
    );
}

export default HourLabels;
