'use client';

import { useState } from 'react';
import { DiabetesReportModalProps } from './types';
import {
  FaFileMedical, FaHeartbeat, FaStethoscope, FaPills,
  FaUsers, FaBed, FaPrint, FaDiagnoses, FaBars
} from 'react-icons/fa';
import { RiUserHeartLine } from 'react-icons/ri';

export default function DiabetesReportModal({
  patientData,
  isOpen,
  patientName,
  patientConfidence,
  onClose,
}: DiabetesReportModalProps) {
  const [activeTab, setActiveTab] = useState<string>('keyFactors');
  const [showSidebar, setShowSidebar] = useState(false);

  if (!isOpen) return null;

  const navItems = [
    { id: 'keyFactors', label: 'Key Factors', icon: <FaFileMedical /> },
    { id: 'clinical', label: 'Recommendations', icon: <FaHeartbeat /> },
    { id: 'tests', label: 'Recommended Tests', icon: <FaStethoscope /> },
    { id: 'interventions', label: 'Therapeutic Interventions', icon: <FaPills /> },
    { id: 'referrals', label: 'Referrals', icon: <FaUsers /> },
    { id: 'medications', label: 'Medication Considerations', icon: <FaBed /> },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-2xl">
      <div className="bg-black/50 rounded-lg shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto flex flex-col md:flex-row p-4 sm:p-6 backdrop-blur-xl relative">
        
        {/* Mobile sidebar toggle */}
        <button
          className="md:hidden text-white text-xl absolute top-4 left-4 z-50"
          onClick={() => setShowSidebar(true)}
          aria-label="Open sidebar"
        >
          <FaBars />
        </button>

        {/* Sidebar backdrop for mobile */}
        {showSidebar && (
          <div
            className="fixed inset-0 z-40 bg-black/60 md:hidden"
            onClick={() => setShowSidebar(false)}
          />
        )}

        {/* Sidebar */}
        <div className={`fixed md:static top-0 left-0 h-full w-64 z-50 md:z-auto bg-black/80 backdrop-blur-md border-r border-white/10 p-4 transition-transform duration-300 ease-in-out
          ${showSidebar ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:flex flex-col space-y-4`}
        >
          <h2 className="text-xl font-bold text-white mb-4">Report Navigation</h2>
          {navItems.map(({ id, label, icon }) => (
            <button
              key={id}
              className={`flex items-center text-sm font-semibold text-white p-2 rounded-md hover:bg-blue-200/50 transition-all ${
                activeTab === id ? 'bg-blue-300/70' : ''
              }`}
              onClick={() => {
                setActiveTab(id);
                setShowSidebar(false); // auto-close on mobile
              }}
            >
              <span className="mr-2">{icon}</span>
              <span className='text-left'>{label}</span> 
            </button>
          ))}
        </div>

        {/* Main content */}
        <div className="w-full md:w-3/4 md:pl-8 mt-8 md:mt-0">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-white">Diabetes Report</h2>
            <button
              onClick={onClose}
              className="text-gray-300 hover:text-white focus:outline-none"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className='bg-white/10 rounded space-y-1 w-fit py-2 px-3 font-bold text-white text-xs mb-4'>
            <p className='flex items-center gap-2'><RiUserHeartLine /> {patientName}</p>
            <p className='flex items-center gap-2 text-red-500'>
              <FaDiagnoses /> Diabetic - {typeof patientConfidence === 'number' ? Math.ceil(patientConfidence * 100) + '%' : patientConfidence}
            </p>
          </div>

          <div className="space-y-6 text-sm text-gray-300 overflow-y-auto">
            {activeTab === 'keyFactors' && (
              <>
                <h3 className="text-xl font-semibold">Key Contributing Factor</h3>
                <p className="bg-gray-700 px-4 py-2 rounded-full text-white text-xs w-fit">{patientData.key_contributing_factor}</p>
                <p className="text-gray-400">{patientData.key_factor_rationale}</p>
                <h3 className="text-xl font-semibold mt-4">Risk Level</h3>
                <p className="bg-red-800 animate-pulse text-xs rounded-full py-2 px-5 text-white font-bold w-fit">{patientData.risk_level}</p>
              </>
            )}
            {activeTab === 'clinical' && (
              <>
                <h3 className="text-xl font-semibold">Clinical Recommendations</h3>
                <ul className="list-disc pl-6 text-gray-400">
                  {patientData.clinical_recommendations.map((rec, i) => <li key={i}>{rec}</li>)}
                </ul>
              </>
            )}
            {activeTab === 'tests' && (
              <>
                <h3 className="text-xl font-semibold">Recommended Tests</h3>
                <ul className="list-disc pl-6 text-gray-400">
                  {patientData.recommended_tests.map((test, i) => <li key={i}>{test}</li>)}
                </ul>
              </>
            )}
            {activeTab === 'interventions' && (
              <>
                <h3 className="text-xl font-semibold">Therapeutic Interventions</h3>
                <ul className="list-disc pl-6 text-gray-400">
                  {patientData.therapeutic_interventions.map((int, i) => <li key={i}>{int}</li>)}
                </ul>
              </>
            )}
            {activeTab === 'referrals' && (
              <>
                <h3 className="text-xl font-semibold">Referrals</h3>
                <ul className="list-disc pl-6 text-gray-400">
                  {patientData.referrals.map((ref, i) => <li key={i}>{ref}</li>)}
                </ul>
              </>
            )}
            {activeTab === 'medications' && (
              <>
                <h3 className="text-xl font-semibold">Medication Considerations</h3>
                <ul className="list-disc pl-6 text-gray-400">
                  {patientData.medication_considerations.map((med, i) => <li key={i}>{med}</li>)}
                </ul>
              </>
            )}
          </div>

          {/* Buttons */}
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
