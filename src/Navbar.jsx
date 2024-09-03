import React from "react";

const Navbar = () => {
    return (
        <>
          <nav className="flex justify-between text-white bg-slate-800 py-2">
            <div className="logo">
                <span className="font-bold text-xl mx-8 hover:cursor-pointer">iTask</span>
            </div>
            <ul className="flex gap-8 mx-9">
                <li className="cursor-pointer hover:font-bold transition-all">Home</li>
                <li className="cursor-pointer hover:font-bold transition-all">Your Tasks</li>
            </ul>
          </nav>
        </>
    )
}

export default Navbar;



