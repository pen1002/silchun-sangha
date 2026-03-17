# 실천불교전국승가회 홈페이지

> **수행과 실천, 정토사회를 향하여** — Since 1992

## 📁 프로젝트 폴더 구조

```
silchun/
├── index.html              ← 메인 홈페이지 (싱글 HTML)
├── README.md               ← 이 문서
│
├── css/                    ← 추후 CSS 분리용
├── js/                     ← 추후 JS 분리용
├── images/                 ← 이미지 리소스
├── fonts/                  ← 커스텀 폰트
│
└── content/                ← ★ NotebookLM 생성 콘텐츠 폴더
    ├── slides/             ← 슬라이드 (프레젠테이션)
    ├── quiz/               ← 퀴즈 (학습 평가)
    ├── qna/                ← Q&A (질의응답)
    ├── flashcards/         ← 플래시카드 (암기 학습)
    ├── mindmaps/           ← 마인드맵
    ├── infographic/        ← 인포그래픽
    ├── reports/            ← 보고서
    ├── data-tables/        ← 데이터 표
    ├── video-summaries/    ← 동영상 개요
    │
    ├── archive/            ← 아카이브 자료 (성명서, 결의문, 사진)
    ├── news/               ← 소식/보도자료
    └── activities/         ← 실천활동 기록
```

## 🗺️ 사이트 구조 매핑 (IA)

| 참여연대 원본 | 승가회 매핑 | 설명 |
|---|---|---|
| 참여연대 소개 | **승가회 소개** (어제와 오늘) | 연혁, 설립취지, 역대대표, 조직도, '94 종단개혁 연표 |
| 뉴스 | **소식** (승가의 목소리) | 성명서, 보도자료, 회원소식 통합 |
| 활동 | **실천 활동** (역동적인 연대) | 연대사업, 시민사회 협업, 평화통일 |
| 참여 | **연대와 참여** (현장 네트워크) | 회원가입, 후원, 봉사, 사찰 실천사례 |
| 자료실 | **아카이브** (시대의 기록) | 디지털 사료관, 연도별 타임라인 |
| 후원 | **후원/지원** (미래를 향한 동행) | 후원절차, 재정정보 공개 |
| — | **스튜디오** (학습 콘텐츠) | NotebookLM 생성 콘텐츠 |

## 🎨 컬러 팔레트

| 색상명 | HEX | 용도 |
|---|---|---|
| 짙은 단청 적색 | `#8B2500` | 메뉴바, 핵심 버튼, 액센트 |
| 녹청색 | `#2D5016` | 보조 액센트 |
| 먹색 | `#1A1A1A` | 본문 텍스트, 상단바 |
| 온먹색 | `#2C2824` | 푸터 배경 |
| 절제된 금색 | `#B8860B` | 타임라인, 강조 |
| 연꽃빛 회색 | `#F5F2ED` | 섹션 배경 |
| 한지 백색 | `#FAFAF7` | 메인 배경 |
| 석탑 회색 | `#9B958D` | 보조 텍스트 |
| 심해 남색 | `#1B2838` | 타임라인 섹션 배경 |
| 녹청 액센트 | `#2A6B5E` | 연대 태그 |

## 📋 NotebookLM 콘텐츠 가이드

### content/slides/
슬라이드 파일을 여기에 저장합니다.
- 형식: HTML, PDF, 또는 이미지 시퀀스
- 예시: `history-overview.html`, `reform-1994.pdf`

### content/quiz/
퀴즈 콘텐츠를 여기에 저장합니다.
- 형식: JSON 또는 HTML
- 예시: `sangha-history-quiz.json`, `reform-quiz.html`

### content/qna/
Q&A 콘텐츠를 여기에 저장합니다.
- 형식: JSON 또는 Markdown
- 예시: `founding-qna.md`, `activities-faq.json`

### content/flashcards/
플래시카드 콘텐츠를 여기에 저장합니다.
- 형식: JSON
- 예시: `key-dates.json`, `key-figures.json`

### content/infographic/
인포그래픽을 여기에 저장합니다.
- 형식: SVG, PNG, HTML
- 예시: `timeline-infographic.svg`

### content/reports/
보고서를 여기에 저장합니다.
- 형식: PDF, DOCX, HTML

### content/data-tables/
데이터 표를 여기에 저장합니다.
- 형식: CSV, JSON, HTML

### content/video-summaries/
동영상 개요를 여기에 저장합니다.
- 형식: Markdown, JSON

### content/mindmaps/
마인드맵을 여기에 저장합니다.
- 형식: JSON, SVG, HTML

## 🔧 기술 스택

- **프레임워크**: Vanilla HTML/CSS/JS (의존성 없음)
- **폰트**: Noto Serif KR + Noto Sans KR + Crimson Pro (Google Fonts)
- **디자인**: 참여연대 그리드 + 절제된 불교 미학
- **반응형**: 모바일/태블릿/PC 완벽 지원
- **접근성**: WCAG 2.1 AA 준수

## 🚀 배포

```bash
# Git 초기화 및 푸시
git init
git add -f index.html
git add README.md content/
git commit -m "feat: 실천불교전국승가회 홈페이지 초기 구축"
git remote add origin https://github.com/[username]/silchun-sangha.git
git push -u origin main
```

### Vercel 배포
1. Vercel에서 GitHub 레포 연결
2. Root Directory: 비워두기
3. 자동 빌드 및 배포

## 💾 데이터 보존 원칙 (핵심)

1. **버전 관리**: 모든 수정 전 이전 버전 아카이빙
2. **즉시 복구**: 롤백 가능한 백업 체계
3. **무결점 데이터 보존**: 시스템 개편 시 데이터 무결성 보장
4. **모바일 UI 최적화**: 항상 보존
