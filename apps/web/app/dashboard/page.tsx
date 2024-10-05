
import React from 'react';
import Image from 'next/image';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96">
              <div className="flex flex-col items-center justify-center h-full">
                <Image
                  src="/placeholder.svg"
                  alt="Dashboard Placeholder"
                  width={200}
                  height={200}
                />
                <p className="mt-4 text-lg text-gray-600">
                  Your dashboard content goes here
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
