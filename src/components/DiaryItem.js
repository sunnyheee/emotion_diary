import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";

const DiaryItem = ({ id, emotion, content, date }) => {
  const nagative = useNavigate();
  const strDate = new Date(parseInt(date)).toLocaleDateString();

  const goDetail = () => {
    nagative(`/diary/${id}`);
  };

  const goEdit = () => {
    nagative(`/edit/${id}`);
  };
  return (
    <div className="DiaryItem">
      <div
        onClick={goDetail}
        className={[
          "emotion_img_wrapper",
          `emotion_img_wrapper_${emotion}`,
        ].join(" ")}
      >
        <img src={process.env.PUBLIC_URL + `asset/emotion${emotion}.png`} />
      </div>
      <div onClick={goDetail} className="info_wrapper">
        <div className="diary_date">{strDate}</div>
        <div className="diary_content_preview">{content.slice(0, 25)}</div>
      </div>
      <div className="btn-wrapper">
        <MyButton text={"修正"} onClick={goEdit} />
      </div>
    </div>
  );
};

export default DiaryItem;
