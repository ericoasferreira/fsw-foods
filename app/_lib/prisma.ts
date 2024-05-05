import { PrismaClient } from "@prisma/client";

declare global {
    var cachedPrsima: PrismaClient;
}

let prisma: PrismaClient;
if(process.env.NODE_ENV === "production") {
    prisma = new PrismaClient();
} else {
    if (!global.cachedPrsima) {
        global.cachedPrsima = new PrismaClient();
    }
    prisma = global.cachedPrsima;
}

export const db = prisma;