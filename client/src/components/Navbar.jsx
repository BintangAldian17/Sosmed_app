import { FiSearch } from "react-icons/fi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { TbSend } from "react-icons/tb";
import { FiCamera } from "react-icons/fi";
import { IoIosAdd } from "react-icons/io";
import { Dialog, Transition } from "@headlessui/react";
import { useState, Fragment } from "react";
import { BsFillCloudUploadFill } from "react-icons/bs";
import { MdChangeCircle } from "react-icons/md";
import { publicClient } from "../axios/RequestMethod";
import { useCreatePosts, useUploadPostImage } from "../hooks/posts/CreatePosts";
import { useQueryClient } from "@tanstack/react-query";
import { useGetFindUser } from "../hooks/Users/useFindUser";
import { useDebounce } from "../utils/useDebounce";
import PulseLoader from "react-spinners/PulseLoader";
import userAvatar from "../assets/user.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState("");
  const [preview, setPreview] = useState("");
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(true);

  const upload = async () => {
    try {
      const fromData = new FormData();
      fromData.append("file", img);
      const res = await publicClient.post("/posts/upload", fromData);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const queryClient = useQueryClient();

  const debounceSearchResults = useDebounce(search, 600);
  const { data: findUser, isLoading: isLoadingSearch } = useGetFindUser({ q: debounceSearchResults });

  const { mutate: createPost, isLoading } = useCreatePosts({
    onSuccess: () => {
      setIsOpen(false);
      setImg("");
      setDesc("");
      setPreview("");
      queryClient.invalidateQueries("posts");
    },
  });

  const loadImage = (e) => {
    const image = e.target.files[0];
    setImg(image);
    setPreview(URL.createObjectURL(image));
  };
  const fromDa = new FormData();
  const fd = fromDa.append("file", img);

  console.log(img);
  console.log(fd);
  const handleCreatePost = async () => {
    let imgUrl = "";
    if (img) imgUrl = await upload();
    createPost({ desc, img: imgUrl });
  };

  const closeModal = () => {
    setIsOpen(false);
    setPreview("");
    setImg("");
    setDesc("");
  };

  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <nav className=" lg:w-full max-w-full h-[46px] flex justify-between items-center">
      {/* Mobile layouts */}
      <FiCamera className=" sm:w-12 sm:h-12 w-6 h-6 lg:hidden " />
      <div className=" w-80 h-full bg-[#333333] rounded-md lg:block hidden relative">
        <div className=" w-full h-full flex justify-between px-3">
          <div className=" w-full h-full flex justify-start gap-x-5 items-center">
            <button className=" h-full w-fit">
              <FiSearch className=" w-5 h-5" />
            </button>
            <input
              className=" w-full h-full bg-[#333333] text-white active:border-black rounded-md outline-none placeholder:text-slate-600 placeholder:font-medium"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {isLoadingSearch && search !== "" ? <PulseLoader size={5} color="#cbd5e1" margin={1} /> : null}
          </div>
        </div>

        {findUser ? (
          <Transition
            show={show}
            enter="transition-all ease-in-out duration-500 delay-[200ms]"
            enterFrom="opacity-0 translate-y-6"
            enterTo="opacity-100 translate-y-0"
            leave="transition-all ease-in-out duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            className=" w-full h-fit max-h-64 bg-[#272727] absolute top-full mt-2 rounded-md shadow-md flex flex-col px-4 py-4 gap-y-1 overflow-auto">
            {findUser?.results?.map((el, i) => {
              return (
                <div className=" w-full h-fit flex gap-x-3 items-center" key={i}>
                  <div className=" w-10 h-10 overflow-hidden">
                    {el?.avatar === null ? (
                      <img className=" w-full h-full object-cover rounded-full" src={userAvatar} alt="user_avatar" />
                    ) : (
                      <img
                        className=" w-full h-full object-cover"
                        src={`https://sosmedapp-production.up.railway.app/uploads/${el?.avatar}`}
                      />
                    )}
                    <img className=" w-full h-full" />
                  </div>
                  <span className=" flex flex-grow text-lg font-semibold">{el?.username}</span>
                </div>
              );
            })}
          </Transition>
        ) : null}
      </div>
      {/* Desktop Layout */}
      {/* Button Add Post */}
      <div className=" w-fit h-full flex lg:gap-x-8 gap-x-5 justify-center items-center">
        <IoMdNotificationsOutline className=" lg:w-7 lg:h-7 sm:w-14 sm:h-14 w-7 h-7 text-slate-200" />
        <TbSend className=" lg:w-6 lg:h-6 sm:w-12 sm:h-12 w-6 h-6 text-slate-200" />
        <button
          className=" h-full w-[140px] bg-gradient-to-tr from-[#fa7e1e]  to-[#d62976] rounded-md lg:flex justify-center gap-x-2 px-4 items-center  hidden"
          onClick={openModal}>
          <div className=" w-fit h-fit bg-white bg-opacity-30 backdrop-blur-xl  drop-shadow-lg rounded-full ">
            <IoIosAdd className=" w-6 h-6 text-slate-300" />
          </div>
          <span className=" font-medium text-sm">Add photo</span>
        </button>
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0">
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>
            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95">
                  <Dialog.Panel
                    as="form"
                    className="w-full max-w-md transform overflow-hidden rounded-2xl bg-[#272727] p-6 pt-0 h-fit flex flex-col gap-y-5 text-left align-middle shadow-xl transition-all text-slate-300 ">
                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 pt-6 pb-2">
                      Upload Image
                    </Dialog.Title>
                    <div className=" w-full h-20 rounded-md border-2 flex items-start justify-start">
                      <input
                        className=" w-full h-full bg-transparent px-2"
                        placeholder="Description"
                        onChange={(e) => setDesc(e.target.value)}
                      />
                    </div>
                    <div className="mt-2 w-full h-64 ">
                      {preview ? (
                        <div className=" w-full h-full object-cover relative">
                          <img src={preview} className=" w-full h-full object-cover" />
                          <label className=" absolute z-40 top-0 cursor-pointer">
                            <MdChangeCircle className="w-7 h-7" />
                            <input type="file" className="hidden" onChange={loadImage} />
                          </label>
                        </div>
                      ) : (
                        <div className=" w-full h-64 border-2 border-dashed flex flex-col gap-y-3 justify-center items-center">
                          <BsFillCloudUploadFill className=" w-20 h-20" />
                          <div>
                            Drag files here or a
                            <label>
                              <span className=" text-red-500 hover:text-red-600 transition-all ease-in-out cursor-pointer duration-100">
                                {" "}
                                Browse
                              </span>
                              <input placeholder="browse" type="file" className=" hidden" onChange={loadImage} />
                            </label>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="mt-4">
                      {isLoading ? (
                        <button
                          type="button"
                          className="inline-flex justify-center items-center rounded-md border border-transparent bg-gradient-to-tr from-[#fa7e1e]  to-[#d62976]  w-28 h-9 text-sm font-medium "
                          disabled>
                          <div role="status">
                            <svg
                              aria-hidden="true"
                              className="inline w-7 h-7 mr-2 text-gray-200 animate-spin dark:text-transparent  fill-gray-600 dark:fill-gray-300"
                              viewBox="0 0 100 101"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                              />
                              <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                              />
                            </svg>
                            <span className="sr-only">Loading...</span>
                          </div>
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="inline-flex justify-center items-center rounded-md border border-transparent bg-gradient-to-tr from-[#fa7e1e]  to-[#d62976] w-28 h-9  text-sm font-medium "
                          onClick={handleCreatePost}>
                          Upload Post
                        </button>
                      )}
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
    </nav>
  );
};

export default Navbar;
