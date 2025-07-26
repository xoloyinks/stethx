export interface PositiveData {
  key_contributing_factor: string;
  key_factor_rationale: string;
  clinical_recommendations: string[];
  risk_level: string;
  recommended_tests: string[];
  therapeutic_interventions: string[];
  diagnosis_code: string;
  comorbid_risk_factors: string[];
  follow_up_interval: string;
  lifestyle_goals: string[];
  referrals: string[];
  medication_considerations: string[];
}

export type NewsArticle = {
  source: {
    id: string | null;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
};

export type predictionData = {
    name: string;
    gender: string;
    age: string;
    HbA1c_level: string;
    smoking_history: string;
    heart_disease: boolean;
    hypertension: boolean;
    blood_glucose_level: string;
    bmi: string;
    prediction: string;
    decision_support: string;
    confidence: string | number;
    createdAt?: Date;
    patient_id?: string
}

export interface RiskAssessmentData {
  key_risk_factor: string;
  key_factor_rationale: string;
  clinical_recommendations: string[];
  risk_level: string;
  recommended_tests: string[];
  preventive_interventions: string[];
  comorbid_risk_factors: string[];
  follow_up_interval: string;
  lifestyle_goals: string[];
  referrals: string[];
}

export interface ReportModalProps {
  patientData: RiskAssessmentData;
  patientName: string;
  patientConfidence: number | string;
  isOpen: boolean;
  onClose: () => void;
}

export interface DiabetesReportModalProps {
  patientData: PositiveData;
  patientName: string;
  patientConfidence: number | string;
  isOpen: boolean;
  onClose: () => void;
}
