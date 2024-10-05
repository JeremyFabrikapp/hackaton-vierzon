import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const HybridESGMultiTokenModule = buildModule("HybridESGMultiTokenModule", (m) => {
  const uri = m.getParameter("uri", "https://example.com/token/{id}.json");

  const hybridESGMultiToken = m.contract("HybridESGMultiToken", [uri]);

  return { hybridESGMultiToken };
});

export default HybridESGMultiTokenModule;
