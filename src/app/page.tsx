import NavBar from '../app/components/Navbar'
import Hero from '../app/components/Hero'
import Features from '../app/components/Features'
import VoiceCoach from './components/VoiceCoach'
import Gamefication from './components/Gamification'
import Stats from '../app/components/Stats'
import Footer from '../app/components/Footer'
import ParticlesBg from '../app/components/ParticlesBg'

export default function Home() {
  return (
    <>
      <ParticlesBg />
      <NavBar />
      <main>
        <Hero />
        <Features />
        <VoiceCoach />
        <Gamefication />
        <Stats />
      </main>
      <Footer />
    </>
  );
}

