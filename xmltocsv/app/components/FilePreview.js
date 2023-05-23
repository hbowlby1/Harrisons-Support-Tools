import React from "react";
import styles from "../styles/FilePreview.module.css";
import {v4 as uuidv4} from 'uuid';

const FilePreview = ({fileData}) => {
    return (
        <div className={styles.fileList}>
            <div className={styles.fileContainer}>
                {/* loops through the fileData */}
                {fileData.fileList.map((f) => {
                    return (
                            <ol key={uuidv4()}>
                                <li key={f.lastModified} className={styles.fileList}>
                                    {/* displays the filename and type */}
                                    <div key={f.name} className={styles.fileName}>
                                        {f.name}
                                    </div>
                                </li>
                            </ol>
                    );
                })}
            </div>
        </div>
    );
};

export default FilePreview