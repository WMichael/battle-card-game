import React, { useEffect, useState } from "react";
import "./SideBar.css";
import Log from "../Log/Log";

interface SideBar {
  handleReset: () => void;
  messages: string[] | undefined;
}

export default function SideBar(props: SideBar) {

  return (
    <div className="sideBar">
      <button className="button" onClick={props.handleReset}>Reset</button>
      <Log messages={props.messages}></Log>
    </div>
  );
}