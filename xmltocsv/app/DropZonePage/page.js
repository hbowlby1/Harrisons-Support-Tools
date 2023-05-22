"use client"

import React from "react";
import { useReducer } from "react";

//component imports
import DropZone from "../components/DropZone";
import TheNav from "@/app/UI/theNav";

function DropZonePage() {
  //reducer function for state changes
  const reducer = (state, action) => {
    switch (action.type) {
      case "SET_IN_DROP_ZONE":
        return { ...state, inDropZone: action.inDropZone };
      case "ADD_FILE_TO_LIST":
        return { ...state, fileList: state.fileList.concat(action.files) };
      default:
        return state;
    }
  };

  //destructures state and dispatch, sets fileList to empty array
  const [data, dispatch] = useReducer(reducer, {
    inDropZone: false,
    fileList: [],
  });
  return (
    <>
      <TheNav />
      <main>
        <DropZone data={data} dispatch={dispatch} />
      </main>
    </>
  );
}

export default DropZonePage;
