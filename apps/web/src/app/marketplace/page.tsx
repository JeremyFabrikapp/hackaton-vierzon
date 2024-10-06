'use client'
import { Button } from '@/components/button'
import { Heading } from '@/components/heading'
import { Modal } from '@/components/modal'
import { Input } from '@/components/input'
import { useESGTokenContracts } from '@/hooks/useESGTokenContracts'
import React, { useState } from 'react'

interface MarketplaceItem {
  batchId: number;
  price: string;
  amount: string;
  esgCriteria: {
    environmental: number;
    social: number;
    governance: number;
  };
}

const MarketplaceTable = ({ items, onBuy }: { items: MarketplaceItem[], onBuy: (item: MarketplaceItem) => void }) => (
  <div className="overflow-x-auto shadow-md rounded-lg">
    <table className="w-full text-sm text-left text-gray-500">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-3">Batch ID</th>
          <th scope="col" className="px-6 py-3">Price</th>
          <th scope="col" className="px-6 py-3">Amount</th>
          <th scope="col" className="px-6 py-3">Environmental</th>
          <th scope="col" className="px-6 py-3">Social</th>
          <th scope="col" className="px-6 py-3">Governance</th>
          <th scope="col" className="px-6 py-3">ESG Score</th>
          <th scope="col" className="px-6 py-3">Action</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => {
          const esgScore = (item.esgCriteria.environmental + item.esgCriteria.social + item.esgCriteria.governance) / 3;
          return (
            <tr key={item.batchId} className="bg-white border-b hover:bg-gray-50">
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{item.batchId}</td>
              <td className="px-6 py-4">{item.price} ETH</td>
              <td className="px-6 py-4">{item.amount}</td>
              <td className="px-6 py-4">
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {item.esgCriteria.environmental}
                </span>
              </td>
              <td className="px-6 py-4">
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {item.esgCriteria.social}
                </span>
              </td>
              <td className="px-6 py-4">
                <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {item.esgCriteria.governance}
                </span>
              </td>
              <td className="px-6 py-4">
                <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {esgScore.toFixed(2)}
                </span>
              </td>
              <td className="px-6 py-4">
                <Button onClick={() => onBuy(item)}>Buy</Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
)

export default function Marketplace() {
  const { batches } = useESGTokenContracts()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isStepperModalOpen, setIsStepperModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<MarketplaceItem | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [currentStep, setCurrentStep] = useState(0)
  
  // Mock marketplace items based on batches
  const marketplaceItems: MarketplaceItem[] = batches.map(batch => ({
    batchId: batch.batchId,
    price: (Math.random() * 10).toFixed(2), // Random price between 0 and 10 ETH
    amount: batch.balance,
    esgCriteria: batch.esgCriteria
  }))

  const handleBuy = (item: MarketplaceItem) => {
    setSelectedItem(item)
    setIsModalOpen(true)
  }

  const handleConfirmPurchase = () => {
    setIsModalOpen(false)
    setIsStepperModalOpen(true)
    runStepper()
  }

  const runStepper = async () => {
    const steps = [
      'Sending Funds to DVP',
      'Sending Tokens to DVP',
      'Atomic Swap',
      'Swap completed!'
    ]

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 2000))
      setCurrentStep(i + 1)
    }

    setTimeout(() => {
      setIsStepperModalOpen(false)
      setSelectedItem(null)
      setQuantity(1)
      setCurrentStep(0)
    }, 2000)
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <Heading>Marketplace</Heading>
      </div>
      <MarketplaceTable items={marketplaceItems} onBuy={handleBuy} />
      
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="mb-4 text-xl font-bold">Confirm Purchase</h2>
        {selectedItem && (
          <>
            <p>You are about to purchase from batch {selectedItem.batchId}</p>
            <p>Price: {selectedItem.price} ETH</p>
            <p>Available amount: {selectedItem.amount}</p>
            <div className="mt-4">
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                Quantity:
              </label>
              <Input
                id="quantity"
                type="number"
                min="1"
                max={parseInt(selectedItem.amount)}
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="mt-1"
              />
            </div>
            <p className="mt-4">Total to pay: {(parseFloat(selectedItem.price) * quantity).toFixed(2)} ETH</p>
            <div className="mt-4 flex justify-end space-x-2">
              <Button onClick={() => setIsModalOpen(false)} color="light">Cancel</Button>
              <Button onClick={handleConfirmPurchase}>Confirm</Button>
            </div>
          </>
        )}
      </Modal>

      <Modal isOpen={isStepperModalOpen} onClose={() => setIsStepperModalOpen(false)}>
        <h2 className="mb-4 text-xl font-bold">Purchase in Progress</h2>
        <div className="space-y-4">
          <div className={`${currentStep >= 1 ? 'text-green-500' : 'text-gray-500'}`}>
            1. Sending Funds to DVP
          </div>
          <div className={`${currentStep >= 2 ? 'text-green-500' : 'text-gray-500'}`}>
            2. Sending Tokens to DVP
          </div>
          <div className={`${currentStep >= 3 ? 'text-green-500' : 'text-gray-500'}`}>
            3. Atomic Swap
          </div>
          <div className={`${currentStep >= 4 ? 'text-green-500' : 'text-gray-500'}`}>
            4. Swap completed!
          </div>
        </div>
      </Modal>
    </div>
  )
}
