'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useSoBondContract } from '@/hooks/useSoBondContract'
import { ethers } from 'ethers';

const BondDetailsPage = () => {
  const { address } = useParams()
  const { getBondData, getBondCouponRate, getBondUnitValue, getInvestorListAtCoupon } = useSoBondContract(address as string)
 
  const [bondData, setBondData] = useState<any>(null)
  const [couponRate, setCouponRate] = useState<number | null>(null)
  const [unitValue, setUnitValue] = useState<number | null>(null)
  const [investors, setInvestors] = useState<string[]>([])
  const [coupons, setCoupons] = useState<any[]>([])
  const [esgData, setEsgData] = useState<any[]>([])

  useEffect(() => {
    const fetchCoupons = async () => {
      if (bondData) {
        const issueDate = new Date(bondData.issueDate)
        const maturityDate = new Date(bondData.maturityDate)
        const couponFrequency = Number(bondData.couponFrequency)
        const couponRate = Number(bondData.couponRate) / 100 // Convert to decimal

        let currentDate = new Date(issueDate)
        const couponsData = []

        while (currentDate <= maturityDate) {
          couponsData.push({
            date: new Date(currentDate),
            amount: (Number(bondData.unitValue) * couponRate) / couponFrequency
          })
          currentDate.setMonth(currentDate.getMonth() + (12 / couponFrequency))
        }

        setCoupons(couponsData)
      }
    }

    fetchCoupons()
  }, [])

  useEffect(() => {
    const fetchBondDetails = async () => {
      const data = await getBondData()
      if (data) {
        setBondData({
          bondName: data[0],
          isin: data[1],
          totalSupply: data[2].toString(),
          unitValue: ethers.decodeBytes32String(data[3]),
          couponRate: data[4].toString(),
          couponFrequency: data[5].toString(),
          issueDate: new Date(Number(data[6]) * 1000).toISOString().split('T')[0],
          maturityDate: new Date(Number(data[7]) * 1000).toISOString().split('T')[0],
          lastCouponDate: new Date(Number(data[8]) * 1000).toISOString().split('T')[0]
        })
      }
      const rate = await getBondCouponRate()
      setCouponRate(rate ? Number(rate) : null)
      const value = await getBondUnitValue()
      setUnitValue(value ? Number(value) : null)
      const investorList = await getInvestorListAtCoupon(Math.floor(Date.now() / 1000))
      setInvestors(investorList || [])

      // Mock ESG data
      setEsgData([
        { date: '2023-01-01', rating: 'A-', score: 75 },
        { date: '2023-04-01', rating: 'A', score: 82 },
        { date: '2023-07-01', rating: 'A+', score: 88 },
        { date: '2023-10-01', rating: 'AA-', score: 91 },
      ])
    }

    fetchBondDetails()
  }, [getBondData, getBondCouponRate, getBondUnitValue, getInvestorListAtCoupon])

  if (!address || typeof address !== 'string') {
    return <div>No address</div>
  }

  // Mock data for investors and coupons if empty
  const mockInvestors = [
    '0x1234567890123456789012345678901234567890',
    '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd',
    '0x9876543210987654321098765432109876543210'
  ]

  const mockCoupons = [
    { date: new Date('2024-01-01'), amount: 50 },
    { date: new Date('2024-07-01'), amount: 50 },
    { date: new Date('2025-01-01'), amount: 50 }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Bond Dashboard</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white shadow-lg rounded-xl p-6 transition-all duration-300 hover:shadow-xl">
          <h2 className="text-2xl font-semibold mb-6 text-indigo-600">Bond Overview</h2>
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">Bond Address:</p>
            <p className="font-mono bg-gray-100 p-3 rounded-lg text-sm break-all">{address}</p>
          </div>
          {bondData && (
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(bondData).map(([key, value]) => (
                <div key={key} className="mb-4">
                  <p className="text-sm font-semibold text-gray-700 mb-1">{key.replace(/([A-Z])/g, ' $1').trim()}:</p>
                  <p className="text-lg text-gray-900">{value as React.ReactNode}</p>
                </div>
              ))}
                <div key="l-reimbursm" className="mb-4">
                  <p className="text-sm font-semibold text-gray-700 mb-1">Latest reimbursement:</p>
                  <p className="text-lg text-gray-900">2024-11-15</p>
                </div>
            </div>
          )}
        </div>
        <div className="bg-white shadow-lg rounded-xl p-6 transition-all duration-300 hover:shadow-xl">
          <h2 className="text-2xl font-semibold mb-6 text-indigo-600">Emitter Details</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-1">Name:</p>
              <p className="text-lg text-gray-900">Example Emitter Corp</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-1">Country:</p>
              <p className="text-lg text-gray-900">United States</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-1">Industry:</p>
              <p className="text-lg text-gray-900">Technology</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-1">Credit Rating:</p>
              <p className="text-lg text-gray-900 font-semibold text-green-600">AA+</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 bg-white shadow-lg rounded-xl p-6 transition-all duration-300 hover:shadow-xl">
        <h2 className="text-2xl font-semibold mb-6 text-indigo-600">Investors</h2>
        {investors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {investors.map((investor, index) => (
              <div key={index} className="bg-gray-100 rounded-lg p-3 transition-all duration-300 hover:bg-gray-200">
                <p className="font-mono text-sm break-all">{investor}</p>
              </div>
            ))}
          </div>
        ) : (
          <>
            <p className="text-gray-600 italic mb-4">No investors found. Displaying mock data:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockInvestors.map((investor, index) => (
                <div key={index} className="bg-gray-100 rounded-lg p-3 transition-all duration-300 hover:bg-gray-200">
                  <p className="font-mono text-sm break-all">{investor}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <div className="mt-8 bg-white shadow-lg rounded-xl p-6 transition-all duration-300 hover:shadow-xl">
        <h2 className="text-2xl font-semibold mb-6 text-indigo-600">Coupons</h2>
        {coupons.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Amount</th>
                </tr>
              </thead>
              <tbody>
                {coupons.map((coupon, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                    <td className="border px-4 py-2">{coupon.date.toISOString().split('T')[0]}</td>
                    <td className="border px-4 py-2">{coupon.amount.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <>
            <p className="text-gray-600 italic mb-4">No coupons found. Displaying mock data:</p>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="px-4 py-2">Date</th>
                    <th className="px-4 py-2">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {mockCoupons.map((coupon, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                      <td className="border px-4 py-2">{coupon.date.toISOString().split('T')[0]}</td>
                      <td className="border px-4 py-2">{coupon.amount.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
      <div className="mt-8 bg-white shadow-lg rounded-xl p-6 transition-all duration-300 hover:shadow-xl">
        <h2 className="text-2xl font-semibold mb-6 text-indigo-600">ESG Data</h2>
        {esgData.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Rating</th>
                  <th className="px-4 py-2">Score</th>
                </tr>
              </thead>
              <tbody>
                {esgData.map((audit, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                    <td className="border px-4 py-2">{audit.date}</td>
                    <td className="border px-4 py-2">{audit.rating}</td>
                    <td className="border px-4 py-2">{audit.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-600 italic">No ESG data found.</p>
        )}
      </div>
    </div>
  )
}

export default BondDetailsPage
