import { useState, useEffect } from "react";
import "./placed.css";
import FileSaver from "file-saver";
import { utils, write } from "xlsx";

function Placed(props) {
  const [bill, setb] = useState([]);
  const d = new Date();
  useEffect(() => {
    fetch("http://localhost:8000/2")
      .then((j) => j.json())
      .then((j) =>setb(j));
  }, []);

  const order = (id, bill) => {
    let a1 = bill.slice();

    for (let i = 0; i < bill.length; i++)
      a1[i] = {
        name:
          id == 1
            ? props.vegpost[bill[i][0]].name
            : props.post[bill[i][0]].name,
        qty: bill[i][1],
      };

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
  };

  return (
    <div className="contai">
      {bill.map((e) => (
        <div className="cards">
          <br />
          {"Order Date :\t"}
          <span>{e.date}</span>
          {"\t\t\t" + "Order Type :\t"}
          <span>{(e.id==1)?"Vegetables":"Groceries"}</span><br /><br />
          {"Order Id :\t"}
          <span>{e._id}</span><br /><br />
          <button className="btn" onClick={() => order(e.id, e.bill)}>
            Check Orders
          </button>
        </div>
      ))}
    </div>
  );
}

export default Placed;
