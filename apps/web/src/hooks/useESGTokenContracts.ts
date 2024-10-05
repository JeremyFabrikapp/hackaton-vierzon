import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import HybridESGMultiTokenABI from '../artifacts/core/artifacts/contracts/HybridESGMultiToken.sol/HybridESGMultiToken.json'; // Ensure this ABI file exists

const contractAddress = '0x...'; // Replace with the actual deployed contract address

export function useESGTokenContracts() {
  const [contract, setContract] = useState<ethers.Contract | null>(null);

  useEffect(() => {
    const initContract = async () => {
      if (typeof window.ethereum !== 'undefined') {
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const provider = new ethers.WebSocketProvider(window.ethereum);
          const signer = await provider.getSigner();
          const esgContract = new ethers.Contract(contractAddress, HybridESGMultiTokenABI.abi, signer);
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

  const createBatch = async (batchId: number, amount: number, data: string) => {
    if (!contract) return;
    try {
      const tx = await contract.createBatch(batchId, amount, ethers.toUtf8Bytes(data));
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

  const getBatchESGCriteria = async (batchId: number) => {
    if (!contract) return null;
    try {
      const criteria = await contract.getBatchESGCriteria(batchId);
      return {
        environmental: criteria.environmental.toNumber(),
        social: criteria.social.toNumber(),
        governance: criteria.governance.toNumber(),
      };
    } catch (error) {
      console.error('Error getting ESG criteria:', error);
      return null;
    }
  };

  return { contract, createBatch, setBatchESGCriteria, getBatchESGCriteria };
}
