//react imports
import { useState } from "react";

// axios imports
import axios from "axios";

//react bootstrap imports
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Alert from "react-bootstrap/Alert";

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
  const [displayError, setDisplayError] = useState("");
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);

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
    let { name, value } = e.target;
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

    if (!inputs.tool.tool_name) {
      setDisplayError("Nothing was input");
      setShow(true);
      setErrors((prevErrors) => ({
        ...prevErrors,
        toolName:
          "Tool name is required and needs to be at least 4 characters long.",
        partsNumber:
          "parts number is required and needs to be at least 3 characters long.",
        toolQuantity: "Must be 0 or greater.",
        toolMatch: "Must be at least 3 characters or more.",
        machine: "Must be at least 4 characters or more.",
        manufacturer:
          "manufacturer is required and name must be at least 4 characters long.",
        website: "must contain https://www (this will be fixed soon)",
        vendor: "must be at least 4 characters long.",
        quantity: "Must be 0 or higher.",
        toolType: "must be 4 characters or more.",
        sharpen: "Must be 0 or higher.",
      }));
      scrollToTop();
    } else if (inputs.tool.tool_name.length < 4) {
      setDisplayError("Tool name should be at least 4 characters long!");
      setShow(true);
      setErrors((prevErrors) => ({
        ...prevErrors,
        toolName:
          "Tool name is required and needs to be at least 4 characters long.",
        partsNumber:
          "parts number is required and needs to be at least 3 characters long.",
        toolQuantity: "Must be 0 or greater.",
        toolMatch: "Must be at least 3 characters or more.",
        machine: "Must be at least 4 characters or more.",
        manufacturer:
          "manufacturer is required and name must be at least 4 characters long.",
        website: "must contain https://www (this will be fixed soon)",
        vendor: "must be at least 4 characters long.",
        quantity: "Must be 0 or higher.",
        toolType: "must be 4 characters or more.",
        sharpen: "Must be 0 or higher.",
      }));
      scrollToTop();
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

      //sets current value for validation instead of waiting for rendering
      let isValid = true;

      //handle validation
      // Tool validation
      try {
        await validationSchemas.toolSchema.validateAsync(newInputs.tool);
      } catch (validationError) {
        isValid = false;
        scrollToTop();
        setErrors((prevErrors) => ({
          ...prevErrors,
          toolName:
            "Tool name is required and needs to be at least 4 characters long.",
          partsNumber:
            "parts number is required and needs to be at least 3 characters long.",
          toolQuantity: "Must be 0 or greater.",
          toolMatch: "Must be at least 3 characters or more.",
        }));
      }

      // Machine validation
      try {
        await validationSchemas.machineSchema.validateAsync(newInputs.machine);
      } catch (validationError) {
        isValid = false;
        scrollToTop();
        setErrors((prevErrors) => ({
          ...prevErrors,
          machine: "Must be at least 4 characters or more.",
        }));
      }

      // Manufacturer validation
      try {
        await validationSchemas.manufacturerSchema.validateAsync(
          newInputs.manufacturer
        );
      } catch (validationError) {
        isValid = false;
        scrollToTop();
        setErrors((prevErrors) => ({
          ...prevErrors,
          manufacturer:
            "manufacturer is required and name must be at least 4 characters long.",
          website: "must contain https://www (this will be fixed soon)",
          vendor: "must be at least 4 characters long.",
        }));
      }

      // Quantity validation
      try {
        await validationSchemas.quantitySchema.validateAsync(
          newInputs.quantity
        );
      } catch (validationError) {
        isValid = false;
        scrollToTop();
        setErrors((prevErrors) => ({
          ...prevErrors,
          quantity: "Must be 0 or higher.",
        }));
      }

      // Tool type validation
      try {
        await validationSchemas.toolTypeSchema.validateAsync(
          newInputs.toolType
        );
      } catch (validationError) {
        isValid = false;
        scrollToTop();
        setErrors((prevErrors) => ({
          ...prevErrors,
          toolType: "must be 4 characters or more.",
        }));
      }
      // Sharpen validation
      try {
        await validationSchemas.maxSharpenSchema.validateAsync(
          newInputs.sharpen
        );
      } catch (validationError) {
        isValid = false;
        scrollToTop();
        setErrors((prevErrors) => ({
          ...prevErrors,
          sharpen: "Must be 0 or higher.",
        }));
      }

      //start of post codes
      if (isValid) {
        console.log(newInputs)
        try {
          if (newInputs.tool) {
            const toolRes = await axios.post(
              BASE_URL + "tools/",
              newInputs.tool
            );
            createdToolId = toolRes.data.id;
          }

          if (JSON.stringify(newInputs.sharpen) === "{}" || Object.keys(newInputs.sharpen).length >= 1) {
            console.log('sharpen');
            await axios.post(BASE_URL + "max_sharpens/", {
              times_sharpened: 0,
              max_sharpen_amount: 1,
              tool: createdToolId,
              ...newInputs.sharpen
            });
          }

          if (JSON.stringify(newInputs.toolType) === "{}" || Object.keys(newInputs.toolType).length >= 1) {
            console.log('toolType')
            await axios.post(BASE_URL + "tool_types/", {
              tool_type: "None",
              tool: createdToolId,
              ...newInputs.toolType
            });
          }

          if (JSON.stringify(newInputs.machine) === "{}" || Object.keys(newInputs.machine).length >= 1) {
            console.log("machine")
            await axios.post(BASE_URL + "machines/", {
              machine_name: "Default",
              tool: createdToolId,
              ...newInputs.machine
            });
          }

          if (JSON.stringify(newInputs.manufacturer) === "{}" || Object.keys(newInputs.manufacturer).length >= 1) {
            console.log("manufacture")
            await axios.post(BASE_URL + "manufacturers/", {
              manufacturer_name: "None",
              manufacturer_website: "https://www.test.com",
              manufacturer_vendor: "None",
              tool: createdToolId,
              ...newInputs.manufacturer
            });
          }

          if (JSON.stringify(newInputs.quantity) === "{}" || Object.keys(newInputs.quantity).length >= 1) {
            console.log('quantity');
            await axios.post(BASE_URL + "quantity_requirements/", {
              quantity_requested: 1,
              quantity_minimum: 0,
              tool: createdToolId,
              ...newInputs.quantity
            });
          }

          if (JSON.stringify(newInputs.service) === "{}" || Object.keys(newInputs.service).length >= 1) {
            console.log('service');
            await axios.post(BASE_URL + "services/", {
              time_to_change: false,
              tool_on_order: false,
              tool: createdToolId,
              ...newInputs.service
            });
          }
          props.toggler();
          props.getTools();
        } catch (error) {
          setShow(true);
          setDisplayError(
            "Failed to create tool. Check if tool name already exists or input errors."
          );
          scrollToTop();
        }
      }
    }
  };

  //scrolls back to the top to see the error
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Container>
      <Alert
        variant="danger"
        show={show}
        onClose={() => setShow(false)}
        dismissible
      >
        {displayError}
      </Alert>
      <Form noValidate onSubmit={handleSubmit} validated={validated}>
        <fieldset className="mt-3">
          <legend>Tool Info</legend>
          {/* tool name */}
          <Form.Group className="mb-3" controlId="formTool">
            <FloatingLabel
              controlId="floatingInputToolName"
              label="Tool Name*"
              className="mb-3"
            >
              <Form.Control
                type="input"
                placeholder="Enter Tool Name"
                name="tool.tool_name"
                onChange={handleInput}
                isInvalid={errors.toolName}
              />
              {/* shows the validation error */}
              <Form.Control.Feedback type="invalid">
                {errors.toolName}
              </Form.Control.Feedback>
            </FloatingLabel>
            {/* end of tool name */}

            {/* parts number */}
            <FloatingLabel
              controlId="floatingInputPartsNumber"
              label="Parts Number*"
              className="mb-3"
            >
              <Form.Control
                type="input"
                placeholder="Enter Part Number"
                name="tool.part_number"
                onChange={handleInput}
                isInvalid={errors.partsNumber}
              />
              <Form.Control.Feedback type="invalid">
                {errors.partsNumber}
              </Form.Control.Feedback>
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
                isInvalid={errors.toolType}
              />
              <Form.Control.Feedback type="invalid">
                {errors.toolType}
              </Form.Control.Feedback>
            </FloatingLabel>
            {/* end of Tool Type */}

            {/* quantity */}
            <FloatingLabel
              controlId="floatingInputQuantity"
              label="Current On Hand Quantity*"
              className="mb-3"
            >
              <Form.Control
                min="0"
                type="number"
                placeholder="# of Tools"
                name="tool.tool_quantity"
                onChange={handleInput}
                isInvalid={errors.toolQuantity}
              />
              <Form.Control.Feedback type="invalid">
                {errors.toolQuantity}
              </Form.Control.Feedback>
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
              <Form.Control.Feedback type="invalid">
                {errors.quantity}
              </Form.Control.Feedback>
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
              <Form.Control.Feedback type="invalid">
                {errors.quantity}
              </Form.Control.Feedback>
            </FloatingLabel>
            {/* end of quantity Requested */}

            {/* machine name */}
            <FloatingLabel
              controlId="floatingInputMachineName"
              label="Machine(s) Name*"
              className="mb-3"
            >
              <Form.Control
                type="input"
                placeholder="Enter Machine Name"
                name="machine.machine_name"
                onChange={handleInput}
                isInvalid={errors.machine}
              />
              <Form.Control.Feedback type="invalid">
                {errors.machine}
              </Form.Control.Feedback>
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
              <Form.Control.Feedback type="invalid">
                {errors.manufacturer}
              </Form.Control.Feedback>
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
              <Form.Control.Feedback type="invalid">
                {errors.website}
              </Form.Control.Feedback>
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
              <Form.Control.Feedback type="invalid">
                {errors.vendor}
              </Form.Control.Feedback>
            </FloatingLabel>
            {/* end of vendor name */}

            {/* max sharpen*/}
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
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.sharpen}
              </Form.Control.Feedback>
              <Form.Text>
                Max amount of times you sharpen the tool before throwing it away
              </Form.Text>
            </FloatingLabel>
            {/* end max sharpen */}

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
                <Form.Control.Feedback type="invalid">
                  {errors.toolQuantity}
                </Form.Control.Feedback>
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
                <Form.Control.Feedback type="invalid">
                  {errors.toolMatch}
                </Form.Control.Feedback>
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
