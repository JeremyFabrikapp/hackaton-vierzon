import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import RegisterABI from '../artifacts/so-bond/artifacts/src/Register.sol/Register.json'; // Ensure this ABI file exists
import { useAccount } from 'wagmi';

const expectedChainId = 31337; // Hardhat's default chainId

export function useSoBondContract(contractAddress: string) {
    const [contract, setContract] = useState<ethers.Contract | null>(null);
    const [bondData, setBondData] = useState<any>(null);
    const { address } = useAccount();

    useEffect(() => {
        const initContract = async () => {
            console.log('Initializing SoBond contract...', window.ethereum);
            if (typeof window.ethereum !== 'undefined' && contractAddress) {
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
                    const soBondContract = new ethers.Contract(contractAddress, RegisterABI.abi, signer);
                    console.log('SoBond Contract initialized:', soBondContract);
                    setContract(soBondContract);
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
        const fetchBondData = async () => {
            if (contract) {
                try {
                    const data = await contract.getBondData();
                    setBondData(data);
                } catch (error) {
                    console.error('Error fetching bond data:', error);
                }
            }
        };

        fetchBondData();
    }, [contract]);

    const getBondData = async () => {
        if (!contract) return null;
        try {
            const data = await contract.getBondData();
            return data;
        } catch (error) {
            console.error('Error getting bond data:', error);
            return null;
        }
    };

    const getBondCouponRate = async () => {
        if (!contract) return null;
        try {
            const rate = await contract.getBondCouponRate();
            return rate;
        } catch (error) {
            console.error('Error getting bond coupon rate:', error);
            return null;
        }
    };

    const getBondUnitValue = async () => {
        if (!contract) return null;
        try {
            const value = await contract.getBondUnitValue();
            return value;
        } catch (error) {
            console.error('Error getting bond unit value:', error);
            return null;
        }
    };

    const getInvestorListAtCoupon = async (couponDate: number) => {
        if (!contract) return null;
        try {
            const investors = await contract.getInvestorListAtCoupon(couponDate);
            return investors;
        } catch (error) {
            console.error('Error getting investor list at coupon:', error);
            return null;
        }
    };

    const enableInvestorToWhitelist = async (investor: string) => {
        if (!contract) return;
        try {
            const tx = await contract.enableInvestorToWhitelist(investor);
            await tx.wait();
            console.log('Investor enabled successfully');
        } catch (error) {
            console.error('Error enabling investor:', error);
        }
    };

    const disableInvestorFromWhitelist = async (investor: string) => {
        if (!contract) return;
        try {
            const tx = await contract.disableInvestorFromWhitelist(investor);
            await tx.wait();
            console.log('Investor disabled successfully');
        } catch (error) {
            console.error('Error disabling investor:', error);
        }
    };

    return { 
        contract, 
        bondData, 
        getBondData, 
        getBondCouponRate, 
        getBondUnitValue, 
        getInvestorListAtCoupon,
        enableInvestorToWhitelist,
        disableInvestorFromWhitelist
    };
}
