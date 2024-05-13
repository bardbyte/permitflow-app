// services/permitService.ts

export function determinePermitRequirement(
    questionnaire: { // Define questionnaire structure inline
        state: string;
        permitType: string;
        version: number;
        defaultRequirement: {
            id: number;
            name: string;
            description: string;
        };
        questions: {
            id: number;
            text: string;
            questionType: string;
            order: number;
            dependencies?: Record<string, number>;
            options: {
                id: number;
                value: string;
                requirementId?: number;
            }[];
        }[];
    },
    permitRequirements: { // Define permitRequirements structure inline
        id: number;
        name: string;
        description: string;
    }[],
    answers: { questionId: number; optionId: number }[]
): { permitRequirement: { id: number; name: string; description: string } } {

  // Create a map of permit requirements for faster lookup
  const permitRequirementMap: Record<number, { id: number; name: string; description: string }> = {};
  permitRequirements.forEach(requirement => {
    permitRequirementMap[requirement.id] = requirement;
  });

  // Get all selected options
  const selectedOptions: { id: number; value: string; requirementId?: number }[] = answers.map(answer => {
    const question = questionnaire.questions.find(q => q.id === answer.questionId);
    return question?.options.find(o => o.id === answer.optionId);
  }).filter(option => option !== undefined) as { id: number; value: string; requirementId?: number }[];

  // Find permit requirements linked to the selected options
  const requiredPermits = selectedOptions
    .filter(option => option.requirementId !== undefined)
    .map(option => permitRequirementMap[option.requirementId!]); // '!' is safe here due to the filter

  // Prioritize In-House Review, then Over-the-Counter
  if (requiredPermits.some(permit => permit.name === "In-House Review Process")) {
    return { permitRequirement: permitRequirementMap[1]! }; 
  } else if (requiredPermits.some(permit => permit.name === "Over-the-Counter Submission Process")) {
    return { permitRequirement: permitRequirementMap[2]! }; 
  }

  // If no matching permit requirement, use the default
  return { permitRequirement: questionnaire.defaultRequirement };
}


