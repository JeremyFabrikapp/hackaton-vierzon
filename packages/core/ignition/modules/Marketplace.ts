import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const MarketplaceModule = buildModule("MarketplaceModule", (m) => {
    // Deploy the HybridESGMultiToken contract
    const hybridESGMultiToken = m.contract("HybridESGMultiToken", ["https://example.com/token/{id}.json"]);

    // Create and mint a few ESG tokens
    const batchId1 = m.call(hybridESGMultiToken, "createBatch", [1, 100, "0x"], { id: "MarketplaceModuleCreateBatch1" });
    const batchId2 = m.call(hybridESGMultiToken, "createBatch", [2, 200, "0x"], { id: "MarketplaceModuleCreateBatch2" });
    const batchId3 = m.call(hybridESGMultiToken, "createBatch", [3, 300, "0x"], { id: "MarketplaceModuleCreateBatch3" });

    // Set ESG criteria for each batch
    m.call(hybridESGMultiToken, "setBatchESGCriteria", [1, 80, 70, 90], { id: "MarketplaceModuleSetBatchESGCriteria1" });
    m.call(hybridESGMultiToken, "setBatchESGCriteria", [2, 75, 85, 80], { id: "MarketplaceModuleSetBatchESGCriteria2" });
    m.call(hybridESGMultiToken, "setBatchESGCriteria", [3, 90, 60, 85], { id: "MarketplaceModuleSetBatchESGCriteria3" });

    const certifiedResourceExchange = m.contract("CertifiedResourceExchange", []);

    // List resources using the real ESG token addresses
    const resource1 = m.call(certifiedResourceExchange, "listResource", [100, hybridESGMultiToken.address, 1], { id: "MarketplaceModuleListResource1" });
    const resource2 = m.call(certifiedResourceExchange, "listResource", [200, hybridESGMultiToken.address, 2], { id: "MarketplaceModuleListResource2" });
    const resource3 = m.call(certifiedResourceExchange, "listResource", [300, hybridESGMultiToken.address, 3], { id: "MarketplaceModuleListResource3" });

    // Create offers for resources
    const offer1 = m.call(certifiedResourceExchange, "createOffer", [1, 90, hybridESGMultiToken.address], { id: "MarketplaceModuleCreateOffer1" });
    const offer2 = m.call(certifiedResourceExchange, "createOffer", [2, 180, hybridESGMultiToken.address], { id: "MarketplaceModuleCreateOffer2" });
    const offer3 = m.call(certifiedResourceExchange, "createOffer", [3, 270, hybridESGMultiToken.address], { id: "MarketplaceModuleCreateOffer3" });

    // Get resource offers
    const resourceOffers1 = m.call(certifiedResourceExchange, "getResourceOffers", [1], { id: "MarketplaceModuleGetResourceOffers1" });
    const resourceOffers2 = m.call(certifiedResourceExchange, "getResourceOffers", [2], { id: "MarketplaceModuleGetResourceOffers2" });
    const resourceOffers3 = m.call(certifiedResourceExchange, "getResourceOffers", [3], { id: "MarketplaceModuleGetResourceOffers3" });

    return { 
        hybridESGMultiToken,
        certifiedResourceExchange, 
        resource1, resource2, resource3, 
        offer1, offer2, offer3, 
        resourceOffers1, resourceOffers2, resourceOffers3 
    };
});

export default MarketplaceModule;
