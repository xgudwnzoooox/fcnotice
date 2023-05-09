import moment from "moment";

export default function useKoreanTime() {
  const changeToKstDate = (utcDate) => {
    return (
      moment
        .utc(utcDate)
        .local()
        // .format("YYYY년 MM월 DD일");
        .format("YYYY년 MM월 DD일 A h시 mm분 ss초")
    );
  };

  return { changeToKstDate };
}
