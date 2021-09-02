// import logo from './logo.svg';
import "./App.css";
import { Button, Input, message, Modal } from "antd";
import "antd/dist/antd.css";
import { useState, useEffect } from "react";
import axios from "axios";
import ListRow from "./components/ListRow.js";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { storage } from "./firebase";

function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedFile, setSelectedFile] = useState("");
  const [height, setHeight] = useState("");
  const [width, setWidth] = useState("");

  const onFileChange = (e) => {
    // console.log(e.target.files[0]);
    setSelectedFile(e.target.files[0]);
    var reader = new FileReader();
    reader.onload = function (e) {
      var img = new Image();
      img.onload = function () {
        console.log(
          "The width of the image is " +
            img.width +
            " width px. and" +
            img.height +
            " height px."
        );
        setHeight(img.height);
        setWidth(img.width);
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    console.log(selectedFile);
  }, [selectedFile]);

  // const addImage = () => {
  //   setIsModalVisible(true);
  // };

  const handleOk = () => {
    console.log(selectedFile);
    setLoader(true);
    const uploadTask = storage
      .ref(`images/${selectedFile.name+"_"+selectedFile.lastModified}`)
      .put(selectedFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        // error function ...
        setLoader(false);
        console.log(error);
      },
      () => {
        // complete function ...
        storage
          .ref("images")
          .child(selectedFile.name)
          .getDownloadURL()
          .then((url) => {
            console.log(url);
            axios
              .post("https://tribal-legacy-tattoo.herokuapp.com/posts", {
                url: url,
                height: height,
                width: width,
              })
              .then((res) => {
                console.log(res);
                fetchData();
                message.success("successfully added");
                setLoader(false);
              })
              .catch((err) => {
                console.log(err);
                fetchData();
                message.error("something went wrong");
                setLoader(false);
              });
          });
      }
    );

    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setWidth("");
    setHeight("");
    setSelectedFile("");
    setIsModalVisible(false);
  };

  const fetchData = async () => {
    setLoader(true);
    axios
      .get("https://tribal-legacy-tattoo.herokuapp.com/posts")
      .then((res) => {
        setData(res.data.Data);
        setTotaldocuments(res.data.total_documents);
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [data, setData] = useState([]);
  const [totaldocuments, setTotaldocuments] = useState([]);
  const [loader, setLoader] = useState(false);

  return loader ? (
    <Loader
      type="Puff"
      color="#00BFFF"
      height={100}
      width={100}
      className="loader"
    />
  ) : (
    <div className="App">
      <Modal
        title="add image Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <input type="file" onChange={onFileChange} accept="image/*" />
        <img
          src={selectedFile ? URL.createObjectURL(selectedFile) : ""}
          style={{ maxWidth: "100%" }}
        ></img>
      </Modal>

      <header className="header">
        <h1>Admin Panel</h1>
        <Button type="primary" onClick={() => setIsModalVisible(true)}>
          add image
        </Button>
      </header>

      <h4>
        total no. of item <strong>{totaldocuments}</strong>{" "}
      </h4>
      {data.map((item, ind) => {
        // console.log(ind);
        return (
          <ListRow
            key={item.id}
            height={item?.height}
            width={item?.width}
            id={item._id}
            image={item.url}
            fetchData={fetchData}
          />
        );
      })}
    </div>
  );
}

export default App;
