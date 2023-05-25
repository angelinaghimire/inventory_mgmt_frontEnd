import React from "react";
import { createBrowserHistory } from "history";
import "../stylesheets/Settings.css";

const Settings = () => {
  const history = createBrowserHistory();

  const handleLogout = () => {};

  const handleChangePassword = () => {
    // code to handle change password
  };

  const handleDarkModeToggle = () => {
    // code to handle dark mode toggle
  };

  return (
    <div className="Settings">
      <h1>Settings</h1>
      <div>
        <h2>Appearance</h2>
        <label>
          <input type="checkbox" onChange={handleDarkModeToggle} />
          Dark mode
        </label>
      </div>
      <div>
        <h2>Account</h2>
        <button onClick={handleChangePassword}>Change password</button>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Settings;
