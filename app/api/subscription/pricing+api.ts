import { authMiddleware } from "@/server-utils/auth-middleware";
import Purchases from "react-native-purchases";

export async function GET(request: Request) {
  try {
    // Verify authentication
    const authResult = await authMiddleware(request);
    if (!authResult.success) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get offerings from RevenueCat
    const offerings = await Purchases.getOfferings();
    
    if (!offerings.current) {
      return Response.json({ error: "No current offering available" }, { status: 404 });
    }

    const currentOffering = offerings.current;
    const packages = currentOffering.availablePackages;

    // Extract pricing information for each package
    const pricingData = packages.map((pkg) => ({
      identifier: pkg.identifier,
      packageType: pkg.packageType,
      product: {
        identifier: pkg.product.identifier,
        description: pkg.product.description,
        title: pkg.product.title,
        price: pkg.product.price,
        priceString: pkg.product.priceString,
        currencyCode: pkg.product.currencyCode,
        introPrice: pkg.product.introPrice ? {
          price: pkg.product.introPrice.price,
          priceString: pkg.product.introPrice.priceString,
          period: pkg.product.introPrice.period,
          cycles: pkg.product.introPrice.cycles,
          periodUnit: pkg.product.introPrice.periodUnit,
          periodNumberOfUnits: pkg.product.introPrice.periodNumberOfUnits,
        } : null,
      },
    }));

    // Also get entitlements information
    const entitlements = currentOffering.availableEntitlements;
    const entitlementData = Object.values(entitlements).map((entitlement) => ({
      identifier: entitlement.identifier,
      description: entitlement.description,
      isActive: entitlement.isActive,
      willRenew: entitlement.willRenew,
      periodType: entitlement.periodType,
      product: entitlement.product ? {
        identifier: entitlement.product.identifier,
        description: entitlement.product.description,
        title: entitlement.product.title,
        price: entitlement.product.price,
        priceString: entitlement.product.priceString,
        currencyCode: entitlement.product.currencyCode,
      } : null,
    }));

    return Response.json({
      success: true,
      data: {
        offering: {
          identifier: currentOffering.identifier,
          description: currentOffering.description,
          metadata: currentOffering.metadata,
        },
        packages: pricingData,
        entitlements: entitlementData,
      },
    });
  } catch (error) {
    console.error("Error fetching pricing data:", error);
    return Response.json(
      { error: "Failed to fetch pricing data" },
      { status: 500 }
    );
  }
}
