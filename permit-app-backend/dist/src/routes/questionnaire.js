"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/questionnaire.ts
const express_1 = __importDefault(require("express"));
const questionnaire_config_json_1 = __importDefault(require("../config/questionnaire_config.json"));
const permit_requirements_json_1 = __importDefault(require("../config/permit_requirements.json"));
const permit_service_1 = require("../services/permit_service");
const router = express_1.default.Router();
// GET /api/questionnaires/:id
router.get('/:id', (req, res) => {
    const questionnaireId = req.params.id;
    const questionnaire = questionnaire_config_json_1.default.california_residential;
    if (!questionnaire) {
        return res.status(404).json({ error: 'Questionnaire not found' });
    }
    res.json(questionnaire);
});
// POST /api/questionnaires/:id/submit
router.post('/:id/submit', (req, res) => {
    const questionnaireId = req.params.id;
    const { answers } = req.body;
    const questionnaire = questionnaire_config_json_1.default.california_residential;
    if (!questionnaire) {
        return res.status(404).json({ error: 'Questionnaire not found' });
    }
    try {
        const { permitRequirement } = (0, permit_service_1.determinePermitRequirement)(questionnaire, permit_requirements_json_1.default, answers);
        res.json(permitRequirement);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.default = router;
