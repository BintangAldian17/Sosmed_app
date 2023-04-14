import Feed from "./components/Feed";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Routes from "./routes/Routes";

function App() {
  return (
    <div
      className=" w-full
    h-screen bg-[#1a1b21] lg:flex text-slate-200">
      <Routes />
    </div>
  );
}

export default App;
