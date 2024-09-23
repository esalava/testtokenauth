import "./globals.css";
import ReactQueryProvider from "@/context/ReactQueryProvider";

export default function RootLayout({ children }) {
  return (
    <html>
        <head>
            <title>Test Token Auth</title>
        </head>
        <body>
            <ReactQueryProvider>
                <div id="root">{children}</div>
            </ReactQueryProvider>
        </body>
    </html>
  );
}