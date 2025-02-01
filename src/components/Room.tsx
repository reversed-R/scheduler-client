import { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Room.css";
import { RoomAllInfo, User } from "./types.ts";
import { ADAY, AM_AND_PM, CLASSES_OF_TSUKUBA_UNIV, HOURS } from "./types.ts";
import AvailabilityTable from "./AvailabilityTable.tsx";
import TableHeader from "./TableHeader.tsx";
import TableUserNameLine from "./TableUserNameLine.tsx";
import { RegistrationMode } from "./contextType.ts";

export const RegisterationModeContext = createContext<RegistrationMode>(
  "BEFORE",
);

// export const context = createContext<Context>({
//   roomId: 0,
//   userRegisterFn: registerUser,
// });

export const userToRegister = createContext<User>({
  name: "",
  comment: "",
  availabilities: [],
});

export const userRegisterFn = createContext(registerUser);

function Room() {
  const { roomId } = useParams();
  // const [c, setContext] = useContext(context);
  // setContext({ roomId: roomId, UserRegisterFn: registerUser });
  const [mode, setMode] = useState("BEFORE");

  const [roomData, setRoomData] = useState<RoomAllInfo>({
    name: "",
    description: "",
    beginTime: {
      year: 1970,
      month: 0,
      day: 1,
      hour: 0,
      min: 0,
    },
    dayLength: 0,
    dayPatternLength: 0,
    dayPattern: "",
    users: [],
  });

  if (roomId === undefined) {
    console.log(undefined);

    return (
      <>
        <p>room id is undefined</p>
      </>
    );
  } else if (isNaN(parseInt(roomId))) {
    console.log(NaN);
    return (
      <>
        <p>room id is not a number</p>
      </>
    );
  } else {
    console.log(parseInt(roomId));
  }

  useEffect(() => {
    // fetch("https://jsonplaceholder.typicode.com/posts" + roomId, {
    //   method: "GET",
    // })
    fetch("http://localhost:8080/api/v1/rooms/" + roomId, { method: "GET" })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setRoomData(data);
      });
  }, []);

  const beginDate = new Date(
    roomData.beginTime.year,
    roomData.beginTime.month,
    roomData.beginTime.day,
    roomData.beginTime.hour,
    roomData.beginTime.min,
  );

  // const dates: Date[][] = [];
  const dates: DateHead[] = [];

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

  for (let i = 0; i < roomData.dayLength; i++) {
    const times: HourHead[] = [];
    for (let j = 0; j < roomData.dayPatternLength; j++) {
      // const date = new Date(
      //   beginDate.getFullYear(),
      //   beginDate.getMonth(),
      //   beginDate.getDate() + i,
      // );
      // const hour = beginDate.getHours();
      let hour = 0;
      let min = 0;
      if (roomData.dayPattern === ADAY) {
        hour = beginDate.getHours();
      } else if (roomData.dayPattern === AM_AND_PM) {
        hour = j * 12;
      } else if (roomData.dayPattern === CLASSES_OF_TSUKUBA_UNIV) {
        hour = 7;
        min = 10 + j * 90;
      } else if (roomData.dayPattern === HOURS) {
        hour = beginDate.getHours() + j;
      }

      const newDate = new Date(
        beginDate.getFullYear(),
        beginDate.getMonth(),
        beginDate.getDate() + i,
        hour,
        min,
      );

      const userAvailabilities = [];

      for (const user of roomData.users) {
        userAvailabilities.push(
          user.availabilities[i * roomData.dayPatternLength + j],
        );
      }

      times.push({
        hour: newDate.getHours(),
        min: newDate.getMinutes(),
        userAvailabilities: userAvailabilities,
      });
    }

    const newDate = new Date(
      beginDate.getFullYear(),
      beginDate.getMonth(),
      beginDate.getDate() + i,
    );

    dates.push({
      year: newDate.getFullYear(),
      month: newDate.getMonth(),
      day: newDate.getDate(),
      hours: times,
    });
  }

  return (
    <RegisterationModeContext.Provider value={[mode, setMode]}>
      <div style={{ alignItems: "center" }}>
        <div style={{ alignItems: "center" }}>
          <p>room id = {roomId}</p>
          <div>
            <p>{roomData.name}</p>
            <p>{roomData.description}</p>
          </div>
          <button
            onClick={() => {
              setMode((prev) => {
                if (prev === "BEFORE") {
                  return "DOING";
                }
                if (prev === "DOING") {
                  return "BEFORE";
                }
                if (prev === "AFTER") {
                  return "AFTER";
                } else {
                  return "DOING";
                }
              });
            }}
          >
            register your plan
          </button>
        </div>
        <div className="table">
          <TableUserNameLine users={roomData.users} />
          <div
            className="table-main"
            style={{
              display: "grid",
              gridTemplateColumns: "auto 1fr",
              gridAutoFlow: "column",
            }}
          >
            <TableHeader dates={dates} />
            <AvailabilityTable
              availabilityTable={dates.map((date) =>
                date.hours.map((hour) => hour.userAvailabilities)
              )}
            />
          </div>
        </div>
      </div>
    </RegisterationModeContext.Provider>
  );
}

function registerUser(roomId: number, user: User) {
  fetch("http://localhost:8080/api/v1/rooms/" + roomId + "/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  return;
}

export default Room;
