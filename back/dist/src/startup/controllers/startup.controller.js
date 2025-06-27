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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartupController = void 0;
const common_1 = require("@nestjs/common");
const startup_controller_service_1 = require("../services/controllers/startup.controller.service");
const startup_dto_1 = require("../models/dto/startup.dto");
let StartupController = class StartupController {
    startupService;
    constructor(startupService) {
        this.startupService = startupService;
    }
    createStartup(body) {
        return this.startupService.create(body.startup);
    }
    getAllStartups() {
        return this.startupService.findAll();
    }
    getOneStartup(id) {
        return this.startupService.findOne(Number(id));
    }
    updateStartup(id, body) {
        return this.startupService.update(Number(id), body.startup);
    }
    deleteStartup(id) {
        return this.startupService.remove(Number(id));
    }
};
exports.StartupController = StartupController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [startup_dto_1.default]),
    __metadata("design:returntype", void 0)
], StartupController.prototype, "createStartup", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StartupController.prototype, "getAllStartups", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StartupController.prototype, "getOneStartup", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, startup_dto_1.default]),
    __metadata("design:returntype", void 0)
], StartupController.prototype, "updateStartup", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StartupController.prototype, "deleteStartup", null);
exports.StartupController = StartupController = __decorate([
    (0, common_1.Controller)('startups'),
    __metadata("design:paramtypes", [startup_controller_service_1.StartupService])
], StartupController);
//# sourceMappingURL=startup.controller.js.map