import { Route, Routes } from "react-router-dom";
import ExhibitionRegistPage from "../pages/ExhibitionRegistPage";
import AuthLayout from "../pages/layouts/AuthLayout";
import Layout from "../pages/layouts/Layout";
import LoginPage from "../pages/LoginPage";
import MainPage from "../pages/MainPage";
import OAuthLoginPage from "../pages/OAuthLoginPage";
import SignUpPage from "../pages/SignUpPage";
import styles from './Router.module.css';
// 전시 팝업 관련
import ScrollToTop from "../components/common/ScrollToTop";
import EventUpdate from "../components/exhibition/EventUpdate";
import ExhibitionUpdatePage from "../components/exhibition/ExhibitionUpdatePage";
import CompanySignUpPage from "../pages/CompanySignUpPage";
import DetailPage from "../pages/DetailPage";
import EventPage from "../pages/EventPage";
import EventRegister from "../pages/EventRegister";
import ExhibitionPage from "../pages/ExhibitionPage";
import HelpCreate from "../pages/HelpCreate";
import HelpDetailPage from "../pages/HelpDetailPage";
import HelpServicePage from "../pages/HelpServicePage";
import MyPage from "../pages/MyPage";
import NotFoundPage from "../pages/NotFoundPage";
import PolicyPage from "../pages/PolicyPage";
import PopUpPage from "../pages/PopUpPage";
import QRPage from "../pages/QRPage";
import ReserveCheck from "../pages/ReserveCheck";
import VisitCheck from "../pages/VisitCheck";



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
          <Route path="/exhibition-update" element={<ExhibitionUpdatePage />}/>
          {/* 마이 페이지 */}
          <Route path="/my-page" element={<MyPage />} />
          {/* 고객센터, 이벤트 페이지 */}
          <Route path="/event" element={<EventPage />} />
          <Route path="/event-regist" element={<EventRegister/>}/>
          <Route path="/event-update" element={<EventUpdate/>}/>
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
          {/* 예약자 확인 [기업회원 접근용]  */}
          <Route path="/reservation-check/:id" element={<ReserveCheck />}/> 
          {/* 방문 QR 안내 [기업회원 접근용] */}
          <Route path="/qr-code" element={<QRPage />}/>
          {/* 방문자 확인 [일반회원 접근용] */}
          <Route path="/visit-check/:id" element={<VisitCheck />}/> 
        </Route>

        {/* 404 페이지 */}
        <Route element={<Layout />}>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </div>
  );
}