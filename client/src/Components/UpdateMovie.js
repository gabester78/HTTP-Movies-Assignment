import React, { useState, useEffect } from "react";

const formDefault = {
  title: "",
  director: "",
  metascore: "",
  stars: [""],
};

const UpdateMovie = (props) => {
  const [movie, setMovie] = useState(formDefault);

  const handleChange = (e) => {
    e.persist();
    let value = e.target.value;
    if (e.target.name === "metascore") {
      value = parseInt(value, 10);
    }
    if (e.target.name === "stars") {
      ev.target.value.split(",");
    }
    setMovie({
      ...movie,
      [e.target.name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <h3>Let's update your movie.</h3>
      <form onSubmit={onSubmit}>
        <label htmlFor="title">
          Title:
          <input
            id="title"
            type="text"
            name="title"
            onChange={handleChange}
            value={movie.title}
          />
        </label>

        <label htmlFor="director">
          Director:
          <input
            id="director"
            type="text"
            name="director"
            onChange={handleChange}
            value={movie.director}
          />
        </label>

        <label htmlFor="metascore">
          Metascore:
          <input
            id="metascore"
            type="text"
            name="metascore"
            onChange={handleChange}
            value={movie.metascore}
          />
        </label>

        <label htmlFor="stars">
          Starring:
          <input
            id="stars"
            type="text"
            name="stars"
            onChange={handleChange}
            value={movie.stars}
          />
        </label>

        <button>Submit</button>

        {/* {this.state.isLoading && (
          <div>
            <Loader type="Grid" color="#00BFFF" height={80} width={80} />
          </div>
        )} */}
      </form>
    </div>
  );
};
