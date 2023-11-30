export function isValidRequest(request) {
    return (!!request.callGasLimit &&
        !!request.maxFeePerGas &&
        request.maxPriorityFeePerGas != null &&
        !!request.preVerificationGas &&
        !!request.verificationGasLimit);
}
//# sourceMappingURL=userop.js.map