export interface Option {
    id: number;
    value: string;
    requirementId?: number;
  }
  
  export interface Question {
    id: number;
    text: string;
    questionType: 'single' | 'multiple';
    order: number;
    dependencies?: Record<string, number>;
    options: Option[];
  }
  
  export interface PermitRequirement {
    id: number;
    name: string;
    description: string;
  }
  
  export interface Questionnaire {
    state: string;
    permitType: string;
    version: number;
    defaultRequirement: PermitRequirement;
    questions: Question[];
  }
  