import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [keyword, setKeyword] = useState("");
  const [isLoad, setIsLoad] = useState(true);
  const [tracks, setTrack] = useState([]);

  const getTracks = async () => {
    setIsLoad(true);
    try {
      let data = await fetch(
        `https://v1.nocodeapi.com/sumit_01/spotify/nTBCMHTDbqKCJZPW/search?q=${
          keyword === "" ? "trending" : keyword
        }&type=track`
      );
      let convertedData = await data.json();      
      setTrack(convertedData.tracks.items);
    } catch (error) {
      console.error("Error fetching tracks:", error);
    } finally {
      setIsLoad(false);
    }
  };

  useEffect(() => {
    getTracks();
  }, []);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      getTracks();
    }
  };

  return (
    <>
      <nav className="navbar navbar-dark navbar-expand-lg bg-dark fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand">@ AUDIO_WAVE</a>

          <div
            className="collapse navbar-collapse d-flex justify-content-center"
            id="navbarSupportedContent"
          >
            <input
              value={keyword}
              onChange={(event) => {
                setKeyword(event.target.value);
              }}
              onKeyPress={handleKeyPress}
              className="form-control me-3 w-75 bg-dark-subtle"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button onClick={getTracks} className="btn btn-outline-success">
              Search
            </button>
          </div>
        </div>
      </nav>

      <div className="container bg-se">
        <div className={`row ${isLoad ? "" : "d-none"}`}>
          <div className="col-12 py-5 text-center">
            <div
              className="spinner-border"
              style={{ width: "3rem", height: "3rem" }}
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
        <div className="row">
          {tracks.map((element) => (
            <div
              key={element.id}
              className="col-md-4 mb-4 d-flex align-items-stretch"
            >
              <div
                className="card position-relative w-100 shadow"
                style={{ marginTop: "70px" }}
              >
                <img
                  src={element.album.images[0].url}
                  className="card-img-top"
                  alt={element.name}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{element.name}</h5>
                  <p className="card-text">
                    Artist: {element.album.artists[0].name}
                  </p>
                  <p className="card-text">
                    Release date: {element.album.release_date}
                  </p>
                  <audio
                    src={element.preview_url}
                    controls
                    className="mt-auto w-100"
                  ></audio>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
