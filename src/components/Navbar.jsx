import React, { useState, useContext, useEffect, Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Button } from "flowbite-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "./Authcontext";
import { getCookie } from "../utils/cookie";

const navigation = [
  { name: "Beranda", href: "/", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const handleLogout = async (navigate, logout) => {
  try {
    const accessToken = getCookie("accessToken");

    if (!accessToken) {
      console.error("Token akses tidak ditemukan");
      return;
    }

    const response = await axios.delete("http://localhost:3000/auth/logout", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status === 200) {
      logout();
      navigate("/");
    } else {
      console.error("Gagal logout:", response.data.msg);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

export default function Nav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, logout, setIsLoggedIn, isCreator } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [isLoggedIn]);
  console.log("Is Creator:", isCreator);

  return (
    <Disclosure as="nav" className="bg-white">
      {({ open }) => (
        <>
          <div className="mx-auto px-2 sm:px-6 lg:px-4 border-b">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="h-12 w-auto"
                    src="../src/assets/logo.svg"
                    alt="LOGO"
                  />
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <div className="hidden sm:block">
                  <div className="flex space-x-4 h-full items-center">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          location.pathname === item.href
                            ? "text-red-500"
                            : "text-black",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={location.pathname === item.href ? "page" : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
                {isLoggedIn ? (
                  <div className="flex items-center">
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-8 w-8 rounded-full"
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""
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
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {isCreator ? (
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  to="/creator"
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  Creator Account
                                </Link>
                              )}
                            </Menu.Item>
                          ) : null}
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/settings"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Settings
                              </Link>
                            )}
                          </Menu.Item>
                          {!isCreator ? (
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  to="/Upgradetocreators"
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  Upgrade to creator
                                </Link>
                              )}
                            </Menu.Item>
                          ) : null}
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                                onClick={() => handleLogout(navigate, logout)}
                              >
                                Sign out
                              </Link>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                ) : (
                  <div className="flex flex-wrap items-center gap-2">
                    <Link
                      to="/login"
                      className={classNames(
                        location.pathname === "/login"
                          ? "text-red-500"
                          : "text-black",
                        "rounded-md px-3 py-2 text-sm font-medium"
                      )}
                      aria-current={location.pathname === "/login" ? "page" : undefined}
                    >
                      Login
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    location.pathname === item.href
                      ? "text-red-500"
                      : "text-gray-300",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={location.pathname === item.href ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
