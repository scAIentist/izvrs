import Hero from "./components/Hero";
import WaveDivider from "./components/WaveDivider";
import Tips from "./components/Tips";
import About from "./components/About";

export default function Home() {
  return (
    <main>
      <Hero />
      <WaveDivider from="#0E3155" to="#c4f5f7" />
      <Tips />
      <WaveDivider from="#d4e8d4" to="#d4e8d4" />
      <About />
    </main>
  );
}
