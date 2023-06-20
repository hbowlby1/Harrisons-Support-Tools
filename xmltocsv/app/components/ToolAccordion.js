// implement this when we go to refactor the tooling program page

import Accordion from "react-bootstrap/Accordion";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPlus } from '@fortawesome/free-solid-svg-icons'

function ToolAccordion(props) {
  const differentTool = Object.keys(props.toolList).map((index) => {
    let toolSerialClass = props.toolList[index];
    let toolSerial = toolSerialClass.tool_class;
    return (
      <Accordion.Item key={index} eventKey={index}>
        <Accordion.Header>{toolSerial}</Accordion.Header>
        <Accordion.Body>
        <Table striped="columns" size="sm" responsive hover>
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
          <tbody>{props.tables}</tbody> 
        </Table>
        <Button key={index} size="sm" style={{margin:"0 50%"}} onClick={() => props.newTool(toolSerial)}>Add</Button>
      </Accordion.Body>
      </Accordion.Item>
    );
  });
  return (
    <Accordion>
      {differentTool}
    </Accordion>
  );
}

export default ToolAccordion;
