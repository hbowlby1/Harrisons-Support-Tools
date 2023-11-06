import React, { useState, useEffect } from "react";
import "react-tabulator/lib/styles.css";
import "react-tabulator/css/tabulator_modern.min.css";
import { ReactTabulator } from "react-tabulator";

import axios from "axios";

function page() {
  const [tool, setTool] = useState([]);
  const [isClient, setIsClient] = useState(false);

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const columns = [
    { title: "Active", field: "active", width: 150, resizable: true,},
    { title: "Tool Name", field: "toolName", width: 150, resizable: true,},
    { title: "Serial Number", field: "serialNumber", width: 150, resizable: true,},
    { title: "Tool Type", field: "toolType", width: 150, resizable: true,},
    { title: "Part #", field: "partNumber", width: 150, resizable: true,},
    { title: "Required Qty", field: "requiredQty", width: 150, resizable: true,},
    { title: "Minimum Qty", field: "minimumQty", width: 150, resizable: true,},
    { title: "Current Qty", field: "currentQty", width: 150, resizable: true,},
    { title: "Out for Service", field: "outForService", width: 150, resizable: true,},
    { title: "Machines", field: "machines", width: 150, resizable: true,},
    { title: "Vendor", field: "vendor", width: 150, resizable: true,},
    { title: "Manufacturer", field: "manufacturer", width: 150, resizable: true,},
    { title: "Times Sharpened", field: "timesSharpened", width: 150, resizable: true,},
    { title: "Maximum Sharpen", field: "maximumSharpen", width: 150, resizable: true,},
    { title: "Matching set", field: "matchingSet", width: 150, resizable: true,},
    { title: "Matching Tool", field: "matchingTool", width: 150, resizable: true,},
    { title: "Half-Life", field: "halfLife", width: 150, resizable: true,},
    { title: "Tool Life", field: "toolLife", width: 150, resizable: true,},
  ]
  ;

  //sets the options for the tabulator table
  const options = {
    maxHeight: "100%",
    movableRows: true,
    pagination: "local",
    paginationSize: 10,
    movableColumns: true,
    layout: "fitData",
    autoResize: true,
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(BASE_URL + "tools");
        setTool(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
    setIsClient(true); // Set the flag to true once the component has mounted
  }, []);
  
  const data = tool.map((tool) => {
    return {
      id: tool.id,
      active: tool.tool_is_active,
      toolName: tool.tool_name,
      serialNumber: tool.tool_serial,
      toolType: tool.tool_type_set.length > 0 ? tool.tool_type_set[0].tool_type : '',
      partNumber: tool.part_number,
      requiredQty: tool.quantity_requirements_set.length > 0 ? tool.quantity_requirements_set[0].quantity_requested : 0,
      minimumQty: tool.quantity_requirements_set.length > 0 ? tool.quantity_requirements_set[0].quantity_minimum : 0,
      currentQty: tool.tool_quantity,
      outForService: tool.tool_is_out_for_service,
      machines: tool.machine_set.length > 0 ? tool.machine_set[0].machine_name : '',
      vendor: tool.manufacturer_set.length > 0 ? tool.manufacturer_set[0].manufacturer_vendor : '',
      manufacturer: tool.manufacturer_set.length > 0 ? tool.manufacturer_set[0].manufacturer_name : '',
      timesSharpened: tool.max_sharpen_set.length > 0 ? tool.max_sharpen_set[0].times_sharpened : 0,
      maximumSharpen: tool.max_sharpen_set.length > 0 ? tool.max_sharpen_set[0].max_sharpen_amount : 0,
      matchingSet: tool.tool_requires_match,
      matchingTool: tool.tool_match,
      halfLife: tool.tool_has_half_life,
      toolLife: tool.tool_half_life_quantity,
    };
  });

  return isClient ? (
    <ReactTabulator columns={columns} data={data} options={options} />
    )  : null;
}

export default page;
