"use client";

import { useState, useEffect } from "react";
import { api } from "~/trpc/react";
import { Button } from "./ui/button/button";
import { Input } from "./ui/input/input";
import { Card, CardContent } from "./ui/card/card";

export default function PlatformConfigPanel() {
  const { data: config, isLoading, refetch } = api.platform.get.useQuery();

  const createConfig = api.platform.create.useMutation();
  const updateConfig = api.platform.update.useMutation();

  const [form, setForm] = useState({
    ratePerKm: 10,
    platformMargin: 0.1,
    vendorMargin: 0.1,
  });

  useEffect(() => {
    if (config) {
      setForm({
        ratePerKm: config.ratePerKm,
        platformMargin: config.platformMargin,
        vendorMargin: config.vendorMargin,
      });
    }
  }, [config]);

  const handleSave = async () => {
    if (!config) {
      // No config yet → create new one
      await createConfig.mutateAsync(form);
    } else {
      // Config exists → update existing
      await updateConfig.mutateAsync({ id: config.id, ...form });
    }
    await refetch();
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <Card className="max-w-md mx-auto mt-6 shadow-lg">
      <CardContent className="p-6 space-y-4">
        <h2 className="text-xl font-bold mb-4">Platform Configuration</h2>

        {!config ? (
          <>
            <p className="text-gray-500 mb-4">
              No configuration found. Please create one.
            </p>
            <Button onClick={handleSave} className="w-full">
              Create Default Config
            </Button>
          </>
        ) : (
          <>
            <div>
              <label className="block text-sm font-medium mb-1">
                Rate per Km (₹)
              </label>
              <Input
                type="number"
                value={form.ratePerKm}
                onChange={(e) =>
                  setForm({ ...form, ratePerKm: Number(e.target.value) })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Platform Margin (e.g. 0.1 = 10%)
              </label>
              <Input
                type="number"
                step="0.01"
                value={form.platformMargin}
                onChange={(e) =>
                  setForm({ ...form, platformMargin: Number(e.target.value) })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Vendor Margin (e.g. 0.1 = 10%)
              </label>
              <Input
                type="number"
                step="0.01"
                value={form.vendorMargin}
                onChange={(e) =>
                  setForm({ ...form, vendorMargin: Number(e.target.value) })
                }
              />
            </div>

            <Button onClick={handleSave} className="w-full mt-4">
              Save Changes
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}
