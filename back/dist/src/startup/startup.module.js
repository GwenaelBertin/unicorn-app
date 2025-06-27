"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartupModule = void 0;
const common_1 = require("@nestjs/common");
const startup_controller_1 = require("./controllers/startup.controller");
const startup_controller_service_1 = require("./services/controllers/startup.controller.service");
let StartupModule = class StartupModule {
};
exports.StartupModule = StartupModule;
exports.StartupModule = StartupModule = __decorate([
    (0, common_1.Module)({
        controllers: [startup_controller_1.StartupController],
        providers: [startup_controller_service_1.StartupService],
    })
], StartupModule);
//# sourceMappingURL=startup.module.js.map