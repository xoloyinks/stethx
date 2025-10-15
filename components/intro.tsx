"use client"
import React, { useEffect, useState } from 'react'
import { FaCircleRadiation } from 'react-icons/fa6'

export default function Intro(){
  const fullText = "StethX";
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(fullText.slice(0, i + 1));
      i++;
      if (i === fullText.length) clearInterval(interval);
    }, 150); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='bg-slate-950 w-screen h-screen absolute transition-all ease-in-out'>
      <FaCircleRadiation className='absolute z-10 text-[300px] text-slate-900 animate-spin top-1/2' />
      <div className='absolute z-50 w-screen h-screen flex flex-col items-center justify-center backdrop-blur-2xl bg-black/40'>
        <p
          className="text-9xl relative font-bold bg-gradient-to-r from-teal-400 via-cyan-400 to-slate-400 bg-clip-text text-transparent"
          style={{
            width: "fit-content",
            borderRight: displayed.length === fullText.length ? "none" : "4px solid #fff",
            whiteSpace: "nowrap",
            overflow: "hidden"
          }}
        >
          {displayed}
          {/* StethX */}
          <span className="animate-pulse">|</span>
        </p>
        <p className='font-extrabold text-(--primary)'>For Diabetes Care</p>
      </div>
    </div>
  )
}