"use client";
import dynamic from "next/dynamic";
const Navbar = dynamic(() => import("./Navbar"), { ssr: false, loading: () => <div>Loading Navbar...</div> });
const Footer = dynamic(() => import("./Footer"), { ssr: false, loading: () => <div>Loading Footer...</div> });
const QuantumPerformanceMonitor = dynamic(() => import("../../components/QuantumPerformanceMonitor"), { ssr: false, loading: () => <div>Loading Performance Monitor...</div> });
import { CurrencyProvider } from "../context/CurrencyContext";

export default function GlobalClientLayout({ children }) {
  return (
    <CurrencyProvider>
      <Navbar role="navigation" aria-label="Main Navigation" />
      <main id="main-content" className="min-h-screen" tabIndex="-1" role="main">
        {children}
        <Footer role="contentinfo" />
        <QuantumPerformanceMonitor />
      </main>
    </CurrencyProvider>
  );
}
