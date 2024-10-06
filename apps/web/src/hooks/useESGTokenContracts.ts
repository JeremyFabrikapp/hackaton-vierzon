import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import HybridESGMultiTokenABI from '../artifacts/core/artifacts/contracts/HybridESGMultiToken.sol/HybridESGMultiToken.json'; // Ensure this ABI file exists
import { useAccount } from 'wagmi';

const contractAddress = '0x0E801D84Fa97b50751Dbf25036d067dCf18858bF';
const expectedChainId = 31337; // Hardhat's default chainId

export function useESGTokenContracts() {
    const [contract, setContract] = useState<ethers.Contract | null>(null);
    const [batches, setBatches] = useState<any[]>([]);
    const { address } = useAccount();


    useEffect(() => {
        const initContract = async () => {
            console.log('Initializing contract...', window.ethereum);
            if (typeof window.ethereum !== 'undefined') {
                try {
                    await window.ethereum.request({ method: 'eth_requestAccounts' });
                    const provider = new ethers.BrowserProvider(window.ethereum);
                    const network = await provider.getNetwork();
                    
                    if (network.chainId !== BigInt(expectedChainId)) {
                        console.error(`Invalid chainId. Expected ${expectedChainId}, got ${network.chainId}`);
                        return;
                    }

                    console.log('Starting...');
                    const signer = await provider.getSigner();
                    const esgContract = new ethers.Contract(contractAddress, HybridESGMultiTokenABI.abi, signer);
                    console.log('ESG Contract initialized:', esgContract);
                    setContract(esgContract);
                } catch (error) {
                    console.error('Failed to initialize contract:', error);
                }
            } else {
                console.error('Ethereum object not found, install MetaMask.');
            }
        };

        initContract();
    }, []);

    useEffect(() => {
        const fetchBatches = async () => {
            console.log('Fetching batches for address:', address);
            console.log('Contract instance:', contract);
            if (address && contract) {
                try {
                    const batchIds = await contract.getAllBatchIds();
                    console.log('Contract batchIds:', batchIds);

                    const batchesData = await Promise.all(
                        batchIds.map(async (batchId: number) => {
                            const info = await getTokenInfo(batchId, address);
                            return { batchId, ...info };
                        })
                    );

                    setBatches(batchesData);
                } catch (error) {
                    console.error('Error fetching batches:', error);
                }
            }
        };

        fetchBatches();
    }, [address, contract]);

    const createBatch = async (batchId: number, amount: number, data: string) => {
        if (!contract) return;
        console.log('Creating batch with ID:', batchId, 'Amount:', amount, 'Data:', data, contract);
        try {
            console.log('Transaction preparing');
            const tx = await contract.createBatch(batchId, amount, "0x", { gasLimit: 300000 });
            console.log('Transaction sent:', tx.hash);
            await tx.wait();
            console.log('Batch created successfully');
        } catch (error) {
            console.error('Error creating batch:', error);
        }
    };

    const setBatchESGCriteria = async (batchId: number, environmental: number, social: number, governance: number) => {
        if (!contract) return;
        try {
            const tx = await contract.setBatchESGCriteria(batchId, environmental, social, governance);
            await tx.wait();
            console.log('ESG criteria set successfully');
        } catch (error) {
            console.error('Error setting ESG criteria:', error);
        }
    };

    const getAllBatchIds = async () => {
        if (!contract) return;
        try {
            const batchIds = await contract.getAllBatchIds();
            console.log('All batch IDs:', batchIds);
            return batchIds;
        } catch (error) {
            console.error('Error getting all batch IDs:', error);
        }
    };

    const serializeESGCriteria = (criteria: any) => {
        console.log('Serializing ESG criteria:', criteria);
        if (!criteria || typeof criteria !== 'object') return null;
        return {
            environmental: criteria.environmental ? Number(criteria.environmental.toString()) : 0,
            social: criteria.social ? Number(criteria.social.toString()) : 0,
            governance: criteria.governance ? Number(criteria.governance.toString()) : 0,
        };
    };

    const getBatchESGCriteria = async (batchId: number) => {
        if (!contract) return null;
        try {
            const criteria = await contract.getBatchESGCriteria(batchId);
            console.log('Raw ESG criteria for batch', batchId, ':', criteria);
            const serializedCriteria = serializeESGCriteria(criteria);
            console.log('Serialized ESG criteria for batch', batchId, ':', serializedCriteria);
            return serializedCriteria;
        } catch (error) {
            console.error('Error getting ESG criteria:', error);
            return null;
        }
    };

    const getTokenInfo = async (batchId: number, address: string) => {
        if (!contract) return null;
        try {
            const balance = await contract.balanceOf(address, batchId);
            const uri = await contract.uri(batchId);
            const esgCriteria = await getBatchESGCriteria(batchId);

            return {
                batchId: Number(batchId.toString()),
                balance: balance.toString(),
                uri,
                esgCriteria,
            };
        } catch (error) {
            console.error('Error getting token info:', error);
            return null;
        }
    };

    return { contract, createBatch, setBatchESGCriteria, getBatchESGCriteria, getTokenInfo, batches };
}
