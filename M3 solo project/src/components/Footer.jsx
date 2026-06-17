function Footer() {
  return (
    <footer className="site-footer">
      <p>ItemVault is a final project for organizing personal belongings with a clear, searchable inventory.</p>
      <div className="footer-links" aria-label="Footer links">
        <a href="https://github.com/z4dhbnxw8f-prog/Itemvault" target="_blank" rel="noreferrer">
          Project repo
        </a>
        <span aria-hidden="true">·</span>
        <a href="/register">Register</a>
        <span aria-hidden="true">·</span>
        <a href="/login">Sign in</a>
      </div>
    </footer>
  );
}

export default Footer;
