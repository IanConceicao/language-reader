const exampleQuiz = [
  {
    prompt: "Mocked: Why did the author write this article?",
    answers: [
      "To share their impressions of two books they recently read.",
      "To analyze the literary techniques used by Dan Brown.",
      "To describe their trip to Washington D.C.",
      "To promote their friend Gentil's recorded message.",
    ],
    correctAnswer: 0,
    answerExplanation:
      "The author wrote this article to share their impressions of two books they recently read.",
  },
  {
    prompt: "What did Gentil think of 'The Lost Symbol'?",
    answers: [
      "He thought it was boring.",
      "He thought it was fantastic.",
      "He thought it was too difficult to understand.",
      "He did not read the book.",
    ],
    correctAnswer: 1,
    answerExplanation: "Gentil thought 'The Lost Symbol' was fantastic.",
  },
  {
    prompt: "What is 'The Lost Symbol' about?",
    answers: [
      "The city of Washington D.C.",
      "A science fiction novel",
      "A historical monument",
      "An unknown symbol",
    ],
    correctAnswer: 3,
    answerExplanation: "'The Lost Symbol' is about an unknown symbol.",
  },
  {
    prompt:
      "What was the author's impression of the buildings and monuments in Washington D.C.?",
    answers: [
      "They were unremarkable and forgettable.",
      "They were old-fashioned and boring.",
      "They were fascinating and reminded the author of their visit over 50 years ago.",
      "They were confusing and frustrating.",
    ],
    correctAnswer: 2,
    answerExplanation:
      "The author was fascinated by the buildings and monuments in Washington D.C. and they reminded them of their visit over 50 years ago.",
  },
];

export default exampleQuiz;
