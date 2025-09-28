import dayjs from 'dayjs';
import React from 'react';
import { View } from 'react-native';
import { CalendarList } from 'react-native-calendars';

interface ReadCalendarProps {
  readDates: Set<string>;   // e.g., new Set(["2025-07-01", "2025-07-02"])
  startDate: string; // Format: "YYYY-MM-DD"
  endDate: string;   // Format: "YYYY-MM-DD"
}

const ReadCalendar: React.FC<ReadCalendarProps> = ({ readDates, startDate, endDate }) => {
  const generateMarkedDates = (): { [key: string]: any } => {
    const marked: { [key: string]: any } = {};
    let current = dayjs(startDate);
    const end = dayjs(endDate);

    while (current.isSame(end) || current.isBefore(end)) {
      const dateStr = current.format('YYYY-MM-DD');

      if (readDates.has(dateStr)) {
        marked[dateStr] = {
          marked: true,
          dotColor: '#F07900',
          selected: true,
          selectedColor: '#F07900', // Read - primary color
        };
      }

      current = current.add(1, 'day');
    }

    return marked;
  };

  const markedDates = generateMarkedDates();

  return (
    <View style={{ flex: 1 }}>
      <CalendarList
        horizontal
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
