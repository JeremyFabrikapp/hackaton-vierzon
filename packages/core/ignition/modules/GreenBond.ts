import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const GreenBondModule = buildModule("GreenBondModule", (m) => {
    const register = m.getParameter("register", "0x0000000000000000000000000000000000000000");
    const offerPrice = m.getParameter("offerPrice", 100);

    const primaryIssuance = m.contract("PrimaryIssuance", [register, offerPrice]);

    // Validate the primary issuance
    const validationResult = m.call(primaryIssuance, "validate", [], { id: "GreenBondModuleValidate" });

    // Get buyer account
    const buyerAccount = m.call(primaryIssuance, "buyerAccount", [], { id: "GreenBondModuleGetBuyerAccount" });

    // Get seller account
    const sellerAccount = m.call(primaryIssuance, "sellerAccount", [], { id: "GreenBondModuleGetSellerAccount" });

    // Get trade details
    const tradeDetails = m.call(primaryIssuance, "getDetails", [], { id: "GreenBondModuleGetDetails" });

    // Get payment ID
    const paymentId = m.call(primaryIssuance, "paymentID", [], { id: "GreenBondModuleGetPaymentID" });

    // Get status
    const status = m.call(primaryIssuance, "status", [], { id: "GreenBondModuleGetStatus" });

    return { primaryIssuance, validationResult, buyerAccount, sellerAccount, tradeDetails, paymentId, status };
});

export default GreenBondModule;
