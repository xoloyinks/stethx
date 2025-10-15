'use client';

import { useState } from 'react';
import {
  FaFileMedical,
  FaHeartbeat,
  FaStethoscope,
  FaRunning,
  FaUsers,
  FaBullseye,
  FaPrint,
  FaDiagnoses,
  FaBars,
} from 'react-icons/fa';
import { RiUserHeartLine } from 'react-icons/ri';
import { ReportModalProps } from './types';

export default function RiskReportModal({
  patientData,
  patientName,
  patientConfidence,
  isOpen,
  onClose
}: ReportModalProps) {
  const [activeTab, setActiveTab] = useState<string>('keyFactors');
  const [showSidebar, setShowSidebar] = useState(false);

  if (!isOpen) return null;

  const navItems = [
    { id: 'keyFactors', label: 'Key Risk Factors', icon: <FaFileMedical /> },
    { id: 'clinical', label: 'Clinical Recommendations', icon: <FaHeartbeat /> },
    { id: 'tests', label: 'Recommended Tests', icon: <FaStethoscope /> },
    { id: 'interventions', label: 'Preventive Interventions', icon: <FaRunning /> },
    { id: 'lifestyle', label: 'Lifestyle Goals', icon: <FaBullseye /> },
    { id: 'referrals', label: 'Referrals', icon: <FaUsers /> },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950">
      <div className="rounded-lg shadow-2xl bg-black max-w-6xl w-full max-h-[90vh] overflow-y-auto flex flex-col md:flex-row p-4 sm:p-8  relative">

        {/* Toggle button (mobile only) */}
        <button
          className="md:hidden text-white text-xl absolute top-4 left-4 z-50"
          onClick={() => setShowSidebar(true)}
          aria-label="Open sidebar"
        >
          <FaBars />
        </button>

        {/* Mobile backdrop */}
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
                setShowSidebar(false); // close sidebar on mobile
              }}
            >
              <span className="mr-2">{icon}</span>
              <span className='text-left'>{label}</span> 
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="flex flex-col w-full md:w-3/4 md:pl-8 mt-8 md:mt-0 p-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-white">Risk Assessment Report</h2>
            <button
              onClick={onClose}
              className="text-gray-300 hover:text-white"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Patient Info */}
          <div className='bg-white/10 rounded space-y-1 w-fit py-2 px-3 font-bold text-white text-xs mb-4'>
            <p className='flex items-center gap-2'><RiUserHeartLine /> {patientName}</p>
            <p className='flex items-center gap-2 text-green-400'>
              <FaDiagnoses /> Non Diabetic - {typeof patientConfidence === 'number' ? Math.ceil(patientConfidence * 100) + '%' : patientConfidence}
            </p>
          </div>

          {/* Tab Content */}
          <div className="space-y-3 text-gray-300">
            {activeTab === 'keyFactors' && (
              <>
                <h3 className="text-xl font-semibold">Key Risk Factor</h3>
                <p className="bg-gray-700 px-4 py-1 rounded-full w-fit text-sm">{patientData.key_risk_factor}</p>
                <p className="text-sm text-gray-400 mt-2">{patientData.key_factor_rationale}</p>
                <h3 className="text-xl font-semibold mt-4">Risk Level</h3>
                <p className={`${patientData.risk_level === 'Low'
                    ? "bg-white text-black"
                    : patientData.risk_level === 'Moderate'
                    ? "bg-yellow-400 text-white"
                    : "bg-red-700 animate-pulse"} text-xs font-bold px-5 py-2 rounded-full w-fit`}>
                  {patientData.risk_level}
                </p>
              </>
            )}

            {activeTab === 'clinical' && (
              <>
                <h3 className="text-xl font-semibold">Clinical Recommendations</h3>
                <ul className="list-disc pl-6 text-gray-400">
                  {patientData.clinical_recommendations.map((rec, idx) => (
                    <li key={idx} className="mt-1">{rec}</li>
                  ))}
                </ul>
              </>
            )}

            {activeTab === 'tests' && (
              <>
                <h3 className="text-xl font-semibold">Recommended Tests</h3>
                <ul className="list-disc pl-6 text-gray-400">
                  {patientData.recommended_tests.map((test, idx) => (
                    <li key={idx} className="mt-1">{test}</li>
                  ))}
                </ul>
              </>
            )}

            {activeTab === 'interventions' && (
              <>
                <h3 className="text-xl font-semibold">Preventive Interventions</h3>
                <ul className="list-disc pl-6 text-gray-400">
                  {patientData.preventive_interventions.map((int, idx) => (
                    <li key={idx} className="mt-1">{int}</li>
                  ))}
                </ul>
              </>
            )}

            {activeTab === 'lifestyle' && (
              <>
                <h3 className="text-xl font-semibold">Lifestyle Goals</h3>
                <ul className="list-disc pl-6 text-gray-400">
                  {patientData.lifestyle_goals.map((goal, idx) => (
                    <li key={idx} className="mt-1">{goal}</li>
                  ))}
                </ul>
              </>
            )}

            {activeTab === 'referrals' && (
              <>
                <h3 className="text-xl font-semibold">Referrals</h3>
                <ul className="list-disc pl-6 text-gray-400">
                  {patientData.referrals.map((ref, idx) => (
                    <li key={idx} className="mt-1">{ref}</li>
                  ))}
                </ul>
              </>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 mt-6 text-xs">
            <button
              onClick={() => window.print()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
            >
              <FaPrint className="mr-2" /> Print Report
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
