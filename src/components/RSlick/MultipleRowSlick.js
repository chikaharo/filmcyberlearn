import React from "react";
import Slider from "react-slick";
import styleSlick from "./MultipleRowSlick.module.css";
import Film from "../Flim/Flim";
import FlipFlim from "../Flim/FlipFilm";
import { useDispatch } from "react-redux";
import {
  dangChieuFetched,
  sapChieuFetched,
} from "../../store/reducers/FilmSlice";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styleSlick["slick-prev"]}`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styleSlick["slick-prev"]}`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

export default function SimpleSlider({ arrFilms, dangchieu }) {
  const dispatch = useDispatch();
  var settings = {
    className: "center variable-width",
    centerMode: true,
    // centerPadding: "60px",
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    variableWidth: true,
    rows: 2,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const activeButtonClass = "bg-gray-600 text-white border-gray-800 border-2";

  const renderFilms = () => {
    return arrFilms.slice(0, 12).map((film, ind) => (
      <div
        className={`${styleSlick["width-item"]}`}
        style={{ width: 300 }}
        key={ind}
      >
        <FlipFlim film={film} />
      </div>
    ));
  };

  return (
    <div>
      <div className="flex mb-6">
        <button
          className={` px-6 py-4 mr-6 ${dangchieu && activeButtonClass}`}
          onClick={() => dispatch(dangChieuFetched())}
        >
          ĐANG CHIẾU
        </button>
        <button
          className={` px-6 py-4 ${!dangchieu && activeButtonClass}`}
          onClick={() => dispatch(sapChieuFetched())}
        >
          SẮP CHIẾU
        </button>
      </div>
      <Slider {...settings}>{renderFilms()}</Slider>;
    </div>
  );
}
