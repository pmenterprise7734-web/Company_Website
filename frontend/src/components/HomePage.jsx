import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HeadingButtons from "./elements/HeadingButtons";
import BrandShow from "./elements/BrandShow";
import CatagoryShow from "./elements/CatagoryShow";
import ProductShow from "./elements/ProductShow";
import { Skeleton } from "@mui/material";
import { MoveRight, MoveUpRight } from "lucide-react";


import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { getCategories } from "../firebase/service/categoryService";
import { getAllBanners } from "../firebase/service/bannerService";
import { getTopProducts } from "../firebase/service/productService";

const AboutUs = [
  "P.M Enterprise stands as a symbol of precision, reliability, and commitment in the weighing machine industry. Headquartered in Malda, West Bengal, and backed by nearly 20 years of industry experience, we specialize in manufacturing advanced weighing solutions for businesses of all sizes. Founded by Mr. Pintu Mandal, the company has grown from a regional manufacturer into a trusted name serving customers throughout India.",
  "Our extensive product range includes weighing scales designed for retail stores, supermarkets, warehouses, manufacturing units, logistics operations, and numerous other commercial applications. With a strong focus on the B2B sector, we understand the importance of accuracy, durability, and consistency in every measurement. Each product is developed to help businesses operate more efficiently and confidently.",
];

