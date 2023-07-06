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
  const [editedSharpen, setEditedSharpen] = useState([]);
  const [editedMaxSharpen, setEditedMaxSharpen] = useState([]);

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
          BASE_URL + `tools/` + toolId + `/`,
          { tool_is_active: isActive }
        );
        fetchTools();
      } catch (err) {
        console.log(err);
      }
    } else if (name === "hasHalfLife") {
      try {
        let updateToolResponse = await axios.patch(
          BASE_URL + `tools/` + toolId + `/`,
          { tool_has_half_life: isActive }
        );
        fetchTools();
      } catch (err) {
        console.error(err);
      }
    } else if (name === "hasMatch") {
      try {
        let updateToolResponse = await axios.patch(
          BASE_URL + `tools/` + toolId + `/`,
          { tool_requires_match: isActive }
        );
        fetchTools();
      } catch (err) {
        console.error(err);
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

      //grab the tool serial, slice it, convert number to integer
      //add 1 to the number, convert back to string
      //combine number and string and set to new serial.
      let serialNums = lastTool.tool_serial.slice(4);
      let serialPrefix = lastTool.tool_serial.slice(0, 4);
      let num = parseInt(serialNums, 10);
      num += 1;
      let newNumPart = num.toString().padStart(3, "0");
      let newSerialNumber = serialPrefix + newNumPart;
      console.log(lastTool.tool_serial_class);
      //end of serial generation

      let createCurrentTool = await axios.post(
        BASE_URL + 'tools/', {
          tool_name: lastTool.tool_name,
          tool_serial_class: lastTool.tool_serial_class,
          tool_serial: newSerialNumber,
          part_number: lastTool.part_number,
          tool_quantity: 0,
        }
      )
      //gets the ID of the newly created tool
      let newToolId = createCurrentTool.data.id

      let createCurrentMachine = await axios.post(
        BASE_URL + "machines/", {
          machine_name: lastTool.machine_set[0].machine_name,
          tool: newToolId,
        }
      )

      let createNewManufacturer = await axios.post(
        BASE_URL + "manufacturers/", {
          manufacturer_name: lastTool.manufacturer_set[0].manufacturer_name,
          manufacturer_website: lastTool.manufacturer_set[0].manufacturer_website,
          manufacturer_vendor: lastTool.manufacturer_set[0].manufacturer_vendor,
          tool: newToolId,
        }
      )

      let createNewQuantities = await axios.post(
        BASE_URL + "quantity_requirements/", {
          quantity_requested: 10,
          quantity_minimum: 0,
          tool: newToolId,
        }
      )

      let createNewToolType = await axios.post(
        BASE_URL + "tool_types/", {
          tool_type: lastTool.tool_type_set[0].tool_type,
          tool: newToolId,
        }
      )

      let createNewMaxSharpen = await axios.post(
        BASE_URL + "max_sharpens/",{
          times_sharpened: 0,
          max_sharpen_amount: lastTool.max_sharpen_set[0].max_sharpen_amount,
          tool: newToolId,
        }
      )

      let createNewService = await axios.post(
        BASE_URL + "services/", {
          tool: newToolId,
        }
      )
    } catch (err) {
      console.log(err);
    }
    //set last tool array back to null
    setLastTool([]);
    //fetch the tools list as well
    fetchTools();
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
      name === "tool_quantity" ||
      name === "tool_match" ||
      name === "tool_half_life_quantity"
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
    } else if (
      name === "manufacturer_website" &&
      idObject.type === "manuSite"
    ) {
      if (!editedSite.find((manuSite) => manuSite.id === idObject.id)) {
        setEditedSite((prevEditedSite) => [
          ...prevEditedSite,
          { id: idObject.id, manufacturer_website: value },
        ]);
      } else {
        setEditedSite((prevEditedSite) =>
          prevEditedSite.map((manuSite) =>
            manuSite.id === idObject.id
              ? { id: idObject.id, manufacturer_website: value }
              : manuSite
          )
        );
      }
    } else if (name === "times_sharpened" && idObject.type === "timeSharpen") {
      if (!editedSharpen.find((sharpen) => sharpen.id === idObject.id)) {
        setEditedSharpen((prevEditedSharpen) => [
          ...prevEditedSharpen,
          { id: idObject.id, times_sharpened: value },
        ]);
      } else {
        setEditedSharpen((prevEditedSharpen) =>
          prevEditedSharpen.map((sharpen) =>
            sharpen.id === idObject.id
              ? { id: idObject.id, times_sharpened: value }
              : sharpen
          )
        );
      }
    } else if (
      name === "max_sharpen_amount" &&
      idObject.type === "maxSharpen"
    ) {
      if (
        !editedMaxSharpen.find((maxSharpen) => maxSharpen.id === idObject.id)
      ) {
        setEditedMaxSharpen((prevEditedMaxSharpen) => [
          ...prevEditedMaxSharpen,
          { id: idObject.id, max_sharpen_amount: value },
        ]);
      } else {
        setEditedMaxSharpen((prevEditedMaxSharpen) =>
          prevEditedMaxSharpen.map((maxSharpen) =>
            maxSharpen.id === idObject.id
              ? { id: idObject.id, max_sharpen_amount: value }
              : maxSharpen
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
    for (let manuSite of editedSite) {
      try {
        await axios.patch(BASE_URL + "manufacturers/" + manuSite.id + "/", {
          manufacturer_website: manuSite.manufacturer_website,
        });
      } catch (err) {
        console.error(err);
      }
    }
    for (let sharpen of editedSharpen) {
      try {
        await axios.patch(BASE_URL + "max_sharpens/" + sharpen.id + "/", {
          times_sharpened: sharpen.times_sharpened,
        });
      } catch (err) {
        console.error(err);
      }
    }
    for (let maxSharpen of editedMaxSharpen) {
      try {
        await axios.patch(BASE_URL + "max_sharpens/" + maxSharpen.id + "/", {
          max_sharpen_amount: maxSharpen.max_sharpen_amount,
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
    setEditedSharpen([]);
    setEditedMaxSharpen([]);
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
