// implement this when we go to refactor the tooling program page

import Accordion from "react-bootstrap/Accordion";

function ToolAccordion(props) {
    const differentTool = Object.keys(props.toolList).map((index) => {
        let tool = props.toolList[index];
        let toolSerial = tool.tool_serial;

        //remove duplicate headers based on tool serial number
        return(
            <Accordion.Item key={index} eventKey={index}>
                <Accordion.Header>{toolSerial.slice(0,-1)}X</Accordion.Header>
            </Accordion.Item>
        )
    })
  return(
  <Accordion>
    {differentTool}
  </Accordion>
  )
}

export default ToolAccordion;
