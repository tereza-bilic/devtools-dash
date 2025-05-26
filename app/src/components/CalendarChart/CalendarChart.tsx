import { ResponsiveCalendar } from '@nivo/calendar';
import { LevelSessionResponse } from 'src/types/openapi';

interface CalendarChartProps {
  levelSessions: LevelSessionResponse[];
}

export const CalendarChart: React.FC<CalendarChartProps> = ({ levelSessions }) => {
  // Process data for calendar chart
  const calendarData = levelSessions.map((session) => ({
    day: session.started_at.split('T')[0],
    value: 1,
  }));

  // Define blue gradient colors from dark to light
  const blueGradient = ['#1E88E5', '#42A5F5', '#90CAF9'];

  return (
    <div style={{
      width: '100%',
      height: '180px',
      minHeight: '180px',
      flex: '1'
    }}>
      <ResponsiveCalendar
        data={calendarData}
        from="2025-01-01"
        to="2025-01-01"
        emptyColor="#f7f7f7"
        colors={blueGradient}
        margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
        yearSpacing={40}
        monthBorderColor="#ffffff"
        dayBorderWidth={2}
        dayBorderColor="#ffffff"
      />
    </div>
  );
};
