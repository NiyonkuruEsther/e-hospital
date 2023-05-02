import React from "react";
import img from "../Assets/images/Frame.svg";

const Home = () => {
  return (
    <div className="">
      {/* Navbar */}
      <div className="flex flex-col">
        <div className="flex items-center shadow-xl gap-6 px-20 py-12 ">
          <img src={img} alt="hello" className="w-20 h-20" />
          <p className="text-darkGray font-extrabold text-5xl">
            Go<span className="text-darkGreen">Healthy</span>
          </p>
        </div>
        <div className="px-20">
          <p className=" font-extrabold text-5xl">
            Let's{" "}
            <span className="text-darkGray font-extrabold text-5xl">
              Go<span className="text-darkGreen">Healthy</span>
            </span>
            <br />
            together
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
