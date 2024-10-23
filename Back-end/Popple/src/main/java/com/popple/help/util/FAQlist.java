package com.popple.help.util;
import java.util.ArrayList;
import java.util.List;

import com.popple.help.entity.FAQ;

public class FAQlist {

	public static List<FAQ> getFAQs() {
        List<FAQ> faqList = new ArrayList<>();

        faqList.add(FAQ.builder()
                .title("팝업/전시란 무엇인가요?")
                .description("팝업/전시는 특정 기간 동안 진행되는 임시 전시회로, 제품이나 브랜드를 홍보하기 위해 기획됩니다.")
                .build());

        faqList.add(FAQ.builder()
                .title("예약을 하려면 어떻게 해야 하나요?")
                .description("계정으로 로그인 후, 원하는 팝업/전시 페이지 들어가서 원하는 날짜와 시간을 선택 한 후, '예약하기' 버튼을 눌러 예약 정보를 확인하고, '예약확정' 버튼을 누르면 예약이 완료됩니다.")
                .build());

        faqList.add(FAQ.builder()
                .title("예약 취소는 어떻게 하나요?")
                .description("로그인 후 '마이페이지' 메뉴에서 '예약 목록' 탭에 들어가서 예약 목록의 해당 예약을 '예약 취소' 버튼을 선택하면 예약을 취소할 수 있습니다. 취소 규정에 따라 수수료가 발생할 수 있습니다.")
                .build());
        
        faqList.add(FAQ.builder()
                .title("예약 정보 수정은 어떻게 하나요?")
                .description("예약 정보 수정은 예약을 취소한 후에 새로 예약을 해야 합니다. 예약 취소 관련 사항은 예약 취소 관련 질문에세 확인 바랍니다.")
                .build());

        faqList.add(FAQ.builder()
                .title("일반 사용자와 기업 사용자의 차이는 무엇인가요?")
                .description("일반 사용자는 팝업/전시를 예약할 수 있으며, 기업 사용자는 팝업/전시를 추가하고 관리할 수 있는 권한이 있습니다.")
                .build());

        faqList.add(FAQ.builder()
                .title("기업 사용자는 어떻게 팝업/전시를 추가하나요?")
                .description("기업 계정으로 로그인한 후, '팝업/전시 추가' 버튼을 통해 필요한 정보를 입력하고 제출하면 됩니다.")
                .build());

        faqList.add(FAQ.builder()
                .title("예약 가능한 날짜와 시간은 어떻게 확인하나요?")
                .description("팝업/전시 정보 페이지에서 원하는 날짜를 선택하면 가능한 시간대를 확인할 수 있습니다.")
                .build());

        faqList.add(FAQ.builder()
                .title("결제 방법은 무엇이 있나요?")
                .description("신용카드, 계좌이체, 모바일 결제 등 다양한 결제 방법을 지원합니다.")
                .build());

        faqList.add(FAQ.builder()
                .title("문의사항은 어디에 문의하나요?")
                .description("고객센터 페이지에서 '1:1 문의'의 '문의하기'버튼을 눌러 문의 양식을 작성하고, '문의접수'버튼을 누르시면 됩니다.")
                .build());

        faqList.add(FAQ.builder()
                .title("이용 약관 및 개인정보 처리방침은 어디에서 확인할 수 있나요?")
                .description("홈페이지 하단의 링크에서 이용 약관 및 개인정보 처리방침을 확인할 수 있습니다.")
                .build());
		return faqList;

        // faqList를 데이터베이스에 저장하는 코드 추가 필요
        // 예: faqRepository.saveAll(faqList);
    }
}
