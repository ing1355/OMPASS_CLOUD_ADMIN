const locales = {
  US: {
    localeChangeText: "EN",
    logout: "Logout",
    detailColumn: "보기",
    welcomeText: "Hello {param}",
    Dashboard: "Dashboard",
    Policies: "Policy",
    Users: "Users",
    Admins: "Admins",
    Applications: "Applications",
    Billing: "Billing",
    Logs: "Logs",
    ACTIVE: "Active",
    INACTIVE: "Inactive",
    login: "Login",
    loginText1: "Welcome,",
    loginText2: "Only administrator can access this page.",
    id: "ID",
    password: "Password",
    PasswordAssistance: "Password assistance",
    Registration: "Registration",
    PasswordAssistanceText:
      "Enter the email address associated with your OMPASS account.",
    ResetPassword: "Reset password",
    GoBack: "Go back",
    Overview: "Overview",
    Authentications: "Authentications",
    AuthenticationLog: "Authentication Log",
    ValidDate: "Remaining days",
    daysleft: "",
    Administrators: "Administrators",
    User: "User ID",
    Action: "Action",
    PLAN: "Plan",
    Application: "Application",
    Status: "Status",
    Date: "Date",
    Valid: "Valid",
    Name: "Name",
    Email: "Email",
    phoneNumber: "Phone Number",
    Country: "Country",
    Authority: "Authority",
    Domain: "Domain",
    LastLogin: "Last Login",
    Bypass: "Bypass",
    ReenterPassword: "Re-enter Password",
    OK: "OK",
    Cancel: "Cancel",
    DEFAULTPOLICY: "Default Policy",
    CUSTOMPOLICY: "Custom Policy",
    ADD: "추가",
    UPDATE: "수정",
    SAVE: "저장",
    DELETE: "삭제",
    CLOSE: "닫기",
    DUPLICATECHECK: "중복체크",
    BILLINGCYCLE: "Billing Cycle",
    USERNUM: "User Count",
    ALLUSERNUM: "Total Users",
    REGISTEREDUSERNUM: "Registered Users",
    UNREGISTEREDUSERNUM: "	Unregistered Users",
    BYPASSUSERNUM: "OMPASS AuthN Bypass",
    EXCELUPLOAD: "사용자 목록 업로드",
    EXCELDOWNLOAD: "사용자 목록 다운로드",
    REGISTER: "등록",
    DELETECONFIRM: "정말로 삭제하시겠습니까?",
    APPLICATION: "어플리케이션",
    FIRSTNAME: "First name",
    LASTNAME: "Last name",
    EMAIL: "E-MAIL",
    MOBILE: "Phone",
    PASSWORD: "비밀번호",
    PASSWORDCONFIRM: "비밀번호 확인",
    APPLICATIONNAME: "어플리케이션명",
    CONTENTS: "항목",
    DOMAIN: "도메인 주소",
    REDIRECTURI: "Redirect URI",
    STATUS: "상태",
    POLICYSETTING: "정책 설정",
    APPLICATIONPOLICYSETTINGDESCRIPTION:
      "해당 어플리케이션에 커스텀 정책을 적용할 수 있습니다.",
    SECRETKEY: "비밀 키",
    SECRETKEYRESET: "비밀 키 재발급",
    ADMINREGISTER: "Add Admin User",
    SECONDAUTHENTICATIONACTIVE: "Enable Two-Factor Authentication",
    SECONDAUTHENTICATIONINACTIVE: "Disable Two-Factor Authentication",
    USER: "사용자",
    PERUSER: "User",
    PRICEUNIT: "{param}",
    PAYMENT: '결제',
    PAYMENTHISTORY: "결제 내역",
    BILLINGCHECKDESCRIPTION: "이용약관, 가격 및 수수료 규정에 동의합니다.",
    BILLINGPRICEDESCRIPTIONMONTHLY:
      "결제일로 부터 30일 간격으로 {param}(이)가 자동으로 결제됩니다.",
    BILLINGPRICEDESCRIPTIONANNUALY: "결제일로 부터 365일 간격으로 {param}(이)가 자동으로 결제됩니다.",
    BILLINGCONFIRMMESSAGE:'상기 내용으로 결제를 진행하시겠습니까?',
    BILLINGLOADING: '결제 창 불러오는 중...',
    MONTHLY: "Month",
    ANNUALY: 'Year',
    EVERYMONTH: "매 월",
    EVERYYEAR: '매 년',
    AGREE: "Agreement",
    PRICE: "Price",
    PRICECOLUMN: "금액",
    PAYMENTDATE: "결제 날짜",
    PAYMENTTYPE: "결제 종류",
    POLICYNAME: "정책명",
    DESCRIPTION: "설명",
    SETTINGTODEFAULT: "기본값으로 변경",
    POLICYTITLE: "정책명",
    CANCELSUBSCRIPTION: "정말 구독을 취소하시겠습니까?",
    NORESTRICTION: "No restrictions",
    GLOBALPOLICYDESCRIPTION_1:
      "Require two-factor authentication or enrollment when applicable, unless there is a superseding policy configured.",
    GLOBALPOLICYDESCRIPTION_2:
      "Require two-factor authentication or enrollment when applicable, unless there is a superseding policy configured.",
    GLOBALPOLICYDESCRIPTION_3:
      "Require two-factor authentication or enrollment when applicable, unless there is a superseding policy configured.",
    GLOBALPOLICYDESCRIPTION_4:
      "Require two-factor authentication or enrollment when applicable, unless there is a superseding policy configured.",
    GLOBALPOLICYDESCRIPTION_5:
      "Require two-factor authentication or enrollment when applicable, unless there is a superseding policy configured.",
    POLICIESDESCRIPTION:
      "OMPASS 정책은 기본 정책과 사용자 정의 정책으로 구분됩니다.",
    GLOBALPOLICYDESCRIPTION:
      "기본 정책은 모든 어플리케이션에 적용되는 정책입니다.",
    CUSTOMPOLICYDESCRIPTION:
      "사용자 정의 정책은 특정 어플리케이션에 적용할 수 있는 정책입니다.",
    ACCESSCONTROLTITLE: "OMPASS 인증 제어",
    ACCESSCONTROLACTIVE: "OMPASS 인증 필수",
    ACCESSCONTROLACTIVEDESCRIPTION:
      "대체 정책이 구성되어 있지 않은 한 OMPASS 인증이 필요합니다. (없을 경우 OMPASS 인증 등록)",
    ACCESSCONTROLINACTIVE: "OMPASS 인증 패스",
    ACCESSCONTROLINACTIVEDESCRIPTION: "OMPASS 인증 및 등록을 패스하겠습니다.",
    ACCESSCONTROLDENY: "모두 거부",
    ACCESSCONTROLDENYDESCRIPTION:
      "모든 사용자에 대한 OMPASS 인증을 거부합니다.",
    ACCESSCONTROLDESCRIPTION:
      "이 옵션을 활성화하면 모든 사용자에게 적용됩니다.",
    USERLOCATIONPOLICYTITLE: "사용자 위치 제한",
    USERLOCATIONPOLICYDESCRIPTION1:
      "내부 IP 및 알 수 없는 국가의 액세스 시도는 적용되지 않습니다.",
    USERLOCATIONPOLICYDESCRIPTION2:
      "사용자 IP 주소에 의거하여 위치를 확인 후 해당 국가에 대한 조치를 적용할 수 있습니다.",
    BROWSERSPOLICYTITLE: "브라우저 접근 허용",
    BROWSERSPOLICYDESCRIPTION:
      "선택한 브라우저만 접근이 허용됩니다.\n현재 선택한 브라우저 : {param}",
    AUTHENTICATIONMETHODPOLICYTITLE: "인증 방법",
    AUTHENTICATIONMETHODPOLICYDESCRIPTION:
      "사용자는 체크된 방법인 2FA로만 인증할 수 있습니다.",
    OMPASSMOBILEPOLICYTITLE: "OMPASS 모바일 앱",
    OMPASSMOBILEPOLICYACTIVE: "OMPASS 모바일 앱 최신 보안 패치가 필요합니다.",
    OMPASSMOBILEPOLICYINACTIVE:
      "OMPASS 모바일 앱 최신 보안 패치가 필요하지 않습니다.",
    OMPASSMOBILEPOLICYDESCRIPTION: "iOS 및 Android에만 적용됩니다.",
    Chrome: "Chrome",
    "Chrome Mobile": "Chrome Mobile",
    "Microsoft Edge": "Microsoft Edge",
    Firefox: "Firefox",
    Safari: "Safari",
    "Safari Mobile": "Safari Mobile",
    BACKHOMEPAGE: "Back to homepage",
    AuthLogs: "OMPASS Logs",
    PolicyLogs: "PolicyLogs",
    SUBSCRIPTION: "결제하기",
    SUBSCRIPTIONCANCEL: "구독 취소",
    AUTHTYPE: "Authentication Type",
    ETCUSERLOCATION: "All Other Countries",
  },
  KR: {
    localeChangeText: "KO",
    logout: "로그아웃",
    detailColumn: "보기",
    welcomeText: "{param}님 안녕하세요.",
    Dashboard: "대시보드",
    Policies: "정책",
    Users: "사용자",
    Admins: "관리자",
    Applications: "어플리케이션",
    Billing: "요금",
    Logs: "로그",
    ACTIVE: "활성화",
    INACTIVE: "비활성화",
    login: "로그인",
    loginText1: "환영합니다.",
    loginText2: "본 페이지는 관리자만을 위한\n로그인 페이지입니다.",
    id: "아이디",
    password: "패스워드",
    PasswordAssistance: "비밀번호 초기화",
    Registration: "회원가입",
    PasswordAssistanceText: "비밀번호를 초기화 할 이메일을 입력해 주세요.",
    ResetPassword: "이메일 인증",
    GoBack: "돌아가기",
    Overview: "사용자 정보",
    Authentications: "인증 횟수 차트",
    AuthenticationLog: "최근 인증 로그",
    ValidDate: "남은 일 수",
    daysleft: "일",
    Administrators: "관리자 수",
    User: "사용자 아이디",
    Action: "활동",
    PLAN: "플랜",
    Application: "어플리케이션",
    Status: "상태",
    Date: "시간",
    Valid: "현재 사용중",
    Name: "이름",
    Email: "이메일",
    phoneNumber: "전화번호",
    Country: "국가",
    Authority: "권한",
    Domain: "도메인",
    LastLogin: "마지막 로그인",
    Bypass: "OMPASS 인증 바이패스",
    ReenterPassword: "비밀번호 확인",
    OK: "확인",
    Cancel: "취소",
    DEFAULTPOLICY: "기본 정책",
    CUSTOMPOLICY: "사용자 정의 정책",
    ADD: "추가",
    UPDATE: "수정",
    SAVE: "저장",
    DELETE: "삭제",
    CLOSE: "닫기",
    DUPLICATECHECK: "중복체크",
    BILLINGCYCLE: "결제 주기",
    USERNUM: "사용자 수",
    ALLUSERNUM: "전체 사용자 수",
    REGISTEREDUSERNUM: "등록된 사용자 수",
    UNREGISTEREDUSERNUM: "등록되지 않은 사용자 수",
    BYPASSUSERNUM: "OMPASS 인증 바이패스 사용자 수",
    EXCELUPLOAD: "사용자 목록 업로드",
    EXCELDOWNLOAD: "사용자 목록 다운로드",
    REGISTER: "등록",
    DELETECONFIRM: "정말로 삭제하시겠습니까?",
    APPLICATION: "어플리케이션",
    FIRSTNAME: "성",
    LASTNAME: "이름",
    EMAIL: "이메일",
    MOBILE: "전화번호",
    PASSWORD: "비밀번호",
    PASSWORDCONFIRM: "비밀번호 확인",
    APPLICATIONNAME: "어플리케이션명",
    CONTENTS: "항목",
    DOMAIN: "도메인 주소",
    REDIRECTURI: "리다이렉트 URI",
    STATUS: "상태",
    POLICYSETTING: "정책 설정",
    APPLICATIONPOLICYSETTINGDESCRIPTION:
      "해당 어플리케이션에 커스텀 정책을 적용할 수 있습니다.",
    SECRETKEY: "비밀 키",
    SECRETKEYRESET: "비밀 키 재발급",
    ADMINREGISTER: "관리자 등록",
    SECONDAUTHENTICATIONACTIVE: "2차 인증 활성화",
    SECONDAUTHENTICATIONINACTIVE: "2차 인증 비활성화",
    USER: "사용자",
    PERUSER: "1인",
    PRICEUNIT: "{param}",
    PAYMENT: '결제',
    PAYMENTHISTORY: "결제 내역",
    BILLINGCHECKDESCRIPTION: "이용약관, 가격 및 수수료 규정에 동의합니다.",
    BILLINGPRICEDESCRIPTIONMONTHLY:
      "결제일로 부터 30일 간격으로 {param}(이)가 자동으로 결제됩니다.",
    BILLINGPRICEDESCRIPTIONANNUALY: "결제일로 부터 365일 간격으로 {param}(이)가 자동으로 결제됩니다.",
    BILLINGCONFIRMMESSAGE:'상기 내용으로 결제를 진행하시겠습니까?',
    BILLINGLOADING: '결제 창 불러오는 중...',
    MONTHLY: "월",
    ANNUALY: '년',
    EVERYMONTH: "매 월",
    EVERYYEAR: '매 년',
    AGREE: "이용 동의",
    PRICE: "가격",
    PRICECOLUMN: "금액",
    PAYMENTDATE: "결제 날짜",
    PAYMENTTYPE: "결제 종류",
    POLICYNAME: "정책명",
    DESCRIPTION: "설명",
    SETTINGTODEFAULT: "기본값으로 변경",
    POLICYTITLE: "정책명",
    CANCELSUBSCRIPTION: "정말 구독을 취소하시겠습니까?",
    NORESTRICTION: "제한 사항 없음.",
    GLOBALPOLICYDESCRIPTION_1:
      "Require two-factor authentication or enrollment when applicable, unless there is a superseding policy configured.",
    GLOBALPOLICYDESCRIPTION_2:
      "Require two-factor authentication or enrollment when applicable, unless there is a superseding policy configured.",
    GLOBALPOLICYDESCRIPTION_3:
      "Require two-factor authentication or enrollment when applicable, unless there is a superseding policy configured.",
    GLOBALPOLICYDESCRIPTION_4:
      "Require two-factor authentication or enrollment when applicable, unless there is a superseding policy configured.",
    GLOBALPOLICYDESCRIPTION_5:
      "Require two-factor authentication or enrollment when applicable, unless there is a superseding policy configured.",
    POLICIESDESCRIPTION:
      "OMPASS 정책은 기본 정책과 사용자 정의 정책으로 구분됩니다.",
    GLOBALPOLICYDESCRIPTION:
      "기본 정책은 모든 어플리케이션에 적용되는 정책입니다.",
    CUSTOMPOLICYDESCRIPTION:
      "사용자 정의 정책은 특정 어플리케이션에 적용할 수 있는 정책입니다.",
    ACCESSCONTROLTITLE: "OMPASS 인증 제어",
    ACCESSCONTROLACTIVE: "OMPASS 인증 필수",
    ACCESSCONTROLACTIVEDESCRIPTION:
      "대체 정책이 구성되어 있지 않은 한 OMPASS 인증이 필요합니다. (없을 경우 OMPASS 인증 등록)",
    ACCESSCONTROLINACTIVE: "OMPASS 인증 패스",
    ACCESSCONTROLINACTIVEDESCRIPTION: "OMPASS 인증 및 등록을 패스하겠습니다.",
    ACCESSCONTROLDENY: "모두 거부",
    ACCESSCONTROLDENYDESCRIPTION:
      "모든 사용자에 대한 OMPASS 인증을 거부합니다.",
    ACCESSCONTROLDESCRIPTION:
      "이 옵션을 활성화하면 모든 사용자에게 적용됩니다.",
    USERLOCATIONPOLICYTITLE: "사용자 위치 제한",
    USERLOCATIONPOLICYDESCRIPTION1:
      "내부 IP 및 알 수 없는 국가의 액세스 시도는 적용되지 않습니다.",
    USERLOCATIONPOLICYDESCRIPTION2:
      "사용자 IP 주소에 의거하여 위치를 확인 후 해당 국가에 대한 조치를 적용할 수 있습니다.",
    BROWSERSPOLICYTITLE: "브라우저 접근 허용",
    BROWSERSPOLICYDESCRIPTION:
      "선택한 브라우저만 접근이 허용됩니다.\n현재 선택한 브라우저 : {param}",
    AUTHENTICATIONMETHODPOLICYTITLE: "인증 방법",
    AUTHENTICATIONMETHODPOLICYDESCRIPTION:
      "사용자는 체크된 방법인 2FA로만 인증할 수 있습니다.",
    OMPASSMOBILEPOLICYTITLE: "OMPASS 모바일 앱",
    OMPASSMOBILEPOLICYACTIVE: "OMPASS 모바일 앱 최신 보안 패치가 필요합니다.",
    OMPASSMOBILEPOLICYINACTIVE:
      "OMPASS 모바일 앱 최신 보안 패치가 필요하지 않습니다.",
    OMPASSMOBILEPOLICYDESCRIPTION: "iOS 및 Android에만 적용됩니다.",
    Chrome: "크롬",
    "Chrome Mobile": "크롬 모바일",
    "Microsoft Edge": "엣지",
    Firefox: "파이어폭스",
    Safari: "사파리",
    "Safari Mobile": "사파리 모바일",
    BACKHOMEPAGE: "홈페이지로 돌아가기",
    AuthLogs: "OMPASS 로그",
    PolicyLogs: "정책 로그",
    SUBSCRIPTION: "결제하기",
    SUBSCRIPTIONCANCEL: "구독 취소",
    AUTHTYPE: "인증 유형",
    ETCUSERLOCATION: "그 외의 다른 나라들",
  },
};

export default locales;
