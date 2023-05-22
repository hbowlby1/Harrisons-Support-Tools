"use client"

import { useReducer } from 'react';
import styles from './page.module.css'
// import fs from "fs";
// import { parseString } from 'xml2js';
//component imports
import DropZone from './components/DropZone';

export default function Home() {

  //reducer function for state changes
  const reducer = (state, action) => {
    switch (action.type){
      case "SET_IN_DROP_ZONE":
        return {...state, inDropZone: action.inDropZone}
      case "ADD_FILE_TO_LIST":
        return {...state, fileList: state.fileList.concat(action.files)};
      default:
        return state
    }
  }

  //destructures state and dispatch, sets fileList to empty array
  const [data, dispatch] = useReducer(reducer, {
    inDropZone: false,
    fileList: [],
  });

  return (
    <main className={styles.main}>
      <h1>Upload your XML file(s) here.</h1>
      <DropZone data={data} dispatch={dispatch}/>
    </main>
  )
}
