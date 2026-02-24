import Hero from "./Landing_Page/Hero";
import "./App.css";

export default function App() {
  return (
    <main className="app">
      <Hero />
      <section className="next-section">
        <div className="next-section-content">
          <h2>Scroll to see more animations</h2>
          <p>The hero section responds smoothly to your scroll</p>
        </div>
      </section>
    </main>
  );
}