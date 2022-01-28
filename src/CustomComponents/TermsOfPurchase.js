import React, { useCallback, useEffect } from "react";
import { connect } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import CustomConfirm from './CustomConfirm'
import ActionCreators from "../redux/actions";
import './TermsOfPurchase.css'

const purchaseDatas1 = [
    { title: '① 회원 :', content: '회원은 관리자(ADMIN)(이하 "관리자"), 서브관리자(SUB_ADMIN)(이하 "서브관리자"), 사용자로 구분되며 서비스가 적용된 어플리케이션에 첫 로그인 시 휴대폰 본인 인증을 진행합니다.', titleWidth: 55 },
    { title: '② 관리자 :', content: '서비스 및 사이트의 약관에 동의하고 개인정보를 제공하여 회원등록을 한 자로서, 서비스 및 사이트와의 이용계약을 체결, 관리, 이용하는 이용자를 말합니다.', titleWidth: 70 },
    { title: '③ 서브관리자 :', content: '관리자에 의해 등록되어 이메일 본인 인증을 완료한 자로서, 서비스 및 사이트를 관리하고 이용하는 이용자를 말합니다.', titleWidth: 95 },
    { title: '④ 사용자 :', content: '적용된 어플리케이션에 로그인을 위해 서비스를 이용하는 이용자를 말합니다.', titleWidth: 70 },
    { title: '⑤ 운영자 :', content: '서비스 및 사이트에 대한 어플리케이션 및 홈페이지를 개설하여 운영하는 운영자를 말합니다.', titleWidth: 70 },
    { title: '⑥ 사용자 아이디(이하 "ID") :', content: '회원의 식별과 회원의 서비스 이용을 위하여 회원별로 부여하는 고유한 문자와 숫자의 조합을 말합니다. 등록한 어플리케이션에 해당하는 아이디가 대쉬보드, 로그, 사용자 관리에 노출되며 본 사이트의 사용자 아이디는 등록한 이메일 주소로 노출됩니다.', titleWidth: 180 },
    { title: '⑦ 비밀번호 :', content: '회원의 부여받은 ID와 일치된 회원임을 확인하고 회원의 권익 보호를 위하여 회원이 선정한 문자와 숫자의 조합을 말합니다.', titleWidth: 80 },
    { title: '⑧ 이용계약 :', content: '서비스 및 사이트 이용과 관련하여 회사와 회원간에 체결 하는 계약을 말합니다.', titleWidth: 80 },
    { title: '⑨ 해지 :', content: '회원이 이용계약을 해약하는 것을 말합니다.', titleWidth: 55 },
    { title: '⑩ 구독 취소 :', content: '정기결제를 취소하는 것을 말하며 구독 취소 후에는 사용 만료일까지 사용이 가능합니다.', titleWidth: 85 }
]

const purchaseDatas2 = [
    { title: '①', content: '이용계약은 회원으로 등록하여 사이트를 이용하려는 관리자의 본 약관 내용에 대한 동의와 가입신청에 대하여 운영자의 이용승낙으로 이용계약 체결을 성립합니다.' },
    { title: '②', content: '회원(관리자)으로 등록하여 서비스를 이용하려는 자는 사이트 가입신청 시 본 약관을 읽고 동의를 선택하는 것으로 본 약관에 대한 동의 의사 표시를 합니다.' },
    { title: '③', content: '구매조건으로서 사용자 10인 이하는 무료이며 11인 이상은 결제 후 서비스 및 사이트를 이용할 수 있습니다.' },
    { title: '④', content: '구매조건으로서 사용자 11인 이상은 결제일로 부터 월 30일 또는 년 365일 주기로 선택하여 사용자 1인 당 2,200원을 결제하여 정기결제(자동결제)를 신청함과 동시에 서비스 및 사이트를 이용할 수 있습니다.' },
    { title: '⑤', content: '구독 취소를 통해 정기결제를 취소할 수 있으며 남은 기간 동안 서비스 및 사이트 이용이 가능합니다. 재결제 시 정기결제가 다시 활성화 됩니다.' },
    { title: '⑥', content: '결제된 사용자 수를 변경하면 적용된 사용자 수에 따른 결제는 당일이 아닌 다음 결제일에 적용된 총 결제 인원으로 계산되어 정기결제(자동결제)가 진행됩니다.' }
]

