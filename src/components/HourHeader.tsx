import "./HourHeader.css";

type Props = {
  hour: number;
  min: number;
};

function HourHeader(props: Props) {
  return (
    <div className="hour-header">
      {to2digitsString(props.hour) + ":" + to2digitsString(props.min)}
    </div>
  );
}

function to2digitsString(num: number) {
  if (num < 10) {
    return "0" + num;
  }

  return num.toString();
}

export default HourHeader;
