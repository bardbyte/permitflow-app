// tests/permit_service.test.ts
import { determinePermitRequirement } from '../services/permit_service';
import questionnaireConfig from '../config/questionnaire_config.json';
import permitRequirements from '../config/permit_requirements.json';

describe('determinePermitRequirement', () => {
  const californiaResidentialQuestionnaire = questionnaireConfig.california_residential;

  it('should return "Over-the-Counter Submission Process" for bathroom remodel', () => {
    const answers = [{ questionId: 1, optionId: 1 }, { questionId: 2, optionId: 3 }];
    const result = determinePermitRequirement(californiaResidentialQuestionnaire, permitRequirements, answers);
    expect(result.permitRequirement).toEqual(permitRequirements.find(permit => permit.name === "Over-the-Counter Submission Process"));
  });

  it('should return "In-House Review Process" for new bathroom', () => {
    const answers = [{ questionId: 1, optionId: 1 }, { questionId: 2, optionId: 4 }];
    const result = determinePermitRequirement(californiaResidentialQuestionnaire, permitRequirements, answers);
    expect(result.permitRequirement).toEqual(permitRequirements.find(permit => permit.name === "In-House Review Process"));
  });

  it('should return "Over-the-Counter Submission Process" for garage door replacement', () => {
    const answers = [{ questionId: 1, optionId: 2 }, { questionId: 3, optionId: 7 }];
    const result = determinePermitRequirement(californiaResidentialQuestionnaire, permitRequirements, answers);
    expect(result.permitRequirement).toEqual(permitRequirements.find(permit => permit.name === "Over-the-Counter Submission Process"));
  });

  it('should return "In-House Review Process" for other exterior work', () => {
    const answers = [{ questionId: 1, optionId: 2 }, { questionId: 3, optionId: 10 }];
    const result = determinePermitRequirement(californiaResidentialQuestionnaire, permitRequirements, answers);
    expect(result.permitRequirement).toEqual(permitRequirements.find(permit => permit.name === "In-House Review Process"));
  });

  it('should return "No Permit" when no specific work is selected', () => {
    const answers = [{ questionId: 1, optionId: 2 }];
    const result = determinePermitRequirement(californiaResidentialQuestionnaire, permitRequirements, answers);
    expect(result.permitRequirement).toEqual(permitRequirements.find(permit => permit.name === "No Permit"));
  });

  it('should return the default requirement if no matching option is found', () => {
    const answers = [{ questionId: 1, optionId: 1 }, { questionId: 2, optionId: 99 }]; // Invalid option ID
    const result = determinePermitRequirement(californiaResidentialQuestionnaire, permitRequirements, answers);
    expect(result.permitRequirement).toEqual(questionnaireConfig.california_residential.defaultRequirement);
  });

  it('should prioritize "In-House Review Process" over "Over-the-Counter Submission Process"', () => {
    const answers = [
      { questionId: 1, optionId: 1 }, 
      { questionId: 2, optionId: 3 }, 
      { questionId: 2, optionId: 4 }  
    ];
    const result = determinePermitRequirement(californiaResidentialQuestionnaire, permitRequirements, answers);
    expect(result.permitRequirement).toEqual(permitRequirements.find(permit => permit.name === "In-House Review Process"));
  });

  it('should return the default requirement if no answers are provided', () => {
    const answers: { questionId: number; optionId: number }[] = [];
    const result = determinePermitRequirement(californiaResidentialQuestionnaire, permitRequirements, answers);
    expect(result.permitRequirement).toEqual(questionnaireConfig.california_residential.defaultRequirement);
  });
  it('should prioritize "In-House Review Process" over "Over-the-Counter Submission Process"', () => {
    const answers = [
      { questionId: 1, optionId: 1 }, // Interior
      { questionId: 2, optionId: 3 }, // Bathroom remodel (OTC)
      { questionId: 2, optionId: 4 }  // New bathroom (In-House)
    ];
    const result = determinePermitRequirement(californiaResidentialQuestionnaire, permitRequirements, answers);
    expect(result.permitRequirement).toEqual(permitRequirements.find(permit => permit.name === "In-House Review Process"));
  });
});

