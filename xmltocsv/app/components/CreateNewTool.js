//react imports
import { useState } from "react";

// axios imports
import axios from "axios";

//react bootstrap imports
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import FloatingLabel from "react-bootstrap/FloatingLabel";

//custom validations imports
import validationSchemas from "./validations/validators";

function CreateNewTool(props) {
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
  const [errors, setErrors] = useState({});
  const [toolLength, setToolLength] = useState("");
  const [displayError, setDsiplayError] = useState("");

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

  const handleInput = (e) => {
    const { name, value } = e.target;
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

    if (!inputs.tool.tool_name) {
      setDsiplayError("Nothing was input");
    } else if (inputs.tool.tool_name.length < 4) {
      console.log("Tool name is not 4 characters long or more.");
      setToolLength("Tool name should be at least 4 characters long!");
      return;
    } else {
      const newInputs = {
        ...inputs,
        tool: {
          ...inputs.tool,
          tool_serial:
            inputs.tool.tool_name.trim().substr(0, 4).toUpperCase() + "001",
          tool_has_half_life: isHalfLifeChecked,
          tool_requires_match: isRequiresMatchChecked,
        },
      };
      let createdToolId;

      //resets the validation errors
      setErrors({});

      //handle validation

      // Tool validation
      try {
        await validationSchemas.toolSchema.validateAsync(newInputs.tool);
      } catch (validationError) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          tool: validationError.message,
        }));
      }
      console.log(errors.tool);

      // Machine validation
      try {
        await validationSchemas.machineSchema.validateAsync(newInputs.machine);
      } catch (validationError) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          machine: validationError.message,
        }));
        console.log("Machine name is too short.");
      }

      // Manufacturer validation
      try {
        await validationSchemas.manufacturerSchema.validateAsync(
          newInputs.manufacturer
        );
      } catch (validationError) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          manufacturer: validationError.message,
        }));
      }

      // Quantity validation
      try {
        await validationSchemas.quantitySchema.validateAsync(
          newInputs.quantity
        );
      } catch (validationError) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          quantity: validationError.message,
        }));
      }

      // Tool type validation
      try {
        await validationSchemas.toolTypeSchema.validateAsync(
          newInputs.toolType
        );
      } catch (validationError) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          toolType: validationError.message,
        }));
      }
      // Sharpen validation
      try {
        await validationSchemas.maxSharpenSchema.validateAsync(
          newInputs.sharpen
        );
      } catch (validationError) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          sharpen: validationError.message,
        }));
        return; // Stop further execution if validation fails
      }

      //start of post codes

      try {
        const toolRes = await axios.post(BASE_URL + "tools/", newInputs.tool);
        createdToolId = toolRes.data.id;
        //setToolId(createdToolId);
        // assuming the server responds with the created tool object which has an id field

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
        props.toggler();
        props.getTools();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Container>
      <Form noValidate onSubmit={handleSubmit}>
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
                isInvalid={errors.tool}
              />
              {/* shows the validation error */}
              <Form.Control.Feedback type="invalid">
                {toolLength}
              </Form.Control.Feedback>
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
                isInvalid={errors.tool}
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
                isInvalid={errors.tool}
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
                min="0"
                type="number"
                placeholder="# of Tools"
                name="tool.tool_quantity"
                onChange={handleInput}
                isInvalid={errors.tool}
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
                min="0"
                type="number"
                placeholder="# of Tools Required"
                name="quantity.quantity_requested"
                onChange={handleInput}
                isInvalid={errors.quantity}
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
                min="0"
                type="number"
                placeholder="Minimum # of Tools Required"
                name="quantity.quantity_minimum"
                onChange={handleInput}
                isInvalid={errors.quantity}
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
                isInvalid={errors.machine}
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
                isInvalid={errors.manufacturer}
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
                type="url"
                placeholder="Enter Manufacturer Website"
                name="manufacturer.manufacturer_website"
                onChange={handleInput}
                isInvalid={errors.manufacturer}
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
                isInvalid={errors.manufacturer}
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
                min="0"
                type="number"
                placeholder="Max Sharpen"
                name="sharpen.max_sharpen_amount"
                onChange={handleInput}
                isInvalid={errors.sharpen}
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
                  min="0"
                  type="number"
                  placeholder="# of Half-Life"
                  name="tool.tool_half_life_quantity"
                  onChange={handleInput}
                  isInvalid={errors.tool}
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
            {/* need to add this to the database so we can match tools. */}
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
                  isInvalid={errors.tool}
                />
              </FloatingLabel>
            ) : (
              <></>
            )}
          </Form.Group>
        </fieldset>
        <Button type="submit">Add Tool</Button>
      </Form>
    </Container>
  );
}

export default CreateNewTool;
