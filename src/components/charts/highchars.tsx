import { StockChart, StockSeries } from "@highcharts/react/Stock";
export default function StockChartComponent() {
  return (
    <StockChart>
      <StockSeries
        type="candlestick"
        data={[
          [1609459200000, 100, 110, 90, 105],
          [1609545600000, 105, 115, 95, 110],
          [1609632000000, 110, 120, 100, 115],
        ]}
      />
    </StockChart>
  );
}
