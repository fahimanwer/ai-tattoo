import { getPlanLimit, mapEntitlementToTier } from "@/lib/pricing-utils";
import { useQuery } from "@tanstack/react-query";

export interface PricingData {
  offering: {
    identifier: string;
    description: string;
    metadata: Record<string, any>;
  };
  packages: Array<{
    identifier: string;
    packageType: string;
    product: {
      identifier: string;
      description: string;
      title: string;
      price: number;
      priceString: string;
      currencyCode: string;
      introPrice: {
        price: number;
        priceString: string;
        period: string;
        cycles: number;
        periodUnit: string;
        periodNumberOfUnits: number;
      } | null;
    };
  }>;
  entitlements: Array<{
    identifier: string;
    description: string;
    isActive: boolean;
    willRenew: boolean;
    periodType: string;
    product: {
      identifier: string;
      description: string;
      title: string;
      price: number;
      priceString: string;
      currencyCode: string;
    } | null;
  }>;
}

export interface PlanPricing {
  identifier: string;
  price: number;
  priceString: string;
  currencyCode: string;
  limit: number;
  isIntroPrice: boolean;
  introPrice?: {
    price: number;
    priceString: string;
    period: string;
    cycles: number;
  };
}

// Helper functions are now imported from pricing-utils

export function usePricing() {
  const query = useQuery<PricingData>({
    queryKey: ["pricing"],
    queryFn: async () => {
      const response = await fetch("/api/subscription/pricing");
      if (!response.ok) {
        throw new Error("Failed to fetch pricing data");
      }
      const result = await response.json();
      return result.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });

  const getPlanPricing = (tier: string): PlanPricing | null => {
    if (!query.data) return null;

    // Find the entitlement that matches our tier
    const entitlement = query.data.entitlements.find(
      (ent) => mapEntitlementToTier(ent.identifier) === tier.toLowerCase()
    );

    if (!entitlement || !entitlement.product) {
      // Return default pricing for free tier
      if (tier === "free") {
        return {
          identifier: "free",
          price: 0,
          priceString: "Free",
          currencyCode: "USD",
          limit: getPlanLimit("free"),
          isIntroPrice: false,
        };
      }
      return null;
    }

    const product = entitlement.product;
    const limit = getPlanLimit(entitlement.identifier);

    return {
      identifier: entitlement.identifier,
      price: product.price,
      priceString: product.priceString,
      currencyCode: product.currencyCode,
      limit,
      isIntroPrice: false, // We'll handle intro pricing separately if needed
    };
  };

  const getAllPlans = (): PlanPricing[] => {
    if (!query.data) return [];

    const plans: PlanPricing[] = [];

    // Add free plan
    plans.push({
      identifier: "free",
      price: 0,
      priceString: "Free",
      currencyCode: "USD",
      limit: 5,
      isIntroPrice: false,
    });

    // Add paid plans
    query.data.entitlements.forEach((entitlement) => {
      if (entitlement.product) {
        plans.push({
          identifier: entitlement.identifier,
          price: entitlement.product.price,
          priceString: entitlement.product.priceString,
          currencyCode: entitlement.product.currencyCode,
          limit: getPlanLimit(entitlement.identifier),
          isIntroPrice: false,
        });
      }
    });

    return plans;
  };

  return {
    ...query,
    getPlanPricing,
    getAllPlans,
  };
}

