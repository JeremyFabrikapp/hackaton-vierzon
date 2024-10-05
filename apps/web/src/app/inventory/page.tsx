'use client'
import React from 'react';

import { useState } from 'react'
import { Heading } from '@/components/heading'
import { Button } from '@/components/button'
import { Modal } from '@/components/modal'
import { Select } from '@/components/select'
import { Input } from '@/components/input'
import type { Metadata } from 'next'

// export const metadata: Metadata = {
//   title: 'Inventory',
// }

export default function Inventory() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedResource, setSelectedResource] = useState('')

  // Mock data for demonstration
  const inventory = [
    { resource: 'Gold', batches: ['Batch 1', 'Batch 2', 'Batch 3'] },
    { resource: 'Silver', batches: ['Batch 1', 'Batch 2'] },
    { resource: 'Copper', batches: ['Batch 1'] },
  ]

  // Resource attributes
  const resourceAttributes = {
    Gold: ['Weight', 'Purity', 'Origin'],
    Silver: ['Weight', 'Purity', 'Form'],
    Copper: ['Weight', 'Grade', 'Source'],
  }

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  const handleResourceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedResource(e.target.value)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <Heading>Inventory</Heading>
        <Button onClick={openModal}>Add Resource</Button>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 text-left">Resource</th>
            <th className="border p-2 text-left">Batches</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className="border p-2">{item.resource}</td>
              <td className="border p-2">
                {item.batches.map((batch, batchIndex) => (
                  <span key={batchIndex} className="inline-block bg-gray-200 rounded px-2 py-1 text-sm mr-2 mb-2">
                    {batch}
                  </span>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2 className="text-xl font-bold mb-4">Add New Resource</h2>
        <div className="space-y-4">
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
            <Button onClick={closeModal}>
              Cancel
            </Button>
            <Button type="submit">Add Resource</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
