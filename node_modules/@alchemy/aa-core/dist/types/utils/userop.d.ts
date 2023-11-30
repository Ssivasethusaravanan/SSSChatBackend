import type { UserOperationRequest, UserOperationStruct } from "../types";
/**
 * Utility method for asserting a {@link UserOperationStruct} is a {@link UserOperationRequest}
 *
 * @param request a {@link UserOperationStruct} to validate
 * @returns a type guard that asserts the {@link UserOperationStruct} is a {@link UserOperationRequest}
 */
export declare function isValidRequest(request: UserOperationStruct): request is UserOperationRequest;
//# sourceMappingURL=userop.d.ts.map