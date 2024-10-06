'use client'
import { Button } from '@/components/button'
import { Heading } from '@/components/heading'
import { Input } from '@/components/input'
import { Modal } from '@/components/modal'
import { useESGTokenContracts } from '@/hooks/useESGTokenContracts'
import { useSoBondContract } from '@/hooks/useSoBondContract'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

interface Bond {
  id: number
  name: string
  issuer: string
  maturityDate: string
  interestRate: number
  esgScore: number
}

const BondTableHeader = () => (
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
)

const BondTableRow = ({
  bond,
  onSubscribe,
  onViewDetails,
}: {
  bond: Bond
  onSubscribe: (bondId: number) => void
  onViewDetails: (bondId: number) => void
}) => (
  <tr key={bond.id} className="border-b bg-white hover:bg-gray-50">
    <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">{bond.name}</td>
    <td className="px-6 py-4">{bond.issuer || "GOLDALLIANCE"}</td>
    <td className="px-6 py-4">{bond.maturityDate}</td>
    <td className="px-6 py-4">{bond.interestRate}%</td>
    <td className="px-6 py-4">
      <span className="rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
        {(bond.esgScore || 87).toFixed(2)}
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
)

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
      <BondTableHeader />
      <tbody>
        {bonds.map((bond) => (
          <BondTableRow key={bond.id} bond={bond} onSubscribe={onSubscribe} onViewDetails={onViewDetails} />
        ))}
      </tbody>
    </table>
  </div>
)

const useBondData = (bondAddress: string) => {
  const [bond, setBond] = useState<Bond | null>(null)
  const { getBondData } = useSoBondContract(bondAddress)

  useEffect(() => {
    const fetchBondData = async () => {
      const bondData = await getBondData()
      if (bondData) {
        setBond({
          id: parseInt(bondAddress),
          name: bondData.name,
          issuer: bondData.issuer,
          maturityDate: new Date(Number(bondData.maturityDate) * 1000).toLocaleDateString(),
          interestRate: parseFloat(bondData.couponRate) / 100,
          esgScore: parseFloat(bondData.esgScore) / 100,
        })
      }
    }
    fetchBondData()
  }, [getBondData, bondAddress])

  return bond
}

export default function Bonds() {
  const router = useRouter()
  const bondAddresses = [
    '0x99bbA657f2BbC93c02D617f8bA121cB8Fc104Acf',
    '0xb7278A61aa25c888815aFC32Ad3cC52fF24fE575',
    '0x5f3f1dBD7B74C6B46e8c44f98792A1dAf8d69154',
  ]
  
  const bond1 = useBondData(bondAddresses[0])
  const bond2 = useBondData(bondAddresses[1])
  const bond3 = useBondData(bondAddresses[2])

  const bonds = useMemo(() => {
    return [bond1, bond2, bond3].filter((bond): bond is Bond => bond !== null)
  }, [bond1, bond2, bond3])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isStepperModalOpen, setIsStepperModalOpen] = useState(false)
  const [selectedBond, setSelectedBond] = useState<Bond | null>(null)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  const handleSubscribe = (bondId: number) => {
    const bond = bonds.find(b => b.id === bondId)
    if (bond) {
      setSelectedBond(bond)
      setIsModalOpen(true)
    }
  }

  const [quantity, setQuantity] = useState(1)
  const bondPrice = 100 // Assuming a fixed price of 100 per bond for this example

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
      setShowSuccessMessage(true)
      setTimeout(() => setShowSuccessMessage(false), 3000)
    }, 2000)
  }

  const [currentStep, setCurrentStep] = useState(0)

  const handleViewDetails = (bondId: number) => {
    console.log(`Viewing details of bond ${bondId}`)
    router.push(`/bonds/${bondId}`)
  }

  return (
    <div>
      <div className="mb-6">
        <Heading>Available Bonds</Heading>
      </div>
      <BondList bonds={bonds} onSubscribe={handleSubscribe} onViewDetails={handleViewDetails} />
      
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="mb-4 text-xl font-bold">Confirm Purchase</h2>
        <p>You are about to purchase the bond "{selectedBond?.name}"</p>
        <div className="mt-4">
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
            Quantity:
          </label>
          <Input
            id="quantity"
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            className="mt-1"
          />
        </div>
        <p className="mt-4">Total to pay: ${bondPrice * quantity}</p>
        <div className="mt-4 flex justify-end space-x-2">
          <Button onClick={() => setIsModalOpen(false)} color="light">Cancel</Button>
          <Button onClick={handleConfirmPurchase}>Confirm</Button>
        </div>
      </Modal>

      <Modal isOpen={isStepperModalOpen} onClose={() => setIsStepperModalOpen(false)}>
        <h2 className="mb-4 text-xl font-bold">Bond Subscription in Progress</h2>
        <div className="space-y-4">
          <div className={`${currentStep >= 1 ? 'text-green-500' : 'text-gray-500'}`}>
            1. Initiating Bond Subscription
          </div>
          <div className={`${currentStep >= 2 ? 'text-green-500' : 'text-gray-500'}`}>
            2. Verifying Investor Eligibility
          </div>
          <div className={`${currentStep >= 3 ? 'text-green-500' : 'text-gray-500'}`}>
            3. Processing Payment
          </div>
          <div className={`${currentStep >= 4 ? 'text-green-500' : 'text-gray-500'}`}>
            4. Issuing Bond Certificate
          </div>
          <div className={`${currentStep >= 5 ? 'text-green-500' : 'text-gray-500'}`}>
            5. Subscription Completed!
          </div>
        </div>
      </Modal>

      {showSuccessMessage && (
        <div className="fixed bottom-4 right-4 rounded-md bg-green-500 p-4 text-white shadow-lg">
          Purchase successful!
        </div>
      )}
    </div>
  )
}
