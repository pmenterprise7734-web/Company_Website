import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HeadingButtons from "./elements/HeadingButtons";

const About = [
  "P.M Enterprise stands as a symbol of precision, reliability, and commitment in the weighing machine industry. Headquartered in Malda, West Bengal, and backed by nearly 20 years of industry experience, we specialize in manufacturing advanced weighing solutions for businesses of all sizes. Founded by Mr. Pintu Mandal, the company has grown from a regional manufacturer into a trusted name serving customers throughout India.",
  "Our extensive product range includes weighing scales designed for retail stores, supermarkets, warehouses, manufacturing units, logistics operations, and numerous other commercial applications. With a strong focus on the B2B sector, we understand the importance of accuracy, durability, and consistency in every measurement. Each product is developed to help businesses operate more efficiently and confidently.",
  "At the heart of our company is a vision to ensure that every business has access to precise and dependable weighing technology. We believe that accurate measurements are essential for smooth operations, better decision-making, and long-term success. Through continuous improvement, quality-focused manufacturing, and nationwide product delivery, P.M Enterprise remains dedicated to supporting businesses across India with weighing solutions they can trust every day.",
];

const AboutManagement = [
  "Mr. Pintu Mandal,",
  "the founder of P.M Enterprise, is a dedicated entrepreneur with nearly two decades of experience in the weighing machine industry. Through his commitment to quality, innovation, and customer satisfaction, he has successfully built P.M Enterprise into a trusted name that serves businesses across India with reliable and accurate weighing solutions.",
  "Under his leadership, the company has consistently focused on delivering products that meet the evolving needs of retailers, wholesalers, warehouses, and industrial clients. His vision is to make dependable weighing technology accessible to every business, helping customers improve efficiency, accuracy, and confidence in their daily operations.",
];

export default function AboutUs() {

  const [AboutVisible, setAboutVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  return (
    <div className="flex w-full ">
      <div className="flex flex-col w-[80%] m-auto">
        <p className="text-[24px] md:text-[30px] font-bold mt-6 md:mt-14 text-[#e02f2f] text-center">
          About Us
        </p>
        <div className="flex w-full border my-4 md:my-8 border-black"></div>
        <div className="flex flex-col w-full mb-8">
          <div
            className="flex w-full aspect-[5/2] md:aspect-[10/2]  rounded-[4px] self-center"
            style={{
              backgroundImage: `url(/Banners/Test4.jpg)`,
              backgroundSize: "cover",
              backgroundPosition: "center",}}>
          </div>

          <div className="flex flex-row w-full self-center items-stretch">
            <div className="flex flex-col w-[30%] rounded-[4px]">
              <div
                className="flex w-full mt-2 md:mt-4 aspect-[10/5] md:aspect-[10/5]  rounded-[4px]"
                style={{
                  backgroundImage: `url(/Banners/Test2.webp)`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
              <div
                className="flex full my-2 md:my-4 aspect-[10/5] md:aspect-[10/5]  rounded-[4px] "
                style={{
                  backgroundImage: `url(/Banners/Test3.webp)`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
              <div
                className="flex full mb-2 md:mb-4 aspect-[10/5] md:aspect-[10/5] rounded-[4px] 2xl:hidden "
                style={{
                  backgroundImage: `url(/Banners/Test3.webp)`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
            </div>

            <div className="flex flex-col w-[70%] text-justify pl-4 py-2 md:py-4 md:pl-8 ">
              <p className="text-[16px] md:text-[24px] md:text-[34px] 2xl:text-[44px] font-bold text-black/60">
                P.M Enterprise.
              </p>
              <div className="md:mb-4 overflow-hidden ">
                {
                  isMobile
                  ? AboutVisible
                    ? About.map((item) => {
                        return (
                          <p className="text-[12px] md:text-[18px] text-black/50 font-normal mb-4 leading-tight">
                            {item}
                          </p>
                        );
                      })
                    : <p className="text-[12px] md:text-[18px] text-black/50 font-normal mb-4 leading-tight">{About[0]}</p>
                  : About.map((item) => {
                        return (
                          <p className="text-[12px] md:text-[18px] text-black/50 font-normal mb-4 leading-snug">
                            {item}
                          </p>
                        );
                      })
                }
              </div>
              <p onClick={() => {setAboutVisible(!AboutVisible)}} className="text-[#e02f2f] md:hidden">{AboutVisible? "see less...":"...see more"}</p>
            </div>
          </div>

          <div className="flex flex-col mt-8">
            <p className="text-[24px] md:text-[30px] font-bold text-[#e02f2f] text-center">
              Meet The Management
            </p>
            <div className="flex flex-row border border-black my-4 md:my-8"></div>
            <div className="flex flex-col md:flex-row ">
              <div
                className="flex w-full aspect-[1/1] md:w-[40%] md:aspect-[2/1.5]  rounded-[4px] self-center border mb-2 md:mb-0"
                style={{
                  backgroundImage: `url(/Banners/Owner.png)`,
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                }}
              ></div>
              <div className="flex flex-col w-[full] md:w-[60%] md:pl-6 text-justify ">
                {AboutManagement?.map((item, index) => (
                  <p className={`text-black/50 font-normal mb-2 leading-tight ${index === 0? "font-semibold text-[16px] md:text-[20px] ":"text-[14px] md:text-[18px] "}`}>
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <div className="flex w-full flex-col mt-8 md:mt-12">
            <p className="text-[24px] md:text-[30px] font-bold text-[#e02f2f] text-center">
              Some Moments Worth Sharing
            </p>
            <div className="flex flex-row border border-black my-2 md:my-8"></div>

            <div className="flex flex-row">
              <img src={"/Banners/Test3.webp"} className="w-[49%] aspect-[1.5/1] md:aspect-[2/1] mr-1 md:mr-2 rounded-[4px] cursor-pointer hover:scale-[1.02] duration-300" />
              <img src={"/Banners/Test3.webp"} className="w-[49%] md:aspect-[2/1] ml-1 md:ml-2 rounded-[4px] cursor-pointer hover:scale-[1.02] duration-300"  />
            </div>

            <div className="flex flex-row mt-2 md:mt-4">
              <img src={"/Banners/Test3.webp"} className="w-[32%] aspect-[1.5/1] md:aspect-[2/1] mr-1 md:mr-2 rounded-[4px] cursor-pointer hover:scale-[1.02] duration-300" />
              <img src={"/Banners/Test3.webp"} className="w-[32%] aspect-[1.5/1] md:aspect-[2/1] mx-1 md:mx-2 rounded-[4px] cursor-pointer hover:scale-[1.02] duration-300"  />
              <Link to={"/Gallery"} className="flex w-[32%] aspect-[2/1] ml-1 md:ml-2 rounded-[4px] justify-center items-center cursor-pointer hover:scale-[1.02] duration-300"
              style={{backgroundImage: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.6)), url(/Banners/Test3.webp)`, backgroundSize: "contain", backgroundPosition: "center", }}>
                <p className="text-[#FFF] text-[14px] md:text-[24px] leading-none">see more</p>
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
