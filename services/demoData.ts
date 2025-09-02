import { Question, QuestionType } from "../types";

// A self-contained, URL-encoded SVG for the image question to avoid external dependencies and potential base64 rendering issues.
// This SVG shows a red circle with three question marks inside, on a colorful gradient background.
const demoImage = `data:image/svg+xml,%3Csvg width='400' height='400' viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%230079FF;'/%3E%3Cstop offset='50%25' style='stop-color:%2300DFA2;'/%3E%3Cstop offset='100%25' style='stop-color:%23F6FA70;'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='400' fill='url(%23grad)'/%3E%3Ccircle cx='200' cy='200' r='100' fill='%23FF0060'/%3E%3Ctext x='200' y='230' font-family='Arial, sans-serif' font-size='120' fill='white' text-anchor='middle'%3E%3F%3F%3F%3C/text%3E%3C/svg%3E`;


export const demoQuestions: Question[] = [
    {
        type: QuestionType.MultipleChoice,
        question: "If you were a flavor, what would you be?",
        options: ["Cosmic Raspberry", "Slightly Confused Lemon", "Existential Caramel", "Tuesday"],
        answer: "Tuesday",
        explanation: "Because Tuesday isn't a flavor, and that's the most unexpected, high-brain answer. Well done.",
        demoFeedback: [
            "A truly inspired choice. You think outside the carton.",
            "That's... not a flavor. I love it.",
            "My taste buds are confused and delighted."
        ]
    },
    {
        type: QuestionType.ShortAnswer,
        question: "What is the secret that all squirrels know?",
        answer: "Gravity is a suggestion",
        explanation: "Their erratic movements and death-defying leaps are proof. They're just humoring us by staying on the ground.",
        demoFeedback: [
            "I see you've been talking to the squirrels. Respect.",
            "So that's what they've been plotting! It all makes sense now.",
            "Are you one of them? You can tell me."
        ]
    },
    {
        type: QuestionType.ImageQuestion,
        question: "This image contains three question marks. What color is the circle they are inside?",
        imageUrl: demoImage,
        answer: "Red",
        explanation: "Correct! It's a fiery red circle, pondering the great mysteries of the... hey, what were we talking about?",
        demoFeedback: [
            "Your eyes do not deceive you. Excellent observation.",
            "You saw right through the cosmic haze. Impressive.",
            "Spot on! Your perception is crystal clear."
        ]
    },
    {
        type: QuestionType.MultipleChoice,
        question: "What would be the worst thing to hear a pilot say mid-flight?",
        options: ["'Does anyone know how to fly a plane?'", "'We're out of coffee.'", "'I'm going to try a loop-the-loop.'", "'This seems like a good time for a nap.'"],
        answer: "'We're out of coffee.'",
        explanation: "The other options are temporary problems. A flight without coffee? That's a true crisis.",
        demoFeedback: [
            "You have your priorities straight. I like that.",
            "A true crisis indeed. Forget the plane, save the coffee!",
            "Absolutely correct. A caffeine-free cockpit is a danger to us all."
        ]
    },
    {
        type: QuestionType.ShortAnswer,
        question: "If animals could talk, which species would be the rudest?",
        answer: "Geese",
        explanation: "Honk. Honk. Need we say more? They are the bullies of the animal kingdom.",
        demoFeedback: [
            "Ah, a fellow victim of the goose menace. I understand.",
            "The cobra-chicken lobby won't like this, but you're right.",
            "You've clearly been hissed at before. It changes a person."
        ]
    },
    {
        type: QuestionType.MultipleChoice,
        question: "What's the best way to get a cat to respect you?",
        options: ["Ignore it.", "Give it treats.", "Stare at it without blinking.", "It's a trick question. You can't."],
        answer: "It's a trick question. You can't.",
        explanation: "A cat's respect is a myth, a legend, a story told to children. You can only hope for tolerance.",
        demoFeedback: [
            "You've owned a cat before, haven't you?",
            "The only winning move is not to play. You understand.",
            "Correct. It's their world, we just live in it."
        ]
    },
    {
        type: QuestionType.ShortAnswer,
        question: "What noise does a submarine make when it's happy?",
        answer: "A quiet hum",
        explanation: "Submarines are the introverts of the sea. A happy one is a quiet one, content in its own deep thoughts.",
        demoFeedback: [
            "An answer of profound and silent wisdom. Deep.",
            "That's beautiful, man. Really deep.",
            "You've captured the soul of the silent service. Poetic."
        ]
    },
    {
        type: QuestionType.MultipleChoice,
        question: "You find a remote control that only has a 'rewind' button. What does it do?",
        options: ["Rewinds your life by 10 seconds.", "Rewinds the nearest VHS tape.", "Rewinds time for everyone but you.", "It just makes a 'boop' sound."],
        answer: "It just makes a 'boop' sound.",
        explanation: "The universe has a sense of humor, and it's usually very, very anticlimactic.",
        demoFeedback: [
            "Boop. You get it.",
            "The simplest truths are often the most profound. And also 'boop'.",
            "Exactly. The universe is a prankster with a soundboard."
        ]
    }
];