import { ReactNode } from 'react';

export interface SpinSliderProps<T = unknown> {
  /** 슬라이더에 표시할 아이템 배열 */
  items: T[];
  /** 각 아이템을 렌더링하는 함수 */
  renderItem: (item: T, index: number) => ReactNode;
  /** 한 번에 보여줄 아이템 개수 */
  visibleCount?: number;
  /** 양쪽에 보여줄 아이템의 일부 (px) */
  sidePeek?: number;
  /** 자동 재생 여부 */
  autoPlay?: boolean;
  /** 자동 재생 간격 (ms) */
  autoPlayInterval?: number;
  /** 무한 루프 여부 */
  infinite?: boolean;
  /** 페이지네이션 표시 여부 */
  showPagination?: boolean;
  /** 네비게이션 버튼 표시 여부 */
  showNavigation?: boolean;
  /** 스와이프 최소 거리 */
  minSwipeDistance?: number;
  /** 트랜지션 지속 시간 (ms) */
  transitionDuration?: number;
  /** 초기 인덱스 */
  initialIndex?: number;
  /** 스타일 커스터마이징 옵션 */
  styles?: SpinSliderStyles;
  /** 콜백 함수들 */
  callbacks?: SpinSliderCallbacks<T>;
  /** 접근성 관련 속성 */
  accessibility?: SpinSliderAccessibility;
  /** CSS 클래스명 */
  className?: string;
}

export interface SpinSliderStyles {
  /** 트랙 트랜지션 */
  trackTransition?: string;
  /** 네비게이션 버튼 크기 */
  buttonSize?: number;
  /** 페이지네이션 점 크기 */
  paginationDotSize?: number;
  /** 네비게이션 버튼 배경색 */
  buttonBackground?: string;
  /** 네비게이션 버튼 색상 */
  buttonColor?: string;
  /** 활성 페이지네이션 점 색상 */
  activePaginationColor?: string;
  /** 비활성 페이지네이션 점 색상 */
  inactivePaginationColor?: string;
}

export interface SpinSliderCallbacks<T = unknown> {
  /** 슬라이드 변경 시 호출 */
  onSlideChange?: (currentIndex: number) => void;
  /** 아이템 클릭 시 호출 */
  onItemClick?: (item: T, index: number) => void;
  /** 스와이프 시작 시 호출 */
  onSwipeStart?: () => void;
  /** 스와이프 종료 시 호출 */
  onSwipeEnd?: () => void;
  /** 자동 재생 시작 시 호출 */
  onAutoPlayStart?: () => void;
  /** 자동 재생 정지 시 호출 */
  onAutoPlayStop?: () => void;
}

export interface SpinSliderAccessibility {
  /** 슬라이더의 라벨 */
  label?: string;
  /** 이전 버튼 라벨 */
  previousButtonLabel?: string;
  /** 다음 버튼 라벨 */
  nextButtonLabel?: string;
  /** 페이지네이션 라벨 */
  paginationLabel?: string;
}

export interface SpinSliderItemProps<T = unknown> {
  /** 아이템 데이터 */
  item: T;
  /** 아이템 인덱스 */
  index: number;
  /** 아이템 너비 */
  width: number;
  /** 사이드 피크 */
  sidePeek?: number;
  /** 현재 활성 인덱스 */
  currentIndex: number;
  /** 전체 아이템 개수 */
  totalItems: number;
  /** 스와이프 참조 */
  wasSwipedRef: React.RefObject<boolean>;
  /** 클릭 핸들러 */
  onClick?: (item: T, index: number) => void;
  /** 렌더링 함수 */
  renderItem: (item: T, index: number) => ReactNode;
}

export interface SpinSliderPaginationProps {
  /** 전체 아이템 개수 */
  itemsLength: number;
  /** 한 번에 보여줄 아이템 개수 */
  visibleCount: number;
  /** 현재 인덱스 */
  currentIndex: number;
  /** 인덱스 변경 함수 */
  setCurrentIndex: (index: number) => void;
  /** 최대 표시 페이지네이션 개수 */
  maxVisible?: number;
  /** 스타일 옵션 */
  styles?: SpinSliderStyles;
  /** 접근성 옵션 */
  accessibility?: SpinSliderAccessibility;
}

export interface UseSwipeOptions {
  /** 왼쪽 스와이프 핸들러 */
  onSwipeLeft: () => void;
  /** 오른쪽 스와이프 핸들러 */
  onSwipeRight: () => void;
  /** 최소 스와이프 거리 */
  minSwipeDistance?: number;
}

export interface UseSwipeReturn {
  /** 터치 시작 핸들러 */
  handleTouchStart: (e: React.TouchEvent) => void;
  /** 터치 종료 핸들러 */
  handleTouchEnd: (e: React.TouchEvent) => void;
  /** 마우스 다운 핸들러 */
  handleMouseDown: (e: React.MouseEvent) => void;
  /** 마우스 업 핸들러 */
  handleMouseUp: (e: React.MouseEvent) => void;
  /** 마우스 리브 핸들러 */
  handleMouseLeave: () => void;
  /** 키보드 다운 핸들러 */
  handleKeyDown: (e: React.KeyboardEvent) => void;
  /** 마우스 다운 상태 */
  isMouseDown: boolean;
  /** 스와이프 참조 */
  wasSwipedRef: React.RefObject<boolean>;
}
