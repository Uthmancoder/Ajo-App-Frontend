import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TestimonialCard from "./TestimonialCard";
import user from '../images/Profile.png'


export default class MultipleItems extends Component {
  render() {
    var settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };

    return (
      <div className=" w-100 mx-auto bg-transparent">
        {/* <h2> Multiple items </h2> */}
        <Slider {...settings}>
          <div className="" style={{ backgroundColor: "white" }}>
            <TestimonialCard image={user} text=" Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem sed aut quod ea eius magni itaque officiis, atque dolorum, nulla porro ex, asperiores cum labore quasi provident. Cupiditate, minima optio!" username="Uthmancoder" />
          </div>
          <div>
            <TestimonialCard image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfco7o2LxrdZJUovHUiRmN662LFaf5vxaVlRpIroAmyxbtOlkZsD4nLhr4o53Sd-5mr6g&usqp=CAU" text=" Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem sed aut quod ea eius magni itaque officiis, atque dolorum, nulla porro ex, asperiores cum labore quasi provident. Cupiditate, minima optio!" username="John Doe" />
          </div>
          <div>
            <TestimonialCard image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlA6M0kvkT0Za65PvGYbJrmhqGUMGekxQBWMmt1tSQuEofqieTXvDYkLzVHjUspIbpTD8&usqp=CAU" text=" Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem sed aut quod ea eius magni itaque officiis, atque dolorum, nulla porro ex, asperiores cum labore quasi provident. Cupiditate, minima optio!" username="Mike Thompson" />
          </div>
          <div>
            <TestimonialCard image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgp7esJsaZQeeGLeHs-QJnYQUAGHDLmONfSGAaXFE-4D6ZrALxOHNh34nU_hf4JhwJP4A&usqp=CAU" text=" Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem sed aut quod ea eius magni itaque officiis, atque dolorum, nulla porro ex, asperiores cum labore quasi provident. Cupiditate, minima optio!" username="Mack Williams" />
          </div>
          <div>
            <TestimonialCard image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQYeMugO04JnSLupiBcHYgXv5IBOD-1zXosleePYsS-13lhIlU-bWH_KyyQsQiyqIBlnE&usqp=CAU" text=" Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem sed aut quod ea eius magni itaque officiis, atque dolorum, nulla porro ex, asperiores cum labore quasi provident. Cupiditate, minima optio!" username="John Alfred" />
          </div>
          <div>
            <TestimonialCard image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7AXgDlyf0_CmDWrSU3A3aApeqBozGon8wgNN88hdhEDoIwcXPTyOYA65NURX3mQGzO2w&usqp=CAU" text=" Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem sed aut quod ea eius magni itaque officiis, atque dolorum, nulla porro ex, asperiores cum labore quasi provident. Cupiditate, minima optio!" username="Ahmad khalifah" />
          </div>
          <div>
            <TestimonialCard image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTq1Ofv_yFxMjczUDkD0YDmDLJGecqn6wXF_uLPn9oMzmJcpASlraCuiTvjtcmAgfU2-_k&usqp=CAU" text=" Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem sed aut quod ea eius magni itaque officiis, atque dolorum, nulla porro ex, asperiores cum labore quasi provident. Cupiditate, minima optio!" username="Williams Cresent" />
          </div>
          <div>
            <TestimonialCard image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX93wGB2RY8dmQP2wkWc2PUjbXqIuJ3PE13bKU5HhY8sk0x9JzvNhrGYNysroZVqPq3Ic&usqp=CAU" text=" Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem sed aut quod ea eius magni itaque officiis, atque dolorum, nulla porro ex, asperiores cum labore quasi provident. Cupiditate, minima optio!" username="Adesanya Boluwatife" />
          </div>
          <div>
            <TestimonialCard image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9Z5yZrLBMZZp2yQJc-BejngzAAQZy6SHCEWSDynL4nzmR3qEE28gmUvx42IXhjdvpE0w&usqp=CAU" text=" Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem sed aut quod ea eius magni itaque officiis, atque dolorum, nulla porro ex, asperiores cum labore quasi provident. Cupiditate, minima optio!" username="Sanusi Michael" />
          </div>
        </Slider>
      </div>
    );
  }
}