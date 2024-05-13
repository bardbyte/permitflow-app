import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Question from './Question';
import { Questionnaire, PermitRequirement } from './types';

const Workflow: React.FC = () => {
  const [questionnaire, setQuestionnaire] = useState<Questionnaire | null>(null);
  const [responses, setResponses] = useState<Record<number, number[]>>({});
  const [currentQuestionId, setCurrentQuestionId] = useState<number | null>(null);
  const [permitRequirement, setPermitRequirement] = useState<PermitRequirement | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const questionnaireId = 'california_residential'; // Replace with actual ID if it's dynamic
  const apiBaseUrl = 'http://localhost:3003/api/questionnaires';

  useEffect(() => {
    axios.get(`${apiBaseUrl}/${questionnaireId}`)
      .then(response => {
        setQuestionnaire(response.data);
        setCurrentQuestionId(response.data.questions[0].id); // Start with the first question
      })
      .catch(err => {
        console.error('Error fetching questionnaire:', err);
        setError('Failed to load questionnaire. Please try again later.');
      })
      .finally(() => setLoading(false));
  }, []);

  const handleAnswerChange = (questionId: number, selectedOptions: number[]) => {
    // Update responses in state
    setResponses(prev => ({
      ...prev,
      [questionId]: selectedOptions
    }));

    // Determine the next question based on the selected answer(s) and dependencies
    const currentQuestion = questionnaire?.questions.find(q => q.id === questionId);
    let nextQuestionId: number | null = null;

    if (currentQuestion?.dependencies) {
      const dependencyKey = selectedOptions.join(',');
      nextQuestionId = currentQuestion.dependencies[dependencyKey] || null;
    }

    // Update the current question ID to the next question or null if there are no more questions
    setCurrentQuestionId(nextQuestionId);
  };

  useEffect(() => {
    if (currentQuestionId === null && Object.keys(responses).length > 0 && questionnaire) {
      const answersForBackend = Object.entries(responses).map(([questionId, optionIds]) => ({
        questionId: parseInt(questionId, 10),
        optionId: optionIds,
      }));

      axios.post(`${apiBaseUrl}/${questionnaireId}/submit`, { answers: answersForBackend })
        .then(response => setPermitRequirement(response.data.permitRequirement))
        .catch(err => {
          console.error('Error submitting answers:', err);
          setError('Failed to submit answers. Please try again later.');
        });
    }
  }, [currentQuestionId, responses, questionnaire]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {currentQuestionId && questionnaire ? (
        <Question
          question={questionnaire.questions.find(q => q.id === currentQuestionId)!}
          onAnswer={handleAnswerChange}
        />
      ) : (
        permitRequirement ? (
          <div>
            <h3>Permit Requirement: {permitRequirement.name}</h3>
            <p>{permitRequirement.description}</p>
          </div>
        ) : (
          <div>No permit requirement found.</div>
        )
      )}
    </div>
  );
};

export default Workflow;