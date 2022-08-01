import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCarousel } from "../../store/reducers/CarouselSlice";
import HomeCarousel from "../../templates/HomeTemplate/Layout/HomeCarousel/HomeCarousel";
import MultipleRowSlick from "../../components/RSlick/MultipleRowSlick";
import { fetchFilms } from "../../store/reducers/FilmSlice";
import HomeMenu from "../../components/HomeMenu/HomeMenu";
import { fetchCinemaInfo } from "../../store/reducers/CinemaSlice";

const Home = () => {
  const { items, status, error } = useSelector((state) => state.carousel);
  const {
    data,
    status: cinemaStatus,
    error: cinemaError,
  } = useSelector((state) => state.cinema);
  const {
    arrFilms,
    status: filmStatus,
    error: filmError,
    dangchieu,
  } = useSelector((state) => state.film);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCarousel());
    dispatch(fetchFilms());
    dispatch(fetchCinemaInfo());
  }, [dispatch]);

  return (
    <div>
      <HomeCarousel items={items} />
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <MultipleRowSlick arrFilms={arrFilms} dangchieu={dangchieu} />
          <HomeMenu cinemaData={data} />
        </div>
      </section>
    </div>
  );
};

export default Home;
