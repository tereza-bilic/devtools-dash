import { ResponsiveCalendar } from '@nivo/calendar';
import { LevelSessionResponse } from '@devtools-dash/types/openapi';

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
      height: '200px',
      minHeight: '180px',
      flex: '1',
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      padding: '15px',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    }} className="calendar-chart-container">
      <h3 style={{ margin: '0 0 5px 0', fontSize: '1.1rem' }}>Activity Calendar</h3>
      <ResponsiveCalendar
        data={calendarData}
        from="2025-01-01"
        to="2025-01-01"
        emptyColor="#f7f7f7"
        colors={blueGradient}
        margin={{ top: 30, right: 30, bottom: 30, left: 30 }}
        yearSpacing={40}
        monthBorderColor="#ffffff"
        dayBorderWidth={2}
        dayBorderColor="#ffffff"
      />
    </div>
  );
};
