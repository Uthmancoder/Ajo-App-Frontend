import logo from "../images/Microfinance.png";
import { AiFillLinkedin } from "react-icons/ai"
import { AiFillTwitterCircle, AiFillInstagram } from "react-icons/ai"


const Footer = () => {
    return (
        <footer className=" shadow-lg footer text-white p-8 w-full">
        <div className="container-fluid w-100 row p-5 mx-auto flex justify-between  ">
            <div className="col-12 col-sm-6 col-md-3 col-lg-3">
            <img
                  className=" img-fluid rounded-1"
                  style={{width : "100px",}}
                  src={logo}
                  alt=""
                />
                 <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem sed aut quod ea eius magni itaque officiis, atque dolorum, nulla porro ex, asperiores cum labore quasi provident. Cupiditate, minima optio! </p>
            </div>
            <div className="col-12 col-sm-6 col-md-3 col-lg-3">
                <h2 className="font-bold  fs-2 ">Our Feactures</h2>
                <ul>
                    <li className="text-slate-400 p-3 mt-4 ">Managed Website</li>
                    <li className="text-slate-400 p-3">Money Contribution</li>
                    <li className="text-slate-400 p-3">Easy Access</li>
                    <li className="text-slate-400 p-3">Improved Performance</li>
                </ul>
            </div>
            <div className="col-12 col-sm-6 col-md-3 col-lg-3">
                <h2 className="font-bold  fs-2 ">Quick Links</h2>
                <ul>
                    <li className="text-slate-400 p-3 mt-4 "> Contribute Money</li>
                    <li className="text-slate-400 p-3">Fund Wallet</li>
                    <li className="text-slate-400 p-3">Track Payment</li>
                    <li className="text-slate-400 p-3">Withdraw Funds</li>
                </ul>
            </div>
            <div className="col-12 col-sm-6 col-md-3 col-lg-3">
                <h2 className="font-bold  fs-2 ">Feactures</h2>
                <ul>
                <li className="text-slate-400 p-3 mt-4 ">Managed Website</li>
                    <li className="text-slate-400 p-3">Manage Reputation</li>
                    <li className="text-slate-400 p-3">Power Tools</li>
                    <li className="text-slate-400 p-3">Power Tools</li>
                </ul>
            </div>
     <p className="text-center my-3 shadow p-2">© 2023 Ultimate MicroFinance Bank. All rights reserved.</p>
        </div>
    </footer>
    )
}

export default Footer