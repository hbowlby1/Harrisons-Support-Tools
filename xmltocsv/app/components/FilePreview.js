import React from "react";
import styles from "../styles/FilePreview.module.css";

const FilePreview = ({fileData}) => {
    return (
        <div className={styles.fileList}>
            <div className={styles.fileContainer}>
                {/* loops through the fileData */}
                {fileData.fileList.map((f) => {
                    return (
                        <>
                            <ol>
                                <li key={f.lastModified} className={styles.fileList}>
                                    {/* displays the filename and type */}
                                    <div key={f.name} className={styles.fileName}>
                                        {f.name}
                                    </div>
                                </li>
                            </ol>
                        </>
                    );
                })}
            </div>
        </div>
    );
};

export default FilePreview