import "./DateHeader.css";

type Props = {
  month: number;
  date: number;
};

function DateHeader(props: Props) {
  return <div className="date-header">{props.month + "/" + props.date}</div>;
}

export default DateHeader;
