import Modal from "./ui/modal.js";
import "./mod.css";

function Mod(props){

    return(
        <Modal onClose={props.hide} className="modal">
        <p className="suc">Success!</p>
        </Modal>
    );
}

export default Mod;