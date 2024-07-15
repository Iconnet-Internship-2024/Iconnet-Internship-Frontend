// eslint-disable-next-line no-unused-vars
import React from "react";

export default function Theme() {

  return (
    <div className="h-screen">
      <ul className="mt-10">
        <li className="flex gap-2 my-2">
          <input
            type="radio"
            id="lightMode"
            name="theme"
            value="light"
            // checked={theme === "light"}
            // onChange={toggleTheme}
          />
          <label htmlFor="lightMode">Light Mode</label>
        </li>
        <li className="flex gap-2 my-2">
          <input
            type="radio"
            id="darkMode"
            name="theme"
            value="dark"
            // checked={theme === "dark"}
            // onChange={toggleTheme}
          />
          <label htmlFor="darkMode">Dark Mode</label>
        </li>
      </ul>
    </div>
  );
}
