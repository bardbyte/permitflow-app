"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// tests/permit_service.test.ts
const permit_service_1 = require("../services/permit_service");
const questionnaire_config_json_1 = __importDefault(require("../config/questionnaire_config.json"));
const permit_requirements_json_1 = __importDefault(require("../config/permit_requirements.json"));
describe('determinePermitRequirement', () => {
    const californiaResidentialQuestionnaire = questionnaire_config_json_1.default.california_residential;
    it('should return "Over-the-Counter Submission Process" for bathroom remodel', () => {
        const answers = [{ questionId: 1, optionId: 1 }, { questionId: 2, optionId: 3 }];
        const result = (0, permit_service_1.determinePermitRequirement)(californiaResidentialQuestionnaire, permit_requirements_json_1.default, answers);
        expect(result.permitRequirement).toEqual(permit_requirements_json_1.default.find(permit => permit.name === "Over-the-Counter Submission Process"));
    });
    it('should return "In-House Review Process" for new bathroom', () => {
        const answers = [{ questionId: 1, optionId: 1 }, { questionId: 2, optionId: 4 }];
        const result = (0, permit_service_1.determinePermitRequirement)(californiaResidentialQuestionnaire, permit_requirements_json_1.default, answers);
        expect(result.permitRequirement).toEqual(permit_requirements_json_1.default.find(permit => permit.name === "In-House Review Process"));
    });
    it('should return "Over-the-Counter Submission Process" for garage door replacement', () => {
        const answers = [{ questionId: 1, optionId: 2 }, { questionId: 3, optionId: 7 }];
        const result = (0, permit_service_1.determinePermitRequirement)(californiaResidentialQuestionnaire, permit_requirements_json_1.default, answers);
        expect(result.permitRequirement).toEqual(permit_requirements_json_1.default.find(permit => permit.name === "Over-the-Counter Submission Process"));
    });
    it('should return "In-House Review Process" for other exterior work', () => {
        const answers = [{ questionId: 1, optionId: 2 }, { questionId: 3, optionId: 10 }];
        const result = (0, permit_service_1.determinePermitRequirement)(californiaResidentialQuestionnaire, permit_requirements_json_1.default, answers);
        expect(result.permitRequirement).toEqual(permit_requirements_json_1.default.find(permit => permit.name === "In-House Review Process"));
    });
    it('should return "No Permit" when no specific work is selected', () => {
        const answers = [{ questionId: 1, optionId: 2 }];
        const result = (0, permit_service_1.determinePermitRequirement)(californiaResidentialQuestionnaire, permit_requirements_json_1.default, answers);
        expect(result.permitRequirement).toEqual(permit_requirements_json_1.default.find(permit => permit.name === "No Permit"));
    });
    it('should return the default requirement if no matching option is found', () => {
        const answers = [{ questionId: 1, optionId: 1 }, { questionId: 2, optionId: 99 }]; // Invalid option ID
        const result = (0, permit_service_1.determinePermitRequirement)(californiaResidentialQuestionnaire, permit_requirements_json_1.default, answers);
        expect(result.permitRequirement).toEqual(questionnaire_config_json_1.default.california_residential.defaultRequirement);
    });
    it('should prioritize "In-House Review Process" over "Over-the-Counter Submission Process"', () => {
        const answers = [
            { questionId: 1, optionId: 1 },
            { questionId: 2, optionId: 3 },
            { questionId: 2, optionId: 4 }
        ];
        const result = (0, permit_service_1.determinePermitRequirement)(californiaResidentialQuestionnaire, permit_requirements_json_1.default, answers);
        expect(result.permitRequirement).toEqual(permit_requirements_json_1.default.find(permit => permit.name === "In-House Review Process"));
    });
    it('should return the default requirement if no answers are provided', () => {
        const answers = [];
        const result = (0, permit_service_1.determinePermitRequirement)(californiaResidentialQuestionnaire, permit_requirements_json_1.default, answers);
        expect(result.permitRequirement).toEqual(questionnaire_config_json_1.default.california_residential.defaultRequirement);
    });
});
