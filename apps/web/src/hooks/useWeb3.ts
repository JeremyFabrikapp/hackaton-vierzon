import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const useWeb3 = () => {
    const [provider, setProvider] = useState<ethers.Provider>();
    const [signer, setSigner] = useState<any>();
    const [address, setAddress] = useState("");

    useEffect(() => {

        const connectWallet = async () => {
            if (window.ethereum) {
                const _provider = new ethers.WebSocketProvider(window.ethereum);
                setProvider(_provider);
                await _provider.send("eth_requestAccounts", []);
                const _signer = await _provider.getSigner();
                setSigner(_signer);
                setAddress(await _signer.getAddress());
            }
        };
        connectWallet();
    }, []);

    return { provider, signer, address };
};

export default useWeb3;