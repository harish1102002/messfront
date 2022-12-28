import { useEffect, useState } from "react";
import "./stud.css";
import Modal from "./ui/modal";
import FileSaver from "file-saver";
import { utils, write, read } from "xlsx";

const Leave = (props) => {
  return (
    <div className="container2">
      <input className="rollno" placeholder="rollno.." />
      <input className="days" placeholder="no.of days.." />
      <button className="next" onClick={props.next}>
        next
      </button>
      <button className="calcu" onClick={props.fn}>
        Calculate Bill
      </button>
    </div>
  );
};

function Stud(props) {
  const d = new Date();
  const [post, setp] = useState([]);
  const [avg1, seta1] = useState([]);
  const [avg2, seta2] = useState([]);
  const [fine, setf] = useState([]);
  const [show, sets] = useState(false);
  const [bh, setb] = useState([]);
  const [lh, setl] = useState([]);
  const [att, set] = useState([]);
  const [addi, setad] = useState([]);
  const [leave, setleave] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/7")
      .then((j) => j.json())
      .then((j) => setl(j));
    fetch("http://localhost:8000/6")
      .then((j) => j.json())
      .then((j) => setb(j));
    fetch("http://localhost:8000/0")
      .then((j) => j.json())
      .then((j) => seta1(j));
    fetch("http://localhost:8000/01")
      .then((j) => j.json())
      .then((j) => seta2(j));
    fetch("http://localhost:8000/5")
      .then((j) => j.json())
      .then((j) => setf(j));
    fetch("http://localhost:8000/3")
      .then((j) => j.json())
      .then((j) => setp(j));
    fetch("http://localhost:8000/4")
      .then((j) => j.json())
      .then((j) => set(j));
    fetch("http://localhost:8000/9")
      .then((j) => j.json())
      .then((j) => setad(j));
  }, []);

  const hide = () => {
    sets(false);
  };

  const finsub = () => {
    let fin = document.getElementsByClassName("inpf")[0].value.trim(),
      e = 0;
    for (let i = 0; i < att.length; i++) {
      if (fin == att[i].rollno) {
        e = 1;
        fetch("http://localhost:8000/6", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: att[i].name,
            fine: Number(document.getElementsByClassName("inpf")[1].value),
            rollno: fin,
          }),
        })
          .then((j) => j.json())
          .then((j) => {
            props.show();
            document.getElementsByClassName("inpf")[0].value = "";
            document.getElementsByClassName("inpf")[1].value = "";
            setf(j);
          });
        break;
      }
    }

    if (e == 0) alert("Invalid Rollno..");
  };

  const removestud = () => {
    let y = document.getElementsByClassName("inpr");

    if (y[1].value != "") {
      const f = new FileReader();
      f.readAsBinaryString(y[1].files[0]);

      f.onload = () => {
        let s = f.result;
        let ws = read(s, { type: "binary" }),
          arr = [];
        ws.SheetNames.forEach(
          (e) => (arr = utils.sheet_to_row_object_array(ws.Sheets[e]))
        );

        for (let i = 0; i < arr.length; i++)
          fetch("http://localhost:8000/9", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ rollno: arr[i].rollno + "" }),
          })
            .then((j) => j.json())
            .then((j) => {
              if (i == arr.length - 1) {
                set(j);
                props.show();
              }
            });
      };
    }
    y[1].value = "";

    if (y[0].value.trim() == "") return;

    fetch("http://localhost:8000/9", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rollno: y[0].value.trim() }),
    })
      .then((j) => j.json())
      .then((j) => {
        if (att.length != j.length) props.show();
        set(j);
      });

    y[0].value = "";
  };

  const addstud = () => {
    let y = document.getElementsByClassName("inpa");

    if (y[4].value != "") {
      const f = new FileReader();
      f.readAsBinaryString(y[4].files[0]);

      f.onload = () => {
        let s = f.result;
        let ws = read(s, { type: "binary" }),
          arr = [];
        ws.SheetNames.forEach(
          (e) => (arr = utils.sheet_to_row_object_array(ws.Sheets[e]))
        );

        const a = [];
        arr.forEach((e) =>
          a.push({
            name: e.name,
            rollno: (e.rollno + "").trim(),
            gender: e.gender,
            yr: 0,
            dept: e.dept,
          })
        );

        fetch("http://localhost:8000/4", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(a),
        })
          .then((j) => j.json())
          .then((j) => {
            set(j);
            props.show();
          });
        y[4].value = "";
      };
    }

    if (
      y[0].value.trim() == "" ||
      y[1].value.trim() == "" ||
      y[2].value.trim() == "" ||
      y[3].value.trim() == ""
    )
      return;

    fetch("http://localhost:8000/4", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify([
        {
          name: y[1].value,
          rollno: y[0].value.trim(),
          gender: y[2].value.trim(),
          yr: 0,
          dept: y[3].value.trim(),
        },
      ]),
    })
      .then((j) => j.json())
      .then((j) => {
        set(j);
        props.show();
      });

    y[0].value = "";
    y[1].value = "";
    y[2].value = "";
    y[3].value = "";
  };

  const removef = () => {
    let y = document.getElementsByClassName("inprf");

    if (y[1].value != "") {
      const f = new FileReader();
      f.readAsBinaryString(y[1].files[0]);

      f.onload = () => {
        let s = f.result;
        let ws = read(s, { type: "binary" }),
          arr = [];
        ws.SheetNames.forEach(
          (e) => (arr = utils.sheet_to_row_object_array(ws.Sheets[e]))
        );

        for (let i = 0; i < arr.length; i++)
          fetch("http://localhost:8000/10", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              rollno: arr[i].rollno + "",
              ph: (arr[i].phone + "").trim(),
            }),
          })
            .then((j) => j.json())
            .then((j) => {
              if (i == arr.length - 1) {
                set(j);
                props.show();
              }
            });
      };
    }
    y[1].value = "";

    if (y[0].value.trim() == "") return;

    fetch("http://localhost:8000/9", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rollno: y[0].value.trim() }),
    })
      .then((j) => j.json())
      .then((j) => {
        set(j);
        if (att.length != j.length) props.show();
      });

    y[0].value = "";
  };

  const addf = () => {
    let y = document.getElementsByClassName("inpaf");

    if (y[4].value != "") {
      const f = new FileReader();
      f.readAsBinaryString(y[4].files[0]);

      f.onload = () => {
        let s = f.result;
        let ws = read(s, { type: "binary" }),
          arr = [];
        ws.SheetNames.forEach(
          (e) => (arr = utils.sheet_to_row_object_array(ws.Sheets[e]))
        );

        const a = [];
        arr.forEach((e) =>
          a.push({
            name: e.name,
            rollno: (e.phone + "").trim(),
            gender: e.gender,
            dept: e.dept,
            yr: 1,
          })
        );

        fetch("http://localhost:8000/4", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(a),
        })
          .then((j) => j.json())
          .then((j) => {
            set(j);
            props.show();
          });
        y[4].value = "";
      };
    }

    if (
      y[0].value.trim() == "" ||
      y[1].value.trim() == "" ||
      y[2].value.trim() == "" ||
      y[3].value.trim() == ""
    )
      return;

    fetch("http://localhost:8000/4", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify([
        {
          name: y[1].value,
          rollno: y[0].value.trim(),
          gender: y[2].value.trim(),
          dept: y[3].value.trim(),
          yr: 1,
        },
      ]),
    })
      .then((j) => j.json())
      .then((j) => {
        set(j);
        props.show();
      });

    y[0].value = "";
    y[1].value = "";
    y[2].value = "";
    y[3].value = "";
  };
  const addsub = () => {
    let y = document.getElementsByClassName("inpaa"),post9=[0,0];
    if (y[0].value.trim() == "" && y[1].value.trim() == "") return;
    if (y[0].value.trim() != "")
      post9[0]=addi[0]+Number(y[0].value.trim());
    if (y[1].value.trim() != "")
      post9[1]=addi[1]+Number(y[1].value.trim());
    
    fetch("http://localhost:8000/14", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post9),
      })
        .then((j) => j.json())
        .then((j) => props.show());
    setad(post9);

    y[0].value = "";
    y[1].value = "";
  };
  const redsub = () => {
    let y = document.getElementsByClassName("inpar"),post9=[0,0];
    if (y[0].value.trim() == "" && y[1].value.trim() == "") return;

    if (y[0].value.trim() != "")
      post9[0]=addi[0]-Number(y[0].value.trim());
    if (y[1].value.trim() != "")
      post9[1]=addi[1]-Number(y[1].value.trim());
    
    fetch("http://localhost:8000/14", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post9),
      })
        .then((j) => j.json())
        .then((j) => props.show());
    setad(post9);

    y[0].value = "";
    y[1].value = "";
  };

  const bill = () => {
    let y = document.getElementsByClassName("inpb");
    if (
      y[0].value.trim() == "" ||
      y[1].value.trim() == "" ||
      y[2].value.trim() == "" ||
      y[0].value > y[1].value
    ) {
      alert("Invalid Input");
      return;
    }
    sets(true);
  };

  const billsub = () => {
    let y0 = document.getElementsByClassName("rollno")[0],
      y1 = document.getElementsByClassName("days")[0],
      leavear = leave.slice();
    if (y0.value != "" && y1.value != "") {
      leavear.push([y0.value, y1.value]);
      y0.value = "";
      y1.value = "";
    }

    let x = 0,
      y = document.getElementsByClassName("inpb"),
      ar1 = [],
      ar2 = [],
      boys = new Map(),
      girls = new Map(),
      boyssum = 0,
      girlssum = 0;
    for (let i = 0; i < props.vegpost.length; i++) ar1.push([0, 0]);
    for (let i = 0; i < props.post.length; i++) ar2.push([0, 0]);
    sets(false);
    if (y[1].value < y[0].value || y[2].value < 1) {
      alert("Invalid Date");
      return;
    }

    post
      .filter((e) => e.date <= y[1].value && e.date >= y[0].value)
      .forEach((e) => {
        if (e.id == 1)
          e.bill.forEach((b) => {
            ar1[b[0]][0] += Number(b[1]);
            ar1[b[0]][1] += Number(b[2]);
          });
        else
          e.bill.forEach((b) => {
            ar2[b[0]][0] += Number(b[1]);
            ar2[b[0]][1] += Number(b[2]);
          });
      });

    for (let i = 0; i < props.vegpost.length; i++) {
      if (ar1[i][0] > 0) {
        ar1[i] = ar1[i][1] / ar1[i][0];
        fetch("http://localhost:8000/0", {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: i, price: ar1[i] }),
        })
          .then((j) => j.json())
          .then((j) => seta1(j));
      } else ar1[i] = 0;
    }

    for (let i = 0; i < props.post.length; i++) {
      if (ar2[i][0] > 0) {
        ar2[i] = ar2[i][1] / ar2[i][0];
        fetch("http://localhost:8000/01", {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: i, price: ar2[i] }),
        })
          .then((j) => j.json())
          .then((j) => seta2(j));
      } else ar2[i] = 0;
    }

    bh.filter((e) => e.date <= y[1].value && e.date >= y[0].value).forEach(
      (b) => {
        if (b.id == 1)
          b.bill.forEach((e) => {
            x += Number(e[1]) * ar1[e[0]];
            if (ar1[e[0]] == 0) x += Number(e[1]) * avg1[e[0]];
          });
        else
          b.bill.forEach((e) => {
            x += Number(e[1]) * ar2[e[0]];
            if (ar2[e[0]] == 0) x += Number(e[1]) * avg2[e[0]];
          });
      }
    );

    att
      .filter(
        (e) => e.gender == "male" || e.gender == "Male" || e.gender == "MALE"
      )
      .forEach((e) => {
        boys.set(e.rollno, Number(y[2].value));
        boyssum += Number(y[2].value);
      });

    leavear.forEach((e) => {
      if (boys.has(e[0])) {
        boys.set(e[0], Number(y[2].value) - Number(e[1]));
        boyssum -= Number(e[1]);
      }
    });

    x += addi[0];

    console.log(x);
    att
      .filter(
        (e) => e.gender == "male" || e.gender == "Male" || e.gender == "MALE"
      )
      .forEach((e) =>
        boys.set(e.rollno, [boys.get(e.rollno) * (x / boyssum), e.dept])
      );

    x = 0;

    lh.filter((e) => e.date <= y[1].value && e.date >= y[0].value).forEach(
      (b) => {
        if (b.id == 1) b.bill.forEach((e) => (x += Number(e[1]) * ar1[e[0]]));
        else b.bill.forEach((e) => (x += Number(e[1]) * ar2[e[0]]));
      }
    );

    att
      .filter(
        (e) =>
          e.gender == "female" || e.gender == "Female" || e.gender == "FEMALE"
      )
      .forEach((e) => {
        girls.set(e.rollno, Number(y[2].value));
        girlssum += Number(y[2].value);
      });

    leavear.forEach((e) => {
      if (girls.has(e[0])) {
        girls.set(e[0], Number(y[2].value) - Number(e[1]));
        girlssum -= Number(e[1]);
      }
    });

    x += addi[1];

    console.log(x);

    att
      .filter(
        (e) =>
          e.gender == "female" || e.gender == "Female" || e.gender == "FEMALE"
      )
      .forEach((e) =>
        girls.set(e.rollno, [girls.get(e.rollno) * (x / girlssum), e.dept])
      );

    fine.forEach((e) => {
      if (girls.has(e.rollno))
        girls.set(e.rollno, [
          girls.get(e.rollno)[0] + Number(e.fine),
          girls.get(e.rollno)[1],
        ]);
      else if (boys.has(e.rollno))
        boys.set(e.rollno, [
          boys.get(e.rollno)[0] + Number(e.fine),
          boys.get(e.rollno)[1],
        ]);
    });

    let boysbill = [];
    boys.forEach((e, v) =>
      boysbill.push({ rollno: v, bill: e[0], dept: e[1] })
    );
    boysbill.sort((a, b) => {
      if (a.dept > b.dept) return 1;
      else if(a.id < b.id) return 1;
      return -1;
    });

    let girlsbill = [];
    girls.forEach((e, v) =>
      girlsbill.push({ rollno: v, bill: e[0], dept: e[1] })
    );
    girlsbill.sort((a, b) => {
      if (a.dept > b.dept) return 1;
      else if(a.id < b.id) return 1;
      return -1;
    });

    console.log(boys, girls);

    fetch("http://localhost:8000/14", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify([0,0]),
    }).then((j) => setad([0, 0]));
    setad([0, 0]);
    
    let ws = utils.json_to_sheet(boysbill),
      ws1 = utils.json_to_sheet(girlsbill),
      wb = {
        Sheets: { boys: ws, girls: ws1 },
        SheetNames: ["boys", "girls"],
      },
      buff = write(wb, { bookType: "xlsx", type: "array" }),
      val = new Blob([buff], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
      });

    FileSaver.saveAs(
      val,
      "bill" +
        d.getDate() +
        "/" +
        (d.getMonth() + 1) +
        "/" +
        d.getFullYear() +
        ".xlsx"
    );

    fetch("http://localhost:8000/1", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    }).then((j) => props.show());

    setleave([]);
    y[1].value = "";
    y[0].value = "";
    y[2].value = "";
  };

  const next = () => {
    let y = document.getElementsByClassName("rollno")[0],
      y1 = document.getElementsByClassName("days")[0];
    if (y.value == "" || y1.value == "") {
      alert("Invalid Input");
      return;
    }
    let x = leave.slice();
    x.push([y.value, y1.value]);
    setleave(x);
    y.value = "";
    y1.value = "";
  };

  return (
    <div className="container">
      {show && (
        <Modal onClose={hide}>
          <Leave fn={billsub} next={next} />
        </Modal>
      )}

      <div className="stucard">
        <h1>Remove Students</h1>
        <input className="inpr" placeholder="rollno" />
        <br />
        or
        <br />
        <input
          type={"file"}
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          className="inpr"
          id="file"
        />
        <p className="info">a single sheet with only rollno column</p>
        <button className="btn" onClick={removestud}>
          Remove
        </button>
      </div>
      <div className="stucard">
        <h1>Add Students</h1>
        <input className="inpa" placeholder="rollno" />
        <input className="inpa" placeholder="name" />
        <input list="gender" className="inpa" placeholder="gender" />
        <datalist id="gender">
          <option value="male" />
          <option value="female" />
        </datalist>
        <input list="dept1" className="inpa" placeholder="dept" />
        <datalist id="dept1">
          <option value="CSE" />
          <option value="METT" />
          <option value="MECH" />
          <option value="CIVIL" />
          <option value="EEE" />
          <option value="ECE" />
        </datalist>
        <br />
        or
        <br />
        <input
          type={"file"}
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          id="file"
          className="inpa"
        />
        <p className="info">
          a single sheet with only rollno, name, gender, dept columns
        </p>
        <button className="btn" onClick={addstud}>
          {" " + "Add" + " "}
        </button>
      </div>
      <div className="stucard">
        <h1>Fine Details</h1>
        <input className="inpf" placeholder="rollno" />
        <br />
        <input className="inpf" placeholder="Amount" />
        <br />
        <button className="btn" onClick={finsub}>
          submit
        </button>
        <br />
      </div>
      <div className="stucard1">
        <h1>Bill Calculation</h1>
        From{"  "}
        <input type={"date"} className="inpb" placeholder="Start date.." />
        {"\t "} To{"   "}
        <input type={"date"} className="inpb" placeholder="End.." />
        <br />
        {"No. of days  "}
        <input className="inpb" placeholder="No. of days.." />
        <br />
        <button className="btn" onClick={bill}>
          submit
        </button>
      </div>
      <div className="stucard">
        <h1>Remove or update 1st yr</h1>
        Remove {"  "}
        <input className="inprf" placeholder="phoneno" />
        <br />
        <br />
        update{" "}
        <input
          type={"file"}
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          id="file"
          className="inprf"
        />
        <p className="info">a single sheet with only phoneno, rollno columns</p>
        <button className="btn" onClick={removef}>
          Submit
        </button>
      </div>
      <div className="stucard">
        <h1>Add 1st yr Students</h1>
        <input className="inpaf" placeholder="phoneno" />
        <input className="inpaf" placeholder="name" />
        <input list="gender" className="inpaf" placeholder="gender" />
        <datalist id="gender">
          <option value="male" />
          <option value="female" />
        </datalist>
        <input list="dept" className="inpaf" placeholder="dept" />
        <datalist id="dept">
          <option value="CSE" />
          <option value="METT" />
          <option value="MECH" />
          <option value="CIVIL" />
          <option value="EEE" />
          <option value="ECE" />
        </datalist>
        <br />
        or
        <br />
        <input
          type={"file"}
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          id="file"
          className="inpaf"
        />
        <p className="info">
          a single sheet with only phoneno, name, gender, dept columns
        </p>
        <button className="btn" onClick={addf}>
          {" " + "Add" + " "}
        </button>
      </div>
      <div className="stucard">
        <h1>Amount Addition</h1>
        BH : <input className="inpaa" placeholder="Amount" />
        <br />
        LH : <input className="inpaa" placeholder="Amount" />
        <br />
        <button className="btn" onClick={addsub}>
          submit
        </button>
        <br />
      </div>
      <div className="stucard">
        <h1>Amount Reduction</h1>
        BH : <input className="inpar" placeholder="Amount" />
        <br />
        LH : <input className="inpar" placeholder="Amount" />
        <br />
        <button className="btn" onClick={redsub}>
          submit
        </button>
        <br />
      </div>
    </div>
  );
}
export default Stud;
