import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const Slider = () => {
  return (
    <>
      {/* <div> */}
      <OwlCarousel className="owl-theme" items="1" dots loop autoplay>
        <div className="item">
          <div className="login-slides">
            <img
              src="https://images.pexels.com/photos/1579739/pexels-photo-1579739.jpeg?auto=compress&cs=tinysrgb&w=400"
              className="carosal-img"
            />
            {/* <img src="img.svg" className="carosal-img" /> */}
          </div>
        </div>

        <div className="item">
          <div className="login-slides">
            <img
              src="https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=400"
              className="carosal-img"
            />
            {/* <img src="img2.svg" className="carosal-img" /> */}
          </div>
        </div>

        <div className="item">
          <div className="login-slides">
            <img
              src="https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=400"
              className="carosal-img"
            />
            {/* <img src="img3.svg" className="carosal-img" /> */}
          </div>
        </div>
      </OwlCarousel>
    </>
  );
};

export default Slider;
