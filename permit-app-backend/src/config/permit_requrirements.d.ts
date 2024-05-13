declare module "permit_requirements.json" {
    export interface PermitRequirement {
        id: number;
        name: string;
        description: string;
    }

    const value: PermitRequirement[];
    export default value;
}

