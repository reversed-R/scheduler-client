import AvailabilityCell from "./AvailabilityCell.tsx";
import { User } from "./types.ts";

type Props = {
  availabilityTable: string[][][];
};

function AvailabilityTable(props: Props) {
  return (
    <div className="availability-table" style={{ width: "100%" }}>
      {props.availabilityTable.map((dates) =>
        dates.map((hours, index) => (
          <div key={index}>
            <div
              style={{
                display: "table",
                width: "100%",
                height: "2em",
                tableLayout: "fixed",
                borderCollapse: "separate",
                borderSpacing: "2px 2px",
              }}
            >
              {hours.map((a, index) => (
                <AvailabilityCell key={index} availability={a} />
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default AvailabilityTable;
