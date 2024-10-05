'use client'
import { Button } from '@/components/button'
import { Heading } from '@/components/heading'
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

const MarketplaceTable = ({ items }: { items: MarketplaceItem[] }) => (
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
                <Button onClick={() => console.log(`Buy item ${item.batchId}`)}>Buy</Button>
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
  
  // Mock marketplace items based on batches
  const marketplaceItems: MarketplaceItem[] = batches.map(batch => ({
    batchId: batch.batchId,
    price: (Math.random() * 10).toFixed(2), // Random price between 0 and 10 ETH
    amount: batch.balance,
    esgCriteria: batch.esgCriteria
  }))

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <Heading>Marketplace</Heading>
      </div>
      <MarketplaceTable items={marketplaceItems} />
    </div>
  )
}
