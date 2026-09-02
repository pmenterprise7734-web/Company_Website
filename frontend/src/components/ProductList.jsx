import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductShow from "./elements/ProductShow";
import HeadingButtons from "./elements/HeadingButtons";
import { MenuItem, TextField } from "@mui/material";
import { getProductsByCategory } from "../firebase/service/productService";
import { Search } from 'lucide-react';

export default function ProductList() {
  const [SearchParams] = useSearchParams();
  const CValue = SearchParams.get("value");
  const BName = SearchParams.get("bname");
  const Catagory = SearchParams.get("catagory")

  // console.log(location.state.value)

  const [Products, setProducts] = useState([]);
  const [FilterCompany, setFilterCompany] = useState(BName);
  const filteredProducts = Products.filter((product) => FilterCompany === "All" || FilterCompany.toLowerCase() === product.company.toLowerCase())


  useEffect(() => {
    window.scrollTo(0, 0);
    CallProductByCatagory();
    console.log(FilterCompany)
  }, []);

  const CallProductByCatagory = async () => {
    try {
      const data = await getProductsByCategory(CValue);
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  }; 

  console.log(filteredProducts)

  

  return (
    <div className="w-full bg-[#F7F9FC] overflow-x-hidden">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          className="h-[280px] md:h-[420px] w-full bg-cover bg-center"
          style={{
            backgroundImage: `
              linear-gradient(
                to right,
                rgba(255,255,255,1) 0%,
                rgba(255,255,255,1) 20%,
                rgba(255,255,255,0.8) 35%,
                rgba(255,255,255,0.6) 50%,
                transparent 70%
              ),
              url("/Banners/Test.webp")
            `,
          }}
        >
          <div className="relative z-10 w-[85%] mx-auto h-full flex items-center">
            <div>
              <h1 className="text-4xl md:text-[78px] font-bold text-[#0B1F3A] leading-none">
                {Catagory}
              </h1>

              <div className="w-10 md:w-16 h-1 bg-[#F5B61A] mt-4 mb-2 md:mb-6" />

              <p className="text-slate-600 text-base md:text-lg max-w-lg">
                Explore our range of weighing solutions built for retail,
                warehouse and industrial operations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS WRAPPER */}
      <section className="w-[95%] md:w-[85%] mx-auto md:px-4 md:px-0 -mt-12 relative z-20">
        <div className="bg-white rounded-[10px] md:rounded-[30px] shadow-lg border border-slate-100 md:p-5 md:p-8">
          {/* FILTERS */}
          <div className="flex flex-col lg:flex-row justify-between mb-2 p-5 gap-5 md:mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#0B1F3A]">
                Products
              </h2>

              <div className="w-10 h-1 bg-[#F5B61A] mt-3 mb-3" />

              <p className="text-slate-500 text-sm">
                Showing {filteredProducts.length} Products
              </p>
            </div>

            <div className="flex flex-row gap-3">
              <TextField
                select
                label="company"
                value={FilterCompany}
                className="w-[70%] md:w-[10vw] leading-none"
                onChange={(e) => setFilterCompany(e.target.value)}
              >
                <MenuItem value={"All"}>All</MenuItem>
                <MenuItem value={"WeightKart"}>WeightKart</MenuItem>
                <MenuItem value={"Sonatta"}>Sonatta</MenuItem>
              </TextField>

              <div className="hidden md:block">
                <TextField
                  disabled
                  type="text"
                  placeholder={"Search Products.."}
                  className="h-12 px-4 rounded-xl border border-slate-200 min-w-[260px]"
                ></TextField>
              </div>
            </div>
          </div>

          {/* PRODUCTS GRID */}
          <div className="">
            <ProductShow Products={filteredProducts} page={"Products"} />
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="mt-16">
        <div className="w-[95%] md:w-[85%] mx-auto overflow-hidden bg-white">
          <div className="grid lg:grid-cols-2 mb-6">
            <div>
              <img
                src="https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=2070"
                alt=""
                className="w-full h-[260px] object-cover"
              />
            </div>

            <div className="flex items-center px-8 md:px-16 py-10">
              <div>
                <h3 className="text-2xl md:text-4xl font-bold text-[#0B1F3A] leading-tight">
                  Need help selecting
                  <br />a product?
                </h3>

                <div className="w-14 h-1 bg-[#F5B61A] mt-5 mb-8" />

                <button className="bg-[#0B1F3A] text-white px-8 py-4 rounded-xl font-medium hover:scale-105 transition">
                  Contact Us →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
