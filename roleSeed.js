// prisma/seedRoles.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const predefinedRoles = [
  {
    name: "super_admin",
    permissions: [
      "view_store_categories",
      "view_modules",
      "view_store",
      "create_modules",
      "create_category",
      "verify_lead_vendor",
      "view_notification",
      "view_vendors",
      "create_business",
      "view_business",
      "manage_all",
      "manage_users",
      "manage_roles",
      "manage_vendor",
      "create_vendor",
      "manage_modules",
      "view_reports",
      "manage_subscriptions",
      "manage_logistics",
      "manage_payments",
      "approve_requests",
      "send_notifications",
      "view_audit_logs",
      "manage_settings",
    ],
    createdBy: "system",
  },
  {
    name: "vendor",
    permissions: [
      "view_store",
      "view_store_categories",
      "create_category",
      "view_notification",
      "view_inventory",
      "view_category",
      "remove_category",
      "create_inventory",
      "manage_users",
      "assign_roles",
      "manage_orders",
      "manage_inventory",
      "manage_finances",
      "view_reports",
      "handle_customer_queries",
    ],
    createdBy: "system",
  },
  {
    name: "area_manager",
    permissions: ["view_dashboard", "verify_lead_vendor"],
    createdBy: "system",
  },
  {
    name: "user",
    permissions: ["view_dashboard", "patch_cart"],
    createdBy: "system",
  },
  {
    name: "manufacturer_admin",
    permissions: [
      "manage_all",
      "manage_production",
      "manage_inventory",
      "manage_quality_control",
      "view_production_reports",
      "handle_wholesale_orders",
      "manage_supply_chain",
      "manage_raw_materials",
    ],
    createdBy: "system",
  },
  {
    name: "production_manager",
    permissions: ["oversee_production", "schedule_workers", "quality_check"],
    createdBy: "system",
  },
  {
    name: "warehouse_manager",
    permissions: ["manage_inventory", "track_shipments", "stock_management"],
    createdBy: "system",
  },
  {
    name: "wholesale_admin",
    permissions: [
      "manage_all",
      "manage_bulk_orders",
      "assign_sales_reps",
      "set_pricing",
      "manage_distributors",
      "view_sales_reports",
      "handle_logistics",
    ],
    createdBy: "system",
  },
  {
    name: "sales_manager",
    permissions: [
      "handle_bulk_orders",
      "negotiate_deals",
      "assign_sales_targets",
      "view_sales_reports",
    ],
    createdBy: "system",
  },
  {
    name: "logistics_coordinator",
    permissions: [
      "track_shipments",
      "assign_transport",
      "handle_customs_clearance",
    ],
    createdBy: "system",
  },
  {
    name: "retail_admin",
    permissions: [
      "manage_all",
      "manage_store",
      "set_product_pricing",
      "oversee_customer_service",
      "manage_orders",
      "process_returns",
      "view_sales_analytics",
    ],
    createdBy: "system",
  },
  {
    name: "store_manager",
    permissions: [
      "oversee_store_operations",
      "assign_staff_roles",
      "track_sales",
    ],
    createdBy: "system",
  },
  {
    name: "cashier",
    permissions: ["process_payments", "handle_refunds", "apply_discounts"],
    createdBy: "system",
  },
  {
    name: "customer_support",
    permissions: [
      "handle_customer_queries",
      "process_returns",
      "resolve_complaints",
    ],
    createdBy: "system",
  },
  {
    name: "logistics_manager",
    permissions: [
      "assign_drivers",
      "track_deliveries",
      "manage_fleet",
      "update_delivery_status",
      "view_logs",
    ],
    createdBy: "system",
  },
  {
    name: "delivery_agent",
    permissions: ["view_assigned_orders", "update_delivery_status"],
    createdBy: "system",
  },
  {
    name: "finance_manager",
    permissions: [
      "manage_expenses",
      "handle_invoices",
      "track_payments",
      "approve_refunds",
      "view_financial_reports",
    ],
    createdBy: "system",
  },
  {
    name: "accountant",
    permissions: ["track_transactions", "generate_financial_reports"],
    createdBy: "system",
  },
  {
    name: "consumer",
    permissions: ["place_orders", "write_reviews", "track_orders", "request_refunds"],
    createdBy: "system",
  },
];

async function seedRoles() {
  try {
    for (const role of predefinedRoles) {
      const exists = await prisma.role.findUnique({
        where: { name: role.name },
      });

      if (!exists) {
        await prisma.role.create({ data: role });
        console.log(`✅ Role '${role.name}' added.`);
      } else {
        console.log(`⚠️ Role '${role.name}' already exists. Skipping.`);
      }
    }

    console.log("🎉 Role seeding complete!");
  } catch (error) {
    console.error("❌ Error seeding roles:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedRoles();
