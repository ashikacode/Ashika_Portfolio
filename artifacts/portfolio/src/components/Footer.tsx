export default function Footer() {
  return (
    <footer className="border-t border-border/40 py-8 mt-auto">
      <div className="w-full px-6 md:px-12 lg:px-20 flex flex-row justify-between items-center gap-4 text-sm text-muted-foreground tracking-widest uppercase">
        <div data-testid="footer-brand">ASHIKA RAMESH</div>
        <div data-testid="footer-location" className="flex items-center gap-2">
          <span>Melbourne/NAARM</span>
          <span className="text-primary font-bold">@2026</span>
        </div>
      </div>
    </footer>
  );
}