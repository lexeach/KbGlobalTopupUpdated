import React, { useEffect, useState } from "react";

interface Props {
  targetTime: string;
}

const CountdownTimer: React.FC<Props> = ({ targetTime }) => {
  const [countdown, setCountdown] = useState<string>("00:00:00");

  useEffect(() => {
    // Function to calculate and update the countdown
    const updateCountdown = () => {
      const currentTime = new Date();
      const [targetHours, targetMinutes, targetSeconds, amOrPm] =
        targetTime.split(/[:\s]/);
      let adjustedHours = parseInt(targetHours) % 12;
      if (amOrPm) {
        if (amOrPm.toUpperCase() === "PM") adjustedHours += 12;
      }

      // Set target date to today with the target time
      const targetDate = new Date(
        currentTime.getFullYear(),
        currentTime.getMonth(),
        currentTime.getDate(),
        adjustedHours,
        parseInt(targetMinutes),
        parseInt(targetSeconds)
      );

      // If the target time has already passed today, set it to the next day
      if (targetDate < currentTime) {
        targetDate.setDate(targetDate.getDate() + 1);
      }

      // Calculate time difference
      let timeDifference = targetDate.getTime() - currentTime.getTime();
      if (timeDifference < 0) {
        timeDifference = 0;
      }

      // Calculate hours, minutes, and seconds from timeDifference
      const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
      const seconds = Math.floor((timeDifference / 1000) % 60);

      // Format countdown string
      const countdownString = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

      // Update countdown state
      setCountdown(countdownString);
    };

    // Start the countdown
    const intervalId = setInterval(updateCountdown, 1000);

    // Clean up interval
    return () => clearInterval(intervalId);
  }, [targetTime]);

  return <span id="countdownTimerWinner">{countdown}</span>;
};

export default CountdownTimer;
