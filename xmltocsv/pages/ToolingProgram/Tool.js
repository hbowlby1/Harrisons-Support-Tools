import React, { useState, useEffect } from "react";

import { useRouter } from "next/router";

import Link from "next/link";

import axios from "axios";

import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import FormCheck from "react-bootstrap/FormCheck";

import { useForm } from "react-hook-form";

import {
  homeButton,
  backArrow,
  center,
  customLabel,
  customInput,
  updateBtn,
  formBlk,
} from "./styles/tool.module.css";

function Tool() {
  const [tool, setTool] = useState({});
  // const [changes, setChanges] = useState({});
  const { register, handleSubmit } = useForm();
  //obtain the query parameter from the URL
  const router = useRouter();
  const { id } = router.query;

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  // const BASE_URL = "http://supporttools.local:8000/tool/";

  //grab the tool from the database and display the tool information matching the id
  const getTools = async (id) => {
    try {
      //checks if the ID exists first before grabbing tool
      if (id) {
        const response = await axios.get(
          `${BASE_URL}tools/${id}`
        );
        setTool(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (id) {
      getTools(id);
    }
  }, [id]);

  //check if item sets are null and if not, load them.
  //machine
  const RenderMachineSet = () => {
    if (tool?.machine_set?.length > 0) {
      return (
        <Form.Group className="mb-3" controlId="formMachineName">
          <Row xs="auto">
            <Col>
              <Form.Label className={customLabel}>Machine Name:</Form.Label>
            </Col>
            <Col>
              <Form.Control
                placeholder={tool.machine_set[0].machine_name}
                className={customInput}
                type="text"
                {...register("machineName")}
              />
            </Col>
          </Row>
        </Form.Group>
      );
    }
    return <p>Machine: N/A</p>;
  };

  //tool type
  const RenderToolTypeSet = () => {
    if (tool?.tool_type_set?.length > 0) {
      return (
        <Form.Group className="mb-3" controlId="formToolType">
          <Row xs="auto">
            <Col>
              <Form.Label className={customLabel}>Tool Type:</Form.Label>
            </Col>
            <Col>
              <Form.Control
                placeholder={tool.tool_type_set[0].tool_type}
                className={customInput}
                type="text"
                {...register("toolType")}
              />
            </Col>
          </Row>
        </Form.Group>
      );
    }
    return <p>Tool Type: N/A</p>;
  };

  //quantities
  const RenderQuantitySet = () => {
    if (tool?.quantity_requirements_set?.length > 0) {
      return (
        <>
          <Form.Group className="mb-3" controlId="formRequiredQuantity">
            <Row xs="auto">
              <Col>
                <Form.Label className={customLabel}>
                  Required Quantity:
                </Form.Label>
              </Col>
              <Col>
                <Form.Control
                  placeholder={
                    tool?.quantity_requirements_set[0].quantity_requested
                  }
                  className={customInput}
                  type="number"
                  {...register("requiredQuantity")}
                />
              </Col>
            </Row>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formMinimumQuantity">
            <Row xs="auto">
              <Col>
                <Form.Label className={customLabel}>
                  Minimum Qauntity:{" "}
                </Form.Label>
              </Col>
              <Col>
                <Form.Control
                  placeholder={
                    tool?.quantity_requirements_set[0].quantity_minimum
                  }
                  className={customInput}
                  type="number"
                  {...register("minQuantity")}
                />
              </Col>
            </Row>
          </Form.Group>
        </>
      );
    }
    return <p>No Quantity Data</p>;
  };

  //manufacturer_set
  const RenderManufacturerSet = () => {
    if (tool?.manufacturer_set?.length > 0) {
      return (
        <>
          <Form.Group className="mb-3" controlId="formManuName">
            <Row xs="auto">
              <Col>
                <Form.Label className={customLabel}>
                  Manufacturer Name:
                </Form.Label>
              </Col>
              <Col>
                <Form.Control
                  placeholder={tool?.manufacturer_set[0].manufacturer_name}
                  className={customInput}
                  type="text"
                  {...register("manuName")}
                />
              </Col>
            </Row>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formManuSite">
            <Row xs="auto">
              <Col>
                <Form.Label className={customLabel}>
                  Manufacturer Site:
                </Form.Label>
              </Col>
              <Col>
                <Form.Control
                  placeholder={tool.manufacturer_set[0].manufacturer_website}
                  className={customInput}
                  type="text"
                  {...register("manuWebsite")}
                />
              </Col>
            </Row>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formVendorName">
            <Row xs="auto">
              <Col>
                <Form.Label className={customLabel}>Vendor Name:</Form.Label>
              </Col>
              <Col>
                <Form.Control
                  placeholder={tool.manufacturer_set[0].manufacturer_vendor}
                  className={customInput}
                  type="text"
                  {...register("vendorName")}
                />
              </Col>
            </Row>
          </Form.Group>
        </>
      );
    }
    return <p>No Manufacturer Data</p>;
  };

  //sharpening
  const RenderSharpeningSet = () => {
    if (tool?.max_sharpen_set?.length > 0) {
      return (
        <>
          <Form.Group className="mb-3" controlId="formTimeSharpen">
            <Row xs="auto">
              <Col>
                <Form.Label className={customLabel}>
                  Times Sharpened:
                </Form.Label>
              </Col>
              <Col>
                <Form.Control
                  placeholder={tool.max_sharpen_set[0].times_sharpened}
                  className={customInput}
                  type="number"
                  {...register("timesSharpened")}
                />
              </Col>
            </Row>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formMaxSharpen">
            <Row xs="auto">
              <Col>
                <Form.Label className={customLabel}>Max Sharpen:</Form.Label>
              </Col>
              <Col>
                <Form.Control
                  placeholder={tool.max_sharpen_set[0].max_sharpen_amount}
                  className={customInput}
                  type="number"
                  {...register("maxSharpen")}
                />
              </Col>
            </Row>
          </Form.Group>
        </>
      );
    }
  };
  const RenderServiceSet = () => {
    //convert the service date if it exists
    let formattedDate = null;
    if (tool.tool_is_out_for_service && tool.tool_is_out_for_service != null) {
      let date = new Date(tool.tool_is_out_for_service_date);
      formattedDate = date.toLocaleDateString("en-US");
    }
    return (
      <>
        <Form.Group className="mb-3" controlId="formOutForService">
          <Row xs="auto">
            <Col>
              <Form.Label className={customLabel}>
                Is Tool Out For Service?
              </Form.Label>
            </Col>
            <Col>
              <FormCheck
                type="switch"
                defaultChecked={tool.tool_is_out_for_service}
                onChange={(e) => handleSliders(e)}
              />
            </Col>
            <Col>
              {tool.tool_is_out_for_service ? (
                <span>on {formattedDate}</span>
              ) : (
                ""
              )}
            </Col>
          </Row>
        </Form.Group>
      </>
    );
  };

  //handle updating the tool active status, half life, out for service and matching tool
  const handleSliders = async (e) => {
    console.log("hit")
    switch (e.target.id) {
      case "formActiveSlider":
        //update the tool active status
        await axios.patch(`${BASE_URL}/tools/${id}`, {
          tool_is_active: e.target.checked,
        });
        break;
      case "formHalfLife":
        await axios.patch(`${BASE_URL}tools/${id}`, {
          tool_has_half_life: e.target.checked,
        });
        break;
      case "formHasToolMatch":
        await axios.patch(`${BASE_URL}tools/${id}`, {
          tool_requires_match: e.target.checked,
        });

        break;
      case "formOutForService":
        await axios.patch(`${BASE_URL}tools/${id}`, {
          tool_is_out_for_service: e.target.checked,
        });
        break;
      default:
        break;
    }
    getTools(id);
  };

  //handle updating tool information
  const onSubmit = (data) => {
    //sets the ID's for the other sets
    const quantityRequirementsSetId = tool.quantity_requirements_set[0].id;
    const manufacturerSetId = tool.manufacturer_set[0].id;
    const toolTypeSetId = tool.tool_type_set[0].id;
    const machineSetId = tool.machine_set[0].id;
    const maxSharpenSetId = tool.max_sharpen_set[0].id;
    //sets up a list of items being updated
    let itemsToUpdate = [];
    Object.keys(data).forEach((key) => {
      if (data[key] != "") {
        itemsToUpdate.push(key);
      }
    });
    //update the tool information
    itemsToUpdate.forEach(async (item) => {
      switch (item) {
        case "toolName":
          try {
            await axios.patch(`${BASE_URL}tools/${id}`, {
              tool_name: data.toolName,
            });
          } catch (err) {
            console.log(err);
          }
          break;

        case "partNumber":
          try {
            await axios.patch(`${BASE_URL}tools/${id}`, {
              part_number: data.partNumber,
            });
          } catch (err) {
            console.log(err);
          }
          break;

        case "toolQuantity":
          try {
            await axios.patch(`${BASE_URL}tools/${id}`, {
              tool_quantity: parseInt(data.toolQuantity),
            });
          } catch (err) {
            console.log(err);
          }
          break;

        case "requiredQuantity":
          //get the quantity requirements set id
          try {
            await axios.patch(
              `${BASE_URL}quantity_requirements/${quantityRequirementsSetId}`,
              {
                quantity_requested: parseInt(data.requiredQuantity),
              }
            );
          } catch (err) {
            console.log(err);
          }
          break;

        case "minQuantity":
          //get the quantity requirements set id
          try {
            await axios.patch(
              `${BASE_URL}quantity_requirements/${quantityRequirementsSetId}`,
              {
                quantity_minimum: parseInt(data.minQuantity),
              }
            );
          } catch (err) {
            console.log(err);
          }
          break;

        case "manuName":
          try {
            await axios.patch(
              `${BASE_URL}manufacturers/${manufacturerSetId}`,
              {
                manufacturer_name: data.manuName,
              }
            );
            break;
          } catch (err) {
            console.log(err);
          }

        case "manuWebsite":
          try {
            await axios.patch(
              `${BASE_URL}manufacturers/${manufacturerSetId}`,
              {
                manufacturer_website: data.manuWebsite,
              }
            );
            break;
          } catch (err) {
            console.log(err);
          }

        case "vendorName":
          try {
            await axios.patch(
              `${BASE_URL}manufacturers/${manufacturerSetId}`,
              {
                manufacturer_vendor: data.vendorName,
              }
            );
            break;
          } catch (err) {
            console.log(err);
          }

        case "machineName":
          try {
            await axios.patch(
              `${BASE_URL}machines/${machineSetId}`,
              {
                machine_name: data.machineName,
              }
            );
            break;
          } catch (err) {
            console.log(err);
          }

        case "toolType":
          try {
            await axios.patch(
              `${BASE_URL}tool_types/${toolTypeSetId}`,
              {
                tool_type: data.toolType,
              }
            );
          } catch (err) {
            console.log(err);
          }
          break;

        case "timesSharpened":
          try {
            await axios.patch(
              `${BASE_URL}max_sharpens/${maxSharpenSetId}`,
              {
                times_sharpened: parseInt(data.timesSharpened),
              }
            );
            break;
          } catch (err) {
            console.log(err);
          }

        case "maxSharpen":
          try {
            await axios.patch(
              `${BASE_URL}max_sharpens/${maxSharpenSetId}`,
              {
                max_sharpen_amount: parseInt(data.maxSharpen),
              }
            );
            break;
          } catch (err) {
            console.log(err);
          }

        case "halfLifeNum":
          try {
            await axios.patch(`${BASE_URL}tools/${id}`, {
              tool_half_life_quantity: parseInt(data.halfLifeNum),
            });
            break;
          } catch (err) {
            console.log(err);
          }

        case "matchingToolName":
          try {
            await axios.patch(`${BASE_URL}tools/${id}`, {
              tool_match: data.matchingToolName,
            });
            break;
          } catch (err) {
            console.log(err);
          }
        default:
          break;
      }
      getTools(id);
    });
  };

  return (
    <>
      <Link href="/ToolingProgram" className={homeButton}>
        <span className={backArrow}>&#x2190;</span>
      </Link>
      <Container>
        <div className={center}>
          <h1>{tool?.tool_name}</h1>
          <h4>{tool?.tool_serial}</h4>
        </div>
        <Form onSubmit={handleSubmit(onSubmit)} className={formBlk}>
          <Row xs="auto">
            <Col>
              <span className={customLabel}>Is Tool Active?</span>
            </Col>
            <Col>
              <FormCheck
                type="switch"
                defaultChecked={tool.tool_is_active}
                onChange={(e) => handleSliders(e)}
                id="formActiveSlider"
                className="mb-3 mx-auto my-auto"
              />
            </Col>
            <Col>
              <span>{tool.tool_is_active ? "Yes" : "No"}</span>
            </Col>
          </Row>
          <Form.Group className="mb-3" controlId="formToolName">
            <Row xs="auto">
              <Col>
                <Form.Label className={customLabel}>Tool Name:</Form.Label>
              </Col>
              <Col>
                <Form.Control
                  placeholder={tool?.tool_name}
                  className={customInput}
                  type="text"
                  {...register("toolName")}
                />
              </Col>
            </Row>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPartNumber">
            <Row xs="auto">
              <Col>
                <Form.Label className={customLabel}>Part Number:</Form.Label>
              </Col>
              <Col>
                <Form.Control
                  placeholder={tool?.part_number}
                  className={customInput}
                  type="text"
                  {...register("partNumber")}
                />
              </Col>
            </Row>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formToolQuantity">
            <Row xs="auto">
              <Col>
                <Form.Label className={customLabel}>Tool Quantity:</Form.Label>
              </Col>
              <Col>
                <Form.Control
                  placeholder={tool?.tool_quantity}
                  className={customInput}
                  type="number"
                  {...register("toolQuantity")}
                />
              </Col>
            </Row>
          </Form.Group>
          <RenderQuantitySet />
          <RenderManufacturerSet />
          <RenderMachineSet />
          <RenderToolTypeSet />
          <RenderSharpeningSet />
          <RenderServiceSet />
          <Form.Group className="mb-3" controlId="formHalfLife">
            <Row xs="auto">
              <Col>
                <Form.Label className={customLabel}>
                  Tool Has Half Life?
                </Form.Label>
              </Col>
              <Col>
                <FormCheck
                  type="switch"
                  defaultChecked={tool.tool_has_half_life}
                  label={tool.tool_has_half_life ? "Yes" : "No"}
                  onChange={(e) => handleSliders(e)}
                />
              </Col>
            </Row>
          </Form.Group>
          {tool.tool_has_half_life ? (
            <Form.Group className="mb-3" controlId="formHalfLifeQuantity">
              <Row xs="auto">
                <Col>
                  <Form.Label className={customLabel}>
                    Half Life Quantity:
                  </Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    placeholder={tool.tool_half_life_quantity}
                    className={customInput}
                    type="number"
                    {...register("halfLifeNum")}
                  />
                </Col>
              </Row>
            </Form.Group>
          ) : (
            ""
          )}

          <Form.Group className="mb-3" controlId="formHasToolMatch">
            <Row xs="auto">
              <Col>
                <Form.Label className={customLabel}>
                  Tool Has Matching Tool?
                </Form.Label>
              </Col>
              <Col>
                <FormCheck
                  type="switch"
                  defaultChecked={tool.tool_requires_match}
                  label={tool.tool_requires_match ? "Yes" : "No"}
                  onChange={(e) => handleSliders(e)}
                />
              </Col>
            </Row>
          </Form.Group>
          {tool.tool_requires_match ? (
            <Form.Group className="mb-3" controlId="formMatchingTool">
              <Row xs="auto">
                <Col>
                  <Form.Label className={customLabel}>
                    Matching Tool Name:
                  </Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    placeholder={tool.tool_match}
                    className={customInput}
                    type="text"
                    {...register("matchingToolName")}
                  />
                </Col>
              </Row>
            </Form.Group>
          ) : (
            ""
          )}
          <Button type="submit" className={updateBtn}>
            Update
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default Tool;
