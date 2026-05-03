export default function Footer() {
  return (
    <footer className="border-t border-border/40 py-8 mt-auto">
      <div className="max-w-6xl mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground tracking-widest uppercase">
        <div data-testid="footer-brand">ASHIKA RAMESH</div>
        <div data-testid="footer-location" className="flex items-center gap-2">
          <span>Melbourne/NAARM</span>
          <span className="text-primary font-bold">@2026</span>
        </div>
      </div>
    </footer>
  );
}