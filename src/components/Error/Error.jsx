import { useEffect } from 'react';
import { useState } from 'react';
import { BiCaretRightCircle } from 'react-icons/bi';
import { FiCircle } from 'react-icons/fi';
import './Quiz.scss';

function Result() {
    return (
        <div className="result">
            <h1>Спасибо за ваш отзыв</h1>
        </div>
    );
}

function Game({ question, onClickVariant }) {
    const [dis, setDis] = useState(true);

    const handleClick = () => {
        onClickVariant();
        setDis(true);
    };
    return (
        <>
            <h1>{question.title}</h1>
            <ul>
                {question.variants.map((text, index) => (
                    <li key={index} onClick={() => setDis(false)}>
                        {text}
                    </li>
                ))}
            </ul>
            <button onClick={handleClick} disabled={dis}>
                next
            </button>
        </>
    );
}

function Circle({ quiz }) {
    return (
        <div className="circle">
            {quiz.map((_) => (
                <BiCaretRightCircle size={40} className={'circle_btn'} />
            ))}
        </div>
    );
}

function Error() {
    const [quiz, setQuiz] = useState([]);
    useEffect(() => {
        fetch('http://localhost:3010/quiz')
            .then((res) => res.json())
            .then((res) => setQuiz(res));
    }, []);
    const [step, setStep] = useState(0);
    const question = quiz[step];

    const onClickVariant = () => {
        setStep(step + 1);
    };

    return (
        <div className="App">
            {step !== quiz.length ? (
                <>
                    <Circle quiz={quiz} />
                    <Game
                        question={question}
                        onClickVariant={onClickVariant}
                        step={step}
                    />
                </>
            ) : (
                <Result />
            )}
        </div>
    );
}

export { Error };
