import { useContext } from "react";
import { Availability } from "./types.ts";
import { UserToRegisterContext } from "./Room.tsx";
import { User } from "./types.ts";

type Props = {
  availability: Availability;
  current: Availability;
  index: number;
};

function AvailabilityButton(props: Props) {
  const [userToRegister, setUserToRegister] = useContext(UserToRegisterContext);
  const onClick = () => {
    console.log("clicked");
    const newUser: User = JSON.parse(JSON.stringify(userToRegister));
    console.log(userToRegister);
    console.log(newUser);
    newUser.availabilities[props.index] = props.availability;

    // const availabilities = [...userToRegister.availabilities];
    // availabilities[props.index] = props.availability;
    // console.log(availabilities);
    //
    console.log(newUser);
    setUserToRegister(newUser);
    // setUserToRegister((prev: User) => ({
    //   name: prev.name,
    //   comment: prev.comment,
    //   availabilities: availabilities,
    // }));

    // newUser.availabilities[props.index] = props.availability;
  };
  return (
    <div
      onClick={onClick}
      style={{
        background: props.current === props.availability ? "blue" : "grey",
      }}
    >
      {props.availability}
    </div>
  );
}

export default AvailabilityButton;
