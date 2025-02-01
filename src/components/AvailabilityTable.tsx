import AvailabilityCell from "./AvailabilityCell.tsx";
import { User } from "./types.ts";
import UserRegisterHeader from "./UserRegisterHeader.tsx";

type Props = {
  availabilityTable: string[][][];
};

function AvailabilityTable(props: Props) {
  return (
    <div>
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
              <UserRegisterHeader
                userRegisterFn={(roomId: number, user: User) => {
                  console.log("roomId", roomId);
                  console.log("user", user);
                  console.log("register!");
                }}
              />
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
