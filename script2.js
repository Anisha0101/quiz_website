function addQuestion() {
    var questionContainer = document.getElementById("questionContainer");

    var questionInput = document.createElement("input");
    questionInput.type = "text";
    questionInput.name = "question";
    questionInput.className = "question-input";
    questionInput.placeholder = "Enter a question";

    var answerOptions = [];
    for (var i = 0; i < 4; i++) {
      var answerOption = document.createElement("input");
      answerOption.type = "text";
      answerOption.name = "answer";
      answerOption.className = "answer-option";
      answerOption.placeholder = "Enter an answer option";
      answerOptions.push(answerOption);
    }

    var correctAnswerSelect = document.createElement("select");
    correctAnswerSelect.name = "correctAnswer";
    for (var i = 0; i < 4; i++) {
      var option = document.createElement("option");
      option.value = i;
      option.text = String.fromCharCode(65 + i); // Convert to ASCII character A, B, C, D
      correctAnswerSelect.appendChild(option);
    }

    var questionDiv = document.createElement("div");
    questionDiv.appendChild(questionInput);
    answerOptions.forEach(function(option) {
      questionDiv.appendChild(option);
    });
    questionDiv.appendChild(correctAnswerSelect);

    questionContainer.appendChild(questionDiv);
  }

  document.getElementById("quizForm").addEventListener("submit", function(event) {
    event.preventDefault();

    var questions = document.getElementsByName("question");
    var answerOptions = document.getElementsByName("answer");
    var correctAnswers = document.getElementsByName("correctAnswer");
    var quiz = [];
    var score = 0;

    for (var i = 0; i < questions.length; i++) {
      var question = questions[i].value.trim();

      var options = [];
      for (var j = i * 4; j < i * 4 + 4; j++) {
        var answer = answerOptions[j].value.trim();
        options.push(answer);
      }

      var correctAnswerIndex = parseInt(correctAnswers[i].value, 10);
      var correctAnswer = options[correctAnswerIndex];

      if (question !== "" && options.every(function(option) { return option !== ""; })) {
        quiz.push({ question: question, options: options, correctAnswer: correctAnswer });
      }
    }

    var quizResult = document.getElementById("quizResult");
    var scoreDisplay = document.getElementById("score");

    if (quiz.length > 0) {
      quizResult.style.display = "block";

      quiz.forEach(function(item) {
        var userAnswer = prompt(item.question + "\n" + item.options.join("\n"));
        if (userAnswer !== null && userAnswer.trim().toLowerCase() === item.correctAnswer.toLowerCase()) {
          score++;
        }
      });

      scoreDisplay.innerHTML = "Your score: " + score + " out of " + quiz.length;
    } else {
      alert("Please enter at least one question, answer option, and select a correct answer!");
    }
  });