import logo from "./logo.svg";
import "./App.css";
import { useEffect } from "react";
import { useState } from "react";

function App() {
  const [gradients, setgradients] = useState([]);
  const [leftColor, setLeftColor] = useState("#fff700");
  const [rightColor, setRightColor] = useState("#ff0000");
  const [gradientType, setGradientType] = useState("linear");

  const getGradients = async () => {
    let data = await fetch(
      "https://apex.oracle.com/pls/apex/gradient_lover/data/get"
    );
    let convertedData = await data.json();
    console.log(convertedData);
    setgradients(convertedData.items);
  };

  const postGradients = async () => {
    fetch(
      `https://apex.oracle.com/pls/apex/gradient_lover/data/post?person_name=xyz&leftcolor=%23${leftColor.slice(
        1,
        leftColor.length
      )}&rightcolor=%23${rightColor.slice(
        1,
        rightColor.length
      )}&likes=0&upload_date=${new Date().getDate()}`,
      { method: "POST" }
    );
    getGradients();
  };

  useEffect(() => {
    getGradients();
  }, []);

  return (
    <div className="container">
      <div className="row my-2 rounded bg-light bg-opacity-25 py-2">
        <div className="col-md-6 col-lg-4 col-xl-3 my-2 ">
          <div class="card">
            <div
              id="box"
              class="gradient card-img-top ratio ratio-1x1"
              alt="..."
              style={{
                background:
                  gradientType === "radial"
                    ? `radial-gradient(${leftColor} , ${rightColor})`
                    : `linear-gradient(to right, ${leftColor} , ${rightColor})`,
                border: `1px solid rosybrown`,
              }}
            />
            <div class="buttondiv">
              <button
                className="control"
                style={{
                  float: `left`,
                }}
                onClick={() => {
                  setGradientType("linear");
                }}
              >
                Linear Gradient
              </button>
              <br />
              <button
                className="control"
                style={{
                  marginLeft: `auto`,
                  float: `right`,
                }}
                onClick={() => {
                  setGradientType("radial");
                }}
              >
                Radial Gradient
              </button>
            </div>

            <div class="card-body">
              <h5 class="card-title">
                <input type="text" className="form-control" id="textbox" />
              </h5>

              <div class="card-text">
                <div className="d-flex justify-content-between">
                  <button
                    className="btn border border-1 rounded-pill py-1 px-3"
                    style={{ float: `right` }}
                  >
                    📋
                  </button>
                  <span className="border border-1 rounded-pill py-1 px-3">
                    <input
                      type="color"
                      className="form-control"
                      value={leftColor}
                      onChange={(event) => {
                        console.log(event.target.value);
                        setLeftColor(event.target.value);
                      }}
                    />
                  </span>
                  <span className="border border-1 rounded-pill py-1 px-3">
                    <input
                      type="color"
                      className="form-control"
                      value={rightColor}
                      onChange={(event) => {
                        setRightColor(event.target.value);
                      }}
                    />
                  </span>
                  <button
                    className="btn border border-1 rounded-pill py-1 px-3"
                    style={{ float: `left` }}
                  >
                    📋
                  </button>
                </div>

                <br />
                <h4>
                  {`${new Date().getUTCDate()} -
                    ${parseInt(new Date().getMonth()) + 1} -
                    ${new Date().getFullYear()}`}
                </h4>
              </div>

              <button onClick={postGradients} className="btn submit-button">
                Submit
              </button>
            </div>
          </div>
        </div>
        {gradients.map((data) => {
          return (
            <div className="col-md-6 col-lg-4 col-xl-3 my-2 ">
              <div class="card">
                <div
                  class="gradient main-gradient card-img-top ratio ratio-1x1"
                  alt="..."
                  style={{
                    background: `linear-gradient(to left, ${data.rightcolor}, ${data.leftcolor})`,
                  }}
                />
                <div class="card-body">
                  <input
                    value={data.person_name}
                    type="text"
                    className="form-control"
                  />

                  <div class="card-text">
                    <div className="d-flex justify-content-between">
                      <button
                        className="btn border border-1 rounded-pill py-1 px-3"
                        style={{ float: `right` }}
                      >
                        📋
                      </button>
                      <span className="border border-1 rounded-pill py-1 px-3">
                        {data.leftcolor}
                      </span>
                      <span className="border border-1 rounded-pill py-1 px-3">
                        {data.rightcolor}
                      </span>
                      <button
                        className="btn border border-1 rounded-pill py-1 px-3"
                        style={{ float: `left` }}
                      >
                        📋
                      </button>
                    </div>

                    <br />
                    <h4>{data.upload_date}</h4>
                  </div>

                  <a href="#" class="btn likes-button">
                    <abbr title="Likes">
                      {data.likes}
                      <i class="bi bi-hand-thumbs-up-fill" id="likes"></i>
                    </abbr>
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
