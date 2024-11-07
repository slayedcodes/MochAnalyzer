import { Paper } from "@mui/material";
import { BarChart, axisClasses } from "@mui/x-charts";
import "./MessageCountChart.scss";

const MessageCountChart = ({ className, title, data, names = [] }) => {
  return (
    <Paper elevation={10} className={className}>
      {title}
      <BarChart
        xAxis={[
          {
            scaleType: "band",
            data: [...names, 'סה"כ'],
          },
        ]}
        series={[
          {
            data: data
              ? [
                  ...data.map((messages) => messages.count),
                  data.reduce((a, b) => a + (b.count || 0), 0),
                ]
              : [],
          },
        ]}
        sx={{
          [`.${axisClasses.tickLabel}`]: {
            transform: "translate(-40px, 0)",
            justifyContent: "start",
          },
        }}
        width={500}
        height={500}
      />
    </Paper>
  );
};

export default MessageCountChart;
