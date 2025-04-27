import React, { useState } from "react";
import defaultJobImg from "../../assets/default-job.svg";
import Location_Icon from "../../assets/location-icon.svg";
import { MoreVertical } from "lucide-react";
import axios from "axios";

function Cards(props) {
  const [menuOpen, setMenuOpen] = useState(false); // ✅ moved here
  const [expanded, setExpanded] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [showCard, setShowCard] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);


  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const token = sessionStorage.getItem("authToken") || "your-fallback-token";
  console.log(token);
  const axiosInstance = axios.create({
    baseURL: "https://raasbackend-production.up.railway.app/api",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const onSelect = async () => {
    try {
      // First, trigger the fade-out effect and select the job
      setIsSelected(true);
      setIsFadingOut(true); // trigger fade-out animation
      
      // Wait for the fade-out effect to complete before hiding the card
      setTimeout(() => {
        setShowCard(false); // Hide the card after fade-out
  
        // Now send the API request after the fade-out completes
        axiosInstance.post("/selected-jobs", props)
          .then((response) => {
            console.log("Job selected successfully:", response);
            console.log("Posting job data:", props);

          })
          .catch((error) => {
            console.error("Error selecting job:", error);
          });
  
      }, 2000); // Wait for fade-out animation to complete (2s)
  
    } catch (error) {
      console.error("Error in onSelect:", error);
    }
  };
  
  
  
  

  return (
    <div className="flex flex-wrap">
      {showCard && 
      (<div
        className={`relative w-full flex border border-gray-200 bg-white rounded-xl font-[Montserrat] transition-opacity duration-1000 ${
          isFadingOut ? "opacity-0" : "opacity-100"
        }`}
      >
      <div className="relative w-full flex border border-gray-200 bg-white rounded-xl font-[Montserrat]">
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
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                Edit
              </button>
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                Delete
              </button>
            </div>
          )}
        </div>

        {/* Left Side - Job Info */}
        <div className="flex w-1/2 p-6 gap-6">
          <div className="flex items-start object-cover" style={{ flexShrink: 0 }}>
            <img className="object-cover" src={defaultJobImg} alt="Job" />
          </div>
          <div className="flex flex-col justify-start gap-2">
            <h3 className="text-[#2C6472] font-bold text-[19px] leading-[100%]">
              {props.title}
            </h3>
            <div>
              <p className="font-semibold">
                {props.company} &nbsp; • &nbsp;{" "}
                <span className="text-[#2C6472] text-sm">
                  {props.postedDate}
                </span>
              </p>
              {/* <p className="text-base">{postedDate}</p> */}
            </div>
            <div className="flex items-center gap-2">
              <img src={Location_Icon} alt="Location" />
              <p className="text-[#00000091] text-sm font-medium">
                {props.location}
              </p>
            </div>
            <p className="text-[#00000077] text-sm mt-3">
              {expanded ? (
                <>
                  {props.description}
                  &nbsp;
                  <button
                    onClick={() => setExpanded(false)}
                    className="text-[#2C6472] font-semibold text-sm underline"
                  >
                    show less
                  </button>
                </>
              ) : props.description.split(" ").length > 40 ? (
                <>
                  {props.description.split(" ").slice(0, 40).join(" ")}
                  ... &nbsp;
                  <button
                    onClick={() => setExpanded(true)}
                    className="text-[#2C6472] font-semibold text-sm underline"
                  >
                    more
                  </button>
                </>
              ) : (
                props.description
              )}
            </p>

          </div>
        </div>

        <div className="mt-[32px] w-px h-[70%] bg-gray-200"></div>

        {/* Right Side - Skills + Match */}
        <div className="flex p-6 w-1/2">
          <div className="flex flex-col gap-4 w-1/2">
            {props.skillData.map((item, index) => (
              <div key={index} className="flex flex-col gap-1">
                <p className="font-semibold text-base">{item.label}</p>
                <p className="text-[#a09f9f] font-medium text-[14px]">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-5 items-center w-1/2">
            <div className="relative w-24 h-24">
              <svg
                viewBox="0 0 100 100"
                className="absolute top-0 left-0 w-full h-full"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="#E5E7EB"
                  strokeWidth="7"
                  fill="none"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="#2c6472"
                  strokeWidth="7"
                  fill="none"
                  strokeDasharray="282"
                  strokeDashoffset={282 - (282 * props.match_score) / 100}
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-lg font-semibold text-gray-800">
                {props.match_score}%
              </div>
            </div>

            <p className="text-xs font-bold">Profile Match</p>
            <button
              onClick={onSelect}
              disabled={isSelected}
              className={`px-7 py-1 text-sm border ${
                isSelected ? "bg-white border-[#2C6472]" : "text-white bg-[#2C6472] border-[#2C6472]"
              } text-[#2C6472] rounded-2xl transition-transform hover:scale-105`}
            >
              {isSelected ? "Selected" : "Select"}
            </button>

          </div>
        </div>
      </div>
    </div>)}
    </div>
  );
}

export default Cards;