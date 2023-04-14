import { FiSearch } from "react-icons/fi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { TbSend } from "react-icons/tb";
import { FiCamera } from "react-icons/fi";
import { IoIosAdd } from "react-icons/io";
import { Dialog, Transition } from "@headlessui/react";
import { useState, Fragment } from "react";

const Navbar = () => {
  let [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };
  return (
    <nav className=" lg:w-full max-w-full h-[46px] flex justify-between items-center">
      <FiCamera className=" sm:w-12 sm:h-12 w-6 h-6 lg:hidden " />
      <div className=" w-80 h-full bg-[#393a48] rounded-md lg:block hidden">
        <form className=" w-full h-full flex justify-start px-3 items-center gap-x-5">
          <button className=" h-full w-fit">
            <FiSearch className=" w-5 h-5" />
          </button>
          <input
            className=" w-full h-full bg-[#393a48] text-white active:border-black rounded-md outline-none placeholder:text-slate-600 placeholder:font-medium"
            placeholder="Search"
          />
        </form>
      </div>
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
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                      Payment successful
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Your payment has been successfully submitted. We’ve sent you an email with all of the details of
                        your order.
                      </p>
                    </div>

                    <div className="mt-4">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={closeModal}>
                        Got it, thanks!
                      </button>
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
