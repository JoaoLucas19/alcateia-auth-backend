"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = validate;
function validate(schema) {
    return (req, res, next) => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            res.status(400).json({
                code: "VALIDATION_ERROR",
                errors: result.error.flatten(),
            });
            return;
        }
        req.body = result.data;
        next();
    };
}
//# sourceMappingURL=validate.middleware.js.map