"use client";
import React, { useState, useEffect } from "react";
import "react-tabulator/lib/styles.css";
import "react-tabulator/css/tabulator_bootstrap5.min.css";
import { ReactTabulator } from "react-tabulator";

//components
import TheNav from "@/app/UI/theNav";
import Footer from "@/app/components/Footer";

import axios from "axios";
import { Button } from "react-bootstrap";

function page() {
  const [tool, setTool] = useState([]);
  const [activeTools, setActiveTools] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [editedRows, setEditedRows] = useState({});

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  //sets the edited rows data into the state variable
  const cellEdited = (cell) => {
    const data = cell.getData();
    setEditedRows((prev) => ({ ...prev, [data.id]: data }));
  };

  const columns = [
    {
      title: "Active",
      field: "active",
      hozAlign: "center",
      formatter: "tickCross",
      editor: "tickCross",
      cellEdited: (cell) => {
        let item = cell.getData();
        axios.patch(BASE_URL + `tools/${item.id}/`, {
          tool_is_active: item.active,
        });
      },
    },
    {
      title: "Tool Name",
      field: "toolName",
      hozAlign: "center",
      editor: "input",
      cellEdited: (cell) => {
        let item = cell.getData();
        axios.patch(BASE_URL + `tools/${item.id}/`, {
          tool_name: item.toolName,
        });
      },
    },
    {
      title: "Serial Number",
      field: "serialNumber",
      hozAlign: "center",
    },
    {
      title: "Tool Type",
      field: "toolType",
      hozAlign: "center",
      editor: "input",
      cellEdited: (cell) => {
        let item = cell.getData();
        axios.patch(BASE_URL + `tool_types/${item.toolTypeId}/`, {
           tool_type: item.toolType
        })
      },
    },
    {
      title: "Part #",
      field: "partNumber",
      hozAlign: "center",
      editor: "input",
      cellEdited: (cell) => {
        let item = cell.getData();
        axios.patch(BASE_URL + `tools/${item.id}/`, {
          part_number: item.partNumber,
        });
      },
    },
    {
      title: "Required Qty",
      field: "requiredQty",
      hozAlign: "center",
      editor: "number",
      editorParams: {
        min: 0,
      },
      cellEdited: (cell) => {
        let item = cell.getData();
        axios.patch(BASE_URL + `quantity_requirements/${item.quantityRequirementsId}/`, {
          quantity_requested: item.requiredQty,
        });
      },
    },
    {
      title: "Minimum Qty",
      field: "minimumQty",
      hozAlign: "center",
      editor: "number",
      editorParams: {
        min: 0,
      },
      cellEdited: (cell) => {
        let item = cell.getData();
        axios.patch(BASE_URL + `quantity_requirements/${item.quantityRequirementsId}/`, {
          quantity_minimum: item.minimumQty,
        });
      },
    },
    {
      title: "Current Qty",
      field: "currentQty",
      hozAlign: "center",
      editor: "number",
      editorParams: {
        min: 0,
      },
      cellEdited: (cell) => {
        let item = cell.getData();
        axios.patch(BASE_URL + `tools/${item.id}/`, {
          tool_quantity: item.currentQty,
        });
      },
    },
    {
      title: "Out for Service",
      field: "outForService",
      hozAlign: "center",
      formatter: "tickCross",
      editor: "tickCross",
      cellEdited: (cell) => {
        let item = cell.getData();
        axios.patch(BASE_URL + `tools/${item.id}/`, {
          tool_is_out_for_service: item.outForService,
        });
      },
    },
    {
      title: "Machines",
      field: "machines",
      hozAlign: "center",
      editor: "input",
      cellEdited: (cell) => {
        let item = cell.getData();
        axios.patch(BASE_URL + `machines/${item.machineId}/`, {
          machine_name: item.machines,
        });
      },
    },
    {
      title: "Vendor",
      field: "vendor",
      hozAlign: "center",
      editor: "input",
      cellEdited: (cell) => {
        let item = cell.getData();
        axios.patch(BASE_URL + `manufacturers/${item.manufacturerId}/`, {
          manufacturer_vendor: item.vendor,
        });
      },
    },
    {
      title: "Manufacturer",
      field: "manufacturer",
      hozAlign: "center",
      editor: "input",
      cellEdited: (cell) => {
        let item = cell.getData();
        axios.patch(BASE_URL + `manufacturers/${item.manufacturerId}/`, {
          manufacturer_name: item.manufacturer,
        });
      },
    },
    {
      title: "Times Sharpened",
      field: "timesSharpened",
      hozAlign: "center",
      editor: "number",
      editorParams: {
        min: 0,
      },
      cellEdited: (cell) => {
        let item = cell.getData();
        axios.patch(BASE_URL + `max_sharpens/${item.maxSharpenId}/`, {
          times_sharpened: item.timesSharpened,
        });
      },
    },
    {
      title: "Maximum Sharpen",
      field: "maximumSharpen",
      hozAlign: "center",
      editor: "number",
      editorParams: {
        min: 0,
      },
      cellEdited: (cell) => {
        let item = cell.getData();
        axios.patch(BASE_URL + `max_sharpens/${item.maxSharpenId}/`, {
          max_sharpen_amount: item.maximumSharpen,
        });
      },
    },
    {
      title: "Matching set",
      field: "matchingSet",
      hozAlign: "center",
      formatter: "tickCross",
      editor: "tickCross",
      cellEdited: (cell) => {
        let item = cell.getData();
        axios.patch(BASE_URL + `tools/${item.id}/`, {
          tool_requires_match: item.matchingSet,
        });
      },
    },
    {
      title: "Matching Tool",
      field: "matchingTool",
      hozAlign: "center",
      editor: "list",
      editorParams: {
        values: tool.map((t) => t.tool_name),
        autocomplete: true,
        freetext: true,
        allowEmpty: true,
        listOnEmpty: false,
        cellEdited: (cell) => {
          let item = cell.getData();
          axios.patch(BASE_URL + `tools/${item.id}/`, {
            tool_match: item.matchingTool,
          });
        },
      },
    },
    {
      title: "Half-Life",
      field: "halfLife",
      hozAlign: "center",
      editor: "tickCross",
      cellEdited: (cell) => {
        let item = cell.getData();
        axios.patch(BASE_URL + `tools/${item.id}/`, {
          tool_has_half_life: item.halfLife,
        });
      },
    },
    {
      title: "Tool Life",
      field: "toolLife",
      hozAlign: "center",
      editor: "number",
      editorParams: { min: 0 },
      cellEdited: (cell) => {
        let item = cell.getData();
        axios.patch(BASE_URL + `tools/${item.id}/`, {
          tool_half_life_quantity: item.toolLife,
        });
      },
    },
    {
      title: "Machine ID",
      field: "machineId",
      visible: false,
    },
    {
      title: "Manufacturer ID",
      field: "manufacturerId",
      visible: false,
    },
    {
      title: "Tool Type ID",
      field: "toolTypeId",
      visible: false,
    },
    {
      title: "Quantity Requirements ID",
      field: "quantityRequirementsId",
      visible: false,
    },
    {
      title: "Max Sharpen ID",
      field: "maxSharpenId",
      visible: false,
    },
  ];

  //function to update the data in the database using the save button
  const handleSave = async () => {
    try {
      for (let id in editedRows) {
        console.log(id);
      }
      //sets the edited data back to blank object
      setEditedRows({});
    } catch (error) {
      console.error("Error updating data: ", error);
    }
  };

  // sets the options for the tabulator table
  const options = {
    pagination: "local",
    paginationSize: 10,
    layout: "fitData",
    resizableRows: true,
    movableRows: true,
    movableColumns: true,
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(BASE_URL + "tools");
        //sets only active tools unless show inactive is selected
        switch (activeTools) {
          case true:
            const activeTools = response.data.filter(
              (tool) => tool.tool_is_active
            );
            setTool(activeTools);
            break;
          case false:
            const inActiveTools = response.data.filter(
              (tool) => !tool.tool_is_active
            );
            setTool(inActiveTools);
            break;
          default:
            setTool(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
    setIsClient(true); // Set the flag to true once the component has mounted
  }, []);

  //fetches tool names for the matching tool lists

  const data = tool.map((tool) => {
    return {
      id: tool.id,
      active: tool.tool_is_active,
      toolName: tool.tool_name,
      serialNumber: tool.tool_serial,
      toolType:
        tool.tool_type_set.length > 0 ? tool.tool_type_set[0].tool_type : "",
      partNumber: tool.part_number,
      requiredQty:
        tool.quantity_requirements_set.length > 0
          ? tool.quantity_requirements_set[0].quantity_requested
          : 0,
      minimumQty:
        tool.quantity_requirements_set.length > 0
          ? tool.quantity_requirements_set[0].quantity_minimum
          : 0,
      currentQty: tool.tool_quantity,
      outForService: tool.tool_is_out_for_service,
      machines:
        tool.machine_set.length > 0 ? tool.machine_set[0].machine_name : "",
      vendor:
        tool.manufacturer_set.length > 0
          ? tool.manufacturer_set[0].manufacturer_vendor
          : "",
      manufacturer:
        tool.manufacturer_set.length > 0
          ? tool.manufacturer_set[0].manufacturer_name
          : "",
      timesSharpened:
        tool.max_sharpen_set.length > 0
          ? tool.max_sharpen_set[0].times_sharpened
          : 0,
      maximumSharpen:
        tool.max_sharpen_set.length > 0
          ? tool.max_sharpen_set[0].max_sharpen_amount
          : 0,
      matchingSet: tool.tool_requires_match,
      matchingTool: tool.tool_match,
      halfLife: tool.tool_has_half_life,
      toolLife: tool.tool_half_life_quantity,
      machineId:
        tool.machine_set.length > 0 ? tool.machine_set[0].id : undefined,
      manufacturerId:
        tool.manufacturer_set.length > 0
          ? tool.manufacturer_set[0].id
          : undefined,
      toolTypeId: tool.tool_type_set.length > 0 ? tool.tool_type_set[0].id : 0,
      quantityRequirementsId:
        tool.quantity_requirements_set.length > 0
          ? tool.quantity_requirements_set[0].id
          : 0,
      maxSharpenId: tool.max_sharpen_set.length > 0 ? tool.max_sharpen_set[0].id : 0,
    };
  });

  return isClient ? (
    <>
      <TheNav />
      <ReactTabulator
        columns={columns}
        data={data}
        options={options}
        className="mt-3 mx-3 table-bordered "
      />
      <Button
        onClick={handleSave}
        disabled={Object.keys(editedRows).length === 0}
      >
        Save Changes
      </Button>
      <Footer />
    </>
  ) : null;
}

export default page;
