import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "./context-provider/AuthContextProvider";
import Routes from "./routes/Routes";
import io from "socket.io-client";

function App() {
  return (
    <div
      className=" w-full
    h-screen bg-[#272727] lg:flex text-slate-200">
      <Routes />
    </div>
  );
}

export default App;
