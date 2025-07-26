'use client';

import { useState } from 'react';
import { DiabetesReportModalProps } from './types';
import { FaFileMedical, FaHeartbeat, FaStethoscope, FaPills, FaUsers, FaBed, FaPrint, FaDiagnoses } from 'react-icons/fa';
import { RiUserHeartLine } from 'react-icons/ri';



export default function DiabetesReportModal({ patientData, isOpen, patientName, patientConfidence, onClose }: DiabetesReportModalProps) {
  // State for active tab
  const [activeTab, setActiveTab] = useState<string>('keyFactors');

  console.log(patientConfidence)

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-2xl">
      <div className=" rounded-lg shadow-2xl bg-black/50 max-w-6xl w-full max-h-[90vh] overflow-y-auto flex p-4 sm:p-8 backdrop-blur-xl">
        
        {/* Sidebar Navigation with Glassmorphism */}
        <div className="flex flex-col w-1/4  rounded-lg border-r-2 border-gray-400/10 shadow-md p-4 space-y-4 text-white sticky top-4">
          <h2 className="text-2xl font-bold  mb-6">Report Navigation</h2>
          
          {/* Navigation Tabs */}
          <button
            className={`flex items-center text-sm font-semibold text-white p-2 rounded-md hover:bg-blue-200/50 transition-all ${
              activeTab === 'keyFactors' ? 'bg-blue-300/70' : ''
            }`}
            onClick={() => setActiveTab('keyFactors')}
          >
            <FaFileMedical className="mr-2" /> Key Factors
          </button>

          <button
            className={`flex items-center text-sm font-semibold justify-start text-white p-2 rounded-md hover:bg-blue-200/50 transition-all ${
              activeTab === 'clinical' ? 'bg-blue-300/70' : ''
            }`}
            onClick={() => setActiveTab('clinical')}
          >
            <FaHeartbeat className="mr-2" /> Recommendations
          </button>

          <button
            className={`flex items-center text-sm font-semibold text-white p-2 rounded-md hover:bg-blue-200/50 transition-all ${
              activeTab === 'tests' ? 'bg-blue-300/70' : ''
            }`}
            onClick={() => setActiveTab('tests')}
          >
            <FaStethoscope className="mr-2" /> Recommended Tests
          </button>

          <button
            className={`flex items-center text-sm font-semibold text-white p-2 rounded-md hover:bg-blue-200/50 transition-all ${
              activeTab === 'interventions' ? 'bg-blue-300/70' : ''
            }`}
            onClick={() => setActiveTab('interventions')}
          >
            <FaPills className="mr-2" /> Therapeutic Interventions
          </button>

          <button
            className={`flex items-center text-sm font-semibold text-white p-2 rounded-md hover:bg-blue-200/50 transition-all ${
              activeTab === 'referrals' ? 'bg-blue-300/70' : ''
            }`}
            onClick={() => setActiveTab('referrals')}
          >
            <FaUsers className="mr-2" /> Referrals
          </button>

          <button
            className={`flex items-center text-sm font-semibold text-white p-2 rounded-md hover:bg-blue-200/50 transition-all ${
              activeTab === 'medications' ? 'bg-blue-300/70' : ''
            }`}
            onClick={() => setActiveTab('medications')}
          >
            <FaBed className="mr-2" /> Medication Considerations
          </button>
        </div>

        {/* Main Content with Glassmorphism */}
        <div className="flex flex-col w-3/4 pl-8 rounded-lg p-6 ">
          {/* Close Button */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-white">Diabetes Report</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

           <div className='bg-whidte rounded space-y-1 w-fit py-2 font-bold text-white text-xs mb-2'>
                      <p className='flex items-center gap-2'><RiUserHeartLine /> {patientName}</p>
                      <p className='flex items-center gap-2 text-red-500'><FaDiagnoses /> Diabetic -  {typeof patientConfidence === 'number' ? Math.ceil(patientConfidence * 100) + '%' : patientConfidence } confidence</p>
                    </div>

          {/* Dynamic Content Sections */}
          <div className="space-y-6">
            {activeTab === 'keyFactors' && (
              <div>
                <h3 className="text-xl font-semibold text-gray-300">Key Contributing Factor</h3>
                <p className="bg-gray-700 p-2 text-white w-fit rounded-full text-xs my-5">{patientData.key_contributing_factor}</p>
                <p className="text-sm text-gray-400 mt-1">{patientData.key_factor_rationale}</p>
                <h3 className="text-xl font-semibold text-gray-300 mt-4">Risk Level</h3>
                <p className="bg-red-800 animate-pulse text-xs rounded-full py-2 px-5 text-white my-2 w-fit font-bold">{patientData.risk_level}</p>
              </div>
            )}

            {activeTab === 'clinical' && (
              <div>
                <h3 className="text-xl font-semibold text-gray-300">Clinical Recommendations</h3>
                <ul className="list-disc pl-6 text-gray-400">
                  {patientData.clinical_recommendations.map((rec, index) => (
                    <li key={index} className="mt-1">{rec}</li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'tests' && (
              <div>
                <h3 className="text-xl font-semibold text-gray-300">Recommended Tests</h3>
                <ul className="list-disc pl-6 text-gray-400">
                  {patientData.recommended_tests.map((test, index) => (
                    <li key={index} className="mt-1">{test}</li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'interventions' && (
              <div>
                <h3 className="text-xl font-semibold text-gray-300">Therapeutic Interventions</h3>
                <ul className="list-disc pl-6 text-gray-400">
                  {patientData.therapeutic_interventions.map((int, index) => (
                    <li key={index} className="mt-1">{int}</li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'referrals' && (
              <div>
                <h3 className="text-xl font-semibold text-gray-300">Referrals</h3>
                <ul className="list-disc pl-6 text-gray-400">
                  {patientData.referrals.map((ref, index) => (
                    <li key={index} className="mt-1">{ref}</li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'medications' && (
              <div>
                <h3 className="text-xl font-semibold text-gray-300">Medication Considerations</h3>
                <ul className="list-disc pl-6 text-gray-400">
                  {patientData.medication_considerations.map((med, index) => (
                    <li key={index} className="mt-1">{med}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end text-xs gap-4 mt-6">
            <button
              onClick={() => window.print()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center"
            >
              <FaPrint className="mr-2" /> Print Report
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
