import { User } from "./types.ts";

export type Context = {
  roomId: number;
  userRegisterFn: (roomId: number, user: User) => void;
};

// export type UserContext ;
//
export type RegistrationMode = "BEFORE" | "DOING" | "AFTER";
