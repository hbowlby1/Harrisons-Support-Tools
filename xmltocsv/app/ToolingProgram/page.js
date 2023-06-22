"use client";

//next.js imports

//component imports
import ToolAccordion from "../components/ToolAccordion";
//axios imports
import axios from "axios";
//bootstrap imports
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";

//component imports
import TheNav from "@/app/UI/theNav";
import CreateNewTool from "../components/CreateNewTool";
//fontawesome imports

//css imports

import { useState, useEffect } from "react";

function page() {
  //set state for the tools
  const [tools, setTools] = useState([]);
  const [isFetch, setIsFetch] = useState(false);
  const [lastTool, setLastTool] = useState([]);
  const [toggle, setToggle] = useState(false);

  //set base URL to connect to backend for tools
  const BASE_URL = "http://localhost:8000/tool/";

  const fetchTools = async () => {
    try {
      //retrieving the data from the api
      const toolResponse = await axios.get(BASE_URL + "tools");
      //setting the data retrieved from the api
      const toolsObject = toolResponse.data;
      const toolsArray = Object.keys(toolsObject).map((toolId) => {
        return toolsObject[toolId];
      });
      setTools(toolsArray);
      setIsFetch(true);

      //for dev/testing only
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (!isFetch) {
      fetchTools();
    }
  }, [isFetch]);

  const addTool = async (serialName) => {
    try {
      //create this url in the backend
      const lastToolResponse = await axios.get(
        BASE_URL + "tools/last/" + serialName
      );
      const lastTool = lastToolResponse.data;
      const lastToolArray = Object.keys(lastTool).map((lastToolId) => (
        lastTool[lastToolId]
      ));
      setLastTool(lastToolArray)
      console.log(lastTool);
    } catch (err) {
      console.log(err);
    }
    //grab the tool serial, slice it, convert number to integer
    //add 1 to the number, convert back to string
    //combine number and string and set to new serial.
    // try{
    //   const addNewTool = await axios.post(BASE_URL)
    // }
    // catch(err){
    //   console.log(err);
    // }
  };
  const makeTool = () => {
    setToggle(!toggle);
  }
  return (
    <>
      <TheNav />
      {!isFetch ? (
        <Spinner
          animation="border"
          variant="primary"
          style={{ margin: "auto 50%" }}
        />
      ) : (
        <ToolAccordion
          toolList={tools}
          newTool={addTool}
        />
      )}
      <Button onClick={makeTool} className="mt-3" style={{width:"50%", margin:"auto 25%"}}>
        Create New Tool
      </Button>
      {toggle ? (
        <CreateNewTool />
      ): <></>}
    </>
  );
}

export default page;
