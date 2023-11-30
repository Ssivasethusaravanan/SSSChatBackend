"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletClientSigner = void 0;
const viem_1 = require("viem");
class WalletClientSigner {
    constructor(client, signerType) {
        Object.defineProperty(this, "signerType", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "inner", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "getAddress", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: async () => {
                let addresses = await this.inner.getAddresses();
                return (0, viem_1.getAddress)(addresses[0]);
            }
        });
        Object.defineProperty(this, "signMessage", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: async (message) => {
                if (typeof message === "string" && !(0, viem_1.isHex)(message)) {
                    return this.inner.signMessage({
                        account: await this.getAddress(),
                        message,
                    });
                }
                else {
                    return this.inner.signMessage({
                        account: await this.getAddress(),
                        message: { raw: message },
                    });
                }
            }
        });
        Object.defineProperty(this, "signTypedData", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: async (params) => {
                return this.inner.signTypedData({
                    account: await this.getAddress(),
                    ...params,
                });
            }
        });
        this.inner = client;
        if (!signerType) {
            throw new Error("Valid signerType param is required.");
        }
        this.signerType = signerType;
    }
}
exports.WalletClientSigner = WalletClientSigner;
//# sourceMappingURL=wallet-client.js.map