import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen overflow-x-auto w-screen">
      <Header />
      <main className="flex-col lg:max-w-[80%] w-full my-16 mx-auto px-10 font-nanumS min-h-[calc(100dvh-383px)]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
