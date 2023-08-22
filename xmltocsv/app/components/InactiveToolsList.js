import React, {useState, useEffect} from 'react'

import Table from 'react-bootstrap/Table'

//show a list of all inactive tools

function InactiveToolsList(props) {
  let rowData = props.toolList.map((tool) => {
    if(tool.tool_is_active === false) {
      return (
        <tr key={tool.id}>
          <td>{tool.manufacturer_set[0].manufacturer_vendor}</td>
          <td>{tool.tool_name}</td>
          <td>{tool.tool_serial}</td>
          <td>{tool.tool_type_set[0].tool_type}</td>
          <td>{tool.part_number}</td>
          <td>{new Date(tool.tool_is_out_for_service_date).toLocaleDateString('en-US')}</td>
        </tr>
      )
    }
  }
  )
  return (
    <>
      <h3 style={{textAlign: 'center', margin: '10px 0'}}>Inactive Tools</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Vendor</th>
            <th>Tool Name</th>
            <th>Serial number</th>
            <th>Tool Type</th>
            <th>Part #</th>
            <th>Went Out For Service Date</th>
          </tr>
        </thead>
        <tbody>{rowData}</tbody>
      </Table>
    </>
  )
}

export default InactiveToolsList