"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartupService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
let StartupService = class StartupService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(startup) {
        const { sectorId, statusId, ...rest } = startup;
        return this.prisma.startup.create({
            data: {
                ...rest,
                sector: { connect: { sectorId } },
                status: { connect: { statusId } },
            },
        });
    }
    findAll() {
        return this.prisma.startup.findMany({
            include: {
                sector: true,
                status: true,
            },
            orderBy: {
                valuation: 'desc',
            },
        });
    }
    findOne(id) {
        return this.prisma.startup.findUnique({
            where: { startupId: id },
            include: {
                sector: true,
                status: true,
            },
        });
    }
    update(id, startup) {
        const { sectorId, statusId, ...rest } = startup;
        return this.prisma.startup.update({
            where: { startupId: id },
            data: {
                ...rest,
                ...(sectorId && { sector: { connect: { sectorId } } }),
                ...(statusId && { status: { connect: { statusId } } }),
            },
        });
    }
    remove(id) {
        return this.prisma.startup.delete({
            where: { startupId: id },
        });
    }
};
exports.StartupService = StartupService;
exports.StartupService = StartupService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], StartupService);
//# sourceMappingURL=startup.controller.service.js.map