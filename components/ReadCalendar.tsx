import React from 'react';
import { View } from 'react-native';
import { CalendarList } from 'react-native-calendars';
import dayjs from 'dayjs';

interface ReadCalendarProps {
  missedDates: Set<string>; // e.g., new Set(["2025-07-04", "2025-07-09"])
  startDate: string; // Format: "YYYY-MM-DD"
  endDate: string;   // Format: "YYYY-MM-DD"
}

const ReadCalendar: React.FC<ReadCalendarProps> = ({ missedDates, startDate, endDate }) => {
  const generateMarkedDates = (): { [key: string]: any } => {
    const marked: { [key: string]: any } = {};
    let current = dayjs(startDate);
    const end = dayjs(endDate);

    while (current.isSame(end) || current.isBefore(end)) {
      const dateStr = current.format('YYYY-MM-DD');

      marked[dateStr] = missedDates.has(dateStr)
        ? {
            marked: true,
            dotColor: 'gray',
            selected: true,
            selectedColor: '#2c2c2e', // Missed - dark gray
          }
        : {
            marked: true,
            dotColor: '#F07900',
            selected: true,
            selectedColor: '#F07900', // Read - orange
          };

      current = current.add(1, 'day');
    }

    return marked;
  };

  const markedDates = generateMarkedDates();

  return (
    <View style={{ flex: 1 }}>
      <CalendarList
        horizontal
        pagingEnabled
        pastScrollRange={12}
        futureScrollRange={12}
        calendarHeight={100}
        markedDates={markedDates}
        theme={{
          backgroundColor: '#141415',
          calendarBackground: '#141415',
          dayTextColor: '#fff',
          monthTextColor: '#F07900',
          arrowColor: '#F07900',
          selectedDayTextColor: '#fff',
          todayTextColor: '#F07900',
        }}
      />
    </View>
  );
};

export default ReadCalendar;
