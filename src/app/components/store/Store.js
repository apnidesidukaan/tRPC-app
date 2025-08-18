import React, { useState } from 'react';
import { Card, CardContent } from '../ui/card/card';
import { Button } from '../ui/button/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog/dialog';
import { Input } from '../ui/input/input';
import { BiPlus, BiStore } from 'react-icons/bi';
import StoreDisplay from './StoreDisplay';

export default function Store({ storesData }) {
  const [stores, setStores] = useState(storesData || []);
  const [newStore, setNewStore] = useState({ name: '', type: '', description: '' });

  const handleCreate = () => {
    const newEntry = {
      id: Date.now(),
      ...newStore,
      vendors: 0,
    };
    setStores((prev) => [...prev, newEntry]);
    setNewStore({ name: '', type: '', description: '' });
  };

  return (
    <div className="p-4">
      {/* Header and Create Store Button */}
      <div className="flex justify-between items-center mb-6">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <BiPlus size={18} /> Create Store
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Create a New Store</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-2">
              <div className="grid gap-2">
                <label htmlFor="name">Store Name</label>
                <Input
                  id="name"
                  value={newStore.name}
                  onChange={(e) => setNewStore({ ...newStore, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="type">Type</label>
                <Input
                  id="type"
                  value={newStore.type}
                  onChange={(e) => setNewStore({ ...newStore, type: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="desc">Description</label>
                <Input
                  id="desc"
                  value={newStore.description}
                  onChange={(e) => setNewStore({ ...newStore, description: e.target.value })}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button onClick={handleCreate}>Create</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Store Cards */}
      <StoreDisplay storesData={storesData} />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">

      </div>
    </div>
  );
}
