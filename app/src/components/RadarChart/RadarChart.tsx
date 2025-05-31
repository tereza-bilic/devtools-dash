import { ResponsiveRadar } from '@nivo/radar';
import { categories } from '@devtools-dash/consts/categories';
import { LevelResponse } from '@devtools-dash/types/openapi';

interface RadarChartProps {
  levels: LevelResponse[];
}

export const RadarChart: React.FC<RadarChartProps> = ({ levels }) => {
  // Process data for radar chart
  const radarData = categories.map((category) => {
    const count = levels.filter((level) => level.category === category && level.completed).length;
    return {
      category,
      value: count,
    };
  });

  return (
    <div style={{ height: 300, width: 350 }}>
      <ResponsiveRadar
        data={radarData}
        keys={['value']}
        indexBy="category"
        maxValue={10}
        margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
        curve="linearClosed"
        borderWidth={2}
        borderColor={{ from: 'color', modifiers: [['brighter', 0.3]] }}
        gridShape="circular"
        gridLabelOffset={16}
        enableDots={true}
        dotSize={10}
        dotColor={{ from: 'color' }}
        dotBorderWidth={2}
        dotBorderColor={{ from: 'color', modifiers: [['brighter', 0.3]] }}
        enableDotLabel={true}
        dotLabel="value"
        dotLabelYOffset={-12}
        colors={{ scheme: 'category10' }}
      />
    </div>
  );
};
