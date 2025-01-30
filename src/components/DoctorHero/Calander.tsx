import React from 'react';

const Calander: React.FC = () => {
    const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    const gmtPlus6 = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Dhaka" }));
    const today = gmtPlus6.getDate();
    const currentDay = gmtPlus6.getDay();
    const currentMonth = gmtPlus6.getMonth();
    const currentYear = gmtPlus6.getFullYear();

    const dates = Array.from({ length: 21 }, (_, i) => {
        const date = new Date(currentYear, currentMonth, today - currentDay + i);
        return date.getDate().toString().padStart(2, '0');
    });

    return (
        <div className="grid grid-cols-7 gap-3 place-content-center h-full">
            {daysOfWeek.map((day, index) => (
            <div key={index} className={`font-semibold ${index === currentDay ? 'text-green-500' : ''}`}>
                {day}
            </div>
            ))}
            {dates.map((date, index) => (
                <div
                    key={index}
                    className={` ${
                        today.toString().padStart(2, '0') === date ? 'text-green-500' : 'bg-gray-100'
                    }`}
                >
                    {date}
                </div>
            ))}
        </div>
    );
};

export default Calander;