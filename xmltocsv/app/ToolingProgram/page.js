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
  const [showInactive, setShowInactive] = useState(false);
  const [readOnly, setReadOnly] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editedTool, setEditedTool] = useState([]);
  const [editedToolType, setEditedToolType] = useState([]);

  //get the current date
  const date = new Date();
  let currentDate = date.toString();

  //set base URL to connect to backend for tools
  const BASE_URL = "http://localhost:8000/tool/";

  useEffect(() => {
    fetchTools();
  }, [showInactive]);

  const fetchTools = async () => {
    try {
      //retrieving the data from the api
      let toolResponse = await axios.get(BASE_URL + "tools");
      //setting the data retrieved from the api
      let toolsObject = toolResponse.data;
      let toolsArray = Object.keys(toolsObject).map((toolId) => {
        return toolsObject[toolId];
      });
      if (!showInactive) {
        toolsArray = toolsArray.filter((tool) => tool.tool_is_active);
      }
      setTools(toolsArray);
      setIsFetch(true);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (!isFetch) {
      fetchTools();
    }
  }, [isFetch]);

  const checkActive = async (toolId, isActive) => {
    try {
      let updateToolResponse = await axios.patch(
        BASE_URL + `tools/` + toolId + "/",
        { tool_is_active: isActive }
      );
      fetchTools();
    } catch (err) {
      console.log(err);
    }
  };

  const addTool = async (serialName) => {
    try {
      //create this url in the backend
      let lastToolResponse = await axios.get(
        BASE_URL + "tools/last/" + serialName
      );
      let lastTool = lastToolResponse.data;
      let lastToolArray = Object.keys(lastTool).map(
        (lastToolId) => lastTool[lastToolId]
      );
      setLastTool(lastToolArray);
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
  };

  //allows editing the tool information
  const Editing = () => {
    setIsEditing(!isEditing);
    setReadOnly(!readOnly);
  };

  //this is the function that allows changing of individual tool information
  const onChangeInput = (e, toolId, toolTypeId) => {
    const { name, value } = e.target;

    if (name === "tool_type") {
      //check if the tool type is in the editedToolType array
      if (!editedToolType.find((toolType) => toolType.id === toolTypeId)) {
        setEditedToolType((prevEditedToolType) => [
          ...prevEditedToolType,
          { id: toolTypeId, tool_type: value },
        ]);
        console.log(editedToolType);
      } else {
        //if tool type is already in the array, update it
        setEditedToolType((prevEditedToolType) =>
          prevEditedToolType.map((toolType) =>
            toolType.id === toolTypeId
              ? { id: toolTypeId, tool_type: value }
              : toolType
          )
        );
      }
    } else {
      const updatedTools = tools.map((tool) =>
        tool.id === toolId ? { ...tool, [name]: value } : tool
      );
      setTools(updatedTools);
      const updatedTool = updatedTools.find((tool) => tool.id === toolId);

      // If the tool is not in the editedData array yet, add it
      if (!editedTool.find((tool) => tool.id === toolId)) {
        setEditedTool((prevEditedData) => [...prevEditedData, updatedTool]);
      } else {
        // If the tool is already in the editedData array, update it
        setEditedTool((prevEditedData) =>
          prevEditedData.map((tool) =>
            tool.id === toolId ? updatedTool : tool
          )
        );
      }
    }
  };

  const updateTools = async () => {
    //check for changes in the tool
    for (let tool of editedTool) {
      try {
        //patch the tool
        let test = await axios.patch(BASE_URL + "tools/" + tool.id + "/", tool);
        console.log(test);
      } catch (err) {
        console.error(err);
      }
    }

    for (let toolType of editedToolType) {
      try {
        await axios.patch(BASE_URL + "tool_types/" + toolType.id + "/", {
          tool_type: toolType.tool_type,
        });
      } catch (err) {
        console.error(err);
      }
    }
    fetchTools();
    setIsEditing(false);
    setReadOnly(true);
    setEditedTool([]);
    setEditedToolType([]);
  };

  return (
    <>
      <TheNav />
      <label>Inactive tools (deletes after 30 days)</label>
      <input
        type="checkbox"
        checked={showInactive}
        onChange={(e) => setShowInactive(e.target.checked)}
      />
      <Button
        onClick={makeTool}
        className="mt-3"
        style={{ width: "50%", margin: "auto 25%" }}
      >
        Create New Tool
      </Button>
      {toggle ? (
        <CreateNewTool getTools={fetchTools} toggler={makeTool} />
      ) : (
        <></>
      )}
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
          activeFilter={checkActive}
          changeData={onChangeInput}
          editing={Editing}
          isEditing={isEditing}
          readOnly={readOnly}
          updateTools={updateTools}
        />
      )}
    </>
  );
}

export default page;
