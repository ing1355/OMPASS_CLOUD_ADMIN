const locales = {
  US: {
    ApplicationsRoute: "App Management",
    localeChangeText: "EN",
    logout: "Logout",
    detailColumn: "Detail",
    welcomeText: "Hello {param}",
    Dashboard: "Dashboard",
    Policies: "Policies",
    Users: "Users Management",
    Admins: "Admins Management",
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
    User: "User ID",
    Action: "Action",
    PLAN: "Plan",
    Application: "Application",
    Status: "Status",
    Date: "Date",
    Valid: "Valid",
    ValidCancel: "(Recurring payment is disabled)",
    Name: "Name",
    Email: "Email",
    phoneNumber: "Phone Number",
    Country: "Country",
    Authority: "Authority",
    Domain: "Domain",
    LastLogin: "Last Login",
    Bypass: "Bypass",
    ReenterPassword: "Password again",
    OK: "OK",
    Cancel: "Cancel",
    DEFAULTPOLICY: "Default Policy",
    DEFAULTPOLICYUPDATE: "Edit Default Policy",
    CUSTOMPOLICY: "Custom Policy",
    CUSTOMPOLICYADD: "Add Custom Policy",
    ADD: "Add",
    UPDATE: "Edit",
    SAVE: "Save",
    DELETE: "Delete",
    CLOSE: "Close",
    DUPLICATECHECK: "Check availability",
    BILLINGCYCLE: "Billing Cycle",
    USERNUM: "Number of Users",
    ALLUSERNUM: "Total Users",
    REGISTEREDUSERNUM: "Registered Users",
    UNREGISTEREDUSERNUM: "	Unregistered Users",
    BYPASSUSERNUM: "OMPASS AuthN Bypass",
    EXCELUPLOAD: "Import User from CSV",
    EXCELDOWNLOAD: "Export User from CSV",
    REGISTER: "Register",
    DELETECONFIRM: "Are you sure you want to delete?",
    APPLICATION: "Application",
    FIRSTNAME: "First name",
    LASTNAME: "Last name",
    EMAIL: "E-MAIL",
    MOBILE: "Phone",
    PASSWORD: "Password",
    PASSWORDCONFIRM: "Conform password",
    APPLICATIONNAME: "Application Name",
    CONTENTS: "",
    DOMAIN: "Domain",
    REDIRECTURI: "Redirect URI",
    STATUS: "Status",
    POLICYSETTING: "Select Policy",
    SECRETKEY: "Secret Key",
    SECRETKEYRESET: "Get New",
    ADMINREGISTER: "Add Admin User",
    PERMIT: 'Permit',
    DENY: 'Deny',
    USER: "User",
    PERUSER: "User",
    PRICEUNIT: "{param}",
    PAYMENT: "Payment",
    PAYMENTHISTORY: "Payment History",
    BILLINGCHECKDESCRIPTION:
      "I have read and agree to the Terms of Use and Privacy Policy",
    BILLINGPRICEDESCRIPTIONMONTHLY:
      "{param} is going to be automatically paid every 30 days from today.",
    BILLINGPRICEDESCRIPTIONANNUALLY:
      "{param} is going to be automatically paid every 365 days from today.",
    BILLINGCONFIRMMESSAGE: "Would you like to make a payment as above?",
    BILLINGLOADING: "Loading...",
    MONTHLY: "Month",
    ANNUALLY: "Annual",
    EVERYMONTH: "Month",
    EVERYYEAR: "Annual",
    AGREE: "Agreement",
    PRICE: "Price",
    PRICECOLUMN: "Price",
    PAYMENTDATE: "Payment Date",
    POLICYNAME: "Policy",
    DESCRIPTION: "Description",
    SETTINGTODEFAULT: "Make Default",
    POLICYTITLE: "Custom Policy Name",
    DAYSLEFT: '{day} days left',
    daysLeft: "{day}",
    SUBSCRIPTION_CANCEL_TITLE: 'Cancel Auto-Renewal',
    SUBSCRIPTION_CANCEL_DESCRIPTION: 'The expiration date of {email} is {date}.\nIf you wish to apply auto-renewal for OMPASS again later on, please pay again to restart your auto-renewal payment.',
    CANCELSUBSCRIPTION: "Are you sure you want to cancel automatic payments?",
    NORESTRICTION: "No restrictions",
    GLOBALPOLICYDESCRIPTION:
      "The default policy is basically provided to apply for all applications.",
    CUSTOMPOLICYDESCRIPTION:
      "Make your own custom policy to apply applications differ from each others.",
    ACCESSCONTROLTITLE: "OMPASS Access Control",
    ACCESSCONTROLACTIVE: "Enable OMPASS Authentication",
    ACCESSCONTROLACTIVEDESCRIPTION:
      "Force users to authenticate by OMPASS to log in",
    ACCESSCONTROLINACTIVE: "Disable OMPASS Authentication",
    ACCESSCONTROLINACTIVEDESCRIPTION:
      "Do not authenticate or register the user by OMPASS to log in.",
    ACCESSCONTROLDENY: "Deny All",
    ACCESSCONTROLDENYDESCRIPTION: "Deny OMPASS authentication for all users.",
    ACCESSCONTROLDESCRIPTION: "Checking the box above will apply to all users.",
    USERLOCATIONENABLEPOLICYTITLE: '사용자 위치 제한 사용 여부',
    USERLOCATIONPOLICYTITLE: "User Location Restrictions",
    USERLOCATIONPOLICYDESCRIPTION1:
      "Access attempts from unknown countries do not apply.",
    USERLOCATIONPOLICYDESCRIPTION2:
      "User location restrictions you have selected will apply after determining user location based on IP address.",
    BROWSERSPOLICYTITLE: "Allowed Browser Type",
    BROWSERSPOLICYDESCRIPTION:
      "Only selected browsers are allowed access.\nSelected browsers: {param}",
    OMPASSMOBILEPOLICYTITLE: "OMPASS Mobile App Update Requirement",
    OMPASSMOBILEPOLICYACTIVE:
      "Yes, users must require the latest security patches to access OMPASS.",
    OMPASSMOBILEPOLICYINACTIVE:
      "No, users are free to access OMPASS without the latest security patches.",
    Chrome: "Chrome",
    "Chrome Mobile": "Chrome Mobile",
    "Microsoft Edge": "Microsoft Edge",
    Firefox: "Firefox",
    Safari: "Safari",
    "Safari Mobile": "Safari Mobile",
    BACKHOMEPAGE: "Go Home",
    AuthLogs: "OMPASS Logs",
    PolicyLogs: "Policy Logs",
    SUBSCRIPTION: "Pay Now",
    SUBSCRIPTIONCANCEL: "Cancel Auto-Renewal",
    AUTHTYPE: "Authentication Method",
    ETCUSERLOCATION: "All Other Countries",
    ALLUSERLOCATION: "All Countries",
    NONEUSERLOCATIONS: "Allow access from all countries.",
    NONEBROWSERS: "Deny access from all countries.",
    NOMOBILEPATCH: "Free to access OMPASS without the latest security patches.",
    EXCELIMPORTTEXT: "Please select an application to add users",
    ISBYPASS: "Bypass",
    NONEUSED: "Expired",
    INPUTEMAIL: "Email Address",
    USERBYPASSDESCRIPTION:
      "Login via email verification without OMPASS authentication.",
    USERBYPASSDESCRIPTION2: "Login after OMPASS authentication.",
    DISABLEDPOLICY:
      "Enable OMPASS authentication from edit to see the description.",
    BILLINGPLANDESCRIPTION1_1:
      "Two-Factor Authentication (2FA) for VPN and Web Apps",
    BILLINGPLANDESCRIPTION1_2: "Authenticate without password",
    BILLINGPLANDESCRIPTION1_3: "Two-Factor Authentication (2FA)",
    BILLINGPLANDESCRIPTION1_4: "Supports Web Authentication (WebAuthn)",
    GODOCUMENT: 'Go Document',
    POLICYDISABLEDTITLE: 'Sorry, this policy cannot be selected.',
    POLICYDISABLEDDESCRIPTION: 'This area will be displayed only if OMPASS authentication is enable in the selection of OMPASS access control.',
    CSV_DESCRIPTION_1: '* Users who already exist will be overwritten.',
    CSV_DESCRIPTION_2: '* Email will not be updated if the email address is malformed.',
    CSV_DESCRIPTION_3: '* Only .csv files are allowed.',
    NULL_OPTION: 'Select',
    USERBYPASSNOTICETEXT: '- Bypass works only if the policy of OMPASS access control is set to enable OMPASS authentication or deny all.',
    EXCEL_DOWNLOAD_TITLE: 'Please select an application from which to download user information.',
    EXCEL_DOWNLOAD_DESCRIPTION: '* User information of the selected application below will be saved as a .csv file.',
    USED_FREE_PLAN: 'Free',
    FREE_TRIAL: 'Free Trial'
  },
  KR: {
    localeChangeText: "KO",
    logout: "로그아웃",
    detailColumn: "상세보기",
    welcomeText: "{param}님 안녕하세요.",
    Dashboard: "대시보드",
    Policies: "정책",
    Users: "사용자 관리",
    Admins: "관리자 관리",
    ApplicationsRoute: "어플리케이션 관리",
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
    Administrators: "관리자 수",
    User: "사용자 아이디",
    Action: "활동",
    PLAN: "플랜",
    Application: "어플리케이션",
    Status: "상태",
    Date: "시간",
    Valid: "현재 사용중",
    ValidCancel: "(구독 취소)",
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
    DEFAULTPOLICYUPDATE: "기본 정책 수정",
    CUSTOMPOLICY: "사용자 정의 정책",
    CUSTOMPOLICYADD: "사용자 정의 정책 추가",
    ADD: "추가",
    UPDATE: "수정",
    SAVE: "저장",
    DELETE: "삭제",
    CLOSE: "닫기",
    DUPLICATECHECK: "중복 확인",
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
    DOMAIN: "도메인 주소",
    REDIRECTURI: "리다이렉트 URI",
    STATUS: "상태",
    POLICYSETTING: "정책 설정",
    SECRETKEY: "비밀 키",
    SECRETKEYRESET: "비밀 키 재발급",
    ADMINREGISTER: "관리자 등록",
    PERMIT: '허용',
    DENY: '거부',
    USER: "사용자",
    PERUSER: "1인",
    PRICEUNIT: "{param}",
    PAYMENT: "결제",
    PAYMENTHISTORY: "결제 내역",
    BILLINGCHECKDESCRIPTION: "이용약관, 가격 및 수수료 규정에 동의합니다.",
    BILLINGPRICEDESCRIPTIONMONTHLY:
      "결제일로 부터 30일 간격으로 {param}(이)가 자동으로 결제됩니다.",
    BILLINGPRICEDESCRIPTIONANNUALLY:
      "결제일로 부터 365일 간격으로 {param}(이)가 자동으로 결제됩니다.",
    BILLINGCONFIRMMESSAGE: "상기 내용으로 결제를 진행하시겠습니까?",
    BILLINGLOADING: "결제 창 불러오는 중...",
    MONTHLY: "월",
    ANNUALLY: "년",
    EVERYMONTH: "매 월",
    EVERYYEAR: "매 년",
    AGREE: "이용 동의",
    PRICE: "가격",
    PRICECOLUMN: "금액",
    PAYMENTDATE: "결제 날짜",
    PAYMENTTYPE: "결제 종류",
    POLICYNAME: "항목",
    DESCRIPTION: "설명",
    SETTINGTODEFAULT: "기본값으로 변경",
    POLICYTITLE: "정책명",
    DAYSLEFT: "{day}일 남음",
    daysLeft: "{day}일",
    SUBSCRIPTION_CANCEL_TITLE: "OMPASS 구독 취소",
    SUBSCRIPTION_CANCEL_DESCRIPTION:
      "{email}님의 사용 만료일은 {date}입니다.\n재사용을 원할 시 다시 결제처리를 진행해주세요.",
    CANCELSUBSCRIPTION: "정말 구독을 취소하시겠습니까?",
    NORESTRICTION: "제한 사항 없음.",
    POLICIESDESCRIPTION:
      "OMPASS 정책은 기본 정책과 사용자 정의 정책으로 구분됩니다.",
    GLOBALPOLICYDESCRIPTION:
      "기본 정책은 모든 어플리케이션에 적용되는 디폴트 정책입니다.",
    CUSTOMPOLICYDESCRIPTION:
      "사용자 정의 정책은 특정 어플리케이션에 적용할 수 있는 맞춤 정책입니다.",
    ACCESSCONTROLTITLE: "OMPASS 인증 제어",
    ACCESSCONTROLACTIVE: "OMPASS 인증 필수",
    ACCESSCONTROLACTIVEDESCRIPTION:
      "대체 정책이 구성되어 있지 않은 한 OMPASS 인증이 필요합니다. (없을 경우 OMPASS 인증 등록)",
    ACCESSCONTROLINACTIVE: "OMPASS 인증 패스",
    ACCESSCONTROLINACTIVEDESCRIPTION: "OMPASS 등록 및 인증을 패스합니다.",
    ACCESSCONTROLDENY: "모두 거부",
    ACCESSCONTROLDENYDESCRIPTION:
      "모든 사용자에 대한 OMPASS 인증을 거부합니다.",
    ACCESSCONTROLDESCRIPTION:
      "이 옵션을 활성화하면 모든 사용자에게 적용됩니다.",
    USERLOCATIONENABLEPOLICYTITLE: '사용자 위치 제한 사용 여부',
    USERLOCATIONPOLICYTITLE: "사용자 위치 제한",
    USERLOCATIONPOLICYDESCRIPTION1:
      "알 수 없는 국가의 액세스 시도는 적용되지 않습니다.",
    USERLOCATIONPOLICYDESCRIPTION2:
      "사용자 IP 주소를 기반으로 위치를 확인 후 해당 국가에 대한 조치를 적용할 수 있습니다.",
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
    ALLUSERLOCATION: "모든 나라들",
    NONEUSERLOCATIONS: "모든 국가의 접속이 허용됩니다.",
    NONEBROWSERS: "모든 브라우저의 접속이 차단됩니다.",
    NOMOBILEPATCH: "모바일 앱 패치를 강제하지 않습니다.",
    EXCELIMPORTTEXT: "사용자를 추가할 어플리케이션을 선택해주세요.",
    ISBYPASS: "바이패스 유무",
    NONEUSED: "사용하지 않음",
    INPUTEMAIL: "이메일 입력",
    USERBYPASSDESCRIPTION:
      "OMPASS 인증 없이 이메일 인증을 통해서 로그인이 가능합니다.",
    USERBYPASSDESCRIPTION2: "OMPASS 인증 후 로그인 가능합니다. (기본값)",
    DISABLEDPOLICY:
      "비활성화 된 정책입니다. OMPASS 인증 제어를 활성화하면 적용됩니다.",
    BILLINGPLANDESCRIPTION1_1: "2FA for VPN and Web Apps",
    BILLINGPLANDESCRIPTION1_2: "패스워드 없이 인증",
    BILLINGPLANDESCRIPTION1_3: "2차 인증",
    BILLINGPLANDESCRIPTION1_4: "WebAuthn 지원",
    GODOCUMENT: "문서로 이동하기",
    POLICYDISABLEDTITLE: "해당 정책은 선택할 수 없습니다.",
    POLICYDISABLEDDESCRIPTION:
      "이 항목은 OMPASS 인증 제어 정책이 OMPASS 인증 필수로 선택되어야 선택할 수 있는 항목입니다.",
    CSV_DESCRIPTION_1: '* 이미 존재하는 사용자는 덮어쓰기 됩니다.',
    CSV_DESCRIPTION_2: '* 이메일 형식이 잘못되어 있을 경우 무시됩니다.',
    CSV_DESCRIPTION_3: '* .csv 파일만 업로드 가능합니다.',
    NULL_OPTION: '선택',
    USERBYPASSNOTICETEXT: '- 바이패스는 OMPASS 인증제어 정책이 OMPASS 인증 필수, 모두 거부로 설정되어 있는 경우에만 작동합니다.',
    EXCEL_DOWNLOAD_TITLE: '사용자 정보를 다운로드할 어플리케이션을 선택해주세요.',
    EXCEL_DOWNLOAD_DESCRIPTION: '* 현재 선택한 어플리케이션의 사용자 정보가 .csv 파일로 저장됩니다.',
    USED_FREE_PLAN: '무료 플랜 사용중',
    FREE_TRIAL: '무료 플랜'
  },
};

export default locales;
