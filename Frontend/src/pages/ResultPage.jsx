// src/pages/ResultPage.jsx
import React from "react";
import { useLocation,useNavigate } from "react-router-dom";
import SearchResults from "../Components/train/SearchResults";

const ResultPage=()=>{
    const location =useLocation();
    const navigate=useNavigate();
    const trains=location.state?.trains||[];

    const handleBackToSearch=()=>{
        navigate('/');
    };
    const handleSelectTrain=(train)=>{
        navigate('/booking',{state:{train}});
    };
    return(
        <div className="results-page">
            <SearchResults
            trains={trains}
            onBackToSearch={handleBackToSearch}
            onSelectTrain={handleSelectTrain}
            />
        </div>
    );
};
export default ResultPage;