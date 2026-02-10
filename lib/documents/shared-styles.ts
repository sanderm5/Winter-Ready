import { StyleSheet } from "@react-pdf/renderer";

export const COLORS = {
  navyDark: "#1e3a5f",
  tourismCyan: "#0891B2",
  white: "#ffffff",
  offWhite: "#f8fafc",
  lightBlue: "#e0f2fe",
  lightCyan: "#cffafe",
  textDark: "#333333",
  textMuted: "#666666",
  textLight: "#9ca3af",
  accentGreen: "#16a34a",
  accentOrange: "#f97316",
  accentRed: "#dc2626",
};

export const sharedStyles = StyleSheet.create({
  pageFooter: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
  },
  footerText: {
    fontSize: 8,
    color: COLORS.textLight,
  },
  footerBrand: {
    fontSize: 8,
    color: COLORS.navyDark,
    fontWeight: "bold",
  },
  sectionHeading: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.navyDark,
    marginBottom: 8,
  },
  bodyText: {
    fontSize: 10,
    color: COLORS.textDark,
    lineHeight: 1.5,
  },
  bulletRow: {
    flexDirection: "row",
    marginBottom: 4,
    paddingLeft: 8,
  },
  bulletDot: {
    fontSize: 10,
    color: COLORS.tourismCyan,
    marginRight: 6,
    width: 10,
  },
  bulletText: {
    fontSize: 10,
    color: COLORS.textDark,
    flex: 1,
  },
  divider: {
    height: 2,
    backgroundColor: COLORS.tourismCyan,
    marginVertical: 10,
  },
});
