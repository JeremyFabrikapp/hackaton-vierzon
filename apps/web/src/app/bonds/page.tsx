'use client'
import { Button } from '@/components/button'
import { Heading } from '@/components/heading'
import { useESGTokenContracts } from '@/hooks/useESGTokenContracts'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface Bond {
  id: number
  name: string
  issuer: string
  maturityDate: string
  interestRate: number
  esgScore: number
}

const BondList = ({
  bonds,
  onSubscribe,
  onViewDetails,
}: {
  bonds: Bond[]
  onSubscribe: (bondId: number) => void
  onViewDetails: (bondId: number) => void
}) => (
  <div className="overflow-x-auto rounded-lg shadow-md">
    <table className="w-full text-left text-sm text-gray-500">
      <thead className="bg-gray-50 text-xs uppercase text-gray-700">
        <tr>
          <th scope="col" className="px-6 py-3">
            Name
          </th>
          <th scope="col" className="px-6 py-3">
            Issuer
          </th>
          <th scope="col" className="px-6 py-3">
            Maturity Date
          </th>
          <th scope="col" className="px-6 py-3">
            Interest Rate
          </th>
          <th scope="col" className="px-6 py-3">
            ESG Score
          </th>
          <th scope="col" className="px-6 py-3">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {bonds.map((bond) => (
          <tr key={bond.id} className="border-b bg-white hover:bg-gray-50">
            <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">{bond.name}</td>
            <td className="px-6 py-4">{bond.issuer}</td>
            <td className="px-6 py-4">{bond.maturityDate}</td>
            <td className="px-6 py-4">{bond.interestRate}%</td>
            <td className="px-6 py-4">
              <span className="rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                {bond.esgScore.toFixed(2)}
              </span>
            </td>
            <td className="px-6 py-4">
              <div className="flex space-x-2">
                <Button onClick={() => onSubscribe(bond.id)}>Subscribe</Button>
                <Button onClick={() => onViewDetails(bond.id)} color="light">
                  View Details
                </Button>
              </div>
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
  const router = useRouter()

  useEffect(() => {
    // In a real application, you would fetch this data from an API
    // Here we're generating mock data based on the batches
    const mockBonds: Bond[] = batches.map((batch, index) => ({
      id: batch.batchId,
      name: `ESG Bond ${batch.batchId}`,
      issuer: `Issuer ${index + 1}`,
      maturityDate: new Date(Date.now() + Math.random() * 31536000000).toLocaleDateString(), // Random date within next year
      interestRate: parseFloat((Math.random() * 5 + 1).toFixed(2)), // Random interest rate between 1% and 6%
      esgScore: (batch.esgCriteria.environmental + batch.esgCriteria.social + batch.esgCriteria.governance) / 3,
    }))
    setBonds(mockBonds)
  }, [batches])

  const handleSubscribe = (bondId: number) => {
    console.log(`Subscribing to bond ${bondId}`)
    // Here you would implement the logic to subscribe to a bond
  }

  const handleViewDetails = (bondId: number) => {
    console.log(`Viewing details of bond ${bondId}`)
    // Use Next.js router to navigate to the bond details page
    router.push(`/bonds/${bondId}`)
    // Here you would implement the logic to view bond details
  }

  return (
    <div>
      <div className="mb-6">
        <Heading>Available Bonds</Heading>
      </div>
      <BondList bonds={bonds} onSubscribe={handleSubscribe} onViewDetails={handleViewDetails} />
    </div>
  )
}
