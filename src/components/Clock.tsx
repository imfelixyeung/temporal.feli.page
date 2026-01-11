import { useCallback, useEffect, useState } from "react";

const epochStartDate = new Date(0);

const Clock = ({ initialDate }: { initialDate: Date }) => {
    const [date, setDate] = useState(initialDate);

    const updateClock = useCallback(() => {
        setDate(new Date());
    }, []);

    useEffect(() => {
        const interval = setInterval(updateClock, 1000);
        return () => clearInterval(interval);
    }, [updateClock]);

    return (
        <div>
            <h2 className="font-medium text-5xl">
                {Math.floor(date.getTime() / 1000)}
            </h2>
            <p>Since {epochStartDate.toLocaleString()}</p>
            <p>{date.toLocaleString()}</p>
        </div>
    );
};

export default Clock;
