import React from "react";

const links = [
  {
    name: 'ร่วมช่วยกัน "ขอคนละชื่อรื้อระบอบประยุทธ์"',
    url: "https://resolutionconformgen.web.app",
  },
  { name: "Github", url: "https://github.com/narze/thailand-grand-opening" },
  { name: "@narze", url: "https://twitter.com/narze" },
  { name: "วาทะสลิ่มสุดเจ๋ง", url: "https://watasalim.vercel.app" },
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
