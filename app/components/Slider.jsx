"use client"
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import 'app/globals.css';

// import required modules
import {Autoplay, FreeMode, Pagination } from 'swiper/modules';

const Slider = () => {
    const uniqueKeys = Array.from({ length: 10 }, (_, i) => i); // Adjust the length according to your need
    const imageLinks = [
        "https://cdn.dribbble.com/uploads/47173/original/Vladimir_Gruev.png?1689174896&format=webp&resize=320x399&vertical=center",
        "https://cdn.create.vista.com/api/media/small/204123334/stock-photo-portrait-bearded-smiling-man-shirt-isolated-white",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGdTF62fM0ZhUqktl7jFDPVd4qBpLASFOgvHyjAZ10jq6jynaEqaXVaCJJbjbEUVBwfOo&usqp=CAU",
        "https://media.istockphoto.com/id/1385722754/photo/with-a-little-smile-serious-mature-man-looking-at-the-camera.jpg?s=612x612&w=0&k=20&c=9hg_1VMV72l3cGAGnd1CpoMdUKZfnvvrr4PrtNemHw0=",
        "https://img.freepik.com/premium-photo/portrait-smiling-patient-therapy-office_23-2148759153.jpg",
        "https://media.istockphoto.com/id/1384672095/photo/outdoor-headshot-of-early-50s-multiracial-executive.jpg?s=612x612&w=0&k=20&c=0k4BglYgFiXxHywMtOhT2MR5okUQnOEGIeqJbti13dM=",
        "https://media.istockphoto.com/id/1308600124/photo/businessman-making-video-call-looking-at-camera-and-talking.jpg?s=612x612&w=0&k=20&c=VmWVWDqIsAGu9Bsws3GogwqkyeFxkGB6lm61JBxiX2Q=",
        "https://www.shutterstock.com/image-photo/portrait-mature-man-smiling-camera-260nw-1581092065.jpg",
        "https://media.istockphoto.com/id/1295105726/photo/mid-aged-man-staying-at-home-during-coronavirus-quarantine.jpg?s=612x612&w=0&k=20&c=b1f5Et2tPVePjrrGXKQr2WA-SOFSlBaTVSoDfjktgEE=",
        "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?size=626&ext=jpg"
        // Add more image links here
    ];

    return (
        <> 
        <div className="container py-20">


            <Swiper
                slidesPerView={5}
                spaceBetween={30}
                freeMode={true}
                speed={5000}
                effect='slide'
                autoplay={{
                    delay: 0,
                    disableOnInteraction: false,
                }}
                loop={true}
                modules={[Autoplay, FreeMode, Pagination]}
                className="mySwiper mb-8"
            >
                {uniqueKeys.map((key) => (
                    <SwiperSlide key={key} className='w-[250px]'>
                        <div className=" h-[250px] rounded-3xl bg-blue-300 ">
                            <div className="card h-[100%]">
                                <img className='w-[100%] h-[100%] rounded-3xl' src={imageLinks[key]} alt="" />
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
        </>
    )
}

export default Slider