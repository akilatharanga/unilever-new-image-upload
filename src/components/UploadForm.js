import React, { useEffect, useState } from "react";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  listAll,
} from "firebase/storage";
import { Container, Row, Col } from "react-bootstrap";
import storage from "../firebaseConfig";

export default function UploadForm() {
  const [file, setFile] = useState([]);
  const [topic, setTopic] = useState("");
  const [percent, setPercent] = useState(0);
  const [imageUrls, setImageUrls] = useState([]);

  const imageListRef = ref(storage, `${topic}/`);

  useEffect(() => {
    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => [...prev, url]);
        });
      });
    });
  }, []);

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
            setImageUrls((prev) => [...prev, url]);
          });
        }
      );
    });
  };
  return (
    <div>
      <div className="title">
        <h1>Unilever Srilanka</h1>
        <h2>Shops Images Upload Forum</h2>
        <br />
      </div>

      <Container>
        <Row>
          <Col>
          
          <input
            type="text"
            onChange={handleTopic}
            placeholder="DATE/SR_ID/SHOP_NAME"
            style={{ width: "20%" }}
          />
          <br />
          <br />
                      
          <label>
            <input type="file" onChange={handleFile} accept="" multiple />
            <span>+</span>
          </label>
          <br />
          <br />
            <Row style={{    alignContent: 'center',
}}>
            <button
            onClick={handleUpload}
            className="button-1"
            style={{ width: "25%" }}
          >
            Upload
          </button>
          </Row>
                      <p>{percent} "% done"</p></Col>
        </Row>
                
      </Container>
      {/* {
              imageUrls.map((url) => {
                  return <img src={url}/>
              })
          } */}
    </div>
  );
}
