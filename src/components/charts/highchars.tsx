
import { StockChart, StockSeries } from "@highcharts/react/Stock";
import { MapsChart, MapsSeries } from "@highcharts/react/Maps";
import worldMap from "@highcharts/map-collection/custom/world.topo.json";
export default function StockChartComponent() {
 

  return (
    <>
      {/* STOCK CHART */}
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

      {/* MAP CHART */}

        <MapsChart
          options={{
            chart: {
              map: worldMap,
            },
          }}
        >
         
        </MapsChart>
    
    </>
  );
}
