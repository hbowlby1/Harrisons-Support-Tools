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
  const [isFetch, setIsFetch] = useState(false);

  //set base URL to connect to backend for tools
  const BASE_URL = "http://localhost:8000";

  const fetchTools = async () => {
    try {
      const toolResponse = await axios.get(BASE_URL + "/tool");
      setTools(toolResponse.data);
      console.log(toolResponse.data);
      setIsFetch(true)
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if(!isFetch){
        fetchTools()
    }
  }, [isFetch]);

  return (
    <>
      <TheNav />
      <Table striped="columns">
        <thead>
          <tr>
            <th>Tool Name</th>
            <th>Serial number</th>
            {/* <th>Tool Type</th> */}
            <th>Part #</th>
            {/* <th>Requested # On Hand</th> */}
            {/* <th>Minimum # On Hand</th> */}
            <th>Current # On Hand</th>
            <th># Out For Service</th>
            {/* <th># On Order</th> */}
            {/* <th>Change Interval</th> */}
            {/* <th>Vendor</th> */}
            {/* <th>Manufacturer</th> */}
            {/* <th>Machines</th> */}
            {/* <th>Max Times Sharpen</th> */}
            <th>Has Matching Set</th>
            <th>Half Life</th>
          </tr>
        </thead>
        <tbody>
            {Object.keys(tools).map((tool, i) => (
                <tr key={i}>
                    <td>{tools[tool].tool_name}</td>
                    <td>{tools[tool].tool_serial}</td>
                    <td>{tools[tool].part_number}</td>
                    <td>{tools[tool].tool_quantity}</td>
                    <td>{tools[tool].tool_is_out_for_service ? "yes":"no"}</td>
                    <td>{tools[tool].tool_requires_match ? "yes": "no"}</td>
                    <td>{tools[tool].tool_has_half_life ? "yes": "no"}</td>

                </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
}

export default page;
