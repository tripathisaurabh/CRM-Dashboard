import { useState } from "react";
import {
  Save,
  Plus,
  Upload,
  Download,
  Edit,
  Trash2,
  Check,
  X,
  AlertCircle,
  Package,
  DollarSign,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";

/**
 * Admin Settings Page
 * 
 * Two main sections:
 * 1. Product Name/SKU Normalization - Map different product names to normalized names
 * 2. Product Cost Upload (COGS) - Upload and manage product cost data
 * 
 * API Integration Points:
 * - GET /api/admin/product-mappings - Get all product mappings
 * - POST /api/admin/product-mappings - Create new mapping
 * - PUT /api/admin/product-mappings/:id - Update mapping
 * - DELETE /api/admin/product-mappings/:id - Delete mapping
 * - POST /api/admin/product-mappings/merge - Merge duplicate products
 * - GET /api/admin/product-costs - Get all product costs
 * - POST /api/admin/product-costs/upload - Upload COGS CSV
 * - PUT /api/admin/product-costs/replace - Replace all existing cost data
 */

interface ProductMapping {
  id: string;
  originalName: string;
  normalizedName: string;
  sku: string;
  status: "mapped" | "unmapped" | "duplicate";
}

interface ProductCost {
  id: string;
  productName: string;
  sku: string;
  costPerUnit: number;
  lastUpdated: string;
}

export function Settings() {
  const [editingMappingId, setEditingMappingId] = useState<string | null>(null);
  const [editingCostId, setEditingCostId] = useState<string | null>(null);

  // MOCK DATA - Replace with GET /api/admin/product-mappings
  const [productMappings, setProductMappings] = useState<ProductMapping[]>([
    {
      id: "map-1",
      originalName: "Premium Package A - Large",
      normalizedName: "Premium Package A",
      sku: "PROD-A",
      status: "mapped",
    },
    {
      id: "map-2",
      originalName: "Premium Package A (L)",
      normalizedName: "Premium Package A",
      sku: "PROD-A",
      status: "mapped",
    },
    {
      id: "map-3",
      originalName: "Prem Pkg A",
      normalizedName: "Premium Package A",
      sku: "PROD-A",
      status: "mapped",
    },
    {
      id: "map-4",
      originalName: "Basic Service B - Monthly",
      normalizedName: "Basic Service B",
      sku: "PROD-B",
      status: "mapped",
    },
    {
      id: "map-5",
      originalName: "Basic Service (Monthly)",
      normalizedName: "Basic Service B",
      sku: "PROD-B",
      status: "mapped",
    },
    {
      id: "map-6",
      originalName: "Enterprise Solution C",
      normalizedName: "",
      sku: "",
      status: "unmapped",
    },
  ]);

  // MOCK DATA - Replace with GET /api/admin/product-costs
  const [productCosts, setProductCosts] = useState<ProductCost[]>([
    {
      id: "cost-1",
      productName: "Premium Package A",
      sku: "PROD-A",
      costPerUnit: 125.5,
      lastUpdated: "2026-03-01T10:30:00",
    },
    {
      id: "cost-2",
      productName: "Basic Service B",
      sku: "PROD-B",
      costPerUnit: 47.2,
      lastUpdated: "2026-03-01T10:30:00",
    },
    {
      id: "cost-3",
      productName: "Enterprise Solution C",
      sku: "PROD-C",
      costPerUnit: 320.0,
      lastUpdated: "2026-02-15T14:20:00",
    },
    {
      id: "cost-4",
      productName: "Support Package D",
      sku: "PROD-D",
      costPerUnit: 89.99,
      lastUpdated: "2026-02-15T14:20:00",
    },
  ]);

  const [newMapping, setNewMapping] = useState({
    originalName: "",
    normalizedName: "",
    sku: "",
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "mapped":
        return (
          <Badge variant="default" className="gap-1">
            <Check className="w-3 h-3" />
            Mapped
          </Badge>
        );
      case "unmapped":
        return (
          <Badge variant="outline" className="gap-1 text-orange-600 border-orange-600">
            <AlertCircle className="w-3 h-3" />
            Unmapped
          </Badge>
        );
      case "duplicate":
        return (
          <Badge variant="outline" className="gap-1 text-blue-600 border-blue-600">
            Duplicate
          </Badge>
        );
      default:
        return null;
    }
  };

  const handleAddMapping = () => {
    // POST /api/admin/product-mappings
    if (!newMapping.originalName || !newMapping.normalizedName || !newMapping.sku) {
      alert("Please fill in all fields");
      return;
    }

    const mapping: ProductMapping = {
      id: `map-${Date.now()}`,
      originalName: newMapping.originalName,
      normalizedName: newMapping.normalizedName,
      sku: newMapping.sku,
      status: "mapped",
    };

    setProductMappings([...productMappings, mapping]);
    setNewMapping({ originalName: "", normalizedName: "", sku: "" });
    alert("Product mapping added successfully!");
  };

  const handleSaveMappings = () => {
    // POST /api/admin/product-mappings/bulk-update
    console.log("Saving all product mappings:", productMappings);
    alert("Product mappings saved successfully!");
  };

  const handleDeleteMapping = (id: string) => {
    // DELETE /api/admin/product-mappings/:id
    if (confirm("Are you sure you want to delete this mapping?")) {
      setProductMappings(productMappings.filter((m) => m.id !== id));
      alert("Mapping deleted successfully!");
    }
  };

  const handleEditMapping = (id: string) => {
    setEditingMappingId(id);
  };

  const handleCancelEdit = () => {
    setEditingMappingId(null);
  };

  const handleUpdateMapping = (id: string, field: string, value: string) => {
    setProductMappings(
      productMappings.map((m) => (m.id === id ? { ...m, [field]: value } : m))
    );
  };

  const handleMergeDuplicates = () => {
    // POST /api/admin/product-mappings/merge
    alert("Merging duplicate products with the same normalized name and SKU...");
  };

  const handleUploadCSV = () => {
    // POST /api/admin/product-costs/upload
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".csv";
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (file) {
        console.log("Uploading COGS CSV:", file.name);
        alert(`Uploading ${file.name}... This would parse the CSV and update product costs.`);
      }
    };
    input.click();
  };

  const handleReplaceAllCosts = () => {
    // PUT /api/admin/product-costs/replace
    if (
      confirm(
        "This will replace ALL existing cost data. Are you sure you want to continue?"
      )
    ) {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = ".csv";
      input.onchange = (e: any) => {
        const file = e.target.files[0];
        if (file) {
          console.log("Replacing all costs with:", file.name);
          alert(`Replacing all cost data with ${file.name}...`);
        }
      };
      input.click();
    }
  };

  const handleDownloadTemplate = () => {
    alert("Downloading CSV template with columns: Product Name, SKU, Cost");
  };

  const handleEditCost = (id: string) => {
    setEditingCostId(id);
  };

  const handleUpdateCost = (id: string, costPerUnit: number) => {
    // PUT /api/admin/product-costs/:id
    setProductCosts(
      productCosts.map((c) => (c.id === id ? { ...c, costPerUnit } : c))
    );
    setEditingCostId(null);
    alert("Cost updated successfully!");
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          Admin Settings
        </h1>
        <p className="text-sm sm:text-base text-gray-500">
          Manage product normalization and cost data for your analytics dashboard
        </p>
      </div>

      {/* SECTION 1: Product Name / SKU Normalization */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 mb-2">
                <Package className="w-5 h-5" />
                Product Name / SKU Normalization
              </CardTitle>
              <p className="text-sm text-gray-500 font-normal">
                Normalize product names or SKUs when they appear differently across
                invoices
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button onClick={handleMergeDuplicates} variant="outline" size="sm">
                Merge Duplicates
              </Button>
              <Button onClick={handleSaveMappings} className="gap-2" size="sm">
                <Save className="w-4 h-4" />
                Save Changes
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Mappings Table */}
          <div className="overflow-x-auto">
            <table className="w-full" data-placeholder="{{productMappings}}">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                    Original Product Name
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                    Normalized Product Name
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                    SKU
                  </th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-gray-600">
                    Status
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {productMappings.map((mapping) => (
                  <tr key={mapping.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-700">
                      {mapping.originalName}
                    </td>
                    <td className="py-3 px-4">
                      {editingMappingId === mapping.id ? (
                        <Input
                          value={mapping.normalizedName}
                          onChange={(e) =>
                            handleUpdateMapping(
                              mapping.id,
                              "normalizedName",
                              e.target.value
                            )
                          }
                          className="w-full"
                        />
                      ) : (
                        <span className="text-sm font-medium text-gray-900">
                          {mapping.normalizedName || (
                            <span className="text-gray-400 italic">Not set</span>
                          )}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      {editingMappingId === mapping.id ? (
                        <Input
                          value={mapping.sku}
                          onChange={(e) =>
                            handleUpdateMapping(mapping.id, "sku", e.target.value)
                          }
                          className="w-full"
                        />
                      ) : (
                        <span className="text-sm font-mono text-gray-700">
                          {mapping.sku || (
                            <span className="text-gray-400 italic">Not set</span>
                          )}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {getStatusBadge(mapping.status)}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        {editingMappingId === mapping.id ? (
                          <>
                            <Button
                              onClick={() => setEditingMappingId(null)}
                              variant="ghost"
                              size="sm"
                              className="gap-1 text-green-600 hover:text-green-700"
                            >
                              <Check className="w-4 h-4" />
                              Save
                            </Button>
                            <Button
                              onClick={handleCancelEdit}
                              variant="ghost"
                              size="sm"
                              className="gap-1 text-gray-600 hover:text-gray-700"
                            >
                              <X className="w-4 h-4" />
                              Cancel
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button
                              onClick={() => handleEditMapping(mapping.id)}
                              variant="ghost"
                              size="sm"
                              className="gap-1"
                            >
                              <Edit className="w-3 h-3" />
                              Edit
                            </Button>
                            <Button
                              onClick={() => handleDeleteMapping(mapping.id)}
                              variant="ghost"
                              size="sm"
                              className="gap-1 text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-3 h-3" />
                              Delete
                            </Button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Add New Mapping */}
          <div className="p-4 bg-gray-50 rounded-lg border">
            <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add New Mapping
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-medium text-gray-700 mb-1 block">
                  Original Product Name
                </label>
                <Input
                  value={newMapping.originalName}
                  onChange={(e) =>
                    setNewMapping({ ...newMapping, originalName: e.target.value })
                  }
                  placeholder="e.g., Product A - Large"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-700 mb-1 block">
                  Normalized Product Name
                </label>
                <Input
                  value={newMapping.normalizedName}
                  onChange={(e) =>
                    setNewMapping({ ...newMapping, normalizedName: e.target.value })
                  }
                  placeholder="e.g., Product A"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-700 mb-1 block">
                  SKU
                </label>
                <Input
                  value={newMapping.sku}
                  onChange={(e) =>
                    setNewMapping({ ...newMapping, sku: e.target.value })
                  }
                  placeholder="e.g., PROD-A"
                />
              </div>
            </div>
            <Button
              onClick={handleAddMapping}
              className="gap-2 mt-3"
              size="sm"
            >
              <Plus className="w-4 h-4" />
              Add Mapping
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* SECTION 2: Product Cost Upload (COGS) */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 mb-2">
                <DollarSign className="w-5 h-5" />
                Upload Product Costs (COGS)
              </CardTitle>
              <p className="text-sm text-gray-500 font-normal">
                Upload product cost data to calculate product profitability
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={handleDownloadTemplate}
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <Download className="w-4 h-4" />
                Download Template
              </Button>
              <Button onClick={handleUploadCSV} className="gap-2" size="sm">
                <Upload className="w-4 h-4" />
                Upload CSV
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Upload Instructions */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="text-sm font-medium text-blue-900 mb-2">
              CSV Format Requirements
            </h4>
            <p className="text-xs text-blue-700 mb-3">
              Your CSV file should include the following columns:
            </p>
            <div className="bg-white rounded p-3 font-mono text-xs">
              <div className="text-gray-500 mb-1">
                Product Name, SKU, Cost
              </div>
              <div className="text-gray-700">
                Premium Package A, PROD-A, 125.50
              </div>
              <div className="text-gray-700">
                Basic Service B, PROD-B, 47.20
              </div>
              <div className="text-gray-700">
                Enterprise Solution C, PROD-C, 320.00
              </div>
            </div>
          </div>

          {/* Current Product Costs Table */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-gray-900">
                Current Product Costs
              </h3>
              <Button
                onClick={handleReplaceAllCosts}
                variant="outline"
                size="sm"
                className="gap-2 text-orange-600 hover:text-orange-700 border-orange-600"
              >
                <Upload className="w-4 h-4" />
                Replace Existing Data
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full" data-placeholder="{{productCosts}}">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                      Product Name
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                      SKU
                    </th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">
                      Cost per Unit
                    </th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">
                      Last Updated
                    </th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {productCosts.map((cost) => (
                    <tr key={cost.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm font-medium text-gray-900">
                        {cost.productName}
                      </td>
                      <td className="py-3 px-4 text-sm font-mono text-gray-700">
                        {cost.sku}
                      </td>
                      <td className="py-3 px-4 text-right">
                        {editingCostId === cost.id ? (
                          <Input
                            type="number"
                            step="0.01"
                            value={cost.costPerUnit}
                            onChange={(e) =>
                              setProductCosts(
                                productCosts.map((c) =>
                                  c.id === cost.id
                                    ? { ...c, costPerUnit: parseFloat(e.target.value) }
                                    : c
                                )
                              )
                            }
                            className="w-32 ml-auto"
                          />
                        ) : (
                          <span className="text-sm font-medium text-gray-900">
                            {formatCurrency(cost.costPerUnit)}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right text-sm text-gray-600">
                        {formatDate(cost.lastUpdated)}
                      </td>
                      <td className="py-3 px-4 text-right">
                        {editingCostId === cost.id ? (
                          <div className="flex items-center justify-end gap-1">
                            <Button
                              onClick={() => handleUpdateCost(cost.id, cost.costPerUnit)}
                              variant="ghost"
                              size="sm"
                              className="gap-1 text-green-600 hover:text-green-700"
                            >
                              <Check className="w-4 h-4" />
                              Save
                            </Button>
                            <Button
                              onClick={() => setEditingCostId(null)}
                              variant="ghost"
                              size="sm"
                              className="gap-1 text-gray-600 hover:text-gray-700"
                            >
                              <X className="w-4 h-4" />
                              Cancel
                            </Button>
                          </div>
                        ) : (
                          <Button
                            onClick={() => handleEditCost(cost.id)}
                            variant="ghost"
                            size="sm"
                            className="gap-1"
                          >
                            <Edit className="w-3 h-3" />
                            Edit
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
                <Package className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Product Mappings</p>
                <p className="text-2xl font-bold text-gray-900">
                  {productMappings.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-orange-100 text-orange-600">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Unmapped Products</p>
                <p className="text-2xl font-bold text-gray-900">
                  {productMappings.filter((m) => m.status === "unmapped").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-green-100 text-green-600">
                <DollarSign className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Products with Costs</p>
                <p className="text-2xl font-bold text-gray-900">
                  {productCosts.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
