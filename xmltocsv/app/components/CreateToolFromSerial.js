//react imports
import { useState } from "react";

//axios imports
import axios from "axios";

//react bootstrap imports
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";

//validation imports
import validationSchemas from "./validations/validators";

function CreateToolFromSerial(props) {
  const BASE_URL = "http://localhost:8000/tool/";

  const [inputs, setInputs] = useState({
    tool: {},
    machine: {},
    manufacturer: {},
    quantity: {},
    toolType: {},
    sharpen: {},
    service: {},
  });

  const [isHalfLifeChecked, setIsHalfLifeChecked] = useState(false);
  const [isRequiresMatchChecked, setIsRequiresMatchChecked] = useState(false);

  const handleHalfLife = (e) => {
    if (e.target.checked) {
      setIsHalfLifeChecked(true);
    } else {
      setIsHalfLifeChecked(false);
    }
  };
  const handleRequireMatch = (e) => {
    if (e.target.checked) {
      setIsRequiresMatchChecked(true);
    } else {
      setIsRequiresMatchChecked(false);
    }
  };

  //checks if the url input already has the https:// or http:// if not, add it
  const addHttpsProtocol = (url) => {
    if (!/^https?:\/\//i.test(url)) {
      url = "https://" + url;
    }
    return url;
  };

  const handleInput = (e) => {
    const { name, value } = e.target;

    //adds https:// to the manufacturer website if it's present
    if (name === "manufacturer.manufacturer_website") {
      console.log(value);
      value = addHttpsProtocol(value);
    }
    const nameParts = name.split("."); // we're assuming names will be like 'tool.tool_name', 'machine.machine_name', etc.
    const mainKey = nameParts[0]; // e.g. 'tool', 'machine', etc.
    const subKey = nameParts[1]; // e.g. 'tool_name', 'machine_name', etc.

    setInputs((prevInputs) => ({
      ...prevInputs,
      [mainKey]: { ...prevInputs[mainKey], [subKey]: value },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (inputs.tool.tool_name.length < 4) {
      console.log("Tool name should be at least 4 characters long!");
      return setValidated(false);
    }

    const newInputs = {
      ...inputs,
      tool: {
        ...inputs.tool,
        tool_serial: props.newSerial,
        tool_has_half_life: isHalfLifeChecked,
        tool_requires_match: isRequiresMatchChecked,
      },
    };
    let createdToolId;

    //sets current value for validation instead of waiting for rendering
    let isValid = false;

    //handle validation
    try {
      // Tool validation
      await validationSchemas.toolSchema.validateAsync(newInputs.tool);
      // Machine validation
      await validationSchemas.machineSchema.validateAsync(newInputs.machine);
      // Manufacturer validation
      await validationSchemas.manufacturerSchema.validateAsync(
        newInputs.manufacturer
      );
      // Quantity validation
      await validationSchemas.quantitySchema.validateAsync(newInputs.quantity);
      // Tool type validation
      await validationSchemas.toolTypeSchema.validateAsync(newInputs.toolType);
      // Sharpen validation
      await validationSchemas.maxSharpenSchema.validateAsync(newInputs.sharpen);
      isValid = true;
    } catch (validationError) {
      console.error("Validation Error: ", validationError);
      isValid = false;
    }
    if (isValid) {
      try {
        const toolRes = await axios.post(BASE_URL + "tools/", newInputs.tool);
        createdToolId = toolRes.data.id;

        const machineWithTool = { ...newInputs.machine, tool: createdToolId }; // add the tool id to the machine object
        const machineRes = await axios.post(
          BASE_URL + "machines/",
          machineWithTool
        );
        const manufacturerWithTool = {
          ...newInputs.manufacturer,
          tool: createdToolId,
        };
        const manufacturerRes = await axios.post(
          BASE_URL + "manufacturers/",
          manufacturerWithTool
        );
        const quantityWithTool = { ...newInputs.quantity, tool: createdToolId };
        const quantityRes = await axios.post(
          BASE_URL + "quantity_requirements/",
          quantityWithTool
        );
        const toolTypeWithTool = { ...newInputs.toolType, tool: createdToolId };
        const toolTypeRes = await axios.post(
          BASE_URL + "tool_types/",
          toolTypeWithTool
        );
        const sharpenWithTool = { ...newInputs.sharpen, tool: createdToolId };
        const sharpenRes = await axios.post(
          BASE_URL + "max_sharpens/",
          sharpenWithTool
        );
        const serviceWithTool = { ...newInputs.service, tool: createdToolId };
        const serviceRes = await axios.post(
          BASE_URL + "services/",
          serviceWithTool
        );
      } catch (error) {
        console.error(error);
      }
      props.toggler();
      props.getTools();
    } else {
      return;
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <fieldset className="mt-3">
        <legend>Tool Info</legend>
        {/* tool name */}
        <Form.Group className="mb-3" controlId="formTool">
          <FloatingLabel
            controlId="floatingInputToolName"
            label="Tool Name"
            className="mb-3"
          >
            <Form.Control
              type="input"
              placeholder="Enter Tool Name"
              name="tool.tool_name"
              onChange={handleInput}
            />
          </FloatingLabel>
          {/* end of tool name */}

          {/* parts number */}
          <FloatingLabel
            controlId="floatingInputPartsNumber"
            label="Parts Number"
            className="mb-3"
          >
            <Form.Control
              type="input"
              placeholder="Enter Part Number"
              name="tool.part_number"
              onChange={handleInput}
            />
          </FloatingLabel>
          {/* end of parts number */}

          {/* Tool Type */}
          <FloatingLabel
            controlId="floatingInputToolType"
            label="Tool Type"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="Tool Type"
              name="toolType.tool_type"
              onChange={handleInput}
            />
          </FloatingLabel>
          {/* end of Tool Type */}

          {/* quantity */}
          <FloatingLabel
            controlId="floatingInputQuantity"
            label="Current On Hand Quantity"
            className="mb-3"
          >
            <Form.Control
              type="number"
              placeholder="# of Tools"
              name="tool.tool_quantity"
              onChange={handleInput}
            />
          </FloatingLabel>
          {/* end of quantity */}

          {/* quantity Requested*/}
          <FloatingLabel
            controlId="floatingInputRequestedQuantity"
            label="Requested On Hand Quantity"
            className="mb-3"
          >
            <Form.Control
              type="number"
              placeholder="# of Tools Required"
              name="quantity.quantity_requested"
              onChange={handleInput}
            />
            <Form.Text>Number of tools you want at all times.</Form.Text>
          </FloatingLabel>
          {/* end of quantity Requested */}

          {/* minimum quantity Requested*/}
          <FloatingLabel
            controlId="floatingInputMinQuantity"
            label="Minimum Requested On Hand Quantity"
            className="mb-3"
          >
            <Form.Control
              type="number"
              placeholder="Minimum # of Tools Required"
              name="quantity.quantity_minimum"
              onChange={handleInput}
            />
            <Form.Text>
              Minimum Number of tools you want at all times.
            </Form.Text>
          </FloatingLabel>
          {/* end of quantity Requested */}

          {/* machine name */}
          <FloatingLabel
            controlId="floatingInputMachineName"
            label="Machine(s) Name"
            className="mb-3"
          >
            <Form.Control
              type="input"
              placeholder="Enter Machine Name"
              name="machine.machine_name"
              onChange={handleInput}
            />
          </FloatingLabel>
          {/* end of machine name */}

          {/* manufacturer name */}
          <FloatingLabel
            controlId="floatingInputManufacturerName"
            label="Manufacturer Name"
            className="mb-3"
          >
            <Form.Control
              type="input"
              placeholder="Enter Manufacturer Name"
              name="manufacturer.manufacturer_name"
              onChange={handleInput}
            />
          </FloatingLabel>
          {/* end of manufacturer name */}

          {/* manufacturer website */}
          <FloatingLabel
            controlId="floatingInputManufacturerWebsite"
            label="Manufacturer Website (if applicable)"
            className="mb-3"
          >
            <Form.Control
              type="input"
              placeholder="Enter Manufacturer Website"
              name="manufacturer.manufacturer_website"
              onChange={handleInput}
            />
          </FloatingLabel>
          {/* end of manufacturer website */}

          {/* vendor name */}
          <FloatingLabel
            controlId="floatingInputVendorName"
            label="Vendor Name"
            className="mb-3"
          >
            <Form.Control
              type="input"
              placeholder="Enter Vendor Name"
              name="manufacturer.manufacturer_vendor"
              onChange={handleInput}
            />
          </FloatingLabel>
          {/* end of vendor name */}

          {/* quantity Requested*/}
          <FloatingLabel
            controlId="floatingInputMaxSharpen"
            label="Max Times to Sharpen"
            className="mb-3"
          >
            <Form.Control
              type="number"
              placeholder="Max Sharpen"
              name="sharpen.max_sharpen_amount"
              onChange={handleInput}
            />
            <Form.Text>
              Max amount of times you sharpen the tool before throwing it away
            </Form.Text>
          </FloatingLabel>
          {/* end of quantity Requested */}

          {/* half life check box */}
          <Form.Check
            type="checkbox"
            label="half life?"
            onChange={handleHalfLife}
            name="tool.tool_has_half_life"
            id="halfLife"
          />
          {/* end of half life check box */}

          {/* if half life is checked show half life quantity */}
          {isHalfLifeChecked ? (
            <FloatingLabel
              controlId="floatingInputHalfLife"
              label="Half-Lifes?"
              className="mb-3"
            >
              <Form.Control
                type="number"
                placeholder="# of Half-Life"
                name="tool.tool_half_life_quantity"
                onChange={handleInput}
              />
              <Form.Text>
                Amount of half lifes the blade is expected to have.
              </Form.Text>
            </FloatingLabel>
          ) : (
            //   end of half life quanity
            <></>
          )}
          {/* matching tool check box */}
          <Form.Check
            type="checkbox"
            label="Has Matching Tool"
            onChange={handleRequireMatch}
            name="tool.tool_requires_match"
            id="matchingTool"
          />
          {/* end matching tool check box */}

          {isRequiresMatchChecked ? (
            <FloatingLabel
              controlId="floatingInputMatching"
              label="Matching Tool"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Matching Tool"
                name="tool.tool_match"
                onChange={handleInput}
              />
            </FloatingLabel>
          ) : (
            <></>
          )}
        </Form.Group>
      </fieldset>
      <Button type="submit">Add Tool</Button>
    </Form>
  );
}

export default CreateToolFromSerial;
