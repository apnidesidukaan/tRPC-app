"use client";

import React, { useState, useEffect } from 'react';
import { api } from "~/trpc/react";
import { useRouter, useParams } from 'next/navigation';
import { Button } from '~/app/components/ui/button/button';
import { Input } from '~/app/components/ui/input/input';

const EditProductPage = () => {
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;
  
  const [formData, setFormData] = useState({
    slug: '',
    name: '',
    subtitle: '',
    description: '',
    brand: '',
    manufacturer: '',
    sku: '',
    price: '',
    mrp: '',
    cost: '',
    tax: '',
    discount: '',
    stock: '',
    categoryId: '',
    tags: '',
    images: '',
  });

  // Fetch product data
  const { data: product, isLoading: isProductLoading } = api.product.getById.useQuery(productId, {
    enabled: !!productId,
  });

  // Update mutation
  const { mutate: updateProduct, isPending: isUpdating } = api.product.update.useMutation({
    onSuccess: () => {
      alert('Product updated successfully!');
      router.push('/products');
    },
    onError: (error) => {
      alert(`Error updating product: ${error.message}`);
    }
  });

  // Populate form with product data when it loads
  useEffect(() => {
    if (product) {
      setFormData({
        slug: product.slug || '',
        name: product.name || '',
        subtitle: product.subtitle || '',
        description: product.description || '',
        brand: product.brand || '',
        manufacturer: product.manufacturer || '',
        sku: product.sku || '',
        price: product.price?.toString() || '',
        mrp: product.mrp?.toString() || '',
        cost: product.cost?.toString() || '',
        tax: product.tax?.toString() || '',
        discount: product.discount?.toString() || '',
        stock: product.stock?.toString() || '',
        categoryId: product.categoryId || '',
        tags: Array.isArray(product.tags) ? product.tags.join(', ') : '',
        images: Array.isArray(product.images) ? product.images.join(', ') : '',
      });
    }
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Convert string values to appropriate types
    const data: any = {
      slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, '-'),
      name: formData.name,
      subtitle: formData.subtitle,
      description: formData.description,
      brand: formData.brand,
      manufacturer: formData.manufacturer,
      sku: formData.sku,
      price: formData.price ? parseFloat(formData.price) : undefined,
      mrp: formData.mrp ? parseFloat(formData.mrp) : undefined,
      cost: formData.cost ? parseFloat(formData.cost) : undefined,
      tax: formData.tax ? parseFloat(formData.tax) : undefined,
      discount: formData.discount ? parseFloat(formData.discount) : undefined,
      stock: formData.stock ? parseInt(formData.stock) : undefined,
      categoryId: formData.categoryId,
      tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : [],
      images: formData.images ? formData.images.split(',').map(img => img.trim()) : [],
    };

    // Remove empty string values
    Object.keys(data).forEach(key => {
      if (data[key] === '') {
        delete data[key];
      }
    });

    updateProduct({ id: productId, data });
  };

  if (isProductLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <p>Loading product data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Edit Product</h1>
        <Button onClick={() => router.push('/products')} variant="outline" className="">
          Back to Products
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Product Name *
            </label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              fullwidth="true"
              className=""
            />
          </div>

          <div>
            <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">
              Slug
            </label>
            <Input
              id="slug"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              fullwidth="true"
              className=""
            />
          </div>

          <div>
            <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700 mb-1">
              Subtitle
            </label>
            <Input
              id="subtitle"
              name="subtitle"
              value={formData.subtitle}
              onChange={handleChange}
              fullwidth="true"
              className=""
            />
          </div>

          <div>
            <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-1">
              Brand
            </label>
            <Input
              id="brand"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              fullwidth="true"
              className=""
            />
          </div>

          <div>
            <label htmlFor="manufacturer" className="block text-sm font-medium text-gray-700 mb-1">
              Manufacturer
            </label>
            <Input
              id="manufacturer"
              name="manufacturer"
              value={formData.manufacturer}
              onChange={handleChange}
              fullwidth="true"
              className=""
            />
          </div>

          <div>
            <label htmlFor="sku" className="block text-sm font-medium text-gray-700 mb-1">
              SKU
            </label>
            <Input
              id="sku"
              name="sku"
              value={formData.sku}
              onChange={handleChange}
              fullwidth="true"
              className=""
            />
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
              Price
            </label>
            <Input
              id="price"
              name="price"
              type="number"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              fullwidth="true"
              className=""
            />
          </div>

          <div>
            <label htmlFor="mrp" className="block text-sm font-medium text-gray-700 mb-1">
              MRP
            </label>
            <Input
              id="mrp"
              name="mrp"
              type="number"
              step="0.01"
              value={formData.mrp}
              onChange={handleChange}
              fullwidth="true"
              className=""
            />
          </div>

          <div>
            <label htmlFor="cost" className="block text-sm font-medium text-gray-700 mb-1">
              Cost
            </label>
            <Input
              id="cost"
              name="cost"
              type="number"
              step="0.01"
              value={formData.cost}
              onChange={handleChange}
              fullwidth="true"
              className=""
            />
          </div>

          <div>
            <label htmlFor="tax" className="block text-sm font-medium text-gray-700 mb-1">
              Tax (%)
            </label>
            <Input
              id="tax"
              name="tax"
              type="number"
              step="0.01"
              value={formData.tax}
              onChange={handleChange}
              fullwidth="true"
              className=""
            />
          </div>

          <div>
            <label htmlFor="discount" className="block text-sm font-medium text-gray-700 mb-1">
              Discount (%)
            </label>
            <Input
              id="discount"
              name="discount"
              type="number"
              step="0.01"
              value={formData.discount}
              onChange={handleChange}
              fullwidth="true"
              className=""
            />
          </div>

          <div>
            <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">
              Stock
            </label>
            <Input
              id="stock"
              name="stock"
              type="number"
              value={formData.stock}
              onChange={handleChange}
              fullwidth="true"
              className=""
            />
          </div>

          <div>
            <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 mb-1">
              Category ID
            </label>
            <Input
              id="categoryId"
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              fullwidth="true"
              className=""
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
              Tags (comma separated)
            </label>
            <Input
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              fullwidth="true"
              placeholder="tag1, tag2, tag3"
              className=""
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="images" className="block text-sm font-medium text-gray-700 mb-1">
              Image URLs (comma separated)
            </label>
            <Input
              id="images"
              name="images"
              value={formData.images}
              onChange={handleChange}
              fullwidth="true"
              placeholder="url1, url2, url3"
              className=""
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-2 w-full px-4 py-2 bg-gray-100 text-gray-800 text-sm rounded-md border border-[#e7eaf3] focus:ring-1 border-opacity-100 shadow placeholder-gray-400 focus:ring-accent focus:border-accent focus:border-opacity-50 outline-none transition"
              rows={4}
            />
          </div>
        </div>

        <div className="mt-8 flex justify-end space-x-4">
          <Button type="button" onClick={() => router.push('/products')} variant="outline" className="">
            Cancel
          </Button>
          <Button type="submit" disabled={isUpdating} className="bg-blue-500 hover:bg-blue-600 text-white">
            {isUpdating ? 'Updating...' : 'Update Product'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditProductPage;