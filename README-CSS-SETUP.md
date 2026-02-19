# CSS 프로젝트 세팅 계획

다른 환경에서 이어서 작업할 때 참고하는 문서입니다. 기본 HTML/CSS/JS 프로젝트의 CSS 구조와 규칙을 정리했습니다.
 
---

## 1. 전체 구조

- **기본 HTML/CSS/JS 프로젝트**
- CSS 파일 구성:
  1. **디자인 토큰** (`css/tokens.css`) — 공통 변수 (색상, 간격, 타이포, 그림자 등)
  2. **공통** (`css/common.css`) — 리셋, body 기본, 공통 유틸
  3. **실제 스타일** (`css/styles.css`) — 페이지별 스타일, 미디어쿼리

### HTML에서 로드 순서

반드시 아래 순서로 링크합니다.

```html
<link rel="stylesheet" href="css/tokens.css">
<link rel="stylesheet" href="css/common.css">
<link rel="stylesheet" href="css/styles.css">
```

---

## 2. 디자인 토큰 (tokens.css)

- **역할:** Figma 등 디자인 시안에서 나온 공통 변수를 `:root`에 정의
- **내용:** 색상, 간격(spacing), 타이포그래피, 그림자, 브레이크포인트(참고용)
- **작업:** 추후 Figma 시안 전달 시 해당 값으로 채우거나, `node scripts/figma-to-css.js` 실행 (FIGMA_ACCESS_TOKEN 필요)

---

## 3. 공통 스타일 (common.css)

- **리셋:** `box-sizing`, margin/padding 0, html `text-size-adjust`, img/미디어, input/button/textarea/select, a, ul/ol
- **button 리셋:** `cursor: pointer`, `background: none`, `border: none` (공통 유틸과 분리)
- **body 기본:** font-family, font-size 16px, line-height 1.5, color, background
- **공통 유틸:** `.sr-only`, `.flex`, `.flex-wrap`, `.items-center`, `.justify-center`, `.justify-between`, `.gap-1`~`.gap-6`, `.hidden`, `.clearfix`

---

## 4. 실제 스타일 + 미디어쿼리 (styles.css)

- **접근:** PC 퍼스트, **max-width**만 사용
- **브레이크포인트:**

| 구간        | 뷰포트              | 미디어쿼리 |
|------------|---------------------|------------|
| PC         | 1200px 이상          | 없음 (기본 스타일) |
| 태블릿     | 561px ~ 1199px      | `@media (max-width: 1199px)` |
| 모바일     | 560px 이하          | `@media (max-width: 560px)` |

- **작성 규칙:** 기본 스타일을 PC 기준으로 두고, 태블릿/모바일에서 max-width로 덮어쓰기
- 공통 컴포넌트(예: 버튼 `.btn`)는 이 파일에 정의하고, 필요 시 토큰 변수(`var(--color-*)`, `var(--space-*)`) 참조

---

## 5. 브레이크포인트 다이어그램

```
[ PC: 1200px 이상 (기본) ]  →  [ 태블릿: max-width 1199px ]  →  [ 모바일: max-width 560px ]
```

---

## 6. 다른 환경에서 이어서 작업할 때

1. **CSS 파일 순서** — `tokens.css` → `common.css` → `styles.css` 유지
2. **새 페이지 스타일** — `styles.css`에 PC 스타일 먼저, 그다음 `@media (max-width: 1199px)`, `@media (max-width: 560px)` 블록에 추가
3. **디자인 토큰 추가** — `tokens.css`의 `:root`에 변수 추가 후, `styles.css`/`common.css`에서 `var(--변수명)` 사용
4. **Figma 연동** — `FIGMA_ACCESS_TOKEN` 설정 후 `node scripts/figma-to-css.js` 실행 시 tokens/버튼이 Figma 값으로 갱신됨 (스크립트 사용 시 `scripts/README.md` 참고)