const purchaseDatas3 = [
    { title: '①', content: '회원이 서비스 및 사이트와의 이용계약을 해지하고자 하는 경우에는 회원 본인이 온라인을 통하여 청약 철회신청을 하여야 합니다.' },
    { title: '②', content: '구독 취소는 청약 철회가 아닌 정기결제를 취소하는 것을 말하며 구독 취소 후에는 사용 만료일까지 사용이 가능합니다.' },
    { title: '③', content: '해당 결제일(결제 날짜)로부터 7일 이내에 청약 철회를 신청하면 신청일로 부터 익월 말일까지 결제금액의 100% 가 환불됩니다.' }
]

const purchaseDatas4 = [
    { title: '①', content: '회원으로 등록하여 서비스 및 사이트를 이용하려는 관리자는 사이트에서 요청하는 제반정보(성, 이름, 이메일주소, 국가코드, 전화번호, 회사이름)를 제공해야 합니다.' },
    { title: '②', content: '타인의 정보를 도용하거나 허위의 정보를 등록하는 등 본인의 진정한 정보를 등록하지 않은 회원은 사이트 이용과 관련하여 아무런 권리를 주장할 수 없으며, 관계 법령에 따라 처벌받을 수 있습니다.' }
]

const purchaseDatas5 = [
    { title: '①', content: '운영자는 회원으로부터 제기되는 의견이나 불만이 정당하다고 인정할 경우에는 가급적 빨리 처리하여야 합니다. 다만, 개인적인 사정으로 신속한 처리가 곤란한 경우에는 사후에 공지 또는 회원에게 이메일, 전화 등을 통한 연락 등 최선을 다합니다.' },
    { title: '②', content: '운영자는 계속적이고 안정적인 사이트 제공을 위하여 설비에 장애가 생기거나 유실된 때에는 이를 지체 없이 수리 또는 복구할 수 있도록 사이트에 요구할 수 있습니다. 다만, 천재지변 또는 사이트나 운영자에 부득이한 사유가 있는 경우, 사이트 운영을 일시 정지할 수 있습니다.' }
]

const purchaseDatas6 = [
    { title: '①', content: '회원은 본 약관에서 규정하는 사항과 운영자가 정한 제반 규정, 공지사항 및 운영정책 등 사이트가 공지하는 사항 및 관계 법령을 준수하여야 하며, 기타 사이트의 업무에 방해가 되는 행위, 사이트의 명예를 손상하는 행위를 해서는 안 됩니다.' },
    { title: '②', content: '회원은 사이트의 명시적 동의가 없는 한 서비스의 이용 권한, 기타 이용계약상 지위를 타인에게 양도, 증여할 수 없으며, 이를 담보로 제공할 수 없습니다.' },
    { title: '③', content: '이용고객은 아이디 및 비밀번호 관리에 상당한 주의를 기울여야 하며, 운영자나 사이트의 동의 없이 제3자에게 아이디를 제공하여 이용하게 할 수 없습니다.' },
    { title: '④', content: '회원은 운영자와 사이트 및 제3자의 지적 재산권을 침해해서는 안됩니다.' }
]

const purchaseDatas7 = [
    { title: '①', content: '서비스 이용 시간은 업무상 또는 기술상 특별한 지장이 없는 한 연중무휴 1일 24시간을 원칙으로 합니다. 단, 사이트는 시스템 정기점검, 증설 및 교체를 위해 사이트가 정한 날이나 시간에 서비스를 일시중단 할 수 있으며 예정된 작업으로 인한 서비스 일시 중단은 사이트의 홈페이지에 사전에 공지하오니 수시로 참고하시길 바랍니다.' },
    {
        title: '②', content: '단, 사이트는 다음 경우에 대하여 사전 공지나 예고 없이 서비스를 일시적 혹은 영구적으로 중단할 수 있습니다.', subContent: [
            { title: '-', content: '긴급한 시스템 점검, 증설, 교체, 고장 혹은 오동작을 일으키는 경우' },
            { title: '-', content: '국가비상사태, 정전, 천재지변 등의 불가항력적인 사유가 있는 경우' },
            { title: '-', content: '전기통신사업법에 규정된 기간통신사업자가 전기통신 서비스를 중지한 경우' },
            { title: '-', content: '서비스 이용의 폭주 등으로 정상적인 서비스 이용에 지장이 있는 경우' }
        ]
    },
    { title: '③', content: '전항에 의한 서비스 중단의 경우 사이트는 사전에 공지사항 등을 통하여 회원에게 통지합니다. 단, 사이트가 통제할 수 없는 사유로 발생한 서비스의 중단에 대하여 사전공지가 불가능한 경우에는 사후공지로 대신합니다.' }
]

