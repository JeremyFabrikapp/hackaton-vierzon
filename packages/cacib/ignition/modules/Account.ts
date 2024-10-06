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

    // Register the account with the bank
    // m.call(soCashBankImpl, "registerAccount", [soCashAccountImpl], { id: "registerAccount" });

    // Credit the account with 1000 EUR (100000 cents)
    const creditAmount = ethers.parseUnits("1000", 2); // 1000 EUR with 2 decimal places
    m.call(soCashBankImpl, "credit", [soCashAccountImpl, creditAmount, "Initial credit"], { id: "creditAccount" });
    // return
    // Check the balance of the account
    const balance = m.staticCall(soCashBankImpl, "balanceOf", [soCashAccountImpl]);

    // Debit 500 EUR from the account
    const debitAmount = ethers.parseUnits("500", 2); // 500 EUR with 2 decimal places
    m.call(soCashBankImpl, "debit", [soCashAccountImpl, debitAmount, "Test debit"], { id: "debitAccount" });

    // Check the balance again after debit
    const balanceAfterDebit = m.staticCall(soCashBankImpl, "balanceOf", [soCashAccountImpl], undefined, { id: "debitAccountBalan" });

    // Log the balance after debit
    // console.log("Account balance after debit", balanceAfterDebit);
    // // Log the balance (this will be visible in the Ignition deployment output)
    // console.log("Account balance", balance);
    return { soCashAccountImpl };
});

export default AccountModule;
