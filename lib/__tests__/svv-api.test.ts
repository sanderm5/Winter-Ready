import { describe, it, expect } from "vitest";
import { getRegionForDestination, getStatusColor, getStatusIcon } from "@/lib/svv-api";

describe("getRegionForDestination", () => {
  it("maps Tromsø to tromso", () => {
    expect(getRegionForDestination("Tromsø")).toBe("tromso");
  });

  it("maps Lofoten to lofoten", () => {
    expect(getRegionForDestination("Lofoten")).toBe("lofoten");
  });

  it("maps Nordkapp to nordkapp", () => {
    expect(getRegionForDestination("Nordkapp")).toBe("nordkapp");
  });

  it("returns national for unknown destinations", () => {
    expect(getRegionForDestination("Oslo")).toBe("national");
    expect(getRegionForDestination("Bergen")).toBe("national");
    expect(getRegionForDestination("Stavanger")).toBe("national");
  });
});

describe("getStatusColor", () => {
  it("returns correct color for each status", () => {
    expect(getStatusColor("open")).toBe("bg-safe-green");
    expect(getStatusColor("closed")).toBe("bg-danger-red");
    expect(getStatusColor("convoy")).toBe("bg-warning-orange");
    expect(getStatusColor("warning")).toBe("bg-yellow-500");
  });
});

describe("getStatusIcon", () => {
  it("returns correct icon for each status", () => {
    expect(getStatusIcon("open")).toBe("OK");
    expect(getStatusIcon("closed")).toBe("X");
    expect(getStatusIcon("convoy")).toBe("C");
    expect(getStatusIcon("warning")).toBe("!");
  });
});
