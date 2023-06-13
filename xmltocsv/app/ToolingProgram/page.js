"use client";

//next.js imports

//axios imports
import axios from "axios";
//bootstrap imports
import Table from "react-bootstrap/Table";

//component imports
import TheNav from "@/app/UI/theNav";
//css imports

import { useState, useEffect } from "react";

function page() {
  //set state for the tools
  const [tools, setTools] = useState({});
  const [machines, setMachines] = useState({});
  const [manufacturers, setManufacturers] = useState({});
  const [quantity, setQuantity] = useState({});
  const [toolType, setToolType] = useState({});
  const [maxSharpen, setMaxSharpen] = useState({});
  const [services, setServices] = useState({});
  const [isFetch, setIsFetch] = useState(false);

  //set base URL to connect to backend for tools
  const BASE_URL = "http://localhost:8000/tool/";

  const fetchTools = async () => {
    try {
      //retrieving the data from the api
      const toolResponse = await axios.get(BASE_URL + "tools");
      const machinesResponse = await axios.get(BASE_URL + "machines");
      const manufacturerResponse = await axios.get(BASE_URL + "manufacturers");
      const quantityResponse = await axios.get(
        BASE_URL + "quantity_requirements"
      );
      const toolTypesResponse = await axios.get(BASE_URL + "tool_types");
      const sharpenResponse = await axios.get(BASE_URL + "max_sharpens");
      const servicesResponse = await axios.get(BASE_URL + "services");
      //setting the data retrieved from the api
      setTools(toolResponse.data);
      setMachines(machinesResponse.data);
      setManufacturers(manufacturerResponse.data);
      setQuantity(quantityResponse.data);
      setToolType(toolTypesResponse.data);
      setMaxSharpen(sharpenResponse.data);
      setServices(servicesResponse.data);
      setIsFetch(true);

      //for dev/testing only
      // console.log(toolResponse.data);
      // console.log(machinesResponse.data);
      // console.log(manufacturerResponse.data);
      // console.log(quantityResponse.data);
      // console.log(toolTypesResponse.data);
      // console.log(sharpenResponse.data);
      // console.log(servicesResponse.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (!isFetch) {
      fetchTools();
    }
  }, [isFetch]);

  //loop through each object
  const toolRows = Object.keys(tools).map((toolId) => {
    const tool = tools[toolId];
    let theType = {};
    let theQuantity = {};
    let theServices = {};
    let theMachines = {};
    let theManufacturers = {};
    let theMaxSharpen = {};
    
    //loop through all the keys in toolType
    Object.keys(toolType).map(() => {
      theType = toolType[toolId];
    });

    //loop through all keys in quantity
    Object.keys(quantity).map(() => {
      theQuantity = quantity[toolId];
    });

    //loop through services
    Object.keys(services).map(() => {
      theServices = services[toolId];
    });

    //loop through machines
    Object.keys(machines).map(() => {
      theMachines = machines[toolId];
    });

    //loop through manufacturers
    Object.keys(manufacturers).map(() => {
      theManufacturers = manufacturers[toolId];
    });

    //loop through sharpen data
    Object.keys(maxSharpen).map(() => {
      theMaxSharpen = maxSharpen[toolId];
    });
    return (
      <tr key={toolId}>
        <td>{tool.tool_name}</td>
        <td>{tool.tool_serial}</td>
        <td>{theType.tool === tool.id ? theType.tool_type : "nada"}</td>
        <td>{tool.part_number}</td>
        <td>
          {theQuantity.tool === tool.id ? theQuantity.quantity_requested : "0"}
        </td>
        <td>
          {theQuantity.tool === tool.id ? theQuantity.quantity_minimum : "0"}
        </td>
        <td>{tool.tool_quantity}</td>
        <td>{tool.tool_is_out_for_service ? "Yes" : "No"}</td>
        <td>{theMachines.tool === tool.id ? theMachines.machine_name : ""}</td>
        <td>
          {theManufacturers.tool === tool.id
            ? theManufacturers.manufacturer_vendor
            : ""}
        </td>
        <td>
          <a href={theManufacturers.manufacturer_website}>
            {theManufacturers.tool === tool.id ? theManufacturers.name : ""}
          </a>
        </td>
        <td>
          {theMaxSharpen.tool === tool.id ? theMaxSharpen.times_sharpened : ""}
        </td>
        <td>
          {theMaxSharpen.tool === tool.id
            ? theMaxSharpen.max_sharpen_amount
            : ""}
        </td>
        <td>{tool.tool_requires_match ? "Yes" : "No"}</td>
        <td>{tool.tool_has_half_life ? "Yes" : "No"}</td>
      </tr>
    );
  });

  return (
    <>
      <TheNav />
      <Table striped="columns">
        <thead>
          <tr>
            <th>Tool Name</th>
            <th>Serial number</th>
            <th>Tool Type</th>
            <th>Part #</th>
            <th>Required #</th>
            <th>Minimum #</th>
            <th>Current #</th>
            <th>Out For Service</th>
            {/* <th># On Order</th> */}
            {/* <th>Change Interval</th> */}
            <th>Vendor</th>
            <th>Manufacturer</th>
            <th>Machines</th>
            <th>Times Sharpened</th>
            <th>Maximum Sharpen</th>
            <th>Has Matching Set</th>
            <th>Half Life</th>
          </tr>
        </thead>
        <tbody>{toolRows}</tbody>
      </Table>
    </>
  );
}

export default page;
