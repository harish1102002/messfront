import Modal from "./ui/modal.js";
import "./mod.css";

function Load(props){

    return(
        <Modal onClose={props.hide} className="modal">
        <p className="suc">Loading...</p>
        </Modal>
    );
}

export default Load;