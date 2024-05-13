"use strict";
// services/permitService.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.determinePermitRequirement = void 0;
function determinePermitRequirement(questionnaire, permitRequirements, answers) {
    // Create a map of permit requirements for faster lookup
    const permitRequirementMap = {};
    permitRequirements.forEach(requirement => {
        permitRequirementMap[requirement.id] = requirement;
    });
    // Get all selected options
    const selectedOptions = answers.map(answer => {
        const question = questionnaire.questions.find(q => q.id === answer.questionId);
        return question === null || question === void 0 ? void 0 : question.options.find(o => o.id === answer.optionId);
    }).filter(option => option !== undefined);
    // Find permit requirements linked to the selected options
    const requiredPermits = selectedOptions
        .filter(option => option.requirementId !== undefined)
        .map(option => permitRequirementMap[option.requirementId]); // '!' is safe here due to the filter
    // Prioritize In-House Review, then Over-the-Counter
    if (requiredPermits.some(permit => permit.name === "In-House Review Process")) {
        return { permitRequirement: permitRequirementMap[1] };
    }
    else if (requiredPermits.some(permit => permit.name === "Over-the-Counter Submission Process")) {
        return { permitRequirement: permitRequirementMap[2] };
    }
    // If no matching permit requirement, use the default
    return { permitRequirement: questionnaire.defaultRequirement };
}
exports.determinePermitRequirement = determinePermitRequirement;
