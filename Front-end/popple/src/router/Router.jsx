import { Route, Routes } from "react-router-dom";
import MainPage from "../pages/MainPage";
import Layout from "../pages/layouts/Layout";
import LoginPage from "../pages/LoginPage";
import styles from './Router.module.css';
import SignUpPage from "../pages/SignUpPage";
import AuthLayout from "../pages/layouts/AuthLayout";
import OAuthLoginPage from "../pages/OAuthLoginPage";
import ExhibitionRegistPage from "../pages/ExhibitionRegistPage";
// 전시 팝업 관련
import ExhibitionPage from "../pages/ExhibitionPage";
import PopUpPage from "../pages/PopUpPage";
import EventPage from "../pages/EventPage";
import HelpServicePage from "../pages/HelpServicePage";
import MyPage from "../pages/MyPage";
import PolicyPage from "../pages/PolicyPage";
import CompanySignUpPage from "../pages/CompanySignUpPage";
import QRPage from "../pages/QRPage";
import DetailPage from "../pages/DetailPage";
import HelpDetailPage from "../pages/HelpDetailPage";
import EventRegister from "../pages/EventRegister";
import ScrollToTop from "../components/common/ScrollToTop";
import HelpCreate from "../pages/HelpCreate";



export default function Router() {
  return (
    <div className={styles.routerContainer}>
      <ScrollToTop /> 
      <Routes>
        {/* 레이아웃을 적용한 페이지들 */}
        <Route element={<Layout />}>
          {/* 메인 페이지 */}
          <Route path="/" element={<MainPage />} />
          {/* 팝업/전시 메인페이지 */}
          <Route path="/exhibition" element={<ExhibitionPage />} />
          <Route path="/pop-up" element={<PopUpPage />} />
          {/* 팝업/전시 디테일 페이지 */}
          <Route path="/exhibition/detail/:id" element={<DetailPage />} />
          <Route path="/pop-up/detail/:id" element={<DetailPage />} />
          {/* 팝업/전시 등록 페이지 */}
          <Route path="/regist" element={<ExhibitionRegistPage />} />
          {/* 이벤트 등록 페이지 */}
          <Route path="/event-regist" element={<EventRegister/>}/>
          {/* 마이 페이지 */}
          <Route path="/my-page" element={<MyPage />} />
          {/* 고객센터, 이벤트 페이지 */}
          <Route path="/event" element={<EventPage />} />
          <Route path="/help" element={<HelpServicePage />} />
          <Route path="/help/detail" element={<HelpDetailPage />} />
          <Route path="/help/create" element={<HelpCreate />} />
        </Route>

        {/* 레이아웃을 적용하지 않은 페이지들 */}
        <Route path="/oauth/:provider" element={<OAuthLoginPage />} />

        {/* Auth 폼을 적용할 페이지들 */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/policy/:id" element={<PolicyPage />} />
          <Route path="/company-signup" element={<CompanySignUpPage/>}/>
          <Route path="/qr-code" element={<QRPage/>}/>
        </Route>
      </Routes>
    </div>
  );
}