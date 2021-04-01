import axios, { post } from 'axios';

import React, { useState, useEffect } from 'react';

function Home() {
    var [email, setEmail] = useState("");
    var [files, setFiles] = useState([]);
    const [fileList, setFileList] = useState([]);
    // let fileList = [];

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        for (var j = 0; j < files.length; j++) {
            formData.append("files", files[j]);
        }
        formData.append("email", email);
        var config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        }
        axios.post("https://localhost:44319/api/FileUpload/", formData, config)
            .then(success => {
                window.location.reload();
                console.log(success);
            })
            .catch(error => {
                console.log(error);
            })
    }
    const handleEmail = async (e) => {
        await setEmail(e.target.value);
        console.log(email);
    }
    const handleFiles = async (e) => {
        console.log(e.target.files);
        await setFiles(e.target.files);
        console.log("Files Start");
        console.log(files);
        console.log("Files End");
    }
    return (
        <div>
            File Upload
            <form onSubmit={handleSubmit}>
                <input type="file" name="files" onChange={handleFiles} multiple files={files} ></input><br></br>
                <input type="email" name="email" onChange={handleEmail} value={email} ></input><br></br>
                <button type="submit">Upload</button>
            </form>
        </div >
    )
}

export default Home;