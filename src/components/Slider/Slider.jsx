import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Slider.css"

const Slider = () => {
  const [movieData, setMovieData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        "https://api.themoviedb.org/3/movie/popular?api_key=6c2f0fd8f17254489c08e1441d4f5040"
      );
      const data = await res.json();
      console.log(data);
      setMovieData(data.results);
    };
    fetchData();
  }, []);

  return (
    <>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={true}
        showStatus={false}
        transitionTime={3}
      >
        {movieData.map((movie) => {
          return (
            <Link key={movie.id} className="poster__container" to={"/"}>
              <div className="poster__image">
                <img
                  src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                  alt=""
                />
              </div>
              <div className="poster__overlay">
                <div className="movie__title">{movie.title}</div>
                <div className="movie__runtime">{movie.release_date} <span className="movie__rating" >{movie.vote_average} ⭐</span> </div>
                <div className="movie__description">
                  {movie.overview}
                </div>
              </div>
            </Link>
          );
        })}
      </Carousel>
    </>
  );
};

export default Slider;
