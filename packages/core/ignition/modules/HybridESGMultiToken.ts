import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const HybridESGMultiTokenModule = buildModule("HybridESGMultiTokenModule", (m) => {
    const uri = m.getParameter("uri", "https://example.com/token/{id}.json");

    const hybridESGMultiToken = m.contract("HybridESGMultiToken", [uri]);

    // Create and mint a few tokens
    const batchId1 = m.call(hybridESGMultiToken, "createBatch", [50001, 100, "0x"], { id: "HybridESGMultiTokenModulecreateBatch1" });
    const batchId2 = m.call(hybridESGMultiToken, "createBatch", [50002, 200, "0x"], { id: "HybridESGMultiTokenModulecreateBatch2" });
    const batchId3 = m.call(hybridESGMultiToken, "createBatch", [50003, 300, "0x"], { id: "HybridESGMultiTokenModulecreateBatch3" });

    // Set ESG criteria for each batch
    m.call(hybridESGMultiToken, "setBatchESGCriteria", [50001, 80, 70, 90], { id: "HybridESGMultiTokenModulesetBatchESGCriteria1" });
    m.call(hybridESGMultiToken, "setBatchESGCriteria", [50002, 75, 85, 80], { id: "HybridESGMultiTokenModulesetBatchESGCriteria2" });
    m.call(hybridESGMultiToken, "setBatchESGCriteria", [50003, 10, 30, 15], { id: "HybridESGMultiTokenModulesetBatchESGCriteria3" });

    // List all batches
    const allBatches = m.call(hybridESGMultiToken, "getAllBatchIds", [], { id: "HybridESGMultiTokenModulegetAllBatchIds" });

    
    return { hybridESGMultiToken, batchId1, batchId2, batchId3, allBatches };
});

export default HybridESGMultiTokenModule;
