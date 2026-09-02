import React, { useEffect, useState } from "react";
import { TextField, MenuItem } from "@mui/material";
import { useSearchParams } from "react-router-dom";

import CatagoryShow from "./elements/CatagoryShow";
import HeadingButtons from "./elements/HeadingButtons";
import { getCategories } from "../firebase/service/categoryService";

export default function Catagories() {
  const [SearchParams] = useSearchParams();
  // const BName = SearchParams.get("name") || "All";
  const BName = "All";

  const [AllCatagory, setAllCatagory] = useState([]);
  const [FilterCompany, setFilterCompany] = useState(BName);

  useEffect(() => {
    window.scrollTo(0, 0);
    GetAllCatagory();
  }, []);

  const GetAllCatagory = async () => {
    try {
      const data = await getCategories();

      setAllCatagory(data);

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({
      behavior: "smooth",
    });
  };


  return (
    <div className="min-h-screen bg-[#F7F9FC] overflow-x-hidden">

      {/* HERO */}
      <section className="relative ">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `
              linear-gradient(
                to right,
                rgba(255,255,255,1) 0%,
                rgba(255,255,255,1) 30%,
                rgba(255,255,255,0.8) 45%,
                rgba(255,255,255,0.6) 60%,
                transparent 75%
              ),
              url("/Banners/Test0.webp")
            `,
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
          <div className="flex flex-col lg:flex-row gap-10 justify-between items-start">
            <div className="max-w-2xl">
              <p className="uppercase tracking-[4px] text-[#F5B61A] text-sm">
                Our Solutions
              </p>

              <h1 className="text-4xl md:text-7xl font-bold text-[#0B1F3A] mt-4">
                Categories
              </h1>

              <div className="w-10 md:w-16 h-1 bg-[#F5B61A] mt-4 mb-2 md:mb-6" />

              <p className="text-base md:text-lg mt-6 text-slate-600 ">
                Discover our complete range of precision weighing solutions
                designed for industrial, warehouse and commercial applications.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CARDS */}
      <section className="max-w-[90%] mx-auto md:px-6 py-6 md:py-12">
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-2 md:gap-6">
          {AllCatagory?.map((item) => {
             if (item.status == true) {
               return (
                 <CatagoryShow
                   key={item.value}
                   Name={item.catagoryname}
                   Image={item.picture}
                   Value={item.value}
                   BName={BName}
                 />
               );
             }
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-16">
        <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6 md:p-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-xl md:text-3xl font-bold text-[#0B1F3A]">
                Can't find the right scale?
              </h2>
              <p className="text-sm text-slate-600 mt-2">
                Our experts are here to help you choose the perfect solution.
              </p>
            </div>

            <button className="bg-[#071B3A] text-white px-8 py-4 rounded-2xl" onClick={() => scrollToContact()}>
              Contact Our Experts →
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
