'use client'
import React, { useState, useEffect } from 'react'
import { Heading } from '@/components/heading'
import { Button } from '@/components/button'
import { useESGTokenContracts } from '@/hooks/useESGTokenContracts'

interface Bond {
  id: number;
  name: string;
  issuer: string;
  maturityDate: string;
  interestRate: number;
  esgScore: number;
}

const BondList = ({ bonds, onSubscribe }: { bonds: Bond[], onSubscribe: (bondId: number) => void }) => (
  <div className="overflow-x-auto shadow-md rounded-lg">
    <table className="w-full text-sm text-left text-gray-500">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-3">Name</th>
          <th scope="col" className="px-6 py-3">Issuer</th>
          <th scope="col" className="px-6 py-3">Maturity Date</th>
          <th scope="col" className="px-6 py-3">Interest Rate</th>
          <th scope="col" className="px-6 py-3">ESG Score</th>
          <th scope="col" className="px-6 py-3">Action</th>
        </tr>
      </thead>
      <tbody>
        {bonds.map((bond) => (
          <tr key={bond.id} className="bg-white border-b hover:bg-gray-50">
            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{bond.name}</td>
            <td className="px-6 py-4">{bond.issuer}</td>
            <td className="px-6 py-4">{bond.maturityDate}</td>
            <td className="px-6 py-4">{bond.interestRate}%</td>
            <td className="px-6 py-4">
              <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                {bond.esgScore.toFixed(2)}
              </span>
            </td>
            <td className="px-6 py-4">
              <Button onClick={() => onSubscribe(bond.id)}>Subscribe</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

export default function Bonds() {
  const [bonds, setBonds] = useState<Bond[]>([])
  const { batches } = useESGTokenContracts()

  useEffect(() => {
    // In a real application, you would fetch this data from an API
    // Here we're generating mock data based on the batches
    const mockBonds: Bond[] = batches.map((batch, index) => ({
      id: batch.batchId,
      name: `ESG Bond ${batch.batchId}`,
      issuer: `Issuer ${index + 1}`,
      maturityDate: new Date(Date.now() + Math.random() * 31536000000).toLocaleDateString(), // Random date within next year
      interestRate: parseFloat((Math.random() * 5 + 1).toFixed(2)), // Random interest rate between 1% and 6%
      esgScore: (batch.esgCriteria.environmental + batch.esgCriteria.social + batch.esgCriteria.governance) / 3
    }))
    setBonds(mockBonds)
  }, [batches])

  const handleSubscribe = (bondId: number) => {
    console.log(`Subscribing to bond ${bondId}`)
    // Here you would implement the logic to subscribe to a bond
  }

  return (
    <div>
      <div className="mb-6">
        <Heading>Available Bonds</Heading>
      </div>
      <BondList bonds={bonds} onSubscribe={handleSubscribe} />
    </div>
  )
}
