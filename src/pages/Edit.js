import { useNavigate, useSearchParams } from "react-router-dom";

const Edit = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const id = searchParams.get("id");

  const mode = searchParams.get("mode");
  return (
    <div>
      <h1>Edit</h1>
      <p>こちらは Edit です。</p>
      <button onClick={() => setSearchParams({ who: "park" })}>
        QS Change
      </button>
      <button
        onClick={() => {
          navigate("/home");
        }}
      >
        Home
      </button>
      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        Back
      </button>
    </div>
  );
};

export default Edit;
