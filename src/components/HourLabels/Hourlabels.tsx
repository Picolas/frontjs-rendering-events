import React from 'react';

interface HourLabelsProps {
    containerHeight: number;
}

function HourLabels({ containerHeight }: HourLabelsProps) {
    const calendarStart = 9; // 09:00
    const calendarEnd = 21; // 21:00
    const hours = [];

    for (let i = calendarStart; i <= calendarEnd; i++) {
        hours.push(i);
    }

    const hourHeight = (containerHeight / (calendarEnd - calendarStart + 1));

    return (
        <div className="hour-labels">
            {hours.map((hour) => (
                <div key={hour} style={{ lineHeight: `${hourHeight}px` }}>
                    {hour}:00
                </div>
            ))}
        </div>
    );
}

export default HourLabels;
