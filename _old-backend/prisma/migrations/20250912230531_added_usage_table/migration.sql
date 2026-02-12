-- CreateTable
CREATE TABLE "public"."usage" (
    "userId" TEXT NOT NULL,
    "entitlement" TEXT NOT NULL,
    "periodStart" TIMESTAMP(3) NOT NULL,
    "periodEnd" TIMESTAMP(3) NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,
    "revenuecatUserId" TEXT NOT NULL,

    CONSTRAINT "usage_pkey" PRIMARY KEY ("userId","entitlement","periodStart")
);

-- CreateIndex
CREATE INDEX "usage_userId_periodStart_idx" ON "public"."usage"("userId", "periodStart");
