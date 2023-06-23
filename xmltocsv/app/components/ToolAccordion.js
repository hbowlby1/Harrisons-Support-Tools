import Accordion from "react-bootstrap/Accordion";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

function ToolAccordion(props) {
  // Group tools by their serial class
  const toolsByClass = props.toolList.reduce((groups, tool) => {
    const toolClass = tool.tool_serial_class.tool_class;
    if (!groups[toolClass]) {
      groups[toolClass] = [];
    }
    groups[toolClass].push(tool);
    return groups;
  }, {});

  // console.log(props.toolList);
  // Create an Accordion.Item for each tool class
  const toolAccordions = Object.entries(toolsByClass).map(
    ([toolClass, tools], index) => {
      const tableBody = tools.map((tool) => {
        return (
          <tr key={tool.id}>
            <td>
              <input
                type="checkbox"
                defaultChecked={tool.tool_is_active}
                onChange={(e) => props.activeFilter(tool.id, e.target.checked)}
              />
            </td>
            <td>{tool.tool_name}</td>
            <td>{tool.tool_serial}</td>
            <td>{tool.tool_type_set[0].tool_type}</td>
            <td>{tool.part_number}</td>
            <td>{tool.quantity_requirements_set[0].quantity_requested}</td>
            <td>{tool.quantity_requirements_set[0].quantity_minimum}</td>
            <td>{tool.tool_quantity}</td>
            <td>{tool.tool_is_out_for_service ? "Yes" : "No"}</td>
            <td>{tool.machine_set[0].machine_name}</td>
            <td>{tool.manufacturer_set[0].manufacturer_vendor}</td>
            <td>
              <a href={tool.manufacturer_set[0].manufacturer_website}>
                {tool.manufacturer_set[0].name}
              </a>
            </td>
            <td>{tool.max_sharpen_set[0].times_sharpened}</td>
            <td>{tool.max_sharpen_set[0].max_sharpen_amount}</td>
            <td>{tool.tool_requires_match ? "Yes" : "No"}</td>
            <td>{tool.tool_has_half_life ? "Yes" : "No"}</td>
          </tr>
        );
      });
      return (
        <Accordion.Item key={index} eventKey={index}>
          <Accordion.Header>{toolClass}</Accordion.Header>
          <Accordion.Body>
            <Table striped="columns" size="sm" responsive hover>
              <thead>
                <tr>
                  <th>Active</th>
                  <th>Tool Name</th>
                  <th>Serial number</th>
                  <th>Tool Type</th>
                  <th>Part #</th>
                  <th>Required #</th>
                  <th>Minimum #</th>
                  <th>Current #</th>
                  <th>Out For Service</th>
                  <th>Vendor</th>
                  <th>Manufacturer</th>
                  <th>Machines</th>
                  <th>Times Sharpened</th>
                  <th>Maximum Sharpen</th>
                  <th>Has Matching Set</th>
                  <th>Half Life</th>
                </tr>
              </thead>
              <tbody>{tableBody}</tbody>
            </Table>
          </Accordion.Body>
        </Accordion.Item>
      );
    }
  );

  return <Accordion>{toolAccordions}</Accordion>;
}

export default ToolAccordion;
