// src/routes/questionnaire.ts
import express from 'express';
import questionnaireConfig from '../config/questionnaire_config.json'; 
import permitRequirements from '../config/permit_requirements.json';
import { determinePermitRequirement } from '../services/permit_service'; 

const router = express.Router();

// GET /api/questionnaires/:id
router.get('/:id', (req, res) => {
    const questionnaireId = req.params.id; 
    const questionnaire = questionnaireConfig.california_residential; 

    if (!questionnaire) {
        return res.status(404).json({ error: 'Questionnaire not found' });
    }

    res.json(questionnaire);
});

// POST /api/questionnaires/:id/submit
router.post('/:id/submit', (req, res) => {
    const questionnaireId = req.params.id;
    const { answers } = req.body;

    const questionnaire = questionnaireConfig.california_residential; 

    if (!questionnaire) {
        return res.status(404).json({ error: 'Questionnaire not found' });
    }

    try {
        const { permitRequirement } = determinePermitRequirement(questionnaire, permitRequirements, answers);
        res.json(permitRequirement); 
    } catch (error) {
        console.error(error); 
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
