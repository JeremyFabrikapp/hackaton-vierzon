'use client'

import * as React from 'react'
import * as Headless from '@headlessui/react'
import clsx from 'clsx'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
}

const sizes = {
  sm: 'sm:max-w-sm',
  md: 'sm:max-w-md',
  lg: 'sm:max-w-lg',
}

export function Modal({ isOpen, onClose, children, size = 'md' }: ModalProps) {
  return (
    <Headless.Transition show={isOpen} as={React.Fragment}>
      <Headless.Dialog onClose={onClose} className="relative z-50">
        <Headless.Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Headless.Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Headless.Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Headless.Dialog.Panel
                className={clsx(
                  'w-full transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all',
                  sizes[size]
                )}
              >
                {children}
              </Headless.Dialog.Panel>
            </Headless.Transition.Child>
          </div>
        </div>
      </Headless.Dialog>
    </Headless.Transition>
  )
}
