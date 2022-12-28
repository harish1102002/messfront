import { useEffect, useState } from "react";
import "./App.css";
import Items from "./items";
import Receive from "./received";
import Nav from "./nav";
import Placed from "./placed";
import Stud from "./stud";
import Mod from "./mod.js";
import Modal from "./ui/modal";
import Veg from "./veg";
import Load from "./load";

function App() {
  const [post, setp] = useState([]);
  const [vegpost, setvp] = useState([]);
  const [show, setsh] = useState(false);
  const [received, setr] = useState(false);
  const [placed, setl] = useState(false);
  const [required, sete] = useState(false);
  const [student, sets] = useState(false);
  const [veg, setv] = useState(true);
  const [load, setlo] = useState(true);

  const setshow = () => {
    setsh(true);
  };
  const hide = () => {
    setsh(false);
  };
  const setload = () => {
    setlo(true);
  };

  useEffect(() => {
    fetch("http://localhost:8000/")
      .then((j) => j.json())
      .then((j) => {
        j.sort((a, b) => a.id - b.id);
        setp(j);
      });
    fetch("http://localhost:8000/8")
      .then((j) => j.json())
      .then((j) => {
        j.sort((a, b) => a.id - b.id);
        setvp(j);
      });
  }, []);

  return (
    <div className="App">
      {show && <Mod hide={hide} />}
      <Nav f1={setr} f2={sete} f3={setl} f4={sets} f5={setv} />
      {received && (
        <Receive
          show={setshow}
          load={setload}
          vegpost={vegpost}
          setvp={setvp}
          post={post}
          setp={setp}
        />
      )}
      {required && <Items show={setshow} post={post} setp={setp} load={setload}/>}
      {veg && <Veg show={setshow} vegpost={vegpost} setvp={setvp} load={setload}/>}
      {placed && <Placed post={post} vegpost={vegpost} />}
      {student && (
        <Stud post={post} vegpost={vegpost} show={setshow} hide={hide} load={setload}/>
      )}
    </div>
  );
}

export default App;
