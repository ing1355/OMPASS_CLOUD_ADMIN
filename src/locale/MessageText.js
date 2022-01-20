const locales = {
  US: {
    success: "Success!",
    EMAIL_SEND_SUCCESS: "A verification mail has been sent to your email account. Please check your inbox to verify.",
    UPDATE_SUCCESS: "Update completed!",
    UPDATE_FAIL: "Update failed!",
    DELETE_SUCCESS: "Successfully removed!",
    DELETE_FAIL: "Delete failed!",
    ADMIN_CANT_DELETE: "You are not allowed to delete the administrator account.",
    APPLICATION_ADD_SUCCESS: "Application registration successful",
    APPLICATION_ADD_FAIL: "Application registration failed",
    IS_EXIST_EMAIL: "This email address is already in use.",
    IS_NOT_EXIST_EMAIL: "This email address is available.",
    IS_EXIST_APPLICATION: "This application name is already in use.",
    IS_NOT_EXIST_APPLICATION: "This application name is available.",
    COPY_SUCCESS: "Successfully copied to clipboard!",
    CANT_DELETE_ADMIN_APPLICATION:
      "OMPASS cloud manager application cannot be deleted.",
    POLICY_UPDATE_SUCCESS: "Successfully modified the policy!",
    POLICY_UPDATE_FAIL: "Failed to modify the policy!",
    POLICY_ADD_SUCCESS: "New policy is successfully added.",
    POLICY_ADD_FAIL: "Failed to add the policy.",
    IS_EXIST_POLICY_NAME: "This policy name is already in use.",
    IS_NOT_EXIST_POLICY_NAME: "This policy name is available.",
    Password: "Password",
    ID: "ID (Email address)",
    Email: "Email address",
    EMAIL_REGISTER_SUCCESS: 'Email registration successful',
    EMAIL_REGISTER_NEEDED: 'Please register your email address.',
    USER_LOCATION_DELETE_FAIL: 'This data cannot be deleted.',
    PAYMENT_SUCCESS: 'Payment successful',
    PAYMENT_FAIL: 'Sorry, payment failed!',
    SUBCRIPTION_CANCEL_SUCCESS: 'Your upcoming recurring payment is successfully cancelled.',
    PLEASE_AGREEMENT_CHECK: 'Please check the terms of use and privacy policy.',
    PLEASE_CHANGE_USER_NUM_MORE_THAN_BEFORE: 'Please change the number of user higher than before.',
    RESET_PASSWORD_SUCCESS_MESSAGE: 'You can now sign into your admin account by new password.',
    RESET_PASSWORD_FAIL_MESSAGE: 'Passwords do not match.',
    SUCCESS_CSV_UPLOAD: 'Successfully uploaded the CSV file.',
    FAIL_CSV_UPLOAD: 'Failed to upload the CSV file.',
    ADMIN_UPDATE_SUCCESS: 'Successfully updated the admin information!',
    ADMIN_DELETE_SUCCESS: 'Successfully deleted the admin account!',
    RESET_PASSWORD_SEND_MAIL: 'We have e-mailed your password reset link.\nPlease check your email.',
    SUCCESS_USER_UPDATED: 'Successfully changed the user information.',
    LOGIN_SUCCESS: 'Login success!',
    IS_NOT_CSV: 'Please upload a .csv file.',
    PLEASE_SELECTE_APPLICATION: 'Please select an application.',
    INVALID_CSV_USERID_DATA: 'Upload failed! Please check the user ID of the user on the line {param}.',
    INVALID_CSV_EMAIL_DATA: 'Upload failed! Please check the email of the user on the line {param}.',
    TOO_MANY_PERSON: '사용 가능한 사용자 수를 초과하였습니다. 초과된 사용자 수 : {param}',
    EXCEL_EMPTY: '사용자 정보가 존재하지 않습니다.',
    EXCEL_DOWNLOAD_FAIL: '다운로드에 실패하였습니다!'
  },
  KR: {
    success: "성공하였습니다!",
    EMAIL_SEND_SUCCESS: "인증 메일 발송에 성공하였습니다.",
    UPDATE_SUCCESS: "수정 성공!",
    UPDATE_FAIL: "수정 실패!",
    DELETE_SUCCESS: "삭제 성공!",
    DELETE_FAIL: "삭제 실패!",
    ADMIN_CANT_DELETE: "관리자는 삭제할 수 없습니다.",
    APPLICATION_ADD_SUCCESS: "어플리케이션 등록에 성공하였습니다.",
    APPLICATION_ADD_FAIL: "어플리케이션 등록에 실패하였습니다.",
    IS_EXIST_EMAIL: "이미 존재하는 이메일입니다.",
    IS_NOT_EXIST_EMAIL: "사용 가능한 이메일입니다.",
    IS_EXIST_APPLICATION: "이미 존재하는 어플리케이션명입니다.",
    IS_NOT_EXIST_APPLICATION: "사용 가능한 어플리케이션명입니다.",
    COPY_SUCCESS: "클립보드에 복사하였습니다.",
    CANT_DELETE_ADMIN_APPLICATION:
      "관리자 페이지 어플리케이션은 삭제할 수 없습니다.",
    POLICY_UPDATE_SUCCESS: "정책 변경에 성공하였습니다.",
    POLICY_UPDATE_FAIL: "정책 변경에 실패하였습니다.",
    POLICY_ADD_SUCCESS: "정책 추가에 성공하였습니다.",
    POLICY_ADD_FAIL: "정책 추가에 실패하였습니다.",
    IS_EXIST_POLICY_NAME: "이미 존재하는 정책명입니다.",
    IS_NOT_EXIST_POLICY_NAME: "사용 가능한 정책명입니다.",
    Password: "비밀번호",
    ID: "아이디 (이메일)",
    Email: "이메일",
    EMAIL_REGISTER_SUCCESS: '이메일을 등록하였습니다.',
    EMAIL_REGISTER_NEEDED: '이메일을 등록해주세요.',
    USER_LOCATION_DELETE_FAIL: '해당 데이터는 삭제할 수 없습니다.',
    PAYMENT_SUCCESS: '결제 성공하였습니다.',
    PAYMENT_FAIL: '결제 실패하였습니다.',
    SUBCRIPTION_CANCEL_SUCCESS: '구독 취소에 성공하였습니다.',
    PLEASE_AGREEMENT_CHECK: '이용 동의에 체크해주세요.',
    PLEASE_CHANGE_USER_NUM_MORE_THAN_BEFORE: '현재 사용자 수 보다 적은 사용자 수를 선택하셨습니다.',
    RESET_PASSWORD_SUCCESS_MESSAGE: '변경하신 비밀번호를 이용하여 로그인하실 수 있습니다.',
    RESET_PASSWORD_FAIL_MESSAGE: '비밀번호가 일치하지 않습니다.',
    SUCCESS_CSV_UPLOAD: 'CSV 업로드에 성공하였습니다.',
    FAIL_CSV_UPLOAD: 'CSV 업로드에 실패하였습니다.',
    ADMIN_UPDATE_SUCCESS: '관리자 수정에 성공하였습니다.',
    ADMIN_DELETE_SUCCESS: '관리자 삭제에 성공하였습니다.',
    RESET_PASSWORD_SEND_MAIL: '메일로 비밀번호 초기화 링크를 전송하였습니다.\n메일함을 확인해주세요.',
    SUCCESS_USER_UPDATED: '사용자 정보를 성공적으로 변경하였습니다.',
    LOGIN_SUCCESS: '로그인 되었습니다.',
    IS_NOT_CSV: '.csv 파일을 업로드해주세요.',
    PLEASE_SELECTE_APPLICATION: '어플리케이션을 선택해주세요.',
    INVALID_CSV_USERID_DATA: '업로드 실패! {param}번째 사용자의 아이디를 확인해주세요.',
    INVALID_CSV_EMAIL_DATA: '업로드 실패! {param}번째 사용자의 이메일을 확인해주세요.',
    TOO_MANY_PERSON: '사용 가능한 사용자 수를 초과하였습니다. 초과된 사용자 수 : {param}',
    EXCEL_EMPTY: '사용자 정보가 존재하지 않습니다.',
    EXCEL_DOWNLOAD_FAIL: '다운로드에 실패하였습니다!'
  },
};

export default locales;
