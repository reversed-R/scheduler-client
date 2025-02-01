import { useContext } from "react";
import AvailabilityCell from "./AvailabilityCell.tsx";
import { Availability, User } from "./types.ts";
import { RegisterationModeContext } from "./Room.tsx";

type Props = {
  length: number;
  userRegisterFn: (roomId: number, user: User) => void;
};

function UserRegisterHeader(props: Props) {
  const [mode] = useContext(RegisterationModeContext);

  const availabilities: Availability[] = new Array(props.length);
  for (let i = 0; i < props.length; i++) {
    availabilities[i] = "OK";
  }
  return mode === "BEFORE" ? <></> : (
    availabilities.map((a, index) => (
      <AvailabilityCell key={index} availability={a} />
    ))
  );
}

export default UserRegisterHeader;
