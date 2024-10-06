'use client'
import { Button } from '@/components/button'
import { Heading } from '@/components/heading'
import { Input } from '@/components/input'
import { Modal } from '@/components/modal'
import { Select } from '@/components/select'
import { useESGTokenContracts } from '@/hooks/useESGTokenContracts'
import React, { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'

// Resource attributes
const resourceAttributes = {
  Gold: ['Weight', 'Purity', 'Origin'],
  Silver: ['Weight', 'Purity', 'Form'],
  Copper: ['Weight', 'Grade', 'Source'],
}

interface InventoryItem {
  batchId: number;
  balance: string;
  uri: string;
  esgCriteria: {
    environmental: number;
    social: number;
    governance: number;
  };
}

interface SaleModalProps {
  isOpen: boolean;
  onClose: () => void;
  batchId: number;
  onConfirm: (batchId: number, price: string) => void;
}

const SaleModal = ({ isOpen, onClose, batchId, onConfirm }: SaleModalProps) => {
  const [price, setPrice] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(batchId, price);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="mb-4 text-xl font-bold">Put Batch {batchId} on Sale</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <Input
            id="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mt-1"
            required
          />
        </div>
        <div className="flex justify-end space-x-2">
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit">Confirm</Button>
        </div>
      </form>
    </Modal>
  );
};

const InventoryTable = ({ inventory }: { inventory: InventoryItem[] }) => {
  const [saleModalOpen, setSaleModalOpen] = useState(false);
  const [selectedBatchId, setSelectedBatchId] = useState<number | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const openSaleModal = (batchId: number) => {
    setSelectedBatchId(batchId);
    setSaleModalOpen(true);
  };

  const closeSaleModal = () => {
    setSaleModalOpen(false);
    setSelectedBatchId(null);
  };

  const handleSaleConfirm = (batchId: number, price: string) => {
    console.log(`Put batch ${batchId} on sale for ${price}`);
    // Here you would typically call a function to actually put the batch on sale
    setSuccessMessage(`Batch ${batchId} has been put on sale for ${price}`);
    setTimeout(() => setSuccessMessage(null), 5000); // Clear message after 5 seconds
  };

  return (
    <>
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{successMessage}</span>
        </div>
      )}
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">Batch ID</th>
              <th scope="col" className="px-6 py-3">Balance</th>
              <th scope="col" className="px-6 py-3">Environmental</th>
              <th scope="col" className="px-6 py-3">Social</th>
              <th scope="col" className="px-6 py-3">Governance</th>
              <th scope="col" className="px-6 py-3">ESG Score</th>
              <th scope="col" className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item, index) => {
              const esgScore = (item.esgCriteria.environmental + item.esgCriteria.social + item.esgCriteria.governance) / 3;
              return (
                <tr key={item.batchId} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{item.batchId}</td>
                  <td className="px-6 py-4">{item.balance}</td>
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
                    {esgScore > 50 ? (
                      <Button onClick={() => openSaleModal(item.batchId)}>
                        Put on Sale
                      </Button>
                    ) : (
                      <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        Non Valid
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {selectedBatchId !== null && (
        <SaleModal
          isOpen={saleModalOpen}
          onClose={closeSaleModal}
          batchId={selectedBatchId}
          onConfirm={handleSaleConfirm}
        />
      )}
    </>
  );
};

interface AddResourceModalProps {
  isOpen: boolean
  onClose: () => void
  resourceAttributes: Record<string, string[]>
}

const AddResourceModal = ({ isOpen, onClose, resourceAttributes }: AddResourceModalProps) => {
  const [selectedResource, setSelectedResource] = useState('')
  const [batchId, setBatchId] = useState(55556)
  const [amount, setAmount] = useState('')
  const [data, setData] = useState('')
  const { createBatch, setBatchESGCriteria } = useESGTokenContracts()

  const handleResourceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedResource(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedResource || !batchId || !amount || !data) return
    console.log('Adding new resource:', {
      resource: selectedResource,
      batchId,
      amount: parseInt(amount),
      data
    });

    try {
      await createBatch(batchId, parseInt(amount), data)
      // For simplicity, we're setting random ESG criteria values here
      // In a real application, you'd want to collect these values from the user
      const environmental = Math.floor(Math.random() * 100)
      const social = Math.floor(Math.random() * 100)
      const governance = Math.floor(Math.random() * 100)
      await setBatchESGCriteria(batchId, environmental, social, governance)
      onClose()
    } catch (error) {
      console.error('Error adding resource:', error)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="mb-4 text-xl font-bold">Add New Resource</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="resource" className="block text-sm font-medium text-gray-700">
            Select Resource
          </label>
          <Select id="resource" className="mt-1" onChange={handleResourceChange}>
            <option value="">Select a resource</option>
            {Object.keys(resourceAttributes).map((resource) => (
              <option key={resource} value={resource}>
                {resource}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <label htmlFor="batchId" className="block text-sm font-medium text-gray-700">
            Batch ID
          </label>
          <Input
            id="batchId"
            type="number"
            value={batchId}
            onChange={(e) => setBatchId(parseInt(e.target.value))}
            className="mt-1"
          />
        </div>
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
            Amount
          </label>
          <Input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <label htmlFor="data" className="block text-sm font-medium text-gray-700">
            Data
          </label>
          <Input
            id="data"
            value={data}
            onChange={(e) => setData(e.target.value)}
            className="mt-1"
          />
        </div>
        {selectedResource && (
          <>
            {resourceAttributes[selectedResource as keyof typeof resourceAttributes].map((attribute) => (
              <div key={attribute}>
                <label htmlFor={attribute} className="block text-sm font-medium text-gray-700">
                  {attribute}
                </label>
                <Input id={attribute} name={attribute} className="mt-1" />
              </div>
            ))}
          </>
        )}
        <div className="flex justify-end space-x-2">
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit">Add Resource</Button>
        </div>
      </form>
    </Modal>
  )
}

export default function Inventory() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { batches } = useESGTokenContracts()
  console.log('Batches:', batches);

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <Heading>Inventory</Heading>
        <Button onClick={openModal}>Add Resource</Button>
      </div>
      <InventoryTable inventory={batches} />
      <AddResourceModal isOpen={isModalOpen} onClose={closeModal} resourceAttributes={resourceAttributes} />
    </div>
  )
}
