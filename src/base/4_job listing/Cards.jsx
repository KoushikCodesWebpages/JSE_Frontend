import React, { useState } from 'react';
import { Box, CircularProgress, tabClasses, Typography } from '@mui/material';
import defaultJobImg from './image.svg';
import defaultLocationImg from './Vector.svg';
import { MoreVertical } from 'lucide-react';
import axios from 'axios';

function Cards(props) {
  const [menuOpen, setMenuOpen] = useState(false); // ✅ moved here

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const token = sessionStorage.getItem("authToken") || "your-fallback-token";
  
    const axiosInstance = axios.create({
      baseURL: "https://raasbackend-production.up.railway.app",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

  const onSelect = async () => {
    try {
      const response = await axiosInstance.post("/selected-jobs",props)
      console.log(response);
    }
    catch(error) {
      console.error(error)
    }
  }

  return (
    <div className="flex flex-wrap gap-3 mb-5"><br/>
    <div className="relative flex justify-between p-8 bg-white w-[1241px] rounded-xl font-[Montserrat]">
      {/* Top-right 3-dots menu */}
      <div className="absolute top-4 right-4">
        <button
          type="button"
          onClick={toggleMenu}
          className="text-gray-500 hover:text-gray-700 focus:outline-none"
          aria-label="More options"
        >
          <MoreVertical size={20} />
        </button>

        {menuOpen && (
          <div className="absolute top-8 right-0 bg-white border rounded-md shadow-lg p-2 z-10">
            <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">Edit</button>
            <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">Delete</button>
          </div>
        )}
      </div>

      {/* Left Side - Job Info */}
      <div className="flex gap-12">
        <div><br/>
          <img src={defaultJobImg} alt="Job" />
        </div>
        <div className="flex flex-col"><br/>
          <h3 className="text-[#2C6472] font-bold text-[20px] leading-[100%]">{props.title}</h3>
          <div>
            <p className="text-base">{props.company}    .{props.postedDate}</p>
            {/* <p className="text-base">{postedDate}</p> */}
          </div>
          <div className="flex items-center gap-2">
            <img src={defaultLocationImg} alt="Location" />
            <p className="text-[#00000091] text-base">{props.location}</p>
          </div><br/>
          <p className="text-[#00000057] text-base w-[450px]">{props.description}</p>
        </div>
      </div>

      {/* Right Side - Skills + Match */}
      <div className="flex gap-16">
        <div className="flex flex-col gap-3"><br/>
          {props.skillData.map((item, index) => (
            <div key={index} className="flex flex-col gap-4">
              <p className="font-semibold">{item.label}</p>
              <p className="text-[#555]">{item.value}</p>
            </div>
          ))}<br/>
        </div><br/>
        <div className="flex flex-col justify-center items-center gap-4">
          <Box position="relative" display="inline-flex">
            <CircularProgress
              variant="absolute"
              value={props.matchValue}
              size={61}
              thickness={3}
              color="blue"
            />
            <Box
              top={0}
              left={0}
              bottom={0}
              right={0}
              position="absolute"
              borderRadius={19}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="h6" component="div" color="green">
                {`${Math.round(props.matchValue)}%`}
              </Typography>
            </Box>
          </Box>
          <p className="text-sm">Profile Match</p>
          <button
            onClick={onSelect}
            className="px-7 py-2 border border-[#2C6472] bg-[#2C6472] w-[61px] h-[37px] text-white rounded-2xl transition-transform hover:bg-white hover:text-[#2C6472] hover:scale-105"
          >
            Select
          </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;
