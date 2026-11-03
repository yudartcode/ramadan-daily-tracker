export default function Footer() {
  return (
    <footer className="border-t border-border pb-20 sm:pb-0">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-1 px-4 py-4 text-xs text-muted sm:flex-row">
        <p>© 2026 Yuda Karnaen. All rights reserved.</p>
        <a
          href="https://yudakarnaen.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-primary hover:underline"
        >
          Kontak ↗
        </a>
      </div>
    </footer>
  );
}
