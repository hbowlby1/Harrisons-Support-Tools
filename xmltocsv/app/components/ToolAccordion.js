//bootstrap imports
import Accordion from "react-bootstrap/Accordion";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Container from "react-bootstrap/Container";

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
                name="isActive"
                onChange={(e) =>
                  props.activeFilter(e, tool.id, e.target.checked)
                }
              />
            </td>
            <td>
              {props.isEditing ? (
                <input
                  name="tool_name"
                  placeholder={tool.tool_name}
                  type="text"
                  onChange={(e) => props.changeData(e, tool.id)}
                  readOnly={props.readOnly}
                />
              ) : (
                tool.tool_name
              )}
            </td>
            <td>{tool.tool_serial}</td>
            <td>
              {props.isEditing ? (
                <input
                  name="tool_type"
                  type="text"
                  onChange={(e) =>
                    props.changeData(e, tool.id, {
                      type: "toolTypeId",
                      id: tool.tool_type_set[0].id,
                    })
                  }
                  placeholder={tool.tool_type_set[0].tool_type}
                  readOnly={props.readOnly}
                />
              ) : (
                tool.tool_type_set[0].tool_type
              )}
            </td>
            <td>
              {props.isEditing ? (
                <input
                  name="part_number"
                  type="text"
                  onChange={(e) => props.changeData(e, tool.id)}
                  placeholder={tool.part_number}
                  readOnly={props.readOnly}
                />
              ) : (
                tool.part_number
              )}
            </td>
            <td>
              {props.isEditing ? (
                <input
                  name="quantity_required"
                  type="number"
                  onChange={(e) =>
                    props.changeData(e, tool.id, {
                      type: "quantityReqId",
                      id: tool.quantity_requirements_set[0].id,
                    })
                  }
                  placeholder={
                    tool.quantity_requirements_set[0].quantity_requested
                  }
                  readOnly={props.readOnly}
                />
              ) : (
                tool.quantity_requirements_set[0].quantity_requested
              )}
            </td>
            <td>
              {props.isEditing ? (
                <input
                  name="quantity_min"
                  type="number"
                  onChange={(e) =>
                    props.changeData(e, tool.id, {
                      type: "quantityMinId",
                      id: tool.quantity_requirements_set[0].id,
                    })
                  }
                  placeholder={
                    tool.quantity_requirements_set[0].quantity_minimum
                  }
                />
              ) : (
                tool.quantity_requirements_set[0].quantity_minimum
              )}
            </td>
            <td>
              {props.isEditing ? (
                <input
                  name="tool_quantity"
                  type="number"
                  onChange={(e) =>
                    props.changeData(e, tool.id, {
                      type: "currentQuanId",
                      id: tool.tool_quantity,
                    })
                  }
                  placeholder={tool.tool_quantity}
                />
              ) : (
                tool.tool_quantity
              )}
            </td>
            <td>
              <input
                type="checkbox"
                defaultChecked={tool.tool_is_out_for_service}
                name="outForService"
                onChange={(e) =>
                  props.activeFilter(e, tool.id, e.target.checked)
                }
              />
            </td>
            <td>
              {props.isEditing ? (
                <input
                  name="machine_name"
                  type="text"
                  onChange={(e) =>
                    props.changeData(e, tool.id, {
                      type: "machineName",
                      id: tool.machine_set[0].id,
                    })
                  }
                  placeholder={tool.machine_set[0].machine_name}
                />
              ) : (
                tool.machine_set[0].machine_name
              )}
            </td>
            <td>
              {props.isEditing ? (
                <input
                name="manufacturer_vendor"
                type="text"
                onChange={(e) =>
                  props.changeData(e, tool.id, {
                    type: "manuVendor",
                    id: tool.manufacturer_set[0].id,
                  })
                }
                placeholder={tool.manufacturer_set[0].manufacturer_vendor}
              />
              ): tool.manufacturer_set[0].manufacturer_vendor}
              </td>
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
        <Accordion.Item key={index} eventKey="0">
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
                  <th>Machines</th>
                  <th>Vendor</th>
                  <th>Manufacturer</th>
                  <th>Times Sharpened</th>
                  <th>Maximum Sharpen</th>
                  <th>Has Matching Set</th>
                  <th>Half Life</th>
                </tr>
              </thead>
              <tbody>{tableBody}</tbody>
            </Table>
            {!props.isEditing ? (
              <ButtonGroup
                key={index}
                aria-label="function buttons"
                style={{ margin: "0 50%" }}
              >
                <Button size="sm" onClick={() => props.newTool(toolClass)}>
                  Add
                </Button>
                <Button size="sm" variant="warning" onClick={props.editing}>
                  Edit
                </Button>
                <Button size="sm" variant="danger">
                  Delete
                </Button>
              </ButtonGroup>
            ) : (
              <ButtonGroup style={{ margin: "0 50%" }}>
                <Button variant="success" size="md" onClick={props.updateTools}>
                  Update
                </Button>
                <Button onClick={props.editing} variant="danger" size="md">
                  Cancel
                </Button>
              </ButtonGroup>
            )}
          </Accordion.Body>
        </Accordion.Item>
      );
    }
  );

  return (
    <Container>
      <Accordion defaultActiveKey="0">{toolAccordions}</Accordion>;
    </Container>
  );
}

export default ToolAccordion;
