import { User } from "./types.ts";
import UserRegisterNameLine from "./UserRegisterNameLine.tsx";

type Props = {
  users: User[];
};

function TableUserNameLine(props: Props) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "auto auto 1fr",
        gridAutoFlow: "column",
      }}
    >
      <div style={{ width: "4em" }}>DATE</div>
      <div style={{ width: "4em" }}>TIME</div>
      <div
        style={{
          display: "table",
          width: "100%",
          tableLayout: "fixed",
          borderCollapse: "separate",
          borderSpacing: "2px 2px",
        }}
      >
        <UserRegisterNameLine />
        {props.users.map((user, index) => (
          <div key={index} style={{ display: "table-cell" }}>
            {user.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TableUserNameLine;
