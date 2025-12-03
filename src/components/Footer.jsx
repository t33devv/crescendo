function Footer() {
  return (
    <footer className="bg-gradient-to-r from-primary via-accent to-secondary px-6 py-3 flex items-center justify-between text-white">
      <p className="text-xs"><span className="font-bold">@2025 Crescendo</span> — Made with love for students</p>
      <div className="flex gap-3 text-xs">
        <a href="#" className="hover:underline">Contact</a>
        <a href="#" className="hover:underline">Privacy</a>
      </div>
    </footer>
  );
}

export default Footer;