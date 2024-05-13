// src/config/questionnaire.d.ts

export interface Option {
    id: number;
    value: string;
    requirementId?: number; 
  }
  
  export interface Question {
    id: number;
    text: string;
    questionType: string;
    order: number;
    dependencies?: Record<string, number>;
    options: Option[];
  }
  
  export interface Questionnaire {
    state: string;
    permitType: string;
    version: number;
    defaultRequirement: {
      id: number;
      name: string;
      description: string;
    };
    questions: Question[];
  }
  
  declare module 'questionnaire_config.json' {
    const value: {
      [key: string]: Questionnaire;
    };
    export default value;
  }
  