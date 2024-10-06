import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { ethers } from "ethers";

const AccountModule = buildModule("AccountModule", (m) => {
    const soCashBankImpl = m.contract("SoCashBank", [
        // Buffer.from("AGRIFRPPXXX") as unknown as ArgumentType<BytesLike>,
        ethers.encodeBytes32String("AGRIFRPPXXX").slice(0, 24), // _bic (BIC for Credit Agricole)
        ethers.encodeBytes32String("30006").slice(0, 12), // _bankCode (French bank code for Credit Agricole)
        // Buffer.from("30006"), // _bankCode (French bank code for Credit Agricole)
        ethers.encodeBytes32String("00001").slice(0, 12), // _branchCode (Example branch code)
        ethers.encodeBytes32String("EUR").slice(0, 8), // _ccy
        2 // _decimals (Euro typically has 2 decimal places)
    ]);
    const soCashAccountImpl = m.contract("SoCashAccount", [
        "Default Account" // name_ parameter for the constructor
    ]);

    // Whitelist the bank for the account
    m.call(soCashAccountImpl, "whitelist", [soCashBankImpl], { id: "whitelist" });

    // Whitelist deployer for the account
    const deployer = m.getAccount(0);
    m.call(soCashAccountImpl, "whitelist", [deployer], { id: "whitelist2" });

    return { soCashAccountImpl };
});

export default AccountModule;
