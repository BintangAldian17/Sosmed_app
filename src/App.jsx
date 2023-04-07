import Feed from "./components/Feed";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className=" w-full h-screen bg-[#1a1b21] lg:flex text-slate-200">
      <Sidebar />
      <Feed />
    </div>
  );
}

export default App;
