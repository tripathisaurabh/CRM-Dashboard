import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Input } from "../ui/input";
import { Plus, X, Filter } from "lucide-react";
import { useState } from "react";

interface FilterRule {
  id: string;
  field: string;
  operator: string;
  value: string;
  logic: "AND" | "OR";
}

export function FilterBuilder() {
  const [filters, setFilters] = useState<FilterRule[]>([
    { id: "1", field: "", operator: "", value: "", logic: "AND" },
  ]);

  const addFilter = () => {
    const newFilter: FilterRule = {
      id: Date.now().toString(),
      field: "",
      operator: "",
      value: "",
      logic: "AND",
    };
    setFilters([...filters, newFilter]);
  };

  const removeFilter = (id: string) => {
    setFilters(filters.filter((f) => f.id !== id));
  };

  const updateFilter = (id: string, updates: Partial<FilterRule>) => {
    setFilters(
      filters.map((f) => (f.id === id ? { ...f, ...updates } : f))
    );
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="p-4 sm:p-6 pb-3 sm:pb-4">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" />
          <CardTitle className="text-base sm:text-lg truncate">Advanced Customer Filter</CardTitle>
        </div>
        <p className="text-xs sm:text-sm text-gray-500">
          Build custom segments with multiple conditions
        </p>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 pt-0">
        <div className="space-y-3 sm:space-y-4">
          {filters.map((filter, index) => (
            <div key={filter.id}>
              {index > 0 && (
                <div className="flex items-center gap-2 mb-2">
                  <Select
                    value={filter.logic}
                    onValueChange={(value: "AND" | "OR") =>
                      updateFilter(filter.id, { logic: value })
                    }
                  >
                    <SelectTrigger className="w-20 sm:w-24 text-xs sm:text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AND">AND</SelectItem>
                      <SelectItem value="OR">OR</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex-1 h-px bg-gray-300"></div>
                </div>
              )}
              <div className="flex flex-col sm:flex-row items-start gap-2">
                {/* Field Selection */}
                <Select
                  value={filter.field}
                  onValueChange={(value) =>
                    updateFilter(filter.id, { field: value })
                  }
                >
                  <SelectTrigger className="w-full sm:flex-1 text-xs sm:text-sm">
                    <SelectValue placeholder="Select field..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="product">Product</SelectItem>
                    <SelectItem value="revenue">Revenue</SelectItem>
                    <SelectItem value="orders">Order Count</SelectItem>
                    <SelectItem value="lastOrder">Last Order Date</SelectItem>
                    <SelectItem value="location">Location</SelectItem>
                    <SelectItem value="segment">Segment</SelectItem>
                  </SelectContent>
                </Select>

                {/* Operator Selection */}
                <Select
                  value={filter.operator}
                  onValueChange={(value) =>
                    updateFilter(filter.id, { operator: value })
                  }
                >
                  <SelectTrigger className="w-full sm:w-36 lg:w-40 text-xs sm:text-sm">
                    <SelectValue placeholder="Operator..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="equals">Equals</SelectItem>
                    <SelectItem value="notEquals">Not Equals</SelectItem>
                    <SelectItem value="contains">Contains</SelectItem>
                    <SelectItem value="greaterThan">Greater Than</SelectItem>
                    <SelectItem value="lessThan">Less Than</SelectItem>
                    <SelectItem value="bought">Bought</SelectItem>
                    <SelectItem value="notBought">Not Bought</SelectItem>
                  </SelectContent>
                </Select>

                {/* Value Input */}
                <Input
                  placeholder="Value..."
                  value={filter.value}
                  onChange={(e) =>
                    updateFilter(filter.id, { value: e.target.value })
                  }
                  className="w-full sm:flex-1 text-xs sm:text-sm"
                />

                {/* Remove Button */}
                {filters.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFilter(filter.id)}
                    className="w-full sm:w-auto text-red-600 hover:text-red-700 hover:bg-red-50 text-xs sm:text-sm"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4 sm:mt-6">
          <Button
            variant="outline"
            onClick={addFilter}
            className="w-full sm:w-auto text-xs sm:text-sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Condition
          </Button>
          <Button className="w-full sm:flex-1 bg-blue-600 hover:bg-blue-700 text-xs sm:text-sm">
            <Filter className="w-4 h-4 mr-2" />
            Apply Filters ({filters.length})
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}