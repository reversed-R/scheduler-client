import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Room.css";
import { RoomAllInfo } from "./types.ts";
// import TimeCell from "./TimeCell.tsx";
import AvailabilityCell from "./AvailabilityCell.tsx";
import DateHeader from "./DateHeader.tsx";
import HourHeader from "./HourHeader.tsx";
import { ADAY, AM_AND_PM, CLASSES_OF_TSUKUBA_UNIV, HOURS } from "./types.ts";

function Room() {
  const { roomId } = useParams();

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
    <div style={{ alignItems: "center" }}>
      <div style={{ alignItems: "center" }}>
        <p>room id = {roomId}</p>
        <div>
          <p>{roomData.name}</p>
          <p>{roomData.description}</p>
        </div>
      </div>
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
          {roomData.users.map((user, index) => (
            <div key={index} style={{ display: "table-cell" }}>
              {user.name}
            </div>
          ))}
        </div>
      </div>
      <div>
        {dates.map((date, index) => {
          return (
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
                    }}
                  >
                    <HourHeader key={index} hour={hour.hour} min={hour.min} />
                    <div
                      style={{
                        display: "table",
                        width: "100%",
                        tableLayout: "fixed",
                        borderCollapse: "separate",
                        borderSpacing: "2px 2px",
                      }}
                    >
                      {hour.userAvailabilities.map((a, index) => (
                        <AvailabilityCell key={index} availability={a} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Room;