const purchaseDatas8 = [
    { title: '①', content: '회원 가입시 혹은 가입 후 정보 변경 시 허위 내용을 등록하는 행위' },
    { title: '②', content: '타인의 서비스 및 사이트 이용을 방해하거나 정보를 도용하는 행위' },
    { title: '③', content: '서비스 및 사이트의 운영진, 직원 또는 관계자를 사칭하는 행위' },
    { title: '④', content: '서비스 및 사이트, 기타 제3자의 인격권 또는 지적재산권을 침해하거나 업무를 방해하는 행위' },
    { title: '⑤', content: '다른 회원의 ID를 부정하게 사용하는 행위' },
    { title: '⑥', content: '다른 회원에 대한 개인정보를 그 동의 없이 수집, 저장, 공개하는 행위' },
    { title: '⑦', content: '범죄와 결부된다고 객관적으로 판단되는 행위' },
    { title: '⑧', content: '기타 관련 법령에 위배되는 행위' }
]

const purchaseDatas9 = [
    { title: '①', content: '본 서비스 및 사이트의 발생한 모든 민, 형법상 책임은 회원 본인에게 1차적으로 있습니다.' },
    { title: '②', content: '본 서비스 및 사이트로부터 회원이 받은 손해가 천재지변 등 불가항력적이거나 회원의 고의 또는 과실로 인하여 발생한 때에는 손해배상을 하지 않습니다.' }
]

const purchaseDatas10 = [
    { title: '①', content: '운영자는 회원이 사이트의 서비스 제공으로부터 기대되는 이익을 얻지 못하였거나 서비스 자료에 대한 취사선택 또는 이용으로 발생하는 손해 등에 대해서는 책임이 면제됩니다.' },
    { title: '②', content: '운영자는 본 사이트의 서비스 기반 및 타 통신업자가 제공하는 전기통신 서비스의 장애로 인한 경우에는 책임이 면제되며 본 사이트의 서비스 기반과 관련되어 발생한 손해에 대해서는 사이트의 이용약관에 준합니다.' },
    { title: '③', content: '운영자는 회원이 저장, 등록 또는 업로드한 자료와 관련하여 일체의 책임을 지지 않습니다.' },
    { title: '④', content: '운영자는 회원의 귀책 사유로 인하여 서비스 이용의 장애가 발생한 경우에는 책임지지 아니합니다.' },
    { title: '⑤', content: '운영자는 회원 상호 간 또는 회원과 제3자 상호 간, 기타 회원의 본 서비스 내외를 불문한 일체의 활동(데이터 전송, 기타 커뮤니티 활동 포함)에 대하여 책임을 지지 않습니다.' },
    { title: '⑥', content: '운영자는 회원이 게시 또는 전송한 자료 및 본 사이트로 회원이 제공받을 수 있는 모든 자료들의 진위, 신뢰도, 정확성 등 그 내용에 대해서는 책임지지 아니합니다.' },
    { title: '⑦', cotnent: '운영자는 회원 상호 간 또는 회원과 제3자 상호 간에 서비스를 매개로 하여 물품거래 등을 한 경우에 그로부터 발생하는 일체의 손해에 대하여 책임지지 아니합니다.' },
    { title: '⑧', content: '운영자는 운영자의 귀책 사유 없이 회원간 또는 회원과 제3자간에 발생한 일체의 분쟁에 대하여 책임지지 아니합니다.' },
    { title: '⑨', content: '운영자는 서버 등 설비의 관리, 점검, 보수, 교체 과정 또는 소프트웨어의 운용 과정에서 고의 또는 고의에 준하는 중대한 과실 없이 발생할 수 있는 시스템의 장애, 제3자의 공격으로 인한 시스템의 장애, 국내외의 저명한 연구기관이나 보안 관련 업체에 의해 대응 방법이 개발되지 아니한 컴퓨터 바이러스 등의 유포나 기타 운영자가 통제할 수 없는 불가항력적 사유로 인한 회원의 손해에 대하여 책임지지 않습니다.' }
]

