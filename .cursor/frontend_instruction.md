# project-overview

이 프로젝트는 개인이 관리할 수 있는 TODO List 웹 애플리케이션을 개발하는 것을 목표로 합니다.
Vue(Composition API)를 기반으로 구현하며, LocalStorage를 활용해 데이터가 새로고침 후에도 유지되도록 합니다.

# feature-requirements

### 1. TODO 등록

- **사용자 동작:**  
  사용자는 제목(필수)과 내용을 입력해 새로운 TODO를 추가할 수 있습니다.
- **기능 상세:**
  - 제목 필수 입력, 공백만 입력 시 등록 불가 (`trim` 검증)
  - 내용은 선택 입력(최대 500자)
  - 중복된 제목 등록 가능
  - 기본값 설정:
    - 마감일: 선택하지 않으면 ‘없음’
    - 우선순위: ‘보통’
  - 등록 후 입력 필드 초기화 및 제목 필드로 포커스 이동
  - 등록 즉시 LocalStorage에 데이터 저장
- **사용 기술:** Vue(Composition API), reactive 상태 관리, LocalStorage 동기화

---

### 2. TODO 목록 조회

- **사용자 동작:**  
  사용자는 등록된 TODO 목록을 확인하고, 원하는 기준으로 정렬하거나 필터링할 수 있습니다.
- **기능 상세:**
  - 전체 TODO 목록 표시
  - 완료 항목과 미완료 항목을 시각적으로 구분 (취소선, 회색 처리 등)
  - 마감일 임박 항목 D-day 배지 표시
  - 필터 기능: 완료/미완료, 우선순위별 보기
  - LocalStorage 데이터 로드 시 null/undefined 예외 처리
- **사용 기술:** Vue computed 속성, reactive 배열 관리, LocalStorage 데이터 파싱

---

### 3. TODO 수정

- **사용자 동작:**  
  사용자는 기존 TODO 항목의 제목이나 내용을 수정할 수 있습니다.
- **기능 상세:**
  - 수정 버튼 클릭 시 수정 모드 진입 (input/textarea 전환)
  - 제목 공백 검증 (등록과 동일한 로직 적용)
  - 수정 완료 시 즉시 상태 반영 및 LocalStorage 업데이트
  - 수정 취소 시 원래 데이터 복원
- **사용 기술:** Vue ref/reactive 데이터 바인딩, LocalStorage 동기화

---

### 4. TODO 삭제

- **사용자 동작:**  
  사용자는 불필요한 TODO 항목을 삭제할 수 있습니다.
- **기능 상세:**
  - 삭제 전 확인 모달 표시
  - 삭제 후 상태 및 LocalStorage 동기화
  - 목록이 비면 “할 일이 없습니다” 안내 표시
  - 삭제 실패 시 alert 형태의 에러 메시지 표시
- **사용 기술:** Vue 상태 관리, composable 모달 컴포넌트, LocalStorage 업데이트

---

### 5. 마감 기한 설정

- **사용자 동작:**  
  사용자는 각 TODO에 마감일을 설정할 수 있습니다.
- **기능 상세:**
  - 오늘 이전 날짜는 선택 불가
  - 입력 형식 검증 (YYYY-MM-DD)
  - 마감일 지난 TODO는 “지연 상태”로 표시
- **사용 기술:** Vue computed 속성, dayjs 또는 date-fns 활용

---

### 6. 우선순위 설정

- **사용자 동작:**  
  사용자는 TODO의 중요도를 높음/보통/낮음으로 설정할 수 있습니다.
- **기능 상세:**
  - 기본값: “보통”
  - 선택 가능한 등급: 높음 / 보통 / 낮음
  - 시각적 구분 (색상 또는 아이콘으로 표시)
  - 목록 정렬 시 우선순위 기준 적용 가능
- **사용 기술:** Vue props/class 바인딩, 동적 스타일링

---

### 7. 완료 처리

- **사용자 동작:**  
  사용자는 TODO를 완료 또는 미완료 상태로 전환할 수 있습니다.
- **기능 상세:**
  - 완료 버튼 클릭 시 상태 토글 (완료 ↔ 미완료)
  - 완료 항목 시각적 구분 (취소선, 회색 처리)
  - 완료일(timestamp) 기록
  - 상태 변경 시 LocalStorage 자동 동기화
- **사용 기술:** Vue 이벤트 핸들링, reactive 상태 업데이트, LocalStorage 연동

---

### 8. 공통 및 UI·UX 세부 사항

- **입력 유효성 검사:** 제목 필수, 글자 수 제한
- **오류 처리 UX:** alert 대신 toast 또는 inline 메시지 사용
- **접근성(Accessibility):** aria-label 제공, 키보드 포커스 이동 제어
- **데이터 영속성:** 모든 상태 변화 시 LocalStorage 즉시 반영

---

# current-file-instruction

├── .vscode/ # VSCode 설정 파일
├── node_modules/ # 의존성 모듈
├── public/ # 정적 리소스 (빌드 시 그대로 복사)
├── src/ # 소스 코드 디렉토리
│ ├── assets/ # 정적 자원 (CSS, 이미지 등)
│ │ ├── base.css
│ │ ├── logo.svg
│ │ └── main.css
│ │
│ ├── components/ # 재사용 가능한 Vue 컴포넌트
│ │ ├── tests/ # 컴포넌트 단위 테스트
│ │ │ └── HelloWorld.spec.ts
│ │ ├── icons/ # 아이콘 관련 컴포넌트
│ │ │ ├── IconCommunity.vue
│ │ │ ├── IconDocumentation.vue
│ │ │ ├── IconEcosystem.vue
│ │ │ ├── IconSupport.vue
│ │ │ └── IconTooling.vue
│ │ ├── HelloWorld.vue
│ │ ├── TheWelcome.vue
│ │ └── WelcomeItem.vue
│ │
│ ├── App.vue # 최상위 루트 컴포넌트
│ └── main.ts # 애플리케이션 진입점
│
├── .gitattributes # Git 속성 설정
├── .gitignore # Git 제외 파일 목록
├── index.html # 애플리케이션 HTML 진입 파일
│
├── package.json # 프로젝트 의존성 및 스크립트
├── pnpm-lock.yaml # 패키지 버전 잠금 파일
│
├── tsconfig.json # TypeScript 기본 설정
├── tsconfig.app.json # 앱용 TS 설정
├── tsconfig.node.json # Node 관련 TS 설정
├── tsconfig.vitest.json # 테스트 관련 TS 설정
│
├── vite.config.ts # Vite 빌드 및 개발 서버 설정
├── vitest.config.ts # Vitest 테스트 환경 설정
├── eslint.config.ts # ESLint 설정
├── .editorconfig # 코드 스타일 가이드
├── .prettierrc.json # Prettier 포맷팅 설정
└── README.md # 프로젝트 설명 문서

| 구분                  | 설명                                                     |
| --------------------- | -------------------------------------------------------- |
| **src/assets/**       | CSS, 이미지 등 정적 리소스 관리                          |
| **src/components/**   | 재사용 가능한 Vue 컴포넌트                               |
| **App.vue / main.ts** | 애플리케이션 진입점 및 루트 컴포넌트                     |
| **tests**             | 컴포넌트별 단위 테스트 (Vitest 사용)                     |
| **config files**      | ESLint, Prettier, TypeScript, Vite 등 프로젝트 설정 파일 |

# rules

- 모든 새로운 컴포넌트는 특별히 명시되지 않는 한 /src/components에 생성되어야 하며 파일명은 파스칼 케이스 규칙을 따른다.
