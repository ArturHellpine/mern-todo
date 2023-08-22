import React, { useContext } from "react";
import { Modal } from "antd";
import Delete from "../Delete";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

const ModalComponent = ({modal, setModal}) => {
    const { logout, userId } = useContext(AuthContext)

    const submitHandler = async (id) => {
        setModal(false)
        try {
            await axios.delete(`auth/delete/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                }
            })
                .then(logout)
        } catch (err) {
            console.log(err)
        }
    }

    const cancelHandler = () => {
        setModal(false)
    }

    return (
        <Modal
            okText='Видалити'
            cancelText='Скасувати'
            open={modal}
            onOk={() => submitHandler(userId)}
            onCancel={cancelHandler}
        >
            <Delete />
        </Modal>
    );
};

export default ModalComponent;