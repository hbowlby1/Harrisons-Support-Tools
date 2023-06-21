"use client";

//next.js imports

//component imports
import ToolAccordion from "../components/ToolAccordion";
//axios imports
import axios from "axios";
//bootstrap imports
import Spinner from "react-bootstrap/Spinner";

//component imports
import TheNav from "@/app/UI/theNav";

//fontawesome imports

//css imports

import { useState, useEffect } from "react";

function page() {
  //set state for the tools
  const [tools, setTools] = useState([]);
  const [isFetch, setIsFetch] = useState(false);

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
      let lastTool = lastToolResponse.data;
      console.log(lastTool);
    } catch (err) {
      console.log(err);
    }
  };

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
    </>
  );
}

export default page;
