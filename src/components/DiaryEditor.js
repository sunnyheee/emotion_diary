import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DiaryDispatchContext } from "../App";
import EmotionItem from "./EmotionItem";

import MyButton from "./MyButton";
import MyHeader from "./MyHeader";

const emotionList = [
  {
    emotion_id: 1,
    emotion_img: process.env.PUBLIC_URL + `/asset/emotion1.png`,
    emotion_descript: "最高",
  },
  {
    emotion_id: 2,
    emotion_img: process.env.PUBLIC_URL + `/asset/emotion2.png`,
    emotion_descript: "良い",
  },
  {
    emotion_id: 3,
    emotion_img: process.env.PUBLIC_URL + `/asset/emotion3.png`,
    emotion_descript: "ふつう",
  },
  {
    emotion_id: 4,
    emotion_img: process.env.PUBLIC_URL + `/asset/emotion4.png`,
    emotion_descript: "悪い",
  },
  {
    emotion_id: 5,
    emotion_img: process.env.PUBLIC_URL + `/asset/emotion5.png`,
    emotion_descript: "最悪",
  },
];

const getStringDate = (date) => {
  return date.toISOString().slice(0, 10);
};
const DiaryEditor = () => {
  const contentref = useRef();
  const navigate = useNavigate();
  const [date, setDate] = useState(getStringDate(new Date()));
  const [emotion, setEmotion] = useState(3);
  const [content, setContent] = useState("");

  const { onCreate } = useContext(DiaryDispatchContext);

  const handleClickEmote = (emotion) => {
    setEmotion(emotion);
  };

  const handleSubmit = () => {
    if (content.length < 1) {
      contentref.current.focus();
      return;
    }

    onCreate(date, content, emotion);
    navigate("/", { replace: true });
  };

  return (
    <div className="DiaryEditor">
      <MyHeader
        headText={"日記作成"}
        leftChild={<MyButton text={"< Back"} onClick={() => navigate(-1)} />}
      />
      <div>
        <section>
          <h4>今日の日付を選択してください。</h4>
          <div className="input_box">
            <input
              className="input_date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="date"
            />
          </div>
        </section>
        <section>
          <h4>今日の感情</h4>
          <div className="inpu-_box emotion_list_wrapper">
            {emotionList.map((item) => (
              <EmotionItem
                key={item.emotion_id}
                {...item}
                onClick={handleClickEmote}
                isSelected={item.emotion_id === emotion}
              />
            ))}
          </div>
        </section>
        <section>
          <h4>今日の日記</h4>
          <div className="input_box text_wrapper">
            <textarea
              placeholder="今日の一日はどうでしたか？"
              ref={contentref}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </section>
        <section>
          <div className="control_box">
            <MyButton text={"キャンセル"} onClick={() => navigate(-1)} />
            <MyButton
              text={"作成完了"}
              type={"positive"}
              onClick={handleSubmit}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default DiaryEditor;
