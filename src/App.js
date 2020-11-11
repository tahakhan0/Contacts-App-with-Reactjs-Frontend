import React from "react";
import "./components/MainComponents/styles.css";
import Contacts from "./components/MainComponents/Contacts";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();
function App() {
  return <div className="App">{<Contacts />}</div>;
}

export default App;
