package com.cnidi.system.core.model;

public record SystemSummary(
        long roleCount,
        long permissionCount,
        long menuCount
) {
}
