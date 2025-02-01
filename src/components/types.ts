export const ADAY = "ADAY";
export const AM_AND_PM = "AM_AND_PM";
export const CLASSES_OF_TSUKUBA_UNIV = "CLASSES_OF_TSUKUBA_UNIV";
export const HOURS = "HOURS";

export type DayPattern =
  | "ADAY"
  | "AM_AND_PM"
  | "CLASSES_OF_TSUKUBA_UNIV"
  | "HOURS";

export type Availability = "OK" | "NOT_BAD" | "BAD";

export type RoomAllInfo = {
  name: string;
  description: string;
  beginTime: Time;
  dayLength: number;
  dayPattern: string;
  dayPatternLength: number;
  users: User[];
};

export type Time = {
  year: number;
  month: number;
  day: number;
  hour: number;
  min: number;
};

export type User = {
  name: string;
  comment: string;
  availabilities: string[];
};

export type Room = {
  name: string;
  description: string;
  beginTime: Time;
  dayLength: number;
  dayPattern: string;
  dayPatternLength: number;
};
