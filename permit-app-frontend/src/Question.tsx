import React, { useState } from 'react';
import { Option, Question as QuestionType } from './types';

interface QuestionProps {
  question: QuestionType;
  onAnswer: (questionId: number, selectedOptions: number[]) => void;
}

const Question: React.FC<QuestionProps> = ({ question, onAnswer }) => {
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);

  const handleOptionChange = (optionId: number) => {
    if (question.questionType === 'single') {
      setSelectedOptions([optionId]); // Radio button (single select)
      onAnswer(question.id, [optionId]);
    } else {
      setSelectedOptions(prevSelected =>
        prevSelected.includes(optionId)
          ? prevSelected.filter(id => id !== optionId) // Deselect if already selected
          : [...prevSelected, optionId] // Select if not selected
      );
      onAnswer(question.id, selectedOptions.includes(optionId)
        ? selectedOptions.filter(id => id !== optionId)
        : [...selectedOptions, optionId]
      );
    }
  };

  return (
    <div>
      <h3>{question.text}</h3>
      <ul>
        {question.options.map(option => (
          <li key={option.id}>
            <label>
              <input
                type={question.questionType === 'single' ? 'radio' : 'checkbox'}
                value={option.id}
                checked={selectedOptions.includes(option.id)}
                onChange={() => handleOptionChange(option.id)}
              />
              {option.value}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Question;