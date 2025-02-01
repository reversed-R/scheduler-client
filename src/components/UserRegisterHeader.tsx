import { useContext } from "react";
import AvailabilityCell from "./AvailabilityCell.tsx";
import { Availability, User } from "./types.ts";
import { RegisterationModeContext, UserToRegisterContext } from "./Room.tsx";
import AvailabilityButton from "./AvailabilityButton.tsx";

type Props = {
  length: number;
};

function UserRegisterHeader(props: Props) {
  const [mode] = useContext(RegisterationModeContext);
  const [userToRegister, setUserToRegister] = useContext(UserToRegisterContext);

  const newUser: User = JSON.parse(JSON.stringify(userToRegister));
  if (userToRegister.availabilities.length === 0) {
    console.log(props.length);
    for (let i = 0; i < props.length; i++) {
      newUser.availabilities.push("OK");
    }
    setUserToRegister(newUser);
  }

  return mode === "BEFORE" ? (
    <></>
  ) : (
    <div
      className="user-register-header"
      style={{
        display: "grid",
        height: "100%",
        width: "20em",
      }}
    >
      {userToRegister.availabilities.map((a, index) => (
        <div
          key={index}
          className="availability-register-cell"
          style={{
            display: "grid",
            gridAutoFlow: "column",
          }}
        >
          <AvailabilityButton
            index={index}
            availability={"OK"}
            current={userToRegister.availabilities[index]}
          />
          <AvailabilityButton
            index={index}
            availability={"NOT_BAD"}
            current={userToRegister.availabilities[index]}
          />
          <AvailabilityButton
            index={index}
            availability={"BAD"}
            current={userToRegister.availabilities[index]}
          />
        </div>
      ))}
    </div>
  );
}

export default UserRegisterHeader;
