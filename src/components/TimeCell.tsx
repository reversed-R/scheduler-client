// import { useEffect, useState } from "react";
// import "./Room.css";
// import { RoomAllInfo } from "./types.ts";

type Props = {
  date: Date;
};

function TimeCell(props: Props) {
  // const [roomData, setRoomData] = useState<RoomAllInfo>();
  console.log(props.date);

  return (
    <>
      <p>
        year:{props.date.getFullYear()}, month:{props.date.getMonth()}, date:
        {props.date.getDate()}, hour:
        {props.date.getHours()}, min:{props.date.getMinutes()}
      </p>
    </>
  );
}

export default TimeCell;
