CustomTable 사용법

columns와 datas가 각각 컬럼과 데이터로 셋팅.

// 예시

const columns = [
  { name: '이름', key: 'name' },
  { name: '상태', key: 'status' },
  { name: '디테일', key: 'detail', render: makeDetail}
]

const datas = [
    {name : 'test', status: 'test', detail: any},
    ...
]

columns와 datas는 columns의 key 값과 datas의 키값으로 매칭.
columns의 name은 실제 테이블 상 컬럼명으로 표출할 이름.
columns에 render 키값이 존재할 경우 해당 메소드로 렌더링, 그 외엔 키값 매칭된 datas 표시.

rowClick props를 통해 행 클릭 시 이벤트 처리 가능.