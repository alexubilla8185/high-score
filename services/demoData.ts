import { Question, QuestionType } from "../types";

// A self-contained, base64-encoded SVG for the image question to avoid external dependencies.
// This SVG shows a red circle with three question marks inside, on a colorful gradient background.
const demoImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJncmFkIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojMDA3OUZGOyIgLz48c3RvcCBvZmZzZXQ9IjUwJSIgc3R5bGU9InN0b3AtY29sb3I6IzAwREZBMjsiIC8+PHN0vcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNGNkZBNzA7IiAvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSJ1clsoI2dyYWQpIiAvPjxjaXJjbGUgY3g9IjIwMCIgY3k9IjIwMCIgcj0iMTAwIiBmaWxsPSIjRkYwMDYwIiAvPjx0ZXh0IHg9IjIwMCIgeT0iMjMwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTIwIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+Pz8/PC90ZXh0Pjwvc3ZnPg==';


export const demoQuestions: Question[] = [
    {
        type: QuestionType.MultipleChoice,
        question: "If you were a flavor, what would you be?",
        options: ["Cosmic Raspberry", "Slightly Confused Lemon", "Existential Caramel", "Tuesday"],
        answer: "Tuesday",
        explanation: "Because Tuesday isn't a flavor, and that's the most unexpected, high-brain answer. Well done.",
        demoFeedback: "A truly inspired choice. You think outside the carton."
    },
    {
        type: QuestionType.ShortAnswer,
        question: "What is the secret that all squirrels know?",
        answer: "Gravity is a suggestion",
        explanation: "Their erratic movements and death-defying leaps are proof. They're just humoring us by staying on the ground.",
        demoFeedback: "I see you've been talking to the squirrels. Respect."
    },
    {
        type: QuestionType.ImageQuestion,
        question: "This image contains three question marks. What color is the circle they are inside?",
        imageUrl: demoImage,
        answer: "Red",
        explanation: "Correct! It's a fiery red circle, pondering the great mysteries of the... hey, what were we talking about?",
        demoFeedback: "Your eyes do not deceive you. Excellent observation."
    },
    {
        type: QuestionType.MultipleChoice,
        question: "What would be the worst thing to hear a pilot say mid-flight?",
        options: ["'Does anyone know how to fly a plane?'", "'We're out of coffee.'", "'I'm going to try a loop-the-loop.'", "'This seems like a good time for a nap.'"],
        answer: "'We're out of coffee.'",
        explanation: "The other options are temporary problems. A flight without coffee? That's a true crisis.",
        demoFeedback: "You have your priorities straight. I like that."
    },
    {
        type: QuestionType.ShortAnswer,
        question: "If animals could talk, which species would be the rudest?",
        answer: "Geese",
        explanation: "Honk. Honk. Need we say more? They are the bullies of the animal kingdom.",
        demoFeedback: "Ah, a fellow victim of the goose menace. I understand."
    },
    {
        type: QuestionType.MultipleChoice,
        question: "What's the best way to get a cat to respect you?",
        options: ["Ignore it.", "Give it treats.", "Stare at it without blinking.", "It's a trick question. You can't."],
        answer: "It's a trick question. You can't.",
        explanation: "A cat's respect is a myth, a legend, a story told to children. You can only hope for tolerance.",
        demoFeedback: "You've owned a cat before, haven't you?"
    },
    {
        type: QuestionType.ShortAnswer,
        question: "What noise does a submarine make when it's happy?",
        answer: "A quiet hum",
        explanation: "Submarines are the introverts of the sea. A happy one is a quiet one, content in its own deep thoughts.",
        demoFeedback: "An answer of profound and silent wisdom. Deep."
    },
    {
        type: QuestionType.MultipleChoice,
        question: "You find a remote control that only has a 'rewind' button. What does it do?",
        options: ["Rewinds your life by 10 seconds.", "Rewinds the nearest VHS tape.", "Rewinds time for everyone but you.", "It just makes a 'boop' sound."],
        answer: "It just makes a 'boop' sound.",
        explanation: "The universe has a sense of humor, and it's usually very, very anticlimactic.",
        demoFeedback: "Boop. You get it."
    }
];
