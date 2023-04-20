import React from "react";
import Slider from "react-slick";

function Sliders({ badges, handlePopUP }) {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: badges.length > 3 ? 3 : badges.length,
    slidesToScroll: 1,
  };
  return (
    <div>
      <Slider {...settings} className="scrollBadge">
        {badges?.map((el, index) => (
          <img
            key={index}
            src={el?.image}
            alt={`star${index}`}
            className="star"
            style={{
              width: "24px",
              height: "20px",
            }}
            onClick={() => handlePopUP(el?.name)}
          />
        ))}
      </Slider>
    </div>
  );
}

export default Sliders;
