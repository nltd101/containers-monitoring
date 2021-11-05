import React, { useState } from "react"; //Rfce
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as SiIcons from "react-icons/io5";
import * as BsIcons from "react-icons/bs";
import * as ImIcons from "react-icons/im";

export const SidebarData = [
  {
    title: "Overview",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Containers",
    path: "/containers",
    icon: <BsIcons.BsTruck />,
    cName: "nav-text",
  },
  {
    title: "History",
    path: "/historys",
    icon: <FaIcons.FaHistory />,
    cName: "nav-text",
  },
  {
    title: "Warning",
    path: "/warning",
    icon: <ImIcons.ImWarning />,
    cName: "nav-text",
  },
  {
    title: "Support",
    path: "/support",
    icon: <IoIcons.IoMdHelpCircle />,
    cName: "nav-text",
  },
];
