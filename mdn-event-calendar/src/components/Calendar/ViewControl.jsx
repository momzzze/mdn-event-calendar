import React from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { calendarViews } from "../../common/enums/calendar.enums";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ViewControl = ({ view, setView }) => {

  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-36 justify-center items-center gap-x-1.5 rounded-md bg-white px-2 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            {calendarViews[view.toUpperCase()].icon &&
              React.createElement(calendarViews[view.toUpperCase()].icon)}
            {view}
            <ChevronDownIcon
              className="ml-2 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              {Object.values(calendarViews).map((view) => (
                <Menu.Item
                  key={view.view}
                  className="flex gap-2 items-center justify-start pr-10"
                >
                  {({ active }) => (
                    <a
                      href="#"
                      onClick={() => setView(view.view)}
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "px-4 py-2 text-sm"
                      )}
                    >
                      {view.icon && <view.icon className="flex-1"/>}
                      {view.view}
                    </a>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
};

export default ViewControl;
