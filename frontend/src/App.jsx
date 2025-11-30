// src/App.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout.jsx';
import DynamicFormPage from './features/form/DynamicFormPage.jsx';
import SubmissionsPage from './features/submissions/SubmissionsPage.jsx';
import './index.css';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<DynamicFormPage />} />
        <Route path="/submissions" element={<SubmissionsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}
