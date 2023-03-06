# 페이지 라우팅/렌더링 방식

- TTFB, FCP 등을 비교할 수도 있지만, 상황과 설계에 따라 달라질 수 있어 딱 잘라 비교하기엔 의미가 크지 않다.

## SSR(Server Side Rendering)

![SSR](https://miro.medium.com/max/1400/1*jJkEQpgZ8waQ5P-W5lhxuQ.webp)

- 일부 블로그, 홈페이지 웹사이트, PHP/JAVA 서버 사이드 템플릿 엔진
- 예시 설명
- `완성된 HTML`
- 화면 깜빡임 있음, 초기 용량 작음
- 서버 부하 위험, 보안 유리
- SEO에 좋음


## CSR(Client Side Rendering)

![CSR](https://miro.medium.com/max/1400/1*CRiH0hUGoS3aoZaIY4H2yg.webp)

- CRA(create-react-app)
- 예시 설명
- `<div id="root" />`
- 화면 깜빡임 없음, 초기 용량 큼
- js 캐시 가능, 보안에 취약
- (상대적으로) SEO에 제약

## SSG(Static Site Generation)

- pre-rendering: Static한 HTML을 **build time**에 미리 만들어 둠 (SSR은 **request time**에)
- 서버 부하 없음, HTML 캐시 가능, SEO에 좋음
- 정적인 사이트에 사용
- 예시 설명
