import "./globals.scss";
import styles from "./page.module.scss";

export const metadata = {
  title: "GiggleGenius",
  description: "An app generating some of the silliest, lamest, punniest, weirdest jokes!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={""}>
        {children}
      </body>
    </html>
  );
}
