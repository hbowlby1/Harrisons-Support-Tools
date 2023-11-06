import React, {use, useEffect} from "react";
import axios from "axios";

function MatchingTool({ tool }) {
    //only grabs the tool names from the database
    const toolNames = tool.map((tool) => (
        <option key={tool.id} value={tool?.toolName}/>
    ));
  return (
    <>
      <input
        className="form-control"
        list="matchingTool"
        id="randomID"
        placeholder="Match Tool"
      />
      <datalist id="datalistOptions">
        {toolNames}
      </datalist>
    </>
  );
}

export default MatchingTool;
