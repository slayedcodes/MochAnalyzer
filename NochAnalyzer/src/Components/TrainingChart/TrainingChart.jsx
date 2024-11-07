import { Paper, Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts";
import { countOccurrences } from "../../utils/chatUtils";
import "./TrainingChart.scss";

const TrainingChart = ({ text = "" }) => {
  const data = [
    {
      data: [
        { id: 0, value: countOccurrences(text, "יד קדמית"), label: "יד קדמית" },
        {
          id: 1,
          value: countOccurrences(text, "יד אחורית"),
          label: "יד אחורית",
        },
        { id: 2, value: countOccurrences(text, "חזה"), label: "חזה" },
        {
          id: 3,
          value:
            countOccurrences(text, "רגליים") + countOccurrences(text, "לג דיי"),
          label: "רגליים",
        },
        { id: 4, value: countOccurrences(text, "בטן"), label: "בטן" },
        { id: 5, value: countOccurrences(text, "אפר בודי"), label: "אפר בודי" },
        { id: 6, value: countOccurrences(text, "פול בודי"), label: "פול בודי" },
      ],
    },
  ];

  return (
    <Paper elevation={10} className="hiddenStat">
      <Typography fontSize="3rem" fontWeight="bold" className="trainingTitle">
        פילוג האימונים שלנו
      </Typography>
      <PieChart
        series={data}
        width={500}
        height={500}
        slotProps={{ legend: { hidden: true } }}
        sx={{ marginLeft: "100px" }}
      />
    </Paper>
  );
};

export default TrainingChart;
