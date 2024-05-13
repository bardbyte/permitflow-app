"use strict";
// prisma/seed.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // States
        const california = yield prisma.state.create({
            data: { name: 'California' },
        });
        // Work Types
        const interiorWorkType = yield prisma.workType.create({
            data: {
                name: 'Interior',
                stateId: california.id, // Link to California state
            },
        });
        const exteriorWorkType = yield prisma.workType.create({
            data: {
                name: 'Exterior',
                stateId: california.id, // Link to California state
            },
        });
        // Permit Requirements
        const inHouseReview = yield prisma.permitRequirement.create({
            data: { name: 'In-House Review Process' },
        });
        const overTheCounter = yield prisma.permitRequirement.create({
            data: { name: 'Over-the-Counter Submission Process' },
        });
        const noPermit = yield prisma.permitRequirement.create({
            data: { name: 'No Permit' },
        });
        // ... (Interior and Exterior Work Subtypes, following a similar pattern)
        // Relationships for Interior Work Subtypes (work_subtype_id, permit_requirement_id)
        yield prisma.workSubtype.update({
            where: { name: 'Bathroom remodel' },
            data: { permitRequirement: { connect: [{ id: overTheCounter.id }] } }
        });
        yield prisma.workSubtype.update({
            where: { name: 'New bathroom' },
            data: { permitRequirement: { connect: [{ id: inHouseReview.id }] } }
        });
        // ... add other relations in a similar way
    });
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
