import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <footer className="ms-5">
      <Link href="/Feedback">Feedback</Link>

      <span> / </span>

      <Link href="/Roadmap">Roadmap </Link>

      <span> / </span>
      <Link href={{ pathname: "DataGridVer/page"}}>New Version</Link>
    </footer>
  );
}

export default Footer;
