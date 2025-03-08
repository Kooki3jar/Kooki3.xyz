import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, isSameDay } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  date: Date;
  type: 'meeting' | 'reminder' | 'task';
}

interface CalendarProps {
  events?: Event[];
  onDateSelect?: (date: Date) => void;
  onClose: () => void;
}

export function Calendar({ events = [], onDateSelect, onClose }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    onDateSelect?.(date);
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  };

  const getDayEvents = (date: Date) => {
    return events.filter(event => isSameDay(new Date(event.date), date));
  };

  return (
    <div className="absolute right-0 top-full mt-2 bg-white dark:bg-dark-paper rounded-lg shadow-lg border border-gray-200 dark:border-dark-border w-80 z-50">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={prevMonth}
            className="p-1 hover:bg-gray-100 dark:hover:bg-dark-hover rounded-full transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {format(currentDate, 'MMMM yyyy')}
          </h2>
          <button
            onClick={nextMonth}
            className="p-1 hover:bg-gray-100 dark:hover:bg-dark-hover rounded-full transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
            <div
              key={day}
              className="text-center text-sm font-medium text-gray-500 dark:text-gray-400"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {days.map(day => {
            const dayEvents = getDayEvents(day);
            const isSelected = selectedDate && isSameDay(day, selectedDate);
            
            return (
              <button
                key={day.toISOString()}
                onClick={() => handleDateClick(day)}
                className={`
                  relative p-2 text-sm rounded-lg transition-colors
                  ${!isSameMonth(day, currentDate) ? 'text-gray-400 dark:text-gray-600' : ''}
                  ${isToday(day) ? 'bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400' : ''}
                  ${isSelected ? 'bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300' : ''}
                  ${!isSelected && !isToday(day) ? 'hover:bg-gray-100 dark:hover:bg-dark-hover' : ''}
                `}
              >
                <span className="relative z-10">{format(day, 'd')}</span>
                {dayEvents.length > 0 && (
                  <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-teal-500 dark:bg-teal-400 rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {selectedDate && (
        <div className="border-t dark:border-dark-border p-4">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
            {format(selectedDate, 'MMMM d, yyyy')}
          </h3>
          <div className="space-y-2">
            {getDayEvents(selectedDate).map(event => (
              <div
                key={event.id}
                className="flex items-center gap-2 text-sm p-2 rounded-lg bg-gray-50 dark:bg-dark-hover"
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    event.type === 'meeting'
                      ? 'bg-blue-500'
                      : event.type === 'reminder'
                      ? 'bg-yellow-500'
                      : 'bg-green-500'
                  }`}
                />
                <span className="text-gray-900 dark:text-white">{event.title}</span>
              </div>
            ))}
            {getDayEvents(selectedDate).length === 0 && (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No events scheduled
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}