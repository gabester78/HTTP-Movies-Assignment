import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import Loader from "react-loader-spinner";

const formDefault = {
  title: "",
  director: "",
  metascore: "",
  stars: [""],
  isLoading: false,
};

const UpdateMovie = (props) => {
  const [movie, setMovie] = useState(formDefault);
  const { id } = useParams();
  const { push } = useHistory();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => {
        setMovie(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    e.persist();
    let value = e.target.value;
    if (e.target.name === "metascore") {
      value = parseInt(value, 10);
    }
    if (e.target.name === "stars") {
      e.target.value.split(",");
    }
    setMovie({
      ...movie,
      [e.target.name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${id}`, movie)
      .then((res) => {
        const mergeArrayWithObject = (arr, obj) =>
          arr && arr.map((t) => (t.id === obj.id ? obj : t));
        props.setMovieList(mergeArrayWithObject(props.movieList, res.data));
        push(`/movies/${id}`);
      })
      .catch((err) => console.log(err));
  };

  console.log(props.movieList, "new movie list");

  return (
    <div className="save-wrapper">
      <div className="movie-card">
        <h2>Edit your movie.</h2>
        <form className="form" onSubmit={onSubmit}>
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
            <textarea
              id="stars"
              name="stars"
              onChange={handleChange}
              value={movie.stars}
            />
          </label>

          <button>Submit</button>

          {formDefault.isLoading && (
            <div>
              <Loader type="Grid" color="#00BFFF" height={80} width={80} />
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default UpdateMovie;
