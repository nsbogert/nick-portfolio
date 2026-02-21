import { ChatProvider } from './components/chat/ChatProvider';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/hero/Hero';
import About from './components/about/About';
import ExperienceTimeline from './components/experience/ExperienceTimeline';
import ProjectGrid from './components/projects/ProjectGrid';
import ResumeSection from './components/resume/ResumeSection';
import ChatSection from './components/chat/ChatSection';
import ChatPanel from './components/chat/ChatPanel';

export default function App() {
  return (
    <ChatProvider>
      <Navbar />
      <main>
        <Hero />
        <About />
        <ExperienceTimeline />
        <ProjectGrid />
        <ResumeSection />
        <ChatSection />
      </main>
      <Footer />
      <ChatPanel />
    </ChatProvider>
  );
}
