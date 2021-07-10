import React from "react";

const links = [
  { name: "Github", url: "https://github.com/narze/thailand-grand-opening" },
  { name: "@narze", url: "https://twitter.com/narze" },
  { name: "วาทะสลิ่มสุดเจ๋ง", url: "https://watasalim.vercel.app" },
  { name: "ติด vs ตรวจ", url: "https://tid-vs-truad.vercel.app" },
];
export default function Footer() {
  return (
    <footer>
      {links
        .map<React.ReactNode>(({ name, url }, idx) => {
          return (
            <a key={idx} href={url} target="_blank" rel="noreferrer">
              {name}
            </a>
          );
        })
        .reduce((prev, curr) => [prev, " | ", curr])}
    </footer>
  );
}
