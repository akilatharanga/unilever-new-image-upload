import React, { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from "../firebaseConfig";

export default function UploadForm() {
  const [file, setFile] = useState([]);
  const [topic, setTopic] = useState("");
  const [percent, setPercent] = useState(0);

  const handleFile = (event) => {
    for (let i = 0; i < event.target.files.length; i++) {
      // setFile(event.target.files[i]);
      const newFile = event.target.files[i];
      setFile((prevState) => [...prevState, newFile]);
    }
  };

  const handleTopic = (event) => {
    setTopic(event.target.value);
  };

  const handleUpload = () => {
    if (!file) {
      alert("Please choose files first");
    }
    
    file.forEach((element) => {
      const storageRef = ref(storage, `${topic}/${element.name}`);
      const uploadTask = uploadBytesResumable(storageRef, element);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          ); // update progress
          setPercent(percent);
        },
        (err) => console.log(err),
        () => {
          // download url
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            console.log(url);
          });
        }
      );
    });
  };
  return (
    <div>
      <div>
        <input type="text" onChange={handleTopic} />
                    
        <input type="file" onChange={handleFile} accept="" multiple />
                    <button onClick={handleUpload}>Upload to Firebase</button>
                    <p>{percent} "% done"</p>
                
      </div>
    </div>
  );
}
