import React, { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
} from "react-router-dom";
import axios from 'axios';

function FileList() {
    let { id } = useParams();
    const [files, setFiles] = useState([]);
    useEffect(async () => {
        await axios.get("https://localhost:44319/api/FileUpload/?key=" + id)
            .then(success => {
                setFiles(success.data);
                console.log(JSON.stringify(success));
            })
            .catch(error => {
                console.log(JSON.stringify(error));
            })
    }, [setFiles]);

    const handleDonwload = async (key) => {
        console.log(key);
        await axios.get("https://localhost:44319/api/FileUpload/?fileKey=" + key)
            .then(success => {
                console.log(success);
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div>
            <h1>File List : {id}</h1>
            <table>
                <tr>
                    <th>File Name</th>
                    <th>File Size</th>
                    <th>File Link</th>
                </tr>
                {files.map((file, key) =>
                (<>
                    <tr>
                        <td>{file.FileName}</td>
                        <td>{file.Length}</td>
                        {/* <button onClick={() => handleDonwload(file.Path)}>Hello</button> */}
                        <td><a href={"https://localhost:44319/api/FileUpload/?fileKey=" + file.Path}>Download</a></td>
                    </tr>
                </>)
                )
                }
            </table>
        </div >
    )
}

export default FileList
