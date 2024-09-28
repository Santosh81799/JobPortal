import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchJobQuery } from '../../redux/JobSlice';

const CategoryCarousel = () => {
  const categories = [
    "Frontend Developer", "Backend Developer", "Data Science", "Graphic Designer",
    "FullStack Developer", "DevOps Developer", "AI Developer", "Mobile Development",
    "Software Engineer", "Gaming Developer", "Cloud Developer"
  ];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
  };

  const handleJobSearch = (query) =>{
    dispatch(setSearchJobQuery(query));
    navigate("/browse");
  }

  return (
    <div className="carousel-container my-5">
      <Slider {...settings}>
        {categories.map((item, index) => (
          <div key={index} className="carousel-item">
            <button onClick={()=>handleJobSearch(item)}>{item}</button>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CategoryCarousel;
