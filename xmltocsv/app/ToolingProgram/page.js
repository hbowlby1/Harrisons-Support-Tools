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
  const [editedQuantity, setEditedQuantity] = useState([]);
  const [editedMinQuantity, setEditedMinQuantity] = useState([]);
  const [editedMachine, setEditedMachine] = useState([]);
  const [editedVendor, setEditedVendor] = useState([]);
  const [editedManuName, setEditedManuName] = useState([]);
  const [editedSite, setEditedSite] = useState([]);

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

  const checkActive = async (e, toolId, isActive) => {
    const { name } = await e.target;
    if (name === "outForService") {
      try {
        let updateToolResponse = await axios.patch(
          BASE_URL + `tools/` + toolId + `/`,
          { tool_is_out_for_service: isActive }
        );
      } catch (err) {
        console.error(err);
      }
    } else if (name === "isActive") {
      try {
        let updateToolResponse = await axios.patch(
          BASE_URL + `tools/` + toolId + "/",
          { tool_is_active: isActive }
        );
        fetchTools();
      } catch (err) {
        console.log(err);
      }
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
  const onChangeInput = (e, toolId, idObject) => {
    const { name, value } = e.target;
    if (name === "tool_type" && idObject.type === "ToolTypeId") {
      console.log(idObject);
      //check if the tool type is in the editedToolType array
      if (!editedToolType.find((toolType) => toolType.id === idObject.id)) {
        setEditedToolType((prevEditedToolType) => [
          ...prevEditedToolType,
          { id: idObject.id, tool_type: value },
        ]);
      } else {
        //if tool type is already in the array, update it
        setEditedToolType((prevEditedToolType) =>
          prevEditedToolType.map((toolType) =>
            toolType.id === idObject.id
              ? { id: idObject.id, tool_type: value }
              : toolType
          )
        );
      }
    } else if (
      name === "tool_name" ||
      name === "part_number" ||
      name === "tool_quantity"
    ) {
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
    } else if (
      name === "quantity_required" &&
      idObject.type === "quantityReqId"
    ) {
      //check if the quantity item is in the editedQuantity array
      if (!editedQuantity.find((quantity) => quantity.id === idObject.id)) {
        setEditedQuantity((prevEditedQauntity) => [
          ...prevEditedQauntity,
          { id: idObject.id, quantity_requested: value },
        ]);
      } else {
        //if it is in the array, then update it
        setEditedQuantity((prevEditedQauntity) =>
          prevEditedQauntity.map((quantity) =>
            quantity.id === idObject.id
              ? { id: idObject.id, quantity_requested: value }
              : quantity
          )
        );
      }
    } else if (name === "quantity_min" && idObject.type === "quantityMinId") {
      if (!editedMinQuantity.find((quantity) => quantity.id === idObject.id)) {
        setEditedMinQuantity((prevEditedMinQauntity) => [
          ...prevEditedMinQauntity,
          { id: idObject.id, quantity_minimum: value },
        ]);
      } else {
        setEditedMinQuantity((prevEditedMinQauntity) =>
          prevEditedMinQauntity.map((quantity) =>
            quantity.id === idObject.id
              ? { id: idObject.id, quantity_minimum: value }
              : quantity
          )
        );
      }
    } else if (name === "machine_name" && idObject.type === "machineName") {
      if (
        !editedMachine.find((machineName) => machineName.id === idObject.id)
      ) {
        setEditedMachine((prevEditedMachine) => [
          ...prevEditedMachine,
          { id: idObject.id, machine_name: value },
        ]);
      } else {
        setEditedMachine((prevEditedMachine) =>
          prevEditedMachine.map((machineName) =>
            machineName.id === idObject.id
              ? { id: idObject.id, machine_name: value }
              : machineName
          )
        );
      }
    } else if (
      name === "manufacturer_vendor" &&
      idObject.type === "manuVendor"
    ) {
      if (!editedVendor.find((vendor) => vendor.id === idObject.id)) {
        setEditedVendor((prevEditedVendor) => [
          ...prevEditedVendor,
          { id: idObject.id, manufacturer_vendor: value },
        ]);
      } else {
        setEditedVendor((prevEditedVendor) =>
          prevEditedVendor.map((vendor) =>
            vendor.id === idObject.id
              ? { id: idObject.id, manufacturer_vendor: value }
              : vendor
          )
        );
      }
    } else if (name === "manufacturer_name" && idObject.type === "manuName") {
      if (!editedManuName.find((manuName) => manuName.id === idObject.id)) {
        setEditedManuName((prevEditedManuName) => [
          ...prevEditedManuName,
          { id: idObject.id, manufacturer_name: value },
        ]);
      } else {
        setEditedManuName((prevEditedManuName) =>
          prevEditedManuName.map((manuName) =>
            manuName.id === idObject.id
              ? { id: idObject.id, manufacturer_name: value }
              : manuName
          )
        );
      }
    }
  };

  const updateTools = async () => {
    console.log(editedManuName)
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

    for (let quantity of editedQuantity) {
      try {
        await axios.patch(
          BASE_URL + "quantity_requirements/" + quantity.id + "/",
          {
            quantity_requested: quantity.quantity_requested,
          }
        );
      } catch (err) {
        console.error(err);
      }
    }

    for (let minQuantity of editedMinQuantity) {
      try {
        await axios.patch(
          BASE_URL + "quantity_requirements/" + minQuantity.id + "/",
          {
            quantity_minimum: minQuantity.quantity_minimum,
          }
        );
      } catch (err) {
        console.error(err);
      }
    }
    for (let machine of editedMachine) {
      try {
        await axios.patch(BASE_URL + "machines/" + machine.id + "/", {
          machine_name: machine.machine_name,
        });
      } catch (err) {
        console.error(err);
      }
    }
    for (let vendor of editedVendor) {
      try {
        await axios.patch(BASE_URL + "manufacturers/" + vendor.id + "/", {
          manufacturer_vendor: vendor.manufacturer_vendor,
        });
      } catch (err) {
        console.error(err);
      }
    }
    for (let manuName of editedManuName) {
      try {
        await axios.patch(BASE_URL + "manufacturers/" + manuName.id + "/", {
          manufacturer_name: manuName.manufacturer_name,
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
    setEditedQuantity([]);
    setEditedMinQuantity([]);
    setEditedMachine([]);
    setEditedVendor([]);
    setEditedManuName([]);
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