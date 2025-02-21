const locales = {
  US: {
    ERR_001: 'The access token has expired or is no longer active.',
    ERR_002: 'The access token is in an unsupported format.',
    ERR_003: 'The access token is in a wrong format.',
    ERR_004: 'Failed to verify signature',
    ERR_005: 'The access token does not exist.',
    ERR_006: 'The token should be as "Bearer" type',
    ERR_007: 'Unhandled Error',

    ERR_101: 'This administrator ID does not exist.',
    ERR_102: 'This email address does not exist.',
    ERR_103: 'Please check your ID or password.',
    ERR_104: 'This user does not exist.',
    ERR_105: 'This application does not exist.',
    ERR_106: 'This application already exists.',
    ERR_107: 'Import transaction information does not exist',
    ERR_108: 'There is no payment records.',
    ERR_109: 'Order information does not exist.',
    ERR_110: 'FIDO server is off.',
    ERR_111: 'There is no default policy.',
    ERR_112: 'There is no custom policy.',
    ERR_113: 'This policy does not exist.',
    ERR_114: 'There is no default policy.',
    ERR_115: 'The recurring payment order does not exist.',
    ERR_116: 'Invalid API request.',
    ERR_117: 'The number of registered users has been exceeded.',
    ERR_118: 'Your account has been locked. Please reset your password from [Reset authentication].',
    ERR_119: 'Password Verification Failed.'
  },
  KR: {
    ERR_001: '토큰이 만료되었습니다.',
    ERR_002: '지원하지 않는 형식의 토큰입니다.',
    ERR_003: '토큰의 구성이 올바르지 않습니다.',
    ERR_004: '기존 서명을 확인하지 못했습니다.',
    ERR_005: '토큰이 존재하지 않습니다.',
    ERR_006: '토큰은 Bearer 형식으로 전송되어야 합니다.',
    ERR_007: '핸들링되지 않은 에러',

    ERR_101: '존재하지 않는 관리자 아이디 입니다.',
    ERR_102: '존재하지 않는 이메일 입니다.',
    ERR_103: '아이디 혹은 패스워드를 확인해주세요.',
    ERR_104: '존재하지 않는 사용자 입니다.',
    ERR_105: '존재하지 않는 어플리케이션 입니다.',
    ERR_106: '이미 존재하는 어플리케이션 입니다.',
    ERR_107: '아임포트 트랜잭션 정보가 존재하지 않습니다.',
    ERR_108: '결제내역이 존재하지 않습니다.',
    ERR_109: '주문 정보가 존재하지 않습니다.',
    ERR_110: 'FIDO 서버가 꺼져있습니다.',
    ERR_111: '글로벌 정책이 존재하지 않습니다.',
    ERR_112: '커스텀정책이 존재하지 않습니다.',
    ERR_113: '존재하지 않는 정책입니다.',
    ERR_114: '기본 정책이 존재하지 않습니다.',
    ERR_115: '구독중인 주문이 존재하지 않습니다.',
    ERR_116: '잘못된 API 요청입니다.',
    ERR_117: '등록 가능한 사용자 수를 초과하였습니다.',
    ERR_118: '계정이 잠겼습니다. 해제하시려면 비밀번호 초기화를 진행해주세요.',
    ERR_119: '패스워드 검증에 실패하였습니다.'
  },
};

export default locales;