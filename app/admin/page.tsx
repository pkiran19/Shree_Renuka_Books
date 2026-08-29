'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Shield,
  Plus,
  Sparkles,
  Lock,
  Unlock,
  BookOpen,
  Layers,
  ArrowLeft,
  CheckCircle2,
  RefreshCw,
  LogOut,
  MapPin,
} from 'lucide-react';
import { Item } from '@/lib/types';
import { STORE_CONTACT } from '@/lib/initial-data';
import {
  getStoredItems,
  subscribeToInventory,
  addItem,
  updateItem,
  deleteItem,
  toggleStock,
  toggleNewArrival,
  resetToDefaults,
} from '@/lib/store';
import { GlassCard } from '@/components/ui/GlassCard';
import { GlassButton } from '@/components/ui/GlassButton';
import { AdminStats } from '@/components/admin/AdminStats';
import { InventoryTable } from '@/components/admin/InventoryTable';
import { AddItemModal } from '@/components/admin/AddItemModal';
import { EditItemModal } from '@/components/admin/EditItemModal';

const DEFAULT_ADMIN_PIN = 'admin123';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [items, setItems] = useState<Item[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  // Check saved session
  useEffect(() => {
    const savedAuth = sessionStorage.getItem('shree_renuka_admin_auth');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Load and subscribe to inventory
  useEffect(() => {
    setItems(getStoredItems());
    const unsubscribe = subscribeToInventory((updatedItems) => {
      setItems(updatedItems);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === DEFAULT_ADMIN_PIN || pinInput === 'admin') {
      setIsAuthenticated(true);
      sessionStorage.setItem('shree_renuka_admin_auth', 'true');
      setErrorMsg('');
    } else {
      setErrorMsg('Incorrect PIN. (Default test PIN is admin123)');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('shree_renuka_admin_auth');
    setPinInput('');
  };

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  // CRUD Handlers
  const handleAddItem = (itemData: Omit<Item, 'id' | 'createdAt'>) => {
    const created = addItem(itemData);
    setItems(getStoredItems());
    showNotification(`"${created.title}" successfully published as New Arrival!`);
  };

  const handleSaveEdit = (id: string, updates: Partial<Item>) => {
    updateItem(id, updates);
    setItems(getStoredItems());
    showNotification('Item updated successfully.');
  };

  const handleDelete = (id: string) => {
    deleteItem(id);
    setItems(getStoredItems());
    showNotification('Item removed from inventory.');
  };

  const handleToggleStock = (id: string) => {
    const updated = toggleStock(id);
    if (updated) {
      setItems(getStoredItems());
      showNotification(`Stock status changed for "${updated.title}"`);
    }
  };

  const handleToggleNewArrival = (id: string) => {
    const updated = toggleNewArrival(id);
    if (updated) {
      setItems(getStoredItems());
      showNotification(`New Arrival status toggled for "${updated.title}"`);
    }
  };

  const handleResetData = () => {
    const defaults = resetToDefaults();
    setItems(defaults);
    showNotification('Inventory reset to initial catalog dataset.');
  };

  // If not authenticated, show sleek Glassmorphic login box
  if (!isAuthenticated) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
        <GlassCard className="w-full max-w-md p-8 text-center space-y-6 border-white/15" glow="blue">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400 mx-auto">
            <Lock className="w-7 h-7" />
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-white tracking-tight">Admin Portal Access</h1>
            <p className="text-xs text-slate-400">
              Shree Renuka Book House • Shop 5 PJ Extension, Davangere
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                Enter Admin PIN / Passcode
              </label>
              <input
                type="password"
                required
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value);
                  setErrorMsg('');
                }}
                placeholder="Default PIN: admin123"
                className="w-full glass-input rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500"
              />
              {errorMsg && <p className="text-xs text-rose-400 mt-1.5">{errorMsg}</p>}
            </div>

            <GlassButton type="submit" variant="primary" size="lg" className="w-full font-bold">
              <span>Unlock Admin Panel</span>
            </GlassButton>

            <div className="pt-2 text-center">
              <span className="text-[11px] text-slate-400 block">
                (Quick Demo Passcode: <strong className="text-sky-300">admin123</strong>)
              </span>
            </div>
          </form>

          <div className="pt-4 border-t border-white/10">
            <Link
              href="/"
              className="text-xs text-slate-400 hover:text-sky-300 inline-flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Storefront</span>
            </Link>
          </div>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-24 right-6 z-50 animate-fadeIn">
          <div className="p-4 rounded-xl bg-emerald-950/90 border border-emerald-400/40 text-emerald-200 text-xs sm:text-sm font-semibold shadow-2xl flex items-center gap-2 backdrop-blur-md">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{notification}</span>
          </div>
        </div>
      )}

      {/* Header Bar */}
      <GlassCard className="p-6 sm:p-8 border-white/15 bg-gradient-to-r from-slate-900/90 via-sky-950/40 to-slate-900/90" hoverEffect={false}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-semibold">
                <Shield className="w-3.5 h-3.5" />
                <span>Store Management</span>
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-sky-400" />
                <span>Davangere Branch (PJ Extension)</span>
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Inventory & New Arrivals Manager
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Add new arrivals, update textbook prices, and toggle in-stock availability instantly on the live website.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 flex-wrap">
            <GlassButton
              type="button"
              variant="primary"
              size="md"
              onClick={() => setIsAddModalOpen(true)}
              className="gap-2 font-bold shadow-sky-500/25 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white"
            >
              <Plus className="w-4 h-4" />
              <span>+ Add New Arrival</span>
            </GlassButton>

            <button
              onClick={handleLogout}
              className="p-2.5 rounded-xl bg-white/5 hover:bg-rose-500/20 text-slate-300 hover:text-rose-300 border border-white/10 transition-colors flex items-center gap-1.5 text-xs font-medium"
              title="Log out from admin"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </GlassCard>

      {/* Admin Metrics */}
      <AdminStats items={items} />

      {/* Main Inventory Management Table */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">Live Store Inventory</h2>
          <span className="text-xs text-slate-400">
            Changes reflect immediately across the website and catalog
          </span>
        </div>

        <InventoryTable
          items={items}
          onToggleStock={handleToggleStock}
          onToggleNewArrival={handleToggleNewArrival}
          onEdit={(item) => setEditingItem(item)}
          onDelete={handleDelete}
          onReset={handleResetData}
        />
      </div>

      {/* Add New Arrival Modal */}
      <AddItemModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddItem}
      />

      {/* Edit Item Modal */}
      <EditItemModal
        item={editingItem}
        isOpen={!!editingItem}
        onClose={() => setEditingItem(null)}
        onSave={handleSaveEdit}
      />
    </div>
  );
}
