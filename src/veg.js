import Modal from "./ui/modal.js";
import { useEffect, useState } from "react";
import "./items.css";
import Mod from "./mod";
import FileSaver from "file-saver";
import { utils, write } from "xlsx";

function Veg(props) {
  const d = new Date();
  const [x, setx] = useState([]);
  const [x0, setx0] = useState(0);
  const [x1, setx1] = useState(0);
  const [x2, setx2] = useState(0);
  const [x3, setx3] = useState(0);
  const [show, sets] = useState(false);

  const hsub = () => {
    document.getElementsByTagName("input")[0].checked = "true";
  };
  const bsub = () => {
    document.getElementsByTagName("input")[1].checked = "true";
  };
  const add = () => {
    sets(true);
  };
  const hide = () => {
    sets(false);
  };
  const lsub = () => {
    document.getElementsByTagName("input")[2].checked = "true";
  };

  const additem = () => {
    hide();
    let e = document.getElementsByClassName("addin")[0].value.trim();
    if (e == "") return;
    
    fetch("http://localhost:8000/12", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: e,
        avl_qt: 0,
        qty: 0,
        id: props.vegpost.length + 1,
      }),
    })
      .then((j) => {
        props.show();
        return j.json();
      })
      .then((j) => {
        j.sort((a, b) => a.id - b.id);
        props.setvp(j);
      });
  };

  const sub = () => {
    let y = document.getElementsByTagName("input");

    if (y[1].checked) submit(1);
    else if (y[2].checked) submit(2);
    else if (y[0].checked) submit(0);
  };

  const submit = (e) => {
    let a = [];
    let input = document.getElementsByTagName("input");
    if (e != 0)
      for (let i = 3; i < props.vegpost.length + 3; i++)
        if (props.vegpost[i - 3].avl_qt < Number(input[i].value)) {
          alert("Insufficient Resources!");
          return;
        }

    let propslice = [];

    for (let i = 3; i < props.vegpost.length + 3; i++) {
      let z = document.getElementsByTagName("input")[i].value.trim();
      if (z.trim() != "") {
        a.push([i - 3, Number(z)]);
        propslice.push([i - 2, props.vegpost[i - 3].avl_qt - Number(z)]);
        document.getElementsByTagName("input")[i].value = "";
      }
    }

    if (e != 0) {
      fetch("http://localhost:8000/13", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(propslice),
      })
        .then((j) => j.json())
        .then((j) => {
          j.sort((a, b) => a.id - b.id);
          props.setvp(j);
        });
    }

    if (a.length == 0) return;

    setx(a);
    if (e == 0) setx1(1 - x1);
    else if (e == 1) setx2(1 - x2);
    else if (e == 2) setx3(1 - x3);

    let a1 = a.slice();

    

    for (let i = 0; i < a.length; i++)
      a1[i] = { name: props.vegpost[a[i][0]].name, qty: a[i][1] };

    let ws = utils.json_to_sheet(a1),
      wb = {
        Sheets: { data: ws },
        SheetNames: ["data"],
      },
      buff = write(wb, { bookType: "xlsx", type: "array" }),
      val = new Blob([buff], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
      });

    FileSaver.saveAs(val, "bill" + d.getTime() + ".xlsx");

    props.show();
  };

  useEffect(() => {
    if (x0 == 1 && x != [])
      fetch("http://localhost:8000/2", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bill: x,
          id: 1,
          date:
            d.getFullYear() +
            "-" +
            (d.getMonth() < 9 ? "0" : "") +
            (d.getMonth() + 1) +
            "-" +
            (d.getDate() < 10 ? "0" : "") +
            d.getDate(),
        }),
      }).then((j) => props.show());
  }, [x1]);
  useEffect(() => {
    if (x0 == 1)
      fetch("http://localhost:8000/7", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bill: x,
          id: 1,
          date:
            d.getFullYear() +
            "-" +
            (d.getMonth() < 9 ? "0" : "") +
            (d.getMonth() + 1) +
            "-" +
            (d.getDate() < 10 ? "0" : "") +
            d.getDate(),
        }),
      }).then((j) => props.show());
  }, [x2]);
  useEffect(() => {
    if (x0 == 1)
      fetch("http://localhost:8000/8", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bill: x,
          id: 1,
          date:
            d.getFullYear() +
            "-" +
            (d.getMonth() < 9 ? "0" : "") +
            (d.getMonth() + 1) +
            "-" +
            (d.getDate() < 10 ? "0" : "") +
            d.getDate(),
        }),
      }).then((j) => props.show());
  }, [x3]);

  useEffect(() => {
    setx0(1);
    hsub();
  }, []);

  return (
    <div>
      {show && (
        <Modal onClose={hide}>
          <input className="addin" placeholder="item" />
          <button className="sub" onClick={additem}>
            add
          </button>
        </Modal>
      )}
      <br />
      <div className="succ">
        <input type="radio" name="src" className="radio" />
        <button className="btnh" onClick={hsub}>
          Hostel
        </button>
        <input name="src" className="radio" type="radio" />
        <button className="btnh" onClick={bsub}>
          BH
        </button>
        <input name="src" className="radio" type="radio" />
        <button className="btnh" onClick={lsub}>
          LH
        </button>
      </div>
      <br />
      <div className="conta">
        {props.vegpost.map((e) => (
          <div className="card">
            <p className="name">
              {e.id + ", "}
              {e.name}
            </p>
            {"கையிருப்பு = " + e.avl_qt}
            <input placeholder="qty.." />
          </div>
        ))}
      </div>
      <br />
      <button className="sub" onClick={add}>
        Add Item
      </button>
      <button className="sub" onClick={sub}>
        Place Order
      </button>
      <br />
    </div>
  );
}

export default Veg;
