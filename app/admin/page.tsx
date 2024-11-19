"use client"
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button"; // Assuming ShadCN uses Button and Input components
import { Input } from "@/components/ui/input"; 
interface MenuItem {
  name: string;
  price: string;
  description: string;
  image: string;
}

interface Category {
  name: string;
  items: MenuItem[];
}

const AdminDashboard = () => {
  const [menu, setMenu] = useState<Category[]>([]);
  const [newItem, setNewItem] = useState<MenuItem>({ name: "", price: "", description: "", image: "" });
  const [newCategoryName, setNewCategoryName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    const res = await fetch("/api/menu");
    const data = await res.json();
    setMenu(data.categories);
  };

  const handleAddCategory = async () => {
    await fetch("/api/menu", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ addCategory: true, categoryName: newCategoryName }),
    });
    setNewCategoryName("");
    fetchMenu();
  };

  const handleAddItem = async () => {
    if (selectedCategory) {
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        const uploadRes = await fetch("/api/menu", {
          method: "POST",
          body: formData,
        });
        const uploadData = await uploadRes.json();
        if (uploadData.success) {
          newItem.image = uploadData.imageUrl;
        }
      }
      await fetch("/api/menu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newItem, categoryName: selectedCategory, addCategory: false }),
      });
      setNewItem({ name: "", price: "", description: "", image: "" });
      setFile(null);
      fetchMenu();
    }
  };

  const handleDeleteCategory = async (index: number) => {
    await fetch("/api/menu", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ categoryIndex: index }),
    });
    fetchMenu();
  };

  const handleDeleteItem = async (categoryIndex: number, itemIndex: number) => {
    await fetch("/api/menu", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ categoryIndex, itemIndex }),
    });
    fetchMenu();
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl mb-6">Admin Dashboard</h1>

      <div className="mb-8">
        <h2 className="text-xl">Add New Category</h2>
        <Input
          type="text"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          placeholder="Category Name"
        />
        <Button onClick={handleAddCategory} className="mt-4">Add Category</Button>
      </div>

      <div className="mb-8">
        <h2 className="text-xl">Add New Item</h2>
        <select onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory}>
          <option value="">Select Category</option>
          {menu.map((category, index) => (
            <option key={index} value={category.name}>{category.name}</option>
          ))}
        </select>
        <Input type="text" placeholder="Name" onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} />
        <Input type="text" placeholder="Price" onChange={(e) => setNewItem({ ...newItem, price: e.target.value })} />
        <Input type="text" placeholder="Description" onChange={(e) => setNewItem({ ...newItem, description: e.target.value })} />
        <Input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
        <Button onClick={handleAddItem} className="mt-4">Add Item</Button>
      </div>

      <h2 className="text-xl mb-4">Manage Categories and Items</h2>
      {menu.map((category, categoryIndex) => (
        <div key={categoryIndex} className="mb-4">
          <h3 className="text-lg">{category.name}</h3>
          <Button onClick={() => handleDeleteCategory(categoryIndex)}>Delete Category</Button>
          {category.items.map((item, itemIndex) => (
            <div key={itemIndex} className="flex items-center mb-2">
              <span>{item.name} - {item.price} - {item.description}</span>
              <Button onClick={() => handleDeleteItem(categoryIndex, itemIndex)} className="ml-2">Delete Item</Button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;
