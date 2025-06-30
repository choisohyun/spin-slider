/**
 * 페이지네이션에서 보여줄 페이지들을 계산합니다.
 * @param totalPages 전체 페이지 수
 * @param currentPage 현재 페이지
 * @param maxVisible 최대 표시할 페이지 수
 * @returns 표시할 페이지 인덱스 배열
 */
export const getVisiblePages = (totalPages: number, currentPage: number, maxVisible: number): number[] => {
  if (totalPages <= maxVisible) {
    return Array.from({ length: totalPages }, (_, i) => i);
  }

  const half = Math.floor(maxVisible / 2);
  const start = Math.max(0, Math.min(currentPage - half, totalPages - maxVisible));
  const end = Math.min(start + maxVisible - 1, totalPages - 1);

  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};

/**
 * 렌더링할 아이템의 범위를 계산합니다.
 * @param currentIndex 현재 인덱스
 * @param visibleCount 보여줄 아이템 개수
 * @param totalItems 전체 아이템 개수
 * @param overscanMultiplier 오버스캔 배수
 * @returns 렌더링할 시작과 끝 인덱스
 */
export function getRenderRange(
  currentIndex: number,
  visibleCount: number,
  totalItems: number,
  overscanMultiplier = 1,
): { startIndex: number; endIndex: number } {
  const overscan = visibleCount * overscanMultiplier;
  const startIndex = Math.max(0, currentIndex - overscan);
  const endIndex = Math.min(totalItems, currentIndex + visibleCount + overscan);
  return { startIndex, endIndex };
}

/**
 * 다음 인덱스를 계산합니다.
 * @param currentIndex 현재 인덱스
 * @param visibleCount 보여줄 아이템 개수
 * @param totalItems 전체 아이템 개수
 * @param infinite 무한 루프 여부
 * @returns 다음 인덱스
 */
export const getNextIndex = (
  currentIndex: number,
  visibleCount: number,
  totalItems: number,
  infinite = false,
): number => {
  if (infinite) {
    return (currentIndex + visibleCount) % totalItems;
  }
  return Math.min(totalItems - visibleCount, currentIndex + visibleCount);
};

/**
 * 이전 인덱스를 계산합니다.
 * @param currentIndex 현재 인덱스
 * @param visibleCount 보여줄 아이템 개수
 * @param totalItems 전체 아이템 개수
 * @param infinite 무한 루프 여부
 * @returns 이전 인덱스
 */
export const getPreviousIndex = (
  currentIndex: number,
  visibleCount: number,
  totalItems: number,
  infinite = false,
): number => {
  if (infinite) {
    return currentIndex === 0 ? totalItems - visibleCount : Math.max(0, currentIndex - visibleCount);
  }
  return Math.max(0, currentIndex - visibleCount);
};

/**
 * 인덱스가 유효한지 확인합니다.
 * @param index 확인할 인덱스
 * @param visibleCount 보여줄 아이템 개수
 * @param totalItems 전체 아이템 개수
 * @returns 유효한 인덱스인지 여부
 */
export const isValidIndex = (index: number, visibleCount: number, totalItems: number): boolean => {
  return index >= 0 && index <= totalItems - visibleCount;
};

/**
 * 현재 페이지를 계산합니다.
 * @param currentIndex 현재 인덱스
 * @param visibleCount 보여줄 아이템 개수
 * @returns 현재 페이지
 */
export const getCurrentPage = (currentIndex: number, visibleCount: number): number => {
  return Math.floor(currentIndex / visibleCount);
};

/**
 * 전체 페이지 수를 계산합니다.
 * @param totalItems 전체 아이템 개수
 * @param visibleCount 보여줄 아이템 개수
 * @returns 전체 페이지 수
 */
export const getTotalPages = (totalItems: number, visibleCount: number): number => {
  return Math.ceil(totalItems / visibleCount);
};
