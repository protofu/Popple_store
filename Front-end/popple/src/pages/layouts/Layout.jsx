import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen overflow-x-auto">
      <Header />
      <main className="flex-1 lg:max-w-[calc(100%-530px)] w-screen mt-[143px] mx-auto font-nanumS">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
