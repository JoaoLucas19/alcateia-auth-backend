export declare const KeyStatus: {
    readonly ACTIVE: "ACTIVE";
    readonly USED: "USED";
    readonly REVOKED: "REVOKED";
    readonly EXPIRED: "EXPIRED";
};
export type KeyStatus = (typeof KeyStatus)[keyof typeof KeyStatus];
export declare const ValidationResult: {
    readonly SUCCESS: "SUCCESS";
    readonly INVALID_KEY: "INVALID_KEY";
    readonly REVOKED: "REVOKED";
    readonly EXPIRED: "EXPIRED";
    readonly ALREADY_USED: "ALREADY_USED";
};
export type ValidationResult = (typeof ValidationResult)[keyof typeof ValidationResult];
