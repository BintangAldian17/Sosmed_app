import image from "../assets/Dummy.jpg";

const Stories = ({ avatar }) => {
  return (
    <div className="  lg:w-[83px] lg:h-[83px] md:w-[110px] md:h-[110px] w-[60px] h-[60px]  p-1 rounded-full ring-2 ring-red-500 object-cover">
      <img className=" w-full h-full object-cover rounded-full " src={avatar} alt="Bordered avatar" />
    </div>
  );
};

export default Stories;
