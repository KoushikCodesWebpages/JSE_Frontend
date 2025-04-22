import React from 'react';
import { ClipLoader } from 'react-spinners';
import style from "./Loader.module.css";

function Loader() {
    return (
        <div className={style.loaderContainer}>
            <ClipLoader color="#36d7b7" size={80} />
            <p className={style.loadingText}>Loading your dream job...</p>
        </div>
    );
}

export default Loader;