/**
 * 페이지네이션에서 보여줄 페이지들을 계산합니다.
 * @param totalPages 전체 페이지 수
 * @param currentPage 현재 페이지
 * @param maxVisible 최대 표시할 페이지 수
 * @returns 표시할 페이지 인덱스 배열
 */
export declare const getVisiblePages: (totalPages: number, currentPage: number, maxVisible: number) => number[];
/**
 * 렌더링할 아이템의 범위를 계산합니다.
 * @param currentIndex 현재 인덱스
 * @param visibleCount 보여줄 아이템 개수
 * @param totalItems 전체 아이템 개수
 * @param overscanMultiplier 오버스캔 배수
 * @returns 렌더링할 시작과 끝 인덱스
 */
export declare function getRenderRange(currentIndex: number, visibleCount: number, totalItems: number, overscanMultiplier?: number): {
    startIndex: number;
    endIndex: number;
};
/**
 * 다음 인덱스를 계산합니다.
 * @param currentIndex 현재 인덱스
 * @param visibleCount 보여줄 아이템 개수
 * @param totalItems 전체 아이템 개수
 * @param infinite 무한 루프 여부
 * @returns 다음 인덱스
 */
export declare const getNextIndex: (currentIndex: number, visibleCount: number, totalItems: number, infinite?: boolean) => number;
/**
 * 이전 인덱스를 계산합니다.
 * @param currentIndex 현재 인덱스
 * @param visibleCount 보여줄 아이템 개수
 * @param totalItems 전체 아이템 개수
 * @param infinite 무한 루프 여부
 * @returns 이전 인덱스
 */
export declare const getPreviousIndex: (currentIndex: number, visibleCount: number, totalItems: number, infinite?: boolean) => number;
/**
 * 인덱스가 유효한지 확인합니다.
 * @param index 확인할 인덱스
 * @param visibleCount 보여줄 아이템 개수
 * @param totalItems 전체 아이템 개수
 * @returns 유효한 인덱스인지 여부
 */
export declare const isValidIndex: (index: number, visibleCount: number, totalItems: number) => boolean;
/**
 * 현재 페이지를 계산합니다.
 * @param currentIndex 현재 인덱스
 * @param visibleCount 보여줄 아이템 개수
 * @returns 현재 페이지
 */
export declare const getCurrentPage: (currentIndex: number, visibleCount: number) => number;
/**
 * 전체 페이지 수를 계산합니다.
 * @param totalItems 전체 아이템 개수
 * @param visibleCount 보여줄 아이템 개수
 * @returns 전체 페이지 수
 */
export declare const getTotalPages: (totalItems: number, visibleCount: number) => number;
//# sourceMappingURL=carousel.d.ts.map