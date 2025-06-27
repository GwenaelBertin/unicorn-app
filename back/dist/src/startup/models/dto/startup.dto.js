"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_nestjs_1 = require("@anatine/zod-nestjs");
const zod_openapi_1 = require("@anatine/zod-openapi");
const zod_1 = require("zod");
const StartupSchema = (0, zod_openapi_1.extendApi)(zod_1.z.object({
    startup: zod_1.z
        .object({
        name: zod_1.z.string().min(1),
        valuation: zod_1.z.number().min(0),
        description: zod_1.z.string().min(1),
        website: zod_1.z.string().min(1),
        foundedYear: zod_1.z.number().min(1900),
        sectorId: zod_1.z.number().min(1),
        statusId: zod_1.z.number().min(1),
    })
        .required(),
}));
class StartupDto extends (0, zod_nestjs_1.createZodDto)(StartupSchema) {
}
exports.default = StartupDto;
//# sourceMappingURL=startup.dto.js.map