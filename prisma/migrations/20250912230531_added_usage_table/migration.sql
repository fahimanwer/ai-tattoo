-- CreateTable
CREATE TABLE "public"."Usage" (
    "userId" TEXT NOT NULL,
    "entitlement" TEXT NOT NULL,
    "periodStart" TIMESTAMP(3) NOT NULL,
    "periodEnd" TIMESTAMP(3) NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,
    "revenuecatUserId" TEXT NOT NULL,

    CONSTRAINT "Usage_pkey" PRIMARY KEY ("userId","entitlement","periodStart")
);

-- CreateIndex
CREATE INDEX "Usage_userId_periodStart_idx" ON "public"."Usage"("userId", "periodStart");
