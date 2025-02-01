import DateHeader from "./DateHeader.tsx";
import HourHeader from "./HourHeader.tsx";

type Props = {
  dates: DateHead[];
};
type DateHead = {
  year: number;
  month: number;
  day: number;
  hours: HourHead[];
};

type HourHead = {
  hour: number;
  min: number;
  userAvailabilities: string[];
};

function TableHeader(props: Props) {
  return (
    <div
      className="table-header"
      style={{
        width: "8.5em",
      }}
    >
      {props.dates.map((date, index) => {
        return (
          <>
            <div
              key={index}
              style={{
                display: "grid",
                gridTemplateColumns: "auto 1fr",
                gridAutoFlow: "column",
              }}
            >
              <DateHeader month={date.month} date={date.day} />
              <div>
                {date.hours.map((hour, index) => (
                  <div
                    key={index}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "auto 1fr",
                      gridAutoFlow: "column",
                      height: "2em",
                    }}
                  >
                    <HourHeader key={index} hour={hour.hour} min={hour.min} />
                  </div>
                ))}
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
}

export default TableHeader;
