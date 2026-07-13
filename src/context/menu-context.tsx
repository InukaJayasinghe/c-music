"use client"

import React, { createContext, useContext, useState } from "react"

interface MenuContextType {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const MenuContext = createContext<MenuContextType | undefined>(undefined)

export const MenuProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <MenuContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </MenuContext.Provider>
  )
}

export const useMenu = () => {
  const context = useContext(MenuContext)
  if (!context) {
    throw new Error("useMenu must be used within a MenuProvider")
  }
  return context
}
