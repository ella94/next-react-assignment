## Next.js (React) Initial Project Setting

### 1. Create Next App (Javascript, Not Typescript) 생성

원래 아래의 명령어로 실행하나, 프로젝트 제출을 위해 Github Repository 에서 시작합니다.
- _(나중에 혼자 학습할 때) 명령어로 실행할 시 `npx create-next-app`_

#### 과제 : 아래의 Github Repository 에서 Git Clone 을 통해 프로젝트 시작합니다.
```bash
git clone git@github.com:3rd-asac/next-react-tutorial.git
```
- NPM 대신 YARN 을 사용해도 됩니다만, 실제 CI 수행시 (예, Github Action) 캐시 용량 이슈 존재

---

### 2. Typescript 설정 : 과제 확인 파일 **tsconfig.json**

원래는 아래의 명령어를 통해 tsconfig.json 파일을 생성하는것이지만, 본 과제에서는 Github Repository 에서 미리 생성되어 제공
- _(나중에 혼자 학습할 때) 아무것도 없는 상태에서 Typescript 적용하기 `npx tsc --init`_

  - _위 명령어를 통해 tsconfig.json 가 생성된다._
  - _`@type/library` 와 같이 어떤 라이브러리를 사용하거든, 짝궁처럼 `@type/` 설치 필요_

```bash
git checkout 1-typescript
```
#### 과제 : tsconfig.json 파일 각 옵션 파악하기 (미리 제공하는 이유)

#### 과제 : 명시된 옵션들에 대해서 공부 진행 (예) lib 옵션에서의 **eslint** 의 의미는 무엇인가?)

> 자바스크립트는 현재 ES5, ESNext, TypeScript 세 가지 종류가 있다. **2015년 발표된 ES6 이후 버전들을 통틀어 ESNext** 라고 한다. ES6부터 자바스크립트에 큰 변화가 있었기 때문인데, ESNext 는 ES5 의 모든 문법을 포함하고, **TypeScript 는 그런 ESNext 의 모든 문법을 lib 옵션 내 esnext 를 넣음으로써 포함시킬 수 있다**.
      
- **[ESNext 의 주요 문법 알아보기](https://velog.io/@itkdgus489/Typescript%EC%99%80-ESNext%EC%9D%98-%EC%A3%BC%EC%9A%94-%EB%AC%B8%EB%B2%95) !**

- [**타입스크립트 공식 문서**](https://aka.ms/tsconfig.json)에 정리가 다 되어있습니다. 다 알필욘없으니 필요할때만 찾아보세요
  - 한글로도 정리 잘된 블로그들이 있다면 검색하여 참조할 것 ([예시](https://it-eldorado.tistory.com/128))

#### 과제 : `@type/library` 와 같이 어떤 라이브러리를 사용하거든, 짝궁처럼 `@type/` 설치 필요

#### 과제 : 왜? `**@type/**` 가 package.json 의 devDependencies 내에 설치해야하는지 공부하기

- NPM or YARN 설치시 `-D` 혹은 `--save` 옵션을 통해 설치해야한다
- 앞으로 ESLint, Prettier 모두 동일

참조 : Babel 과 Typescript 동시에 쓰기 (Typescript 설정 중 noEmit : true 설정하면 됨)

- 둘중 어떤걸 써야할까? 같이써도되는가? [**어떻게 결정**](https://typescript-kr.github.io/pages/tutorials/babel-with-typescript.html)할것인가? ([**TS 원본**](https://www.typescriptlang.org/docs/handbook/babel-with-typescript.html))
  - 빌드 출력 결과와 소스 입력 파일이 거의 비슷한가요? `tsc`를 사용하세요.
    - 여러 잠재적인 결과물을 내는 빌드 파이프라인이 필요하신가요?
      - `babel`로 트랜스파일링을 하고, `tsc`로는 타입만 검사하세요.

---

### 3. ESLint 설정 : 과제 확인 파일 .eslintrc.json + package.json

#### 과제 : package.json 에 ESLint 를 올바르게 설치

#### 과제 : .eslintrc.json 에 들어가는 옵션들에 대한 학습 및 적용
- Playground 으로 테스트 가능 = https://prettier.io/
- **너무 많은 옵션들이 있어서, 어떻게 해야 깔끔하게 정리할 수 있을지 팀/동료와 논의할 것 :** extends, plugins, rules, globals, overrides, ignorePatterns, parserOptions, parser, env, root 등

**참조 : plugins, extends 와 rules 이 거의 기본으로 사용됨**

---

### 4. Prettier 설정 : 과제 확인 파일 .prettierrc + package.json

#### 과제 : package.json 에 ESLint 를 올바르게 설치
#### 과제 :** .prettierrc 에 들어가는 옵션들에 대한 **학습 및 적용**
        - Playground 으로 테스트 가능 = https://eslint.org/play/
**중요 : ESLint 와 Prettier 가 충돌하지 않게 적용할 것 ([참고](https://yrnana.dev/post/2021-03-21-prettier-eslint/)) + 학습 필수**

---

### 5. 트랜스파일러 (컴파일러) : ~~Babel (트랜스파일러) 설정~~
- 과제에 진행하고싶었으나 공식 React 문서에서 Next.js 를 통해 Create App 할것을 추천하였고
- **Create Next App 및 앞으로 사용할것들은 Next 13 버전이기에 Babel 이 아닌 SWC 사용**
  - SWC 에선 Babel 쓸때 설정하는 Terser 같은것도 필요없이 자체 Minify 성능이 뛰어남

---

### 6. 모듈 번들러 : Webpack 설정 : 과제 확인 파일 next.config.js

Next 13 부터 Turbopack 이 도입되긴하였으나 여전히 Beta (Experimental) 이기에 미사용

Next 13 에선 여전히 현재도 Webpack 사용 중
  - 거의 대다수의 유효 설정들(Loader, Plugins)은 Next 가 이미 설정해놓아 우리가 할게 없음

#### 과제 : SVG 아이콘 지원을 위해 Webpack 설정하기 + 아무 SVG Icon(.svg) 메인에 띄우기

---

### 7. Tailwind CSS 적용 : 과제 확인 파일 tailwind.config.js

#### 과제 : 원하는 커스텀 설정이 있다면 추가할 것

#### 과제 : 올바른 content 설정으로 사용한 유틸리티 클래스들이 올바르게 Purge 될 수 있게할것

---

### 8. 원하는 프로젝트 클론 코딩 진행

#### 사이드 팀 프로젝트 진행 시
#### 과제 : 클론하기로 결정한 서비스의 클론 진행 (페이지 나누어)

- 만약, 한 팀 내 5명이 있다면 각각 페이지 단위로 나누어 작업하며 각자 제출
- **주의 : 제출은 팀 단위가 아닌 개인 단위**

#### 사이드 팀 프로젝트 미진행 시
#### 과제 : 개인별로 클론할 서비스 결정 후 클론 진행
- 지정하기 힘든 경우, 첫 주 과제였던 **원티드** 로 진행
- 이원저 원티 과제에서는 **HTML + CSS** 으로 진행이었으나, 이번엔 **React** 로 진행






