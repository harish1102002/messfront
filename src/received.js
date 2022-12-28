import { useEffect, useState } from "react";
import "./items.css";

function Receive(props) {
  let a = [];
  const [tempbill, seti] = useState([]);
  const [id,setid] = useState(0);
  const [bills, setbill] = useState(0);
  const [val, setv] = useState(new Array(props.vegpost.length).fill(0));
  const [valid,setvali]=useState(0);
  const [post, setp] = useState([]);

  const d = new Date();

  const validate = () => {
    setid(0);
    let x = document.getElementsByClassName("order")[0].value.trim(),
      a = [],
      temp = [];

    if (x == "") {
      alert("Enter OrderId");
      return;
    }

    bills.forEach((e) => {
      if (e._id == x.trim()) {
        let y,y1;
        setid(e.id);
        if(e.id==1)
        y=props.vegpost.slice();
        else
        y=props.post.slice();

        y1=new Array(y.length).fill(0);

        e.bill.forEach((b) => {
          a.push(y[b[0]]);
          temp.push([b[0],b[1]]);
          y1[b[0]] = b[1];
        });

      setv(y1);
      }
    });
    seti(temp)

    if (a.length == 0) {
      alert("Invalid Id");
      return;
    }
    setvali(1);
    setp(a);
  };

  useEffect(() => {
    fetch("http://localhost:8000/2")
      .then((j) => j.json())
      .then((j) => setbill(j));
      },[]);

  useEffect(() => {
    setp(props.vegpost);
      },[props]);

  const sub = () => {

    if (valid==0) {
      alert("Please Validate Your Order");
      return;
    }


    let q = document.getElementsByClassName("qty"),
      b = [],
      p = document.getElementsByClassName("pric");

    for (let i = 0; i < post.length; i++) {

      if (p[i].value.trim() == "") {
        alert("Incomplete Input");
        return;
      }

      setvali(0);
      
    if (tempbill[i][1] != Number(q[i].value))
        b.push([tempbill[i][0], tempbill[i][1] - Number(q[i].value)]);
    }
    fetch("http://localhost:8000/11", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: document.getElementsByClassName("order")[0].value.trim(),
        bill: b,
      }),
    })
      .then((j) => j.json())
      .then((j) => setbill(j));

    let ps=[]

    for (let i = 0; i < post.length; i++) {
      let x = Number(document.getElementsByClassName("qty")[i].value.trim());
      if (x != "") {
        a.push([tempbill[i][0], x, Number(document.getElementsByClassName("pric")[i].value.trim())]);
        if(id==2)
        ps.push([tempbill[i][0]+1, x + props.post[tempbill[i][0]].avl_qt]);
        else
        ps.push([tempbill[i][0]+1, x + props.vegpost[tempbill[i][0]].avl_qt]);
      }
      document.getElementsByClassName("pric")[i].value="";
     }
     
    fetch("http://localhost:8000/"+((id==1)?"13":"5"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ps),
    }).then((j)=>j.json()).then((j)=>{j.sort((a,b)=>a.id-b.id);(id==1)?props.setvp(j):props.setp(j)});

    if (a.length == 0) return;
    props.show();
    fetch("http://localhost:8000/3", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        bill: a,
        id:id,
        date:
          d.getFullYear() +
          "-" +
          (d.getMonth() < 9 ? "0" : "") +
          (d.getMonth() + 1) +
          "-" +
          (d.getDate() < 10 ? "0" : "") +
          d.getDate(),
      }),
    }).then((j) => {
    setv(new Array(props.vegpost.length).fill(0));
    setp(props.vegpost);
    document.getElementsByClassName("order")[0].value = "";});
  };

  return (
    <div>
      <input className="order" placeholder="Order Id.." />
      <button className="val" onClick={validate}>
        Validate
      </button>
      <div className="conta2">
        {post.map((e) => (
          <div className="card">
            <p className="name">{e.name}</p>
            {"கையிருப்பு = " + e.avl_qt}
            <input
              className="qty"
              placeholder="qty.."
              value={val[e.id - 1]}
              onChange={(b) => {
                let t = val.slice();
                t[e.id - 1] = b.target.value;
                setv(t);
              }}
            />
            <input className="pric" placeholder="price.." />
          </div>
        ))}
      </div>
      <br />
      <button className="sub" onClick={sub}>
        Confirm
      </button>
      <br />
    </div>
  );
}
export default Receive;
