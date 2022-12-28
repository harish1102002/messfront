import './nav.css';

function Nav(props) {
    return(
        <div className='nav'>
        <button onClick={(e)=>{props.f1(true);props.f2(false);props.f3(false);props.f4(false);props.f5(false);
        document.getElementsByTagName("Button")[4].className=""; 
        document.getElementsByTagName("Button")[0].className=""; 
        document.getElementsByTagName("Button")[1].className=""; 
        document.getElementsByTagName("Button")[2].className=""; 
        document.getElementsByTagName("Button")[3].className=""; 
        e.target.className="active"}}>Purchased</button>
        <button onClick={(e)=>{props.f2(true);props.f1(false);props.f3(false);props.f4(false);props.f5(false);
        document.getElementsByTagName("Button")[4].className=""; 
        document.getElementsByTagName("Button")[0].className=""; 
        document.getElementsByTagName("Button")[1].className=""; 
        document.getElementsByTagName("Button")[2].className=""; 
        document.getElementsByTagName("Button")[3].className="";
        e.target.className="active"}}>Groceries</button>
        <button className='active' onClick={(e)=>{props.f5(true);props.f1(false);props.f3(false);props.f4(false);props.f2(false);
        document.getElementsByTagName("Button")[4].className=""; 
        document.getElementsByTagName("Button")[0].className=""; 
        document.getElementsByTagName("Button")[1].className=""; 
        document.getElementsByTagName("Button")[2].className=""; 
        document.getElementsByTagName("Button")[3].className="";
        e.target.className="active"}}>Vegetables</button>
        <button onClick={(e)=>{props.f3(true);props.f1(false);props.f2(false);props.f4(false);props.f5(false);
        document.getElementsByTagName("Button")[4].className=""; 
        document.getElementsByTagName("Button")[0].className=""; 
        document.getElementsByTagName("Button")[1].className=""; 
        document.getElementsByTagName("Button")[2].className=""; 
        document.getElementsByTagName("Button")[3].className="";
        e.target.className="active"}}>Orders</button>
        <button onClick={(e)=>{props.f4(true);props.f1(false);props.f2(false);props.f3(false);props.f5(false);
        document.getElementsByTagName("Button")[4].className=""; 
        document.getElementsByTagName("Button")[0].className=""; 
        document.getElementsByTagName("Button")[1].className=""; 
        document.getElementsByTagName("Button")[2].className=""; 
        document.getElementsByTagName("Button")[3].className="";
        e.target.className="active"}}>Students</button>
        </div>
    );
}
export default Nav;