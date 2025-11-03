"use client";

import ReactECharts from 'echarts-for-react';
import type { PricePoint } from "@smart-price-tracker/shared";

type PriceChartProps = {
  priceHistory: PricePoint[];
  currency: string;
};

export default function PriceChart({ priceHistory, currency }: PriceChartProps) {
  const dates = priceHistory.map(point => {
    const date = new Date(point.timestamp);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  });

  const prices = priceHistory.map(point => point.price);

  const option = {
    grid: {
      left: '70',
      right: '20',
      top: '60',
      bottom: '50',
      containLabel: false
    },
    xAxis: {
      type: 'category',
      data: dates,
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: '#8A90A2',
        fontSize: 11,
        fontFamily: 'Inter, system-ui, sans-serif',
        rotate: 45,
        interval: 'auto'
      }
    },
    yAxis: {
      type: 'value',
      scale: true,
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(26, 29, 36, 0.5)',
          type: 'dashed'
        }
      },
      axisLabel: {
        color: '#8A90A2',
        fontSize: 11,
        fontFamily: 'Inter, system-ui, sans-serif',
        formatter: (value: number) => `$${value.toFixed(2)}`
      }
    },
    series: [
      {
        name: 'Historical Price',
        type: 'line',
        data: prices,
        smooth: true,
        symbol: 'circle',
        symbolSize: 10,
        itemStyle: {
          color: '#A78BFA',
          borderColor: '#ffffff',
          borderWidth: 2
        },
        lineStyle: {
          color: '#A78BFA',
          width: 2
        },
        emphasis: {
          itemStyle: {
            color: '#8B5CF6',
            borderColor: '#ffffff',
            borderWidth: 2,
            shadowBlur: 10,
            shadowColor: 'rgba(167, 139, 250, 0.5)'
          }
        }
      }
    ],
    legend: {
      data: ['Historical Price'],
      top: 10,
      left: 'center',
      textStyle: {
        color: '#F5F7FA',
        fontSize: 12,
        fontFamily: 'Inter, system-ui, sans-serif'
      },
      icon: 'circle'
    },
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(15, 17, 21, 0.95)',
      borderColor: '#1A1D24',
      borderWidth: 1,
      textStyle: {
        color: '#F5F7FA',
        fontSize: 12,
        fontFamily: 'Inter, system-ui, sans-serif'
      },
      formatter: (params: any) => {
        const index = params.dataIndex;
        const timestamp = priceHistory[index].timestamp;
        const date = new Date(timestamp);
        const formattedDate = date.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
        const price = params.value;
        return `
          <div style="padding: 4px;">
            <div style="font-weight: 500; margin-bottom: 4px;">
              ${currency} $${Number(price).toFixed(2)}
            </div>
            <div style="font-size: 11px; color: #B5B9C3;">
              ${formattedDate}
            </div>
          </div>
        `;
      }
    }
  };

  return (
    <div className="h-80 w-full">
      <ReactECharts 
        option={option} 
        style={{ height: '100%', width: '100%' }}
        opts={{ renderer: 'svg' }}
      />
    </div>
  );
}
