import React from 'react'
import { useState } from 'react';
const TestComp = () => {
    const [file, setFile] = useState(null);
    const handleFile = (e) => {
        setFile(e.target.files[0]);
    }
    const handleUpload = () => {
        if (file != null) {

            const reader = new FileReader();

            reader.onloadend = () => {
                const base64String = reader.result.split(',')[1];
                const name = file.name;
                const type = file.type;
                console.log(">>>>>>>>>>>>>>>>" + type);
                axios.post("https://o92cl4kdw2.execute-api.ap-southeast-1.amazonaws.com/dev/api/test", { file: base64String, name: name, type: type })
                    .then((res) => {
                        console.log(res);
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
            reader.readAsDataURL(file);
        } else {
            alert("FILE CANNOT BE EMPTY")
        }
    }

    return (
        <div>
            <input type="file" onChange={handleFile} />
            <button onClick={handleUpload}>upload</button>
        </div>
    )
}

export default TestComp