
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ChartContainer, 
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent 
} from '@/components/ui/chart';
import { 
  Area, 
  AreaChart, 
  CartesianGrid, 
  XAxis, 
  YAxis,
  Tooltip
} from 'recharts';

interface PortfolioGrowthChartProps {
  monthlyData: { name: string; value: number }[];
  className?: string;
}

export const PortfolioGrowthChart: React.FC<PortfolioGrowthChartProps> = ({ monthlyData, className }) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Portfolio Growth</CardTitle>
        <CardDescription>Monthly portfolio value in USD</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer 
          config={{
            area: { label: "Portfolio Value" },
            grid: {}
          }}
          className="h-80"
        >
          <AreaChart data={monthlyData}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="name" />
            <YAxis 
              tickFormatter={(value) => 
                new Intl.NumberFormat('en-US', {
                  notation: 'compact',
                  compactDisplay: 'short',
                  currency: 'USD',
                  style: 'currency'
                }).format(value)
              }
            />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip 
              formatter={(value) => 
                new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                }).format(value as number)
              }
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#8884d8" 
              fillOpacity={1} 
              fill="url(#colorValue)" 
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