const TermsOfPurchase = ({ visible, setVisible }) => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!visible) navigate(location.pathname)
    }, [visible])

    const closeModal = useCallback(() => {
        setVisible(false);
    }, []);

    const makeContent = (data, isSub) => {
        return <div className="terms-content"> {data.map((d, ind) => d.subContent ? <React.Fragment key={ind}>
            <div className="padding-div-container">
                <div className="padding-div" style={{ minWidth: d.titleWidth || 20 }}>{d.title}</div>
                <div className="padded-content">{d.content}</div>
            </div>
            {makeContent(d.subContent, true)}
        </React.Fragment>
            : <div key={ind} className={"padding-div-container" + (isSub ? ' sub-container' : '')}>
                <div className="padding-div" style={{ minWidth: d.titleWidth || (isSub ? 10 : 20) }}>{d.title}</div>
                <div className="padded-content">{d.content}</div>
            </div>)}
        </div>
    }

    return (
        <CustomConfirm
            className="terms-modal"
            centered
            maskClosable
            width={800}
            style={{
                maxHeight: 800,
                overflow: "auto",
                justifyContent: "start",
                overflowX: "hidden",
                padding: "0.5rem",
            }}
            visible={visible}
            footer={null}
            cancelCallback={closeModal}
        >
            <p>
                <b>이용약관</b>
            </p>
            <p>
                <b>제1조 목적</b>
            </p>
            <p className="terms-content">
                본 이용약관은 ㈜원모어시큐리티(이하 "회사")가 운영하는
                원모어패스(OMPASS) 어플리케이션(이하 "서비스"), 원모어패스 클라우드
                관리자(관리자 페이지)(이하 "사이트")의 이용조건과 운영에 관한 제반 사항
                규정을 목적으로 합니다.
            </p>
            <p>
                <b>제2조 용어의 정의</b>
            </p>
            <p className="terms-content">본 약관에서 사용되는 주요한 용어의 정의는 다음과 같습니다.</p>
            {makeContent(purchaseDatas1)}
            <p>
                <b>제3조 약관 외 준칙</b>
            </p>
            <p className="terms-content">
                운영자는 필요한 경우 별도로 운영정책을 공지 안내할 수 있으며, 본 약관과
                운영정책이 중첩될 경우 운영정책이 우선 적용됩니다.
            </p>
            <p id="purchaseTarget">
                <b>제4조 이용계약 체결 및 구매조건</b>
            </p>
            {makeContent(purchaseDatas2)}
            <p>
                <b>제5조 청약 철회(환불 규정)</b>
            </p>
            {makeContent(purchaseDatas3)}
            <p>
                <b>제6조 서비스 이용 신청</b>
            </p>
            {makeContent(purchaseDatas4)}
            <p>
                <b>제7조 개인정보처리방침</b>
            </p>
            <p className="terms-content">
                서비스, 사이트 및 운영자는 회원가입 시 제공한 개인정보 중 비밀번호를
                가지고 있지 않으며 이와 관련된 부분은 사이트의 개인정보처리방침을
                따릅니다.
                <br />
                운영자는 관계 법령이 정하는 바에 따라 회원등록정보를 포함한 회원의
                개인정보를 보호하기 위하여 노력합니다.
                <br />
                회원의 개인정보보호에 관하여 관계법령 및 사이트가 정하는
                개인정보처리방침에 정한 바에 따릅니다.
                <br />
                단, 회원의 귀책 사유로 인해 노출된 정보에 대해 운영자는 일체의 책임을
                지지 않습니다.
                <br />
                운영자는 회원이 미풍양속에 저해되거나 국가안보에 위배되는 게시물 등
                위법한 게시물을 등록 · 배포할 경우 관련 기관의 요청이 있을 시 회원의
                자료를 열람 및 해당 자료를 관련 기관에 제출할 수 있습니다.
            </p>
            <p>
                <b>제8조 운영자의 의무</b>
            </p>
            {makeContent(purchaseDatas5)}
            <p>
                <b>제9조 회원의 의무</b>
            </p>
            {makeContent(purchaseDatas6)}
            <p>
                <b>제10조 서비스 이용 시간</b>
            </p>
            {makeContent(purchaseDatas7)}
            <p>
                <b>제11조 서비스 이용 제한</b>
            </p>
            <p className="terms-content">
                회원은 다음 각호에 해당하는 행위를 하여서는 아니 되며 해당 행위를 한
                경우에 사이트는 회원의 서비스 이용 제한 및 적법한 조치를 할 수 있으며
                이용계약을 해지하거나 기간을 정하여 서비스를 중지할 수 있습니다.
            </p>
            {makeContent(purchaseDatas8)}
            <p>
                <b>제12조 손해배상 </b>
            </p>
            {makeContent(purchaseDatas9)}
            <p>
                <b>제13조 면책 </b>
            </p>
            {makeContent(purchaseDatas10)}
            <p>
                <b>부칙</b>
            </p>
            <p className="terms-content">
                이 약관은 2022년 2월 14일 부터 시행합니다.
            </p>
        </CustomConfirm >
    );
};

function mapStateToProps(state) {
    return {
        visible: state.termsOfPurchaseVisible
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setVisible: (toggle) => {
            dispatch(ActionCreators.termsOfPurchaseVisibleChange(toggle));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(TermsOfPurchase, (prev, cur) => {
    if (prev.visible !== cur.visible) return false;
    else return true;
}));