import { useMemo, useState } from "react";
import "./QuizComponent.css";

type Question = {
  id: number;
  qtext: string;
  options: string[];
  correctAnswer: string;
};

const questions: Question[] = [
  {
    id: 1,
    qtext: "What is 6 × 7?",
    options: ["36", "42", "48", "54"],
    correctAnswer: "42",
  },
  {
    id: 2,
    qtext: "What is 9 × 5?",
    options: ["35", "40", "45", "50"],
    correctAnswer: "45",
  },
  {
    id: 3,
    qtext: "What is 48 ÷ 6?",
    options: ["6", "7", "8", "9"],
    correctAnswer: "8",
  },
  {
    id: 4,
    qtext: "What is 72 ÷ 9?",
    options: ["6", "7", "8", "9"],
    correctAnswer: "8",
  },
  {
    id: 5,
    qtext: "What is 12 × 4?",
    options: ["42", "44", "46", "48"],
    correctAnswer: "48",
  },
];

function QuizComponent() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [finalResult, setFinalResult] = useState<{
    correct: number;
    wrong: number;
  } | null>(null);

  const question = questions[currentQuestion];
  const progressText = useMemo(
    () =>
      Array.from({ length: questions.length }, (_, index) =>
        index < currentQuestion ? "■" : "□",
      ).join(" "),
    [currentQuestion],
  );

  const correctAnswers = finalResult?.correct ?? score;
  const wrongAnswers = finalResult?.wrong ?? questions.length - score;

  const handleAnswer = (option: string) => {
    if (selectedAnswer) return;

    setSelectedAnswer(option);

    if (option === question.correctAnswer) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion === questions.length - 1) {
      const finalCorrect =
        selectedAnswer === question.correctAnswer ? score + 1 : score;
      const finalWrong = questions.length - finalCorrect;

      setFinalResult({ correct: finalCorrect, wrong: finalWrong });
      setQuizCompleted(true);
      setCurrentQuestion(0);
      setSelectedAnswer(null);
      setScore(0);
      return;
    }

    setCurrentQuestion((prev) => prev + 1);
    setSelectedAnswer(null);
  };

  const isFinished =
    currentQuestion === questions.length - 1 && selectedAnswer !== null;

  if (quizCompleted) {
    return (
      <section className="quiz-container">
        <div className="quiz-card result-card">
          <p className="result-label">Quiz Completed</p>
          <h1>Your Results</h1>
          <div className="result-summary">
            <p>
              <strong>Correct:</strong> {correctAnswers}
            </p>
            <p>
              <strong>Wrong:</strong> {wrongAnswers}
            </p>
            <p>
              <strong>Score:</strong> {correctAnswers} / {questions.length}
            </p>
          </div>
          <div className="result-actions">
            <button
              type="button"
              className="next-button"
              onClick={() => {
                setFinalResult(null);
                setQuizCompleted(false);
                setSelectedAnswer(null);
                setCurrentQuestion(0);
                setScore(0);
              }}
            >
              Try Again
            </button>
            <button
              type="button"
              className="home-button"
              onClick={() => {
                setFinalResult(null);
                setQuizCompleted(false);
                setSelectedAnswer(null);
                setCurrentQuestion(0);
                setScore(0);
                window.location.reload();
              }}
            >
              Return Home
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="quiz-container">
      <div className="quiz-progress">
        <h2>Progress: {progressText}</h2>
        <h3>
          Score: {score} / {questions.length}
        </h3>
      </div>

      <div className="quiz-card">
        <p className="question-number">Question {currentQuestion + 1}</p>
        <h1>{question.qtext}</h1>

        <div className="quiz-options">
          {question.options.map((option) => (
            <button
              key={option}
              type="button"
              className={`option-button bg-indigo-50 ${selectedAnswer === option ? "bg-sky-200" : ""}`}
              onClick={() => handleAnswer(option)}
              disabled={selectedAnswer !== null}
            >
              {option}
            </button>
          ))}
        </div>

        {selectedAnswer !== null && (
          <button type="button" className="next-button" onClick={handleNext}>
            {isFinished ? "Finish Quiz" : "Next Question"}
          </button>
        )}
      </div>
    </section>
  );
}

export default QuizComponent;
