import { TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import CircleChart from "../../Components/CircleChart/CircleChart";
import MessageCountChart from "../../Components/MessageCountChart/MessageCountChart";
import PictureBreak from "../../Components/PictureBreak/PictureBreak";
import {
  countOccurrences,
  countSubstringsAfterSubstring,
} from "../../utils/chatUtils";
import { findMostUsedEmoji } from "../../utils/emojiUtils";
import "./StatsPage.scss";
import TrainingChart from "../../Components/TrainingChart/TrainingChart";
import SequenceList from "../../Components/SequenceList/SequenceList";

const StatsPage = ({ file, submitted = false, names }) => {
  const [text, setText] = useState(null);
  const [emojiLeaderboard, setLeaderboard] = useState([]);
  const [characterInput, setCharacterInput] = useState("");
  const [characterDebounce] = useDebounce(characterInput, 1000);
  const observer = new IntersectionObserver(
    (enteries) => {
      enteries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("show");
        else entry.target.classList.remove("show");
      });
    },
    { root: null, rootMargin: "0px", threshold: 0.1 }
  );
  const hiddenElements = document.querySelectorAll(".hiddenStat");
  hiddenElements.forEach((el) => observer.observe(el));

  useEffect(() => {
    file && file.text().then(setText);
  }, [file]);

  useEffect(() => {
    let emojis = [];
    let emojiLeaderboard = [];
    if (text) {
      emojis = findMostUsedEmoji(text);
      emojiLeaderboard.push({
        character: emojis[1].emoji,
        amount: emojis[0].count + emojis[1].count,
        style: { borderColor: "#FFD700" },
      });
      emojiLeaderboard.push({
        character: emojis[4].emoji,
        amount: emojis[4].count,
        style: { borderColor: "#C0C0C0" },
      });
      emojiLeaderboard.push({
        character: emojis[5].emoji,
        amount: emojis[5].count,
        style: { borderColor: "#CE8946" },
      });
      setLeaderboard(emojiLeaderboard);
    }
  }, [text]);

  const pictureBreakOne = Object.values(
    import.meta.glob("../../assets/pictureBreakOne/*.{png,jpg,jpeg,PNG,JPEG}", {
      eager: true,
      as: "url",
    })
  );

  const pictureBreakTwo = Object.values(
    import.meta.glob("../../assets/pictureBreakTwo/*.{png,jpg,jpeg,PNG,JPEG}", {
      eager: true,
      as: "url",
    })
  );

  const pictureBreakThree = Object.values(
    import.meta.glob(
      "../../assets/pictureBreakThree/*.{png,jpg,jpeg,PNG,JPEG}",
      {
        eager: true,
        as: "url",
      }
    )
  );

  return (
    <div className={`stats ${text && submitted ? "visible" : ""}`}>
      <CircleChart
        shown={text && submitted}
        items={emojiLeaderboard}
        className="hiddenStat"
      />
      <PictureBreak files={pictureBreakOne} className="pictureBreakOne" />
      <div className="messageBarCharts">
        <MessageCountChart
          names={names}
          data={
            text &&
            submitted &&
            names?.map((name) => ({
              name: name,
              count: countOccurrences(text, name),
            }))
          }
          title={
            <Typography
              fontSize="3rem"
              fontWeight="bold"
              className="messagesTitle"
            >
              כמות הודעות שנשלחה
            </Typography>
          }
          className="hiddenStat"
        />
        <MessageCountChart
          names={names}
          data={
            text &&
            submitted &&
            characterDebounce?.target?.value != "" &&
            names?.map((name) => ({
              name: name,
              count:
                characterDebounce === ""
                  ? 0
                  : countSubstringsAfterSubstring(
                      text,
                      name,
                      characterDebounce?.target.value
                    ),
            }))
          }
          title={
            <div>
              <Typography
                fontSize="2rem"
                fontWeight="bold"
                className="messagesTitle"
              >
                ניתוח לפי בחירה
              </Typography>
              <TextField
                variant="filled"
                label="הזיני משהו שאותו תרצי לנתח"
                fullWidth
                onChange={setCharacterInput}
                onSubmit={(e) => e.preventDefault()}
              />
            </div>
          }
          className="hiddenStat"
        />
      </div>
      <PictureBreak files={pictureBreakTwo} className="pictureBreakTwo" />
      <TrainingChart text={text} />
      <PictureBreak
        files={pictureBreakThree}
        className="pictureBreakThree"
        maxWidth="10vw"
      />
      <SequenceList
        text={text}
        className="hiddenStat sequenceList"
        names={names}
      />
    </div>
  );
};

export default StatsPage;
