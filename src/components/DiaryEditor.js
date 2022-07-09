import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DiaryDispatchContext } from "../App";
import EmotionItem from "./EmotionItem";

import MyButton from "./MyButton";
import MyHeader from "./MyHeader";

import { getStringDate } from "./../util/date";
import { emotionList } from "./../util/emotion";

const DiaryEditor = ({ isEdit, originData }) => {
  const contentref = useRef();
  const navigate = useNavigate();
  const [date, setDate] = useState(getStringDate(new Date()));
  const [emotion, setEmotion] = useState(3);
  const [content, setContent] = useState("");

  const { onCreate, onEdit, onRemove } = useContext(DiaryDispatchContext);

  const handleClickEmote = useCallback((emotion) => {
    setEmotion(emotion);
  }, []);

  const handleSubmit = () => {
    if (content.length < 1) {
      contentref.current.focus();
      return;
    }
    if (
      window.confirm(isEdit ? "日記を修正しますか？" : "日記を作成しますか？")
    ) {
      if (!isEdit) {
        onCreate(date, content, emotion);
      } else {
        onEdit(originData.id, date, content, emotion);
      }
    }
    navigate("/", { replace: true });
  };

  useEffect(() => {
    if (isEdit) {
      setDate(getStringDate(new Date(parseInt(originData.date))));
      setEmotion(originData.emotion);
      setContent(originData.content);
    }
  }, []);

  const handleRemove = () => {
    if (window.confirm("本当に削除しますか？")) {
      onRemove(originData.id);
      navigate("/", { replace: true });
    }
  };
  return (
    <div className="DiaryEditor">
      <MyHeader
        headText={isEdit ? "日記修正" : "日記作成"}
        leftChild={<MyButton text={"< Back"} onClick={() => navigate(-1)} />}
        rightChild={
          isEdit && (
            <MyButton text={"削除"} type={"nagative"} onClick={handleRemove} />
          )
        }
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
