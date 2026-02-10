import WinterBackground from "@/components/WinterBackground";

export default function CompanyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-polar-night via-polar-night-light to-arctic-blue relative">
      <WinterBackground />
      <div className="relative z-10 min-h-screen">
        {children}
      </div>
    </div>
  );
}
