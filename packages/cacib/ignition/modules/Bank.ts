import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { BytesLike, ethers } from "ethers";
import { ArgumentType } from "hardhat/types";

const BankModule = buildModule("BankModule", (m) => {
    const soCashBankImpl = m.contract("SoCashBank", [
        // Buffer.from("AGRIFRPPXXX") as unknown as ArgumentType<BytesLike>,
        ethers.encodeBytes32String("AGRIFRPPXXX").slice(0, 24), // _bic (BIC for Credit Agricole)
        ethers.encodeBytes32String("30006").slice(0, 12), // _bankCode (French bank code for Credit Agricole)
        // Buffer.from("30006"), // _bankCode (French bank code for Credit Agricole)
        ethers.encodeBytes32String("00001").slice(0, 12), // _branchCode (Example branch code)
        ethers.encodeBytes32String("EUR").slice(0, 8), // _ccy
        2 // _decimals (Euro typically has 2 decimal places)
    ]);

    return
    // Set up IBAN calculator
    const ibanCalculator = m.contract("IBANCalculator");

    // Set IBAN calculator on bank
    m.call(soCashBankImpl, "setIBANCalculator", [ibanCalculator]);

    // Whitelist deployer
    const deployer = m.getAccount(0);
    m.call(soCashBankImpl, "whitelist", [deployer]);

    return { soCashBankImpl, ibanCalculator };
});

export default BankModule;
