import React from 'react'

const AdminDelete = () => {
    return <div className="contents-container" style={{width: '40rem', textAlign:'center'}}>
        주의!<br/>
        해당 계정 삭제 시 관련된 모든 데이터(관리자, 사용자, 요금 등)가 삭제됩니다.<br/>
        정말로 삭제하시겠습니까?<br/>
        <input placeholder="비밀번호를 입력해주세요"/><button>삭제</button>
    </div>
}

export default AdminDelete