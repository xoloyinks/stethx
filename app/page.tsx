"use client";

import auth from "@/components/auth";
import NewsCard from "@/components/NewsCard";
import PieChart from "@/components/pie";
import { NewsArticle, predictionData } from "@/components/types";
import { useEffect, useState } from "react";
import { GiStethoscope } from "react-icons/gi";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import Footer from "@/components/footer";

export default function Home() {
  const [myNews, setNews] = useState<NewsArticle[] | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [mostCommonRiskFactor, setMostCommonRiskFactor] = useState<string>("---");
  const [mostCommonContributingFactor, setMostCommonContributingFactor] = useState<string>("---");
  const [mostAffectedGender, setMostAffectedGender] = useState<string>("---");

  console.log(history)

  useEffect(() => {
    auth();
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?category=health&apiKey=${process.env.NEXT_PUBLIC_NEWS_API}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setNews(data.articles);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = Cookies.get("token");
        if (!token) {
          console.error("No token found");
          return;
        }

        const historyResponse = await fetch("https://stethx-backend.onrender.com/history", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!historyResponse.ok) {
          console.error("Failed to fetch history:", historyResponse.statusText);
          toast.error(`${historyResponse.statusText}`, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
          return;
        }

        const res = await historyResponse.json();
        const historyData = res.data || [];
        setHistory(historyData);

        // Analyze history for risk factors, contributing factors, and gender
        if (historyData.length > 0) {
          // Most Common Risk Factor
         const riskFactorCounts: { [key: string]: number } = {};
          historyData.forEach((record: predictionData) => {
            const decisionSupport = JSON.parse(record.decision_support || "{}");
            const riskFactor = decisionSupport.key_risk_factor || "Unknown";
            riskFactorCounts[riskFactor] = (riskFactorCounts[riskFactor] || 0) + 1;
          });
          const mostCommonRisk = Object.entries(riskFactorCounts).reduce(
            (a, b) => (b[1] > a[1] ? b : a),
            ["Unknown", 0]
          )[0];
          setMostCommonRiskFactor(mostCommonRisk);

          // Most Common Contributing Factor
          const contributingFactorCounts: { [key: string]: number } = {};
          historyData.forEach((record: predictionData) => {
            const decisionSupport = JSON.parse(record.decision_support || "{}");
            const factor =
              decisionSupport.key_contributing_factor || decisionSupport.key_risk_factor || "Unknown";
            contributingFactorCounts[factor] = (contributingFactorCounts[factor] || 0) + 1;
          });
          const mostCommonContributing = Object.entries(contributingFactorCounts).reduce(
            (a, b) => (b[1] > a[1] ? b : a),
            ["Unknown", 0]
          )[0];
          setMostCommonContributingFactor(mostCommonContributing);

          // Most Affected Gender (for Diabetic patients)
          const genderCounts: { [key: string]: number } = {};
          historyData
            .filter((record: predictionData) => record.prediction === "Diabetic")
            .forEach((record: predictionData) => {
              const gender = record.gender || "None";
              genderCounts[gender] = (genderCounts[gender] || 0) + 1;
            });
          const mostAffected = Object.entries(genderCounts).reduce(
            (a, b) => (b[1] > a[1] ? b : a),
            ["None", 0]
          )[0];
          setMostAffectedGender(mostAffected);
        }
      } catch (error) {
        console.error("Error fetching history:", error);
        toast.error('Error fetching history', {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: false,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                        });
              }
    };

    fetchHistory();
  }, []);

  return (
    <div className="w-screen overflow-x-hidden relative bg-gray-950">
      <ToastContainer />
      
      <div className="flex flex-col justify-between h-full">
        <h2 className="flex justify-center text-white font-extrabold text-lg md:text-2xl py-3">
          Report Analysis
        </h2>
        <div className="flex md:flex-row flex-col justify-center sm:my-5 gap-10">
          <div className="bg-gradient-to-tr w-[26%] not-sm:w-[85%] not-sm:mx-auto from-gray-900/30 to-gray-900 rounded-4xl">
            <PieChart />
          </div>
          <div className="py-10 md:py-12 px-10 md:px-16 not-sm:w-[85%] not-sm:mx-auto bg-gradient-to-tr from-gray-900/30 to-gray-900 rounded-3xl shadow-2xl flex flex-col gap-10 items-center relative overflow-hidden transition-transform transform">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-blue-500/10 opacity-50 z-0" />
            <div className="text-xl text-white p-5 mx-auto w-fit rounded-full bg-black/50">
              <GiStethoscope />
            </div>

            {/* Most Common Risk Factor */}
            <div className="relative z-10 flex flex-col items-center gap-4">
              <h3 className="text-white font-bold text-md text-center md:text-md tracking-tight">
                Most Common Risk Factor
              </h3>
              <div className="py-3 px-12 bg-red-600 text-white font-semibold text-lg rounded-full w-fit text-center shadow-md hover:bg-red-700 transition-colors">
                {mostCommonRiskFactor}
              </div>
            </div>

            {/* Most Common Contributing Factor */}
            <div className="relative z-10 flex flex-col items-center gap-4">
              <h3 className="text-white font-bold text-center text-md md:text-md tracking-tight">
                Most Common Contributing Factor
              </h3>
              <div className="py-3 px-12 bg-white text-black font-semibold text-lg rounded-full w-fit text-center shadow-md hover:bg-gray-200 transition-colors">
                {mostCommonContributingFactor}
              </div>
            </div>

            {/* Most Affected Gender */}
            <div className="relative z-10 flex flex-col items-center gap-4">
              <h3 className="text-white font-bold text-center text-md md:text-md tracking-tight">
                Most Affected Gender
              </h3>
              <div className="py-3 px-12 bg-blue-600 text-white font-semibold text-lg rounded-full w-fit text-center shadow-md hover:bg-blue-700 transition-colors">
                {mostAffectedGender}
              </div>
            </div>
          </div>
        </div>
        <h2 className="flex justify-center text-white font-extrabold text-lg md:text-2xl py-3">
          {myNews && 'Top Health Articles'}
        </h2>
        {
          loading && (
            <div className="flex justify-center items-center h-[600px]">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white"></div>
            </div>
          )
        }
        {
          myNews && (
            <div className="w-full justify-evenly text-white flex flex-wrap h-[600px] overflow-y-scroll">
            {myNews && myNews.map((news: NewsArticle, idx: number) => <NewsCard key={idx} article={news} />)}
          </div>
          )
        }
        
      </div>

      <img 
          src={'/images/path.svg'}
          alt={'Blob'}
          className="absolute top-50 opacity-30 z-0 not-sm:-left-20"
        />
        <img 
          src={'/images/spiderblob.svg'}
          alt={'Blob'}
          className="absolute right-0 top-50 opacity-30 z-0 not-sm:-right-16"
        />
        <img 
          src={'/images/statsmallblobsvg.svg'}
          alt={'Blob'}
          className="absolute left-70 top-20 opacity-10 z-0 "
        />
        <img 
          src={'/images/statsmallblobsvg.svg'}
          alt={'Blob'}
          className="absolute right-70 top-80 opacity-10 z-0 not-sm:hidden"
        />

        <Footer />
    </div>
  );
}