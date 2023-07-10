import "./App.css";
import { useEffect } from "react";
import { useState } from "react";

function App() {
  const [gradients, setgradients] = useState([]);
  const [leftColor, setLeftColor] = useState("#fff700");
  const [rightColor, setRightColor] = useState("#ff0000");
  const [gradientType, setGradientType] = useState("linear");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  let currentDate = `${new Date().getUTCDate()} -
  ${parseInt(new Date().getMonth()) + 1} -
  ${new Date().getFullYear()}`;

  const getGradients = async () => {
    setLoading(true);
    let data = await fetch(
      "https://apex.oracle.com/pls/apex/gradient_lover/data/get"
    );
    let convertedData = await data.json();
    console.log(convertedData);
    setgradients(convertedData.items);
    setLoading(false);
  };

  const postGradients = async () => {
    setLoading(true);
    await fetch(
      `https://apex.oracle.com/pls/apex/gradient_lover/data/post?person_name=${name}&leftcolor=%23${leftColor.slice(
        1,
        leftColor.length
      )}&rightcolor=%23${rightColor.slice(
        1,
        rightColor.length
      )}&likes=0&upload_date=${currentDate}`,
      { method: "POST" }
    );
    getGradients();
  };

  useEffect(() => {
    getGradients();
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Gradient Cloud
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Link
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dropdown
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled">Disabled</a>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>

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
                  <input
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    type="text"
                    className="form-control"
                    id="textbox"
                  />
                </h5>

                <div class="card-text">
                  <div className="d-flex justify-content-between">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(leftColor);
                      }}
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
                      onClick={() => {
                        navigator.clipboard.writeText(rightColor);
                      }}
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
          {loading ? (
            <div className="col-md-6 col-lg-4 col-xl-3 my-2 d-flex align-items-center justify-content-center">
              <h2>Loading...</h2>
            </div>
          ) : (
            ""
          )}
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
                          onClick={() => {
                            navigator.clipboard.writeText(data.leftColor);
                          }}
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
                          onClick={() => {
                            navigator.clipboard.writeText(data.rightColor);
                          }}
                          className="btn border border-1 rounded-pill py-1 px-3"
                          style={{ float: `left` }}
                        >
                          📋
                        </button>
                      </div>

                      <br />
                      <h4>{data.upload_date}</h4>
                    </div>

                    <a href="/" class="btn likes-button">
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
    </>
  );
}

export default App;
