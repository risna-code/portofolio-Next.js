import "./globals.css";
import '@fortawesome/fontawesome-free/css/all.min.css'

export const metadata = {
  title: "Portofolio Risna",
  description: "Website pribadi Risna",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
          rel="stylesheet"
        />
        <link
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
  rel="stylesheet"
/>
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
