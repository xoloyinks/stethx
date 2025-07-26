"use client";

import auth from "@/components/auth";
import React, { useState, useRef, useEffect } from "react";
import { BsCopy } from "react-icons/bs";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import DiabetesReportModal from "@/components/positive";
import RiskReportModal from "@/components/negative";
import { predictionData } from "@/components/types";

export default function History() {
  const [filter, setFilter] = useState<string>("");
  const [modalData, setModalData] = useState<predictionData | null>(null);
  const [hiddenRows, setHiddenRows] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const rowsPerPage = 10;
  const tableRef = useRef<HTMLTableElement>(null);
  const [history, setHistory] = useState<predictionData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isNegModalOpen, setIsNegModalOpen] = useState<boolean>(false);

  useEffect(() => {
    auth();
  }, []);

  useEffect(() => {
    const fetchHistory = async () => {
      const token = Cookies.get("token");
      try {
        setLoading(true);
        const response = await fetch("https://stethx-backend.onrender.com/history", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          toast.error("Error fetching history", {
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

        const res = await response.json();
        const historyData: predictionData[] = res.data || [];
        setHistory(historyData);
      } catch (err) {
        console.error("Error fetching history:", err);
        toast.error("Error fetching history", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const toggleRowVisibility = (id: string) => {
    setHiddenRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert(`Copied: ${text}`);
  };

  const printRow = (record: predictionData) => {
    const printable = `
      <html>
        <head><title>Print Patient Record</title></head>
        <body>
          <h2>Patient Record</h2>
          <p><strong>Name:</strong> ${record.name}</p>
          <p><strong>Gender:</strong> ${record.gender}</p>
          <p><strong>Patient ID:</strong> ${record.patient_id}</p>
          <p><strong>Date:</strong> ${record.createdAt}</p>
          <p><strong>Diagnosis:</strong> ${record.prediction}</p>
          <p><strong>Code:</strong> ${
            JSON.parse(record.decision_support).diagnosis_code || "----"
          }</p>
          <p><strong>Risk Level:</strong> ${
            JSON.parse(record.decision_support).risk_level
          }</p>
        </body>
      </html>
    `;
    const newWindow = window.open("", "_blank");
    if (newWindow) {
      newWindow.document.write(printable);
      newWindow.document.close();
      newWindow.print();
    }
  };

  const printAll = () => {
    if (!tableRef.current) return;

    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head><title>Print All Patient Records</title></head>
          <body>${tableRef.current.outerHTML}</body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const filteredData = history?.filter((record: predictionData) =>
    Object.values(record).some((val) =>
      String(val).toLowerCase().includes(filter.toLowerCase())
    )
  ) || [];

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <section className="p-5 md:p-10 text-white relative">
      <ToastContainer />
      <h2 className="text-2xl font-bold text-center mb-6">History Records</h2>

      <div className="mb-4 flex flex-col md:flex-row md:justify-between items-center gap-4">
        <input
          type="text"
          placeholder="Search records..."
          className="p-2 rounded border border-gray-600 bg-gray-800 text-white w-full md:max-w-sm"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <button
          onClick={printAll}
          className="bg-green-600 hover:bg-green-700 px-4 py-2 text-sm rounded text-white"
        >
          🖨️ Print All
        </button>
      </div>

      <div className="overflow-auto rounded-lg border border-gray-700" ref={tableRef}>
        <table className="w-full table-auto text-sm">
          <thead className="bg-gray-800">
            <tr>
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Gender</th>
              <th className="p-3 text-left">Patient ID</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Diagnosis</th>
              <th className="p-3 text-left">Code</th>
              <th className="p-3 text-left">Risk Level</th>
              <th className="p-3 text-left">Action</th>
              <th className="p-3 text-left">Privacy</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td className="p-3" colSpan={10}>
                  Fetching History...
                </td>
              </tr>
            )}
            {!loading && paginatedData.length === 0 && (
              <tr>
                <td className="p-3" colSpan={10}>
                  No record found!
                </td>
              </tr>
            )}
            {!loading &&
              paginatedData.map((record: predictionData, index: number) => {
                const isHidden = hiddenRows.includes(record.patient_id || '');
                return (
                  <tr
                    key={index}
                    className="border-t border-gray-700 hover:bg-gray-800 transition-all"
                  >
                    <td className="p-3">{(currentPage - 1) * rowsPerPage + index + 1}</td>
                    <td className="p-3">{isHidden ? "••••••••" : record.name}</td>
                    <td className="p-3">{isHidden ? "••" : record.gender}</td>
                    <td className="p-3 flex items-center gap-2">
                      {isHidden ? "••" : record.patient_id}
                      {!isHidden && (
                        <button
                          onClick={() => copyToClipboard(record.patient_id || '')}
                          className="text-blue-400 text-xs underline"
                        >
                          <BsCopy />
                        </button>
                      )}
                    </td>
                    <td className="p-3">
                      {isHidden
                        ? "••••-••-••"
                        : new Date(record.createdAt || '').toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                    </td>
                    <td className="p-3">{isHidden ? "••••••••" : record.prediction}</td>
                    <td className="p-3">
                      {isHidden
                        ? "••••"
                        : JSON.parse(record.decision_support).diagnosis_code || "--"}
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          JSON.parse(record.decision_support).risk_level === "High"
                            ? "bg-red-500"
                            : JSON.parse(record.decision_support).risk_level === "Moderate"
                            ? "bg-yellow-400 text-black"
                            : "bg-green-500"
                        }`}
                      >
                        {JSON.parse(record.decision_support).risk_level}
                      </span>
                    </td>
                    <td className="p-3 flex gap-1">
                      <button
                        onClick={() => {
                          setModalData(record);
                          if (record.prediction === "Non-Diabetic") {
                            setIsNegModalOpen(true);
                          } else {
                            setIsModalOpen(true);
                          }
                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 rounded"
                      >
                        View Decision
                      </button>
                      <button
                        onClick={() => printRow(record)}
                        className="bg-gray-600 hover:bg-gray-700 text-white text-xs px-3 py-1 rounded"
                      >
                        Print row
                      </button>
                    </td>
                    <td className="p-3">
                      <button onClick={() => toggleRowVisibility(record.patient_id || '')}>
                        {isHidden ? (
                          <span title="Show" className="text-gray-400">
                            👁️
                          </span>
                        ) : (
                          <span title="Hide" className="text-gray-400">
                            🙈
                          </span>
                        )}
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="mt-4 flex justify-center gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-600 text-white rounded disabled:opacity-50"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-1 rounded ${
                currentPage === page ? "bg-blue-600" : "bg-gray-600"
              } text-white`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-600 text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {modalData && (
        modalData.prediction !== "Non-Diabetic" ? (
          <DiabetesReportModal
            patientData={JSON.parse(modalData.decision_support)}
            patientName={modalData.name}
            patientConfidence={modalData.confidence}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        ) : (
          <RiskReportModal
            isOpen={isNegModalOpen}
            onClose={() => setIsNegModalOpen(false)}
            patientName={modalData.name}
            patientConfidence={modalData.confidence}
            patientData={JSON.parse(modalData.decision_support)}
          />
        ))}
    </section>
  );
}