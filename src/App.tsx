import { useState } from "react";
import QuizComponent from "../components/QuizComponent";
import "./App.css";

function App() {
  const [startQuiz, setStartQuiz] = useState(false);

  return (
    <main className="app-shell">
      {startQuiz ? (
        <QuizComponent />
      ) : (
        <section className="start-screen">
          <div className="card">
            <p className="eyebrow">My Quiz App</p>
            <h1>Quiz Challenge</h1>
            <p className="description">
              Test your knowledge with a short multiple-choice quiz.
            </p>
            <button
              type="button"
              className="start-button"
              onClick={() => setStartQuiz(true)}
            >
              Start Quiz
            </button>
          </div>
        </section>
      )}
    </main>
  );
}

export default App;
