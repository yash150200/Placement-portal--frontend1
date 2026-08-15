//  import axios from 'axios';

//  const API = axios.create({
//    baseURL: 'http://localhost:5000/api'
//  });

//  API.interceptors.request.use((config) => {
//    const token = localStorage.getItem('token');
//    if (token) {
//      config.headers.Authorization = `Bearer ${token}`;
//    }
//    return config;
//  });

//  export default API;


import axios from "axios";

const API = axios.create({
  // baseURL: "http://localhost:5000/api",
   baseURL: "https://placement-portal-backend-main-bbwp.onrender.com/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/* =================================================
   🔥 AI (Groq) API FUNCTIONS — ONLY ADDITION
   ================================================= */

// 💬 Placement AI Chatbot
export const aiChat = (question) =>
  API.post("/ai/chat", { question });

// 🤖 Resume Skill Analyzer
export const analyzeResumeSkills = (resumeText) =>
  API.post("/ai/resume/skills", { resumeText });

// ✍️ Resume Improvement Suggestions
export const resumeSuggestions = (resumeText) =>
  API.post("/ai/resume/suggest", { resumeText });

// 🎯 Job Matching Score
export const jobMatchScore = (studentSkills, jobSkills) =>
  API.post("/ai/job-match", {
    studentSkills,
    jobSkills,
  });

export default API;
