import { AttachFile } from "@mui/icons-material";
import {
  Box,
  Button,
  Grid2,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { MuiFileInput } from "mui-file-input";
import { useEffect, useState } from "react";
import { Slide } from "react-slideshow-image";
import Guide from "../../assets/ExportChatGuide.jpg";
import Maor from "../../assets/MaorPointing.jpg";

import "./HomePage.scss";
import StatsPage from "../StatsPage/StatsPage";

const HomePage = () => {
  const [file, setFile] = useState(null);
  const [firstStage, setFirstStage] = useState(true);
  const [isSubmitted, setSubmitted] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [images, setImages] = useState([]);

  const formatGallery = (files) =>
    files.map((file) => ({
      url: file,
    }));

  useEffect(() => {
    setImages(
      formatGallery(
        Object.values(
          import.meta.glob("../../assets/Gallery/*.{png,jpg,jpeg,PNG,JPEG}", {
            eager: true,
            as: "url",
          })
        )
      )
    );
  }, []);

  return (
    <div className="homepage">
      <div className="tempWrapper">
        <Paper elevation={10} className="wrapper title">
          <Typography className="title" variant="h3">
            שלום נוצ'קי!
          </Typography>
          <Typography className="subtitle" variant="h6">
            {firstStage
              ? "להמשך ניתוח הנתונים אנא העלי קובץ וואטסאפ"
              : "להמשך ניתוח הנתונים אנא שימו את השמות של שנינו בוואטסאפ"}
          </Typography>
          {firstStage ? (
            <div className="input-row">
              <Grid2 container direction="row" alignItems="center" spacing={8}>
                <MuiFileInput
                  placeholder="תלחצי פה מאמי!"
                  InputProps={{
                    accept: ".txt",
                    startAdornment: <AttachFile />,
                  }}
                  value={file}
                  onChange={(file) => {
                    setFile(file);
                    setFirstStage(false);
                  }}
                  className="input"
                  getInputText={(file) =>
                    file ? "תודה באבו!" : "תלחצי פה מאמי!"
                  }
                />
                <Box component="img" src={Maor} className="maor" />
              </Grid2>
            </div>
          ) : (
            <div className="secondInput">
              <TextField
                onChange={(e) => setFirstName(e.target.value)}
                className="field1"
                variant="filled"
                label="הזיני את השם שלך"
              />
              <TextField
                onChange={(e) => setSecondName(e.target.value)}
                className="field2"
                variant="filled"
                label="הזיני את השם שלי"
              />
              <Button
                disabled={!firstName || !secondName || isSubmitted}
                className="button"
                variant="contained"
                onClick={() => setSubmitted(true)}
              >
                {isSubmitted ? "תודה אהובתי!" : "המשיכי!"}
              </Button>
            </div>
          )}
        </Paper>
        <Paper elevation={10} className="wrapper instruction">
          <Box component="img" src={Guide} className="guide" />
        </Paper>
        <Paper elevation={10} className="wrapper gallery">
          <Slide>
            {images.map((image, index) => (
              <div className="gallery" key={`image-${index}`}>
                <Box component="img" src={image.url} height="40vh" />
              </div>
            ))}
          </Slide>
        </Paper>
      </div>
      <StatsPage
        file={file}
        submitted={isSubmitted}
        names={[firstName, secondName]}
      />
    </div>
  );
};

export default HomePage;
