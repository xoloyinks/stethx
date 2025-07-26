"use client";

import RiskReportModal from "@/components/negative";
import DiabetesReportModal from "@/components/positive";
import React, { useEffect, useState } from "react";
import { VscRobot } from "react-icons/vsc";
import { usePathname } from "next/navigation";
import auth from "@/components/auth";
import Cookies from "js-cookie"
import { predictionData as pt } from "@/components/types";
import { toast, ToastContainer } from "react-toastify";
const smokingOptions = [
  { label: "Never", value: 4 },
  { label: "No Info", value: 0 },
  { label: "Current", value: 1 },
  { label: "Former", value: 3 },
  { label: "Ever", value: 2 },
  { label: "Not Current", value: 5 },
];

const smokingConversion = (smokingId: string) => {
  const id = Number(smokingId)
  if(id === 1){
    return "Current"
  }else if(id === 2){
    return "Ever"
  }else if(id === 3){
    return "Former"
  }else if(id === 4){
    return "Never"
  }else{
    return "Not Current"
  }
}

export default function Predict() {
  const path = usePathname();
  const [form, setForm] = useState({
    gender: "0",
    age: "",
    hypertension: "0",
    heart_disease: "0",
    smoking_history: "4",
    HbA1c_level: "",
    bmi: "",
    blood_glucose_level: "",
    name: "",
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    prediction: string;
    confidence: number | null;
    clinical_decision_support: any;
    name: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isNegModalOpen, setIsNegModalOpen] = useState<boolean>(false);
  const [predictionDetails, setPredictionDetails] = useState<undefined | pt>();

  useEffect(() => {

    if(!predictionDetails) return;

    const token = Cookies.get('token');

    const saveDetails = async () => {
        const res = await fetch('http://localhost:3001/prediction', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(predictionDetails)
        });

        if(!res.ok){
           const errorData = await res.json();
          throw new Error(JSON.stringify(errorData, null, 2));
        }
        
        toast.success('Information saved!', {
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
    if(predictionDetails){
      saveDetails();
    }

  }, [predictionDetails])

  useEffect(() => {
    auth()
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const playClickSound = () => {
    const audio = new Audio("/sounds/mixkit-gaming-lock-2848.wav");
    audio.play();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setError(null);

    const data = [
      Number(form.gender),
      Number(form.age),
      Number(form.hypertension),
      Number(form.heart_disease),
      Number(form.smoking_history),
      Number(form.bmi),
      Number(form.HbA1c_level),
      Number(form.blood_glucose_level),
    ];

    try {
      const res = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data, name: form.name }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(JSON.stringify(errorData, null, 2));
      }

      const results = await res.json();
      if (results) {
        if (results.prediction === "Diabetic") {
          setIsModalOpen(true);
        } else {
          setIsNegModalOpen(true);
        }
      }
      const predictionData = {
        name: form.name,
        gender: Number(form.gender) === 0 ?  "Female" : "Male",
        age: form.age,
        HbA1c_level: form.HbA1c_level,
        smoking_history: smokingConversion(form.smoking_history),
        heart_disease: Number(form.heart_disease) === 1 ? true : false,
        hypertension: Number(form.hypertension) === 1 ? true : false,
        blood_glucose_level: form.blood_glucose_level,
        bmi: form.bmi,
        prediction: results.prediction,
        decision_support: JSON.stringify(results.clinical_decision_support),
        confidence: Math.ceil(results.confidence * 100) + '%'
      }



      setPredictionDetails(predictionData);
      setResult(results);
    } catch (err: any) {
      toast.error(err.message, {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: false,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
        });
      setResult(null);
      setError(err.message || "Error connecting to prediction service.");
    }
    setLoading(false);
  };

  return (
    <section className="min-h-screen bg-gray-950 w-full flex flex-col items-center p-4 sm:p-6 md:p-10">
      <ToastContainer />
      {/* Floating Robot Button */}
      {result && result.prediction === "Diabetic" ? (
        <button
          onClick={() => { 
            playClickSound(); 
            setIsModalOpen(true)}}
          className="fixed text-xl sm:text-2xl bg-white rounded-full w-12 sm:w-14 h-12 sm:h-14 flex items-center justify-center bottom-4 sm:bottom-6 right-4 sm:right-6 shadow-md shadow-gray-300 hover:bg-gray-300 transition-all ease-in-out hover:scale-110 cursor-pointer z-30"
        >
          <VscRobot />
        </button>
      ) : result && result.prediction === "Non-Diabetic" ? (
        <button
          onClick={() => {
            playClickSound();
            setIsNegModalOpen(true);
          }}
          className="fixed text-xl sm:text-2xl bg-white rounded-full w-12 sm:w-14 h-12 sm:h-14 flex items-center justify-center bottom-4 sm:bottom-6 right-4 sm:right-6 shadow-md shadow-gray-300 hover:bg-gray-300 transition-all ease-in-out hover:scale-110 cursor-pointer z-30"
        >
          <VscRobot />
        </button>
      ) : null}

      {/* Form Card */}
      <div className="w-full max-w-md sm:max-w-lg md:max-w-2xl bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8 text-white border border-gray-700">
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-center text-teal-400 mb-6">
          Diabetes Prediction
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="block text-xs sm:text-sm font-semibold mb-1 text-gray-300">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 text-sm sm:text-base rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs sm:text-sm font-semibold mb-1 text-gray-300">
                Gender
              </label>
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm sm:text-base rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="0">Female</option>
                <option value="1">Male</option>
              </select>
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-semibold mb-1 text-gray-300">
                Age
              </label>
              <input
                type="number"
                name="age"
                value={form.age}
                onChange={handleChange}
                required
                min={0}
                className="w-full px-3 py-2 text-sm sm:text-base rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs sm:text-sm font-semibold mb-1 text-gray-300">
                Hypertension
              </label>
              <select
                name="hypertension"
                value={form.hypertension}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm sm:text-base rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-semibold mb-1 text-gray-300">
                Heart Disease
              </label>
              <select
                name="heart_disease"
                value={form.heart_disease}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm sm:text-base rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-semibold mb-1 text-gray-300">
              Smoking History
            </label>
            <select
              name="smoking_history"
              value={form.smoking_history}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm sm:text-base rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              {smokingOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs sm:text-sm font-semibold mb-1 text-gray-300">
                BMI
              </label>
              <input
                type="number"
                name="bmi"
                value={form.bmi}
                onChange={handleChange}
                required
                step="any"
                min={0}
                className="w-full px-3 py-2 text-sm sm:text-base rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-semibold mb-1 text-gray-300">
                HbA1c Level
              </label>
              <input
                type="number"
                name="HbA1c_level"
                value={form.HbA1c_level}
                onChange={handleChange}
                required
                step="any"
                min={0}
                className="w-full px-3 py-2 text-sm sm:text-base rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-semibold mb-1 text-gray-300">
              Blood Glucose Level
            </label>
            <input
              type="number"
              name="blood_glucose_level"
              value={form.blood_glucose_level}
              onChange={handleChange}
              required
              step="any"
              min={0}
              className="w-full px-3 py-2 text-sm sm:text-base rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full text-sm sm:text-base  bg-teal-600 ${loading ? "bg-transparent hover:bg-transparent cursor-default" : "cursor-pointer"} hover:bg-teal-700  text-white font-bold py-2 rounded-lg transition-all duration-200`}
          >
            {loading ? <img src="/images/Siri.gif" alt="Ai animation" className="w-16 h-16 mx-auto" /> : "Predict"}
          </button>
        </form>
        {result &&
          (result.prediction === "Diabetic" ? (
            <DiabetesReportModal
              patientData={result.clinical_decision_support}
              patientName={result.name}
              patientConfidence={result.confidence || 0}
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            />
          ) : (
            <RiskReportModal
              isOpen={isNegModalOpen}
              onClose={() => setIsNegModalOpen(false)}
              patientName={result.name}
              patientConfidence={result.confidence || 0}
              patientData={result.clinical_decision_support}
            />
          ))}
      </div>
    </section>
  );
}