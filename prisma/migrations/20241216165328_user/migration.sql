-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(60) NOT NULL,
    "role" VARCHAR(25) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
