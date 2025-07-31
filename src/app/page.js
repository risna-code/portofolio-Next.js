'use client';
import Header from '../components/Header';
import HeroSection from '../components/HomeSection';
import AboutSection from '../components/AboutSection';
import ProjectSection from '../components/ProjectSection';
import Footer from '../components/FooterSection';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 text-white overflow-x-hidden relative">
      {/* Animated Global Background Elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-600 rounded-full filter blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600 rounded-full filter blur-3xl animate-float-delay"></div>
        <div className="absolute top-[10%] right-[5%] w-48 h-48 bg-cyan-500 rounded-full filter blur-3xl animate-float-alt"></div>
      </div>

      {/* Konten Utama */}
      <div className="relative z-10">
        <Header />
        <HeroSection />
        <AboutSection />
        <ProjectSection />
        <Footer />
      </div>

      {/* Global CSS Animation */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(8deg); }
        }
        @keyframes float-delay {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-35px) rotate(-10deg); }
        }
        @keyframes float-alt {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(20px) rotate(15deg); }
        }
        .animate-float {
          animation: float 10s ease-in-out infinite;
        }
        .animate-float-delay {
          animation: float-delay 14s ease-in-out infinite 2s;
        }
        .animate-float-alt {
          animation: float-alt 9s ease-in-out infinite 1s;
        }
      `}</style>
    </main>
  );
}