function HomePage() {
  const isMd = window.innerWidth >= 768;
  const [TopProdData, setTopProdData] = useState([]);
  const [AllCatagory, setAllCatagory] = useState([]);
  const [Banners, setBanners] = useState([]);

  const words = [
    { text: "PRECISION", color: "text-blue-100", from: "left" },
    { text: "WEIGHING", color: "text-amber-300", from: "right" },
    { text: "SOLUTIONS", color: "text-white", from: "left" },
  ];
  const [containerVisible, setContainerVisible] = useState(false);
  const [visibleCount, setVisibleCount] = useState(0);
  const [buttonVisible, setButtonVisible] = useState(false);

  useEffect(() => {
    GetAllCatagory();
    GetBanners();
    CallData();
  }, []);

  useEffect(() => {
    const containerTimer = setTimeout(() => setContainerVisible(true), 100);
    return () => clearTimeout(containerTimer);
  }, []);

  useEffect(() => {
    if (!containerVisible) return;
    if (visibleCount >= words.length) {
      const buttonTimer = setTimeout(() => setButtonVisible(true), 400);
      return () => clearTimeout(buttonTimer);
    }
    const wordTimer = setTimeout(() => {
      setVisibleCount((prev) => prev + 1);
    }, 600);
    return () => clearTimeout(wordTimer);
  }, [containerVisible, visibleCount]);

  // repeat the whole word + button animation every 15s
  useEffect(() => {
    const repeatTimer = setInterval(() => {
      setButtonVisible(false);
      setVisibleCount(0);
    }, 8000);
    return () => clearInterval(repeatTimer);
  }, []);

  const GetAllCatagory = async () => {
    try {
      const data = await getCategories();

      console.log(data);

      setAllCatagory(data); // if you have state
    } catch (error) {
      console.log(error);
    }
  };

  const GetBanners = async () => {
    try {
      const data = await getAllBanners();
      console.log("Banner Data:", data);
      setBanners(data);
    } catch (error) {
      console.log(error);
    }
  };

  const CallData = async () => {
    try {
      const data = await getTopProducts();
      console.log("Products:", data);
      setTopProdData(data);
    } catch (error) {
      console.log(error);
    }
  };

  if (AllCatagory.length !== 0) {
    return (
      <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
        {/* Banner Section */}
        <div className="flex relative w-full aspect-[12/5]">
          {Banners && Banners.length > 0 ? (
            <Swiper
              className="relative w-full h-full my-0 items-end overflow-hidden"
              style={{ marginBottom: 5 }}
              modules={[Pagination, Autoplay, EffectFade]}
              spaceBetween={0}
              slidesPerView={1}
              pagination={{ clickable: true }}
              autoplay={{ delay: 2500 }}
              speed={1500}
              effect="fade"
              fadeEffect={{ crossFade: true }}
              loop={true}
            >
              {Banners.map((item) => {
                return (
                  <SwiperSlide key={item.div}>
                    <div
                      className="h-full w-full"
                      style={{
                        backgroundImage: `url(${item.imgUrl})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    ></div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          ) : (
            <div className="flex w-full aspect-[12/5] text-[#000] bg-[#FFF] px-20 py-5"></div>
          )}

          <div
            className={`flex flex-col absolute h-[60%] md:h-[50%] 2xl:h-[60%] self-end aspect-[2/1] rounded-tl-full rounded-br-full bg-gradient-to-r from-[#023e8a] via-[#023e8a]/70 to-[#023e8a]/50 z-10 justify-center items-center transition-all duration-700 ease-out ${
              containerVisible
                ? "translate-x-0 opacity-100"
                : "-translate-x-full opacity-0"
            }`}
          >
            {words.map((word, i) => (
              <span
                key={word.text}
                className={`transition-all duration-500 text-sm md:text-xl lg:text-4xl 2xl:text-[74px] md:mb-[-6px] 2xl:mb-6 leading-none tracking-wide italic font-extrabold ease-in-out ${word.color} ${
                  i < visibleCount
                    ? "opacity-100 translate-x-0"
                    : word.from === "left"
                      ? "opacity-0 -translate-x-24"
                      : "opacity-0 translate-x-24"
                }`}
              >
                {word.text}
              </span>
            ))}

            <Link
              className={`flex px-3 py-[2px] mt-2 xl:px-6 xl:py-2 md:mt-4 rounded-[4px] text-[10px] md:text-base 2xl:text-xl  bg-[#FFB720] hover:scale-[1.08] items-center text-white font-semibold transition-all duration-300 ease-out ${
                buttonVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-2"
              }`}
              to={"/Catagories"}
            >
              Explore <MoveRight className="ml-2" size={isMd? 25:14} />
            </Link>
          </div>
        </div>

        {/* Brands Section */}
        <div className="flex flex-col">
          <HeadingButtons text="Our Brands" />
          <div className="flex flex-row flex-wrap w-full justify-center">
            <BrandShow name="WeightKart" ImgUrl="/Banners/WKLOGO.png" />
            <BrandShow name="Sonatta" ImgUrl="/Banners/SNTLOGO.png" />
          </div>
        </div>

        {/* Catagories Section */}
        <div className="flex flex-col bg-[#f5f5f5]">
          <HeadingButtons text="Catagories" />
          <div className="flex flex-col items-center mx-[5%] my-2 md:my-6">
            <div className="flex flex-row overflow-x-auto w-full py-[5px] no-scrollbar gap-4 md:gap-6">
              {AllCatagory?.map((item) => {
                if (item.status == true) {
                  return (
                    <CatagoryShow
                      key={item.value}
                      Name={item.catagoryname}
                      Image={item.picture}
                      Value={item.value}
                      BName={"All"}
                    />
                  );
                }
              })}
            </div>
            <p className="group flex gap-1 items-center text-[#0B1F3A] text-xs md:text-sm 2xl:text-base my-2 md:my-4 cursor-pointer">
              we are here to help in your business{" "}
              <span className="flex flex-row items-center text-[#FFB720]">
                needs. <MoveUpRight className="group-hover:translate-x-2 group-hover:translate-y-[-8px] duration-300" />
              </span>{" "}
            </p>
          </div>
        </div>

        {/* About Section */}
        <div className="flex flex-col mb-3">
          <div className="flex flex-col md:flex-row w-[90%] self-center items-stretch py-6">
            <div className="flex flex-col w-full md:w-[40%] rounded-[20px] self-center gap-2 md:gap-0">
              <div
                className="flex w-full mt-2 md:mt-4 aspect-[10/4] md:aspect-[10/4.5] 2xl:aspect-[10/3]  rounded-[10px]"
                style={{
                  backgroundImage: `url(/Banners/Test2.webp)`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
              <div
                className="flex full my-1 md:my-2 aspect-[10/4] md:aspect-[10/4.5] 2xl:aspect-[10/3] rounded-[10px] "
                style={{
                  backgroundImage: `url(/Banners/Test3.webp)`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
            </div>

            <div className="flex flex-col h-auto w-full md:w-[60%] text-justify pl-3 py-2 md:py-4 md:pl-8 ">
              <HeadingButtons text="About Us" margin={0} />
              <p className="text-base md:text-3xl 2xl:text-4xl font-bold text-[#1a4d91] tracking-wider my-6">
                P.M Enterprise.
              </p>
              <div className="md:mb-4 overflow-hidden">
                {AboutUs?.map((item) => (
                  <p className="text-xs md:text-sm mb-2 font-semibold text-[#0B1F3A]/80" style={{ lineHeight: "25px" }}>
                    {item}
                  </p>
                ))}
              </div>
              <Link
                to={"/AboutUs"}
                className="text-xs mt-1 md:text-sm text-[#FFF] px-2 md:px-4 py-2 rounded-[4px] self-start bg-[#1a4d91] hover:bg-[#1a4d91]/80"
              >
                ... Read More
              </Link>
            </div>
          </div>
        </div>

        {/* Top product Section */}
        <div className="flex flex-col bg-[#f5f5f5]">
          <HeadingButtons text="Top Selling products" />
          <ProductShow
            Products={TopProdData}
            EmptyText={"Something went wrong! PLEASE TRY AGAIN LATER"}
          />
          <p className="group flex gap-1 items-center text-[#00000f] text-xs md:text-sm 2xl:text-base mb-6 md:mb-10 mt-2 md:my-4 self-center cursor-pointer">
            enjoy our most selling{" "}
            <span className="flex flex-row items-center text-[#FFB720]">
              Top Products. <MoveUpRight className="group-hover:translate-x-2 group-hover:translate-y-[-8px] duration-300"/>
            </span>{" "}
          </p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col flex-1 h-screen w-full items-center ">
        <div className="flex flex-col h-full w-[80%] items-center gap-4 mt-4">
          <Skeleton
            variant="rectangular"
            height={"50%"}
            width={"100%"}
            className="rounded-[10px]"
            sx={{ bgcolor: "#FFB72080" }}
          />
          <div className="flex flex-row h-[20%] w-full gap-4">
            <Skeleton
              variant="rectangular"
              height={"100%"}
              width={"100%"}
              className="rounded-[10px]"
              sx={{ bgcolor: "#FFB72080" }}
            />
            <Skeleton
              variant="rectangular"
              height={"100%"}
              width={"100%"}
              className="rounded-[10px]"
              sx={{ bgcolor: "#FFB72080" }}
            />
          </div>
          <div className="flex flex-row h-[20%] w-full gap-4">
            <Skeleton
              variant="rectangular"
              height={"100%"}
              width={"100%"}
              className="rounded-[10px]"
              sx={{ bgcolor: "#FFB72080" }}
            />
            <Skeleton
              variant="rectangular"
              height={"100%"}
              width={"100%"}
              className="rounded-[10px]"
              sx={{ bgcolor: "#FFB72080" }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
