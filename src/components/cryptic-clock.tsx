'use client';

import { useEffect, useState } from 'react';

export function CrypticClock() {
  const [time, setTime] = useState<Date>(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  const getTimezone = () => {
    const timezone = time.toLocaleTimeString('en-us', { timeZoneName: 'short' })
      .split(' ')[2];
    return timezone;
  };

  return (
    <div className="font-mono text-sm text-zinc-500">
      <span className="opacity-50">[</span>
      {formatTime(time)}
      <span className="opacity-50">]</span>
      {' '}
      <span className="opacity-50">[</span>
      {getTimezone()}
      <span className="opacity-50">]</span>
    </div>
  );
}