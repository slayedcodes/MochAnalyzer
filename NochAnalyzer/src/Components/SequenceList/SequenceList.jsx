import { Paper, Slider, Switch, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { findMostUsedWordSequences } from "../../utils/chatUtils";
import "./SequenceList.scss";

const SequenceList = ({ text, className, names = [] }) => {
  const [length, setLength] = useState(1);
  const [checked, setChecked] = useState(true);
  const [sequences, setSequences] = useState([]);
  const [lengthDebounce] = useDebounce(length, 100);
  const [excludedStrings, setExcluded] = useState([
    "Media",
    "Omitted",
    "message",
    "-",
    "👍🏼",
    "התמונה",
    "הושמטה",
  ]);

  useEffect(() => {
    const setSequenceList = async () => {
      if (text) {
        let fullSequence = await findMostUsedWordSequences(
          text,
          lengthDebounce,
          [
            ...excludedStrings,
            ...names,
            `${names[0]}:`,
            `${names[1]}:`,
            `${names[0]?.split(" ")[0]}`,
            `${names[0]?.split(" ")[1]}`,
            `${names[1]?.split(" ")[0]}`,
            `${names[1]?.split(" ")[1]}`,
          ]
        );
        setSequences(fullSequence.slice(0, 5));
      }
    };
    setSequenceList();
  }, [lengthDebounce, excludedStrings, names]);

  useEffect(() => {
    checked
      ? setExcluded([...excludedStrings, "כן", "באנג"])
      : setExcluded(
          excludedStrings.filter((string) => string != "כן" && string != "באנג")
        );
  }, [checked]);

  console.log(sequences);
  return (
    <Paper elevation={10} className={`${className}`}>
      <Typography fontSize="2rem" fontWeight="bold" className="title">
        צירופי המילים הכי משומשים
      </Typography>
      <div className="selectionBar">
        <Slider
          aria-label="Length"
          value={length}
          onChange={(e) => setLength(e.target.value)}
          min={1}
          max={5}
          step={1}
          marks
          valueLabelDisplay="auto"
          className="slider"
        />
        <Switch
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          inputProps={{ "aria-label": "controlled" }}
          className="button"
        />
        <Typography fontSize="1rem" className="text">
          עם/בלי "באנג" ו"כן"?
        </Typography>
      </div>
      {sequences.map((sequence, index) => (
        <div className="listItem">
          <Typography fontSize="25px" className="listText">{`${
            index + 1
          }.`}</Typography>
          <Typography
            fontSize="25px"
            className="listSequence"
          >{`${sequence.sequence} - ${sequence.count}`}</Typography>
        </div>
      ))}
    </Paper>
  );
};

export default SequenceList;
