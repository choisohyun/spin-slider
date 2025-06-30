// 메인 컴포넌트
export { SpinSlider } from './components/SpinSlider';
export { SpinSliderItem } from './components/SpinSliderItem';
export { SpinSliderPagination } from './components/SpinSliderPagination';

// 훅
export { useSwipe } from './hooks/useSwipe';

// 유틸리티
export {
  getVisiblePages,
  getRenderRange,
  getNextIndex,
  getPreviousIndex,
  isValidIndex,
  getCurrentPage,
  getTotalPages,
} from './utils/carousel';

// 타입
export type {
  SpinSliderProps,
  SpinSliderItemProps,
  SpinSliderPaginationProps,
  SpinSliderStyles,
  SpinSliderCallbacks,
  SpinSliderAccessibility,
  UseSwipeOptions,
  UseSwipeReturn,
} from './types';

// 기본 export
import { SpinSlider } from './components/SpinSlider';
export default SpinSlider;
