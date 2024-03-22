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
        "https://t3.ftcdn.net/jpg/02/79/78/48/360_F_279784836_4eKMjfIfDtaICKmaSBAyft2Y43u5V76Q.jpg",
        "https://media.istockphoto.com/id/1295105726/photo/mid-aged-man-staying-at-home-during-coronavirus-quarantine.jpg?s=612x612&w=0&k=20&c=b1f5Et2tPVePjrrGXKQr2WA-SOFSlBaTVSoDfjktgEE=",
        "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?size=626&ext=jpg"
        // Add more image links here
    ];

    const names = [
        "John Smith",
        "Michael Johnson",
        "David Williams",
        "James Brown",
        "Robert Davis",
        "Daniel Taylor",
        "William Martinez",
        "Joseph Anderson",
        "Richard Thomas",
        "Charles Wilson"
      ];
      

      const reviews = [
        "Revolutionary AI, transforming how I work!",
        "Incredible virtual assistant, boosting productivity!",
        "Game-changer, amazed by this AI!",
        "Streamlined workflow, boosting productivity!",
        "Unparalleled accuracy, efficiency with AI!",
        "Impressed by AI's intelligence, it's magical!",
        "Exceeds expectations, remarkable AI software!",
        "Valuable insights, indispensable AI tool!",
        "Tasks done in minutes, thanks to AI!",
        "Can't imagine working without this AI!"
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
                    <SwiperSlide key={key} className='w-[250px] relative rounded-3xl'>
                        <div className="h-[250px] rounded-3xl bg-blue-300 relative overflow-hidden">
                            <div className="h-full w-full absolute top-0 left-0 bg-black bg-opacity-50"></div>
                            <img className='w-[100%] h-[100%] rounded-3xl' src={imageLinks[key]} alt="" />
                            <div className="absolute bottom-0 left-0 w-full px-4 py-4 text-white">
                                <p className="text-sm font-bold text-left">{names[key]}</p>
                                <p className="text-xs text-left">{reviews[key]}</p>
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