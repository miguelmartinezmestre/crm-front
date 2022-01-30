import Head from "next/head";
import Sidebar from "./Sidebar";
import { useRouter } from "next/router";
import Header from "./Header";

export default function Layout({ children }) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>CRM - Administracion de Clientes</title>
        <link
          rel="stylesheet"
          href="/normalize.min.css"
          integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <link
          rel="stylesheet"
          href="/tailwind.min.css"
          integrity="sha512-1Syxn6SauehFJWEP+FayZmh0iQhCyf0Hmkf1goyhnVRGBTubtBJj8oLroZ/3/Q1uYKYFgWgBBgA1mtFbFl/Ucg=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </Head>

      {router.pathname === "/login" || router.pathname === "/register" ? (
        <div className="bg-gray-800 min-h-screen flex flex-col justify-center">
          <div>{children}</div>
        </div>
      ) : (
        <div className="bg-gray-200 min-h-screen">
          <div className="flex min-h-screen">
            <Sidebar />
            <main className="sm:w-2/3 xl:w-4/5 sm:min-h-screen p-5">
              <Header/>
              {children}
            </main>
          </div>
        </div>
      )}
    </>
  );
}
