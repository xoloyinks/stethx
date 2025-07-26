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
  FaDiagnoses
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-2xl">
      <div className="rounded-lg shadow-2xl bg-black/50 max-w-6xl w-full max-h-[90vh] overflow-y-auto flex p-4 sm:p-8 backdrop-blur-xl">

        {/* Sidebar Navigation */}
        <div className="flex flex-col w-1/4 border-r-2 border-gray-400/10 p-4 text-white space-y-4">
          <h2 className="text-2xl font-bold mb-6">Report Navigation</h2>

          <button
            className={`flex items-center text-sm font-semibold p-2 rounded-md hover:bg-blue-200/50 ${
              activeTab === 'keyFactors' ? 'bg-blue-300/70' : ''
            }`}
            onClick={() => setActiveTab('keyFactors')}
          >
            <FaFileMedical className="mr-2" /> Key Risk Factors
          </button>

          <button
            className={`flex items-center text-sm font-semibold p-2 rounded-md hover:bg-blue-200/50 ${
              activeTab === 'clinical' ? 'bg-blue-300/70' : ''
            }`}
            onClick={() => setActiveTab('clinical')}
          >
            <FaHeartbeat className="mr-2" /> Clinical Recommendations
          </button>

          <button
            className={`flex items-center text-sm font-semibold p-2 rounded-md hover:bg-blue-200/50 ${
              activeTab === 'tests' ? 'bg-blue-300/70' : ''
            }`}
            onClick={() => setActiveTab('tests')}
          >
            <FaStethoscope className="mr-2" /> Recommended Tests
          </button>

          <button
            className={`flex items-center text-sm font-semibold p-2 rounded-md hover:bg-blue-200/50 ${
              activeTab === 'interventions' ? 'bg-blue-300/70' : ''
            }`}
            onClick={() => setActiveTab('interventions')}
          >
            <FaRunning className="mr-2" /> Preventive Interventions
          </button>

          <button
            className={`flex items-center text-sm font-semibold p-2 rounded-md hover:bg-blue-200/50 ${
              activeTab === 'lifestyle' ? 'bg-blue-300/70' : ''
            }`}
            onClick={() => setActiveTab('lifestyle')}
          >
            <FaBullseye className="mr-2" /> Lifestyle Goals
          </button>

          <button
            className={`flex items-center text-sm font-semibold p-2 rounded-md hover:bg-blue-200/50 ${
              activeTab === 'referrals' ? 'bg-blue-300/70' : ''
            }`}
            onClick={() => setActiveTab('referrals')}
          >
            <FaUsers className="mr-2" /> Referrals
          </button>
        </div>

        {/* Main Content */}
        <div className="flex flex-col w-3/4 pl-8 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-white">Risk Assessment Report</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-300"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className='bg-whidte rounded space-y-1 w-fit py-2 font-bold text-white text-xs mb-2'>
            <p className='flex items-center gap-2'><RiUserHeartLine /> {patientName}</p>
            <p className='flex items-center gap-2'><FaDiagnoses /> Non Diabetic - {typeof patientConfidence === 'number' ? Math.ceil(patientConfidence * 100) + '%' : patientConfidence } confidence</p>
          </div>
          {/* Tab Content */}
          <div className="space-y-3 text-gray-300">
            {activeTab === 'keyFactors' && (
              <>
                <h3 className="text-xl font-semibold">Key Risk Factor</h3>
                <p className="bg-gray-700 px-4 py-1 rounded-full w-fit text-sm">{patientData.key_risk_factor}</p>
                <p className="text-sm text-gray-400 mt-2">{patientData.key_factor_rationale}</p>
                <h3 className="text-xl font-semibold mt-4">Risk Level</h3>
                <p className={`${ patientData.risk_level === 'Low' ? "bg-white text-black" : patientData.risk_level === 'Moderate' ? "bg-yellow-400 text-white" :  "bg-red-700 animate-pulse" }   text-xs font-bold px-5 py-2 rounded-full w-fit`}>{patientData.risk_level}</p>
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
