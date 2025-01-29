import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { useTheme } from "styled-components";

interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

interface IChart {
  coinId: string;
}

function Chart({ coinId }: IChart) {
  const theme = useTheme();
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId)
    // { refetchInterval: 10000 }
  );
  return (
    <div>
      {isLoading ? (
        "Please wait a moment..."
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              data: data?.map((price) => [
                new Date(price.time_close * 1000).toUTCString(),
                parseFloat(price.open),
                parseFloat(price.high),
                parseFloat(price.low),
                parseFloat(price.close),
              ]),
            } as any,
          ]}
          options={{
            theme: { mode: "dark" },
            chart: {
              height: 500,
              width: 500,
              toolbar: { show: false },
              background: `${
                theme.textColor === "#ecf0f1" ? "transparent" : "whitesmoke"
              }`,
            },

            plotOptions: {
              candlestick: {
                colors: {
                  upward: "#e74c3c",
                  downward: "#3498db",
                },
              },
            },

            grid: { show: false },
            yaxis: {
              tooltip: { enabled: true },
              labels: {
                formatter: (value) => `$${value.toFixed(3)}`,
                style: { colors: theme.textColor },
              },
            },
            xaxis: {
              type: "datetime",
              labels: { style: { colors: theme.textColor } },
              axisBorder: { color: theme.textColor },
              axisTicks: { color: theme.textColor },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
