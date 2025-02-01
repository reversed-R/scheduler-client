import { useContext } from "react";
import { User } from "./types.ts";
import { RegisterationModeContext } from "./Room.tsx";

type Props = {};

function UserRegisterNameLine(props: Props) {
  const [mode] = useContext(RegisterationModeContext);

  return mode === "BEFORE"
    ? <></>
    : <div style={{ display: "table-cell" }}>user name</div>;
}

export default UserRegisterNameLine;
