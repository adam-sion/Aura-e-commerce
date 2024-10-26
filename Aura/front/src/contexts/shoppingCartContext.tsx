import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Order } from '../types/Order';



interface ShoppingListContextType {
  items: Order[];
  addItem: (item: Order) => void;
  removeItem: (item: Order) => void;
  removeAll: ()=> void;
}

const ShoppingListContext = createContext<ShoppingListContextType | undefined>(undefined);

const ShoppingListProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<Order[]>([]);

  const addItem = (item: Order) => {
    setItems((prevItems) => [...prevItems, item]);
  };

  const removeItem = (item:Order) => {
    setItems((prevItems) => prevItems.filter(x => x!== item));
  };

  const removeAll = ()=> {
    setItems([]);
  }

  return (
    <ShoppingListContext.Provider value={{ items, addItem, removeItem, removeAll }}>
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
  