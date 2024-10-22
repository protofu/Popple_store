import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className="flex flex-col">
      <Header />
      <main className="lg:max-w-[calc(100%-530px)] w-screen mt-[150px] min-h-screen mx-auto font-nanumS">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
