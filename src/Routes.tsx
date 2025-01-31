import { Route, Routes } from "react-router-dom";
import Entrance from "./components/Entrance.tsx";
import Room from "./components/Room.tsx";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Entrance />} />
      <Route path="/rooms/:roomId" element={<Room />} />
    </Routes>
  );
};
