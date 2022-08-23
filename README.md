## ERD 설계
![image](https://user-images.githubusercontent.com/81298415/186118446-f0253e77-d200-4520-8256-06cd7e31e087.png)
하나의 회사는 N개의 채용공고를 등록할 수 있다. (회사와 채용공고 1:N)

한 명의 사용자는 N개의 채용공고에 지원할 수 있다. (사용자와 채용공고 1:N)

하나의 채용공고는 N명의 사용자에게 지원될 수 있다. (채용공고와 사용자 1:N)

사용자와 채용공고는 N:M 관계이므로 지원내역이라는 테이블을 중간 관계 테이블로 두고 1:N, N:1 관계로 풀어서 설계했습니다.

## 기술
- Framework: Nest.js
- ORM: TypeORM
- RDBMS: MySQL


## API 구현
### 채용공고 등록 API
예시 JSON 포맷을 보고 포맷에 따른 CreateAnnouncementDTO 클래스로 Body 데이터의 요청을 받아서 구현
회사_id로 회사 Entity를 먼저 조회해 오고, 요청 DTO와 조회한 회사 Entity로 채용공고 Entity를 만들어 DB에 저장했습니다.

### 채용공고 수정 API
예시 JSON 포맷을 보고 포맷에 따른 UpdateAnnouncementDTO 클래스로 Body 데이터의 요청을 받아서 구현
수정할 채용 공고를 조회해 오고 DTO의 값이 undefined가 아닌지 확인하여 undefined인 값들만 채용 공고에서 수정되도록 구현했습니다.

### 채용공고 삭제 API
삭제 대상의 id를 받아서 DB에서 삭제처리 했습니다.

### 채용공고 목록 API
TypeORM의 find() 메서드를 사용하여 구현했습니다.
채용 공고와 연관된 회사 정보는 find() 메서드의 relations 옵션을 설정하여 조회했습니다.
응답 JSON 포맷을 맞추기 위해서 ListDetailAnnouncementDTO를 만들어서 설정하여 응답하는 방식으로 구현했습니다.

### 채용 상세 페이지 API
TypeORM의 findOne() 메서드를 사용하여 구현했습니다.
채용 공고와 연관된 회사 정보는 findOne() 메서드의 relations 옵션을 설정하여 조회했습니다.
회사가 올린 다른 채용공고는 회사_id를 가지고 findById() 메서드로 모든 채용 공고를 DB에서 조회해 오고 
filter() 메서드로 동일한 채용 공고는 필터링하여 DetailAnnouncementDTO에 값을 설정하여 응답하는 방식으로 구현했습니다.

### 사용자 채용공고 지원 API
채용공고_id와 사용자_id를 body로 받아서 중간 테이블인 지원내역 데이터에 저장하는 방식으로 구현했습니다.
