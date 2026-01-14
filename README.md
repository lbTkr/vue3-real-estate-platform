| Reference: serve.co.kr(구조/기능 참고)


## 1) 추천 폴더 구조
src/
    app/
        AppLayout.vue
        router/
        index.js
        routes.public.js
        routes.admin.js
        guards.js
        store/
        index.js
    assets/
        styles/
        _variables.scss
        _mixins.scss
        _reset.scss
        main.scss
        images/
    components/
        common/
        TheHeader.vue
        TheFooter.vue
        AppToasts.vue
        AppModalHost.vue
        BaseButton.vue
        BaseInput.vue
        BaseSelect.vue
        BaseChip.vue
        BaseSkeleton.vue
        listing/
        ListingCard.vue
        ListingGrid.vue
        ListingCarousel.vue
        FavoriteButton.vue
        PriceTag.vue
        Badge.vue
        filters/
        FilterPanel.vue
        ActiveFilterChips.vue
        PriceRange.vue
        RoomTypeChips.vue
        OptionsCheckboxGroup.vue
        SortDropdown.vue
        detail/
        ImageGallery.vue
        LightboxModal.vue
        DetailSummaryCard.vue
        TabNav.vue
        LocationMap.vue
        InquiryStickyBar.vue
        map/
        MapView.vue
        MapPins.vue
    pages/
        HomePage.vue
        ListPage.vue
        DetailPage.vue
        FavoritesPage.vue
        ComparePage.vue
        auth/
        LoginPage.vue
        SignupPage.vue
        admin/
        AdminDashboardPage.vue
        AdminListingsPage.vue
        AdminUsersPage.vue
    services/
        apiClient.js
        listingsApi.js
        geocodeApi.js
    mocks/
        listings.mock.json
    utils/
        format.js
        storage.js
        query.js
    main.js

| 포인트:

“페이지”는 pages/에, 재사용 UI는 components/에

Store/Router는 app/ 아래로 모아두면 규모 커져도 덜 꼬입니다.


## 2) 라우터 설계 (Routes)
src/app/router/index.js 개념
Public + Admin routes를 분리해서 합치기

beforeEach에서 인증/권한(선택) 처리

ListPage는 query string 기반(/list?keyword=...&min=...)으로 필터 상태 유지

권장 라우트
/ → Home

/list → List (필터/정렬/query)

/detail/:id → Detail

/favorites → Favorites

/compare → Compare(선택)

/auth/login, /auth/signup (선택)

/admin/... (선택)

List 페이지 필터를 query로 유지하면 좋아요

새로고침해도 상태 유지

공유 링크 가능

watch(route.query) / watch(filtersStore) 같은 실전 패턴 연습 가능

## 3) Pinia Store 설계 (파일명 + 역할)
txt
코드 복사
src/app/store/
index.js
src/stores/
listings.store.js
filters.store.js
favorites.store.js
ui.store.js
listings.store.js
state: items, selected, loading, error, lastQuery

actions:

fetchList(query) (서버/목데이터 호출)

fetchOne(id)

getters:

getById

(목데이터면) filteredAndSortedItems도 여기 or filters에서 처리

filters.store.js
state:

keyword

priceMin, priceMax

depositMin, depositMax (전/월세면)

roomTypes[] (원룸/투룸/오피스텔/아파트)

options[] (주차/엘베/반려동물/풀옵션…)

sort ("recent" | "priceAsc" | "priceDesc" | "areaDesc")

page, pageSize

actions:

reset()

setFromRoute(routeQuery)

toRouteQuery()

favorites.store.js
state: ids[]

actions: toggle(id), remove(id), load(), save()

플러그인(선택): pinia-plugin-persistedstate로 자동 저장

ui.store.js
state: toastQueue, modal, drawerOpen

actions: toast(), openModal(), closeModal()

