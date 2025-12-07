import { prisma } from "@/lib/prisma";

interface AuditLogParams {
  adminId: string;
  action: string;
  entity: string;
  entityId?: string;
  details?: any;
}

export async function logAuditAction({ adminId, action, entity, entityId, details }: AuditLogParams) {
  try {
    await prisma.auditLog.create({
      data: {
        adminId,
        action,
        entity,
        entityId,
        details: details ? JSON.stringify(details) : undefined
      }
    });
  } catch (error) {
    console.error("Failed to create audit log", error);
  }
}
