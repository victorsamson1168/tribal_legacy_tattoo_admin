import { Button, message, Modal } from "antd";
import axios from "axios";
import React from "react";
import rowStyle from "../components/listRow.css";
import { useState } from "react";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";


function SingleRowCom(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loader, setLoader] = useState(false);

  const handleOk = () => {
    deletePost();
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const deletePost = () => {
      setLoader(true);
    console.log(props.id);
    axios
      .delete(`https://tribal-legacy-tattoo.herokuapp.com/posts/${props.id}`)
      .then((res) => {
        props.fetchData();
        message.success("Post Deleted");
        setLoader(false); 
         })
      .catch((err) => {
        console.log(err);
        message.error(err.message);
        setLoader(false);
      });
  };
  return (
    loader?<Loader
        type="Puff"
        color="#00BFFF"
        height={100}
        width={100}
        className="loader"
      />:
    <div className="row">
       
      <Modal
        title="delete Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>do you really want to delete ?</p>
      </Modal>
      <img src={props?.image} alt="tattoo" className="image" />
      <p>{props.key}</p>

      <p>width: {props?.width}</p>
      <p>height: {props?.height}</p>
      <Button
        type="danger"
        onClick={() => {
          setIsModalVisible(true);
        }}
      >
        {" "}
        delete
      </Button>
    </div>
  );
}

export default SingleRowCom;
