import React, { useEffect, useState } from "react";
import { TextField, MenuItem } from "@mui/material";
import { useSearchParams } from "react-router-dom";

import CatagoryShow from "./elements/CatagoryShow";
import HeadingButtons from "./elements/HeadingButtons";
import { getCategories } from "../firebase/service/categoryService";

export default function Catagories() {
  const [SearchParams] = useSearchParams();
  const BName = SearchParams.get("name") || "All";

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

  return (
    <div className="flex flex-col min-h-screen w-full ">
      <div className="flex flex-row justify-between pr-10 mt-4">
        <HeadingButtons text="Catagories" />
        <TextField
          select
          label="company"
          value={FilterCompany}
          className="md:w-[15vw]"
          onChange={(e) => setFilterCompany(e.target.value)}
        >
          <MenuItem value={"All"}>All</MenuItem>
          <MenuItem value={"WeightKart"}>WeightKart</MenuItem>
          <MenuItem value={"Sonatta"}>Sonatta</MenuItem>
        </TextField>
      </div>

      <div className="flex flex-row flex-wrap justify-center items-center my-4 md:my-10">
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
    </div>
  );
}

// <TextField select label="company" value={FilterCompany} className='w-[10vw] mt-6'
//                 onChange={(e) => setFilterCompany(e.target.value)}>
//                     <MenuItem value={"All"}>All</MenuItem>
//                     <MenuItem value={"WeightKart"}>WeightKart</MenuItem>
//                     <MenuItem value={"Sonatta"}>Sonatta</MenuItem>
//                 </TextField>
