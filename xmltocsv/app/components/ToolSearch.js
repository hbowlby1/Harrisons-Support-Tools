import React from "react";
import { Container, Form } from "react-bootstrap";
import Image from "react-bootstrap/Image";

import {searchBar, img} from "../styles/ToolSearch.module.css";

function ToolSearch({ searchValue }) {
  return (
    <Container fluid className="d-flex flex-row-reverse mt-2">
      <Form.Control
        type="text"
        id="searchBar"
        placeholder="Search By Tool Name"
        htmlSize={10}
        onChange={searchValue}
        className={searchBar}
      ></Form.Control>
      <Image src="/search.svg" id="searchIcon" alt="search icon" className={img}/>
    </Container>
  );
}

export default ToolSearch;
