"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceNotFoundError = void 0;
class ResourceNotFoundError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.ResourceNotFoundError = ResourceNotFoundError;
