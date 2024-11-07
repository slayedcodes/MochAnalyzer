import { Box, Paper } from "@mui/material";
import "./PictureBreak.scss";

const PictureBreak = ({ className, files, maxWidth = "20vw" }) => {
  return (
    <div className={className}>
      {files.map((file, index) => (
        <Paper
          key={index}
          elevation={10}
          className={`imageWrapper hiddenStat image${index}`}
        >
          <Box
            component="img"
            src={file}
            maxWidth={maxWidth}
            maxHeight="20vw"
          />
        </Paper>
      ))}
    </div>
  );
};

export default PictureBreak;
