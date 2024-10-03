// ShoppingListContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Order } from '../types/Order';



interface ShoppingListContextType {
  items: Order[];
  addItem: (item: Order) => void;
  removeItem: (id: number) => void;
}

const ShoppingListContext = createContext<ShoppingListContextType | undefined>(undefined);

const ShoppingListProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<Order[]>([]);

  const addItem = (item: Order) => {
    setItems((prevItems) => [...prevItems, item]);
  };

  const removeItem = (id: number) => {
    setItems((prevItems) => prevItems.filter(item => item.id !== id));
  };

  return (
    <ShoppingListContext.Provider value={{ items, addItem, removeItem }}>
      {children}
    </ShoppingListContext.Provider>
  );
};


const useShoppingList = () => {
  const context = useContext(ShoppingListContext);
  if (!context) {
    throw new Error('useShoppingList must be used within a ShoppingListProvider');
  }
  return context;
};

export { ShoppingListProvider, useShoppingList };
