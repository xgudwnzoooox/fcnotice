import moment from "moment";

export default function useKoreanTimeSimple() {
  const changeToKstDateSimple = (utcDate) => {
    return moment.utc(utcDate).local().format("YYYY-MM-DD");
    // .format("YYYY년 MM월 DD일 A h시 mm분 ss초")
  };

  return { changeToKstDateSimple };
}
