import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { useRef, useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';

/**
 * 터치, 마우스, 키보드 스와이프 기능을 제공하는 훅
 */
const useSwipe = ({ onSwipeLeft, onSwipeRight, minSwipeDistance = 50 }) => {
    const startRef = useRef(null);
    const isMouseDownRef = useRef(false);
    const wasSwipedRef = useRef(false);
    /**
     * 시작점과 현재점의 차이를 계산합니다.
     */
    const getDelta = (x, y) => {
        if (!startRef.current) {
            return { deltaX: 0, deltaY: 0 };
        }
        return {
            deltaX: x - startRef.current.x,
            deltaY: y - startRef.current.y,
        };
    };
    /**
     * 스와이프 방향을 판단하고 적절한 핸들러를 호출합니다.
     */
    const handleSwipe = (deltaX) => {
        if (Math.abs(deltaX) <= minSwipeDistance) {
            return;
        }
        wasSwipedRef.current = true;
        if (deltaX < 0) {
            onSwipeLeft();
        }
        else {
            onSwipeRight();
        }
    };
    /**
     * 터치 시작 핸들러
     */
    const handleTouchStart = (e) => {
        const touch = e.touches[0];
        startRef.current = { x: touch.clientX, y: touch.clientY };
    };
    /**
     * 터치 종료 핸들러
     */
    const handleTouchEnd = (e) => {
        if (!startRef.current)
            return;
        const touch = e.changedTouches[0];
        const { deltaX } = getDelta(touch.clientX, touch.clientY);
        handleSwipe(deltaX);
        startRef.current = null;
    };
    /**
     * 마우스 다운 핸들러
     */
    const handleMouseDown = (e) => {
        isMouseDownRef.current = true;
        startRef.current = { x: e.clientX, y: e.clientY };
    };
    /**
     * 마우스 업 핸들러
     */
    const handleMouseUp = (e) => {
        if (!isMouseDownRef.current || !startRef.current) {
            isMouseDownRef.current = false;
            startRef.current = null;
            return;
        }
        const { deltaX } = getDelta(e.clientX, e.clientY);
        handleSwipe(deltaX);
        isMouseDownRef.current = false;
        startRef.current = null;
    };
    /**
     * 마우스 리브 핸들러
     */
    const handleMouseLeave = () => {
        isMouseDownRef.current = false;
        startRef.current = null;
    };
    /**
     * 키보드 다운 핸들러
     */
    const handleKeyDown = (e) => {
        if (e.key === 'ArrowLeft') {
            onSwipeRight();
        }
        else if (e.key === 'ArrowRight') {
            onSwipeLeft();
        }
    };
    return {
        handleTouchStart,
        handleTouchEnd,
        handleMouseDown,
        handleMouseUp,
        handleMouseLeave,
        handleKeyDown,
        isMouseDown: isMouseDownRef.current,
        wasSwipedRef,
    };
};

/**
 * 페이지네이션에서 보여줄 페이지들을 계산합니다.
 * @param totalPages 전체 페이지 수
 * @param currentPage 현재 페이지
 * @param maxVisible 최대 표시할 페이지 수
 * @returns 표시할 페이지 인덱스 배열
 */
const getVisiblePages = (totalPages, currentPage, maxVisible) => {
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
function getRenderRange(currentIndex, visibleCount, totalItems, overscanMultiplier = 1) {
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
const getNextIndex = (currentIndex, visibleCount, totalItems, infinite = false) => {
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
const getPreviousIndex = (currentIndex, visibleCount, totalItems, infinite = false) => {
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
const isValidIndex = (index, visibleCount, totalItems) => {
    return index >= 0 && index <= totalItems - visibleCount;
};
/**
 * 현재 페이지를 계산합니다.
 * @param currentIndex 현재 인덱스
 * @param visibleCount 보여줄 아이템 개수
 * @returns 현재 페이지
 */
const getCurrentPage = (currentIndex, visibleCount) => {
    return Math.floor(currentIndex / visibleCount);
};
/**
 * 전체 페이지 수를 계산합니다.
 * @param totalItems 전체 아이템 개수
 * @param visibleCount 보여줄 아이템 개수
 * @returns 전체 페이지 수
 */
const getTotalPages = (totalItems, visibleCount) => {
    return Math.ceil(totalItems / visibleCount);
};

// CSS 변수 기본값
const defaultStyles = {
    trackTransition: 'transform 0.3s ease-in-out',
    buttonSize: 40,
    paginationDotSize: 32,
    buttonBackground: 'rgba(255, 255, 255, 0.9)',
    buttonColor: '#333',
    activePaginationColor: '#007bff',
    inactivePaginationColor: '#ddd',
};
const SpinSliderWrapper = styled.div `
  position: relative;
  overflow: hidden;
  width: 100%;
  ${({ userSelect }) => userSelect && `user-select: ${userSelect};`}
`;
const SpinSliderTrack = styled.ul `
  display: flex;
  transition: ${({ $transitionDuration }) => $transitionDuration ? `transform ${$transitionDuration}ms ease-in-out` : defaultStyles.trackTransition};
  width: fit-content;
  transform: translateX(${({ $translateX }) => $translateX}px);
  margin: 0;
  padding: 0;
  list-style: none;
`;
const SpinSliderItemWrapper = styled.li `
  flex: 0 0 ${({ width }) => width}px;
  padding: 0 ${({ sidePeek }) => sidePeek ?? 8}px;
  box-sizing: border-box;
`;
const SpinSliderButton = styled.button `
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${({ $position }) => $position}: 10px;
  z-index: 2;

  width: ${({ $styles }) => $styles?.buttonSize ?? defaultStyles.buttonSize}px;
  height: ${({ $styles }) => $styles?.buttonSize ?? defaultStyles.buttonSize}px;
  border-radius: 50%;
  border: none;
  background: ${({ $styles }) => $styles?.buttonBackground ?? defaultStyles.buttonBackground};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
  color: ${({ $styles }) => $styles?.buttonColor ?? defaultStyles.buttonColor};
  cursor: pointer;

  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 1);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    transform: translateY(-50%) scale(1.05);
  }

  &:active {
    transform: translateY(-50%) scale(0.95);
  }

  @media (max-width: 768px) {
    width: 32px;
    height: 32px;
    font-size: 16px;
    ${({ $position }) => $position}: 5px;
  }
`;
const SpinSliderPaginationWrapper = styled.div `
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
  gap: 4px;

  span {
    color: #222;
    font-size: 14px;
    font-weight: bold;
    padding: 0 4px;
    user-select: none;

    @media (max-width: 768px) {
      font-size: 12px;
      padding: 0 2px;
    }
  }
`;
const PaginationDot = styled.button `
  min-width: ${({ $styles }) => $styles?.paginationDotSize ?? defaultStyles.paginationDotSize}px;
  min-height: ${({ $styles }) => $styles?.paginationDotSize ?? defaultStyles.paginationDotSize}px;
  width: ${({ $styles }) => $styles?.paginationDotSize ?? defaultStyles.paginationDotSize}px;
  height: ${({ $styles }) => $styles?.paginationDotSize ?? defaultStyles.paginationDotSize}px;
  background: transparent;
  border: none;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  outline: none;
  -webkit-tap-highlight-color: transparent;

  &::after {
    content: '';
    display: block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: ${({ $active, $styles }) => $active
    ? ($styles?.activePaginationColor ?? defaultStyles.activePaginationColor)
    : ($styles?.inactivePaginationColor ?? defaultStyles.inactivePaginationColor)};
    transition: all 0.2s ease;
  }

  &:hover::after {
    background: ${({ $active }) => ($active ? '#0056b3' : '#bbb')};
    transform: scale(1.1);
  }

  &:active::after {
    transform: scale(0.9);
  }

  @media (max-width: 768px) {
    min-width: 28px;
    min-height: 28px;
    width: 28px;
    height: 28px;
    &::after {
      width: 10px;
      height: 10px;
    }
  }
`;

/**
 * SpinSlider의 페이지네이션 컴포넌트
 */
const SpinSliderPagination = ({ itemsLength, visibleCount, currentIndex, setCurrentIndex, maxVisible = 7, styles, accessibility, }) => {
    const totalPages = getTotalPages(itemsLength, visibleCount);
    const currentPage = getCurrentPage(currentIndex, visibleCount);
    const visiblePages = getVisiblePages(totalPages, currentPage, maxVisible);
    const goToPage = (pageIndex) => {
        const newIndex = pageIndex * visibleCount;
        setCurrentIndex(Math.min(newIndex, itemsLength - visibleCount));
    };
    if (totalPages <= 1) {
        return null;
    }
    return (jsxs(SpinSliderPaginationWrapper, { role: "tablist", "aria-label": accessibility?.paginationLabel || '페이지네이션', children: [visiblePages[0] > 0 && (jsxs(Fragment, { children: [jsx(PaginationDot, { "$active": false, "$styles": styles, onClick: () => goToPage(0), "aria-label": accessibility?.paginationLabel ? `${accessibility.paginationLabel} 첫 페이지로 이동` : '첫 페이지로 이동', role: "tab" }), visiblePages[0] > 1 && jsx("span", { children: "..." })] })), visiblePages.map(pageIndex => (jsx(PaginationDot, { "$active": pageIndex === currentPage, "$styles": styles, onClick: () => goToPage(pageIndex), "aria-label": accessibility?.paginationLabel
                    ? `${accessibility.paginationLabel} ${pageIndex + 1}페이지로 이동`
                    : `${pageIndex + 1}페이지로 이동`, role: "tab", "aria-selected": pageIndex === currentPage }, pageIndex))), visiblePages[visiblePages.length - 1] < totalPages - 1 && (jsxs(Fragment, { children: [visiblePages[visiblePages.length - 1] < totalPages - 2 && jsx("span", { children: "..." }), jsx(PaginationDot, { "$active": false, "$styles": styles, onClick: () => goToPage(totalPages - 1), "aria-label": accessibility?.paginationLabel
                            ? `${accessibility.paginationLabel} 마지막 페이지로 이동`
                            : '마지막 페이지로 이동', role: "tab" })] }))] }));
};

/**
 * SpinSlider의 개별 아이템 컴포넌트
 */
const SpinSliderItem = ({ item, index, width, sidePeek, currentIndex, totalItems, wasSwipedRef, onClick, renderItem, }) => {
    const handleClick = (e) => {
        e.stopPropagation();
        if (wasSwipedRef.current) {
            e.preventDefault();
            wasSwipedRef.current = false;
            return;
        }
        onClick?.(item, index);
    };
    return (jsx(SpinSliderItemWrapper, { width: width, sidePeek: sidePeek, "aria-roledescription": "carousel item", "aria-label": `carousel item ${index + 1} of ${totalItems}`, "aria-current": currentIndex === index ? 'true' : 'false', onClick: handleClick, children: renderItem(item, index) }));
};

/**
 * 메인 SpinSlider 컴포넌트
 */
const SpinSlider = ({ items, renderItem, visibleCount = 1, sidePeek = 32, autoPlay = false, autoPlayInterval = 3000, infinite = false, showPagination = true, showNavigation = true, minSwipeDistance = 50, transitionDuration, initialIndex = 0, styles, callbacks, accessibility, className, }) => {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [viewportWidth, setViewportWidth] = useState(0);
    const autoPlayRef = useRef(null);
    // 뷰포트 너비 계산
    useEffect(() => {
        const updateViewportWidth = () => {
            setViewportWidth(window.innerWidth);
        };
        updateViewportWidth();
        window.addEventListener('resize', updateViewportWidth);
        return () => window.removeEventListener('resize', updateViewportWidth);
    }, []);
    // 자동 재생
    useEffect(() => {
        if (!autoPlay || items.length <= visibleCount)
            return;
        const startAutoPlay = () => {
            autoPlayRef.current = setInterval(() => {
                setCurrentIndex(prev => getNextIndex(prev, visibleCount, items.length, infinite));
            }, autoPlayInterval);
            callbacks?.onAutoPlayStart?.();
        };
        const stopAutoPlay = () => {
            if (autoPlayRef.current) {
                clearInterval(autoPlayRef.current);
                autoPlayRef.current = null;
                callbacks?.onAutoPlayStop?.();
            }
        };
        startAutoPlay();
        return stopAutoPlay;
    }, [autoPlay, autoPlayInterval, items.length, visibleCount, infinite, callbacks]);
    // 계산된 값들
    const visibleAreaWidth = useMemo(() => viewportWidth - sidePeek * 2, [viewportWidth, sidePeek]);
    const itemWidth = useMemo(() => visibleAreaWidth / visibleCount, [visibleAreaWidth, visibleCount]);
    const translateX = useMemo(() => -(itemWidth * currentIndex) + sidePeek, [itemWidth, currentIndex, sidePeek]);
    const totalItems = items.length;
    const { startIndex, endIndex } = useMemo(() => getRenderRange(currentIndex, visibleCount, totalItems), [currentIndex, visibleCount, totalItems]);
    // 네비게이션 핸들러
    const goToPrevious = () => {
        const newIndex = getPreviousIndex(currentIndex, visibleCount, totalItems, infinite);
        setCurrentIndex(newIndex);
        callbacks?.onSlideChange?.(newIndex);
    };
    const goToNext = () => {
        const newIndex = getNextIndex(currentIndex, visibleCount, totalItems, infinite);
        setCurrentIndex(newIndex);
        callbacks?.onSlideChange?.(newIndex);
    };
    // 스와이프 핸들러
    const { handleTouchStart, handleTouchEnd, handleMouseDown, handleMouseUp, handleMouseLeave, handleKeyDown, isMouseDown, wasSwipedRef, } = useSwipe({
        onSwipeLeft: goToNext,
        onSwipeRight: goToPrevious,
        minSwipeDistance,
    });
    // 아이템 클릭 핸들러
    const handleItemClick = (item, index) => {
        callbacks?.onItemClick?.(item, index);
    };
    // 인덱스 변경 핸들러
    const handleIndexChange = (newIndex) => {
        setCurrentIndex(newIndex);
        callbacks?.onSlideChange?.(newIndex);
    };
    if (items.length === 0) {
        return null;
    }
    return (jsxs(SpinSliderWrapper, { className: className, onTouchStart: handleTouchStart, onTouchEnd: handleTouchEnd, onMouseDown: handleMouseDown, onMouseUp: handleMouseUp, onMouseLeave: handleMouseLeave, onKeyDown: handleKeyDown, tabIndex: isMouseDown ? -1 : 0, userSelect: isMouseDown ? 'none' : undefined, role: "region", "aria-roledescription": "carousel", "aria-label": accessibility?.label || '슬라이더', children: [showNavigation && (jsxs(Fragment, { children: [jsx(SpinSliderButton, { "$position": "left", "$styles": styles, onClick: goToPrevious, "aria-label": accessibility?.previousButtonLabel || '이전 슬라이드', children: "\u2039" }), jsx(SpinSliderButton, { "$position": "right", "$styles": styles, onClick: goToNext, "aria-label": accessibility?.nextButtonLabel || '다음 슬라이드', children: "\u203A" })] })), jsxs(SpinSliderTrack, { "$translateX": translateX, "$transitionDuration": transitionDuration, children: [startIndex > 0 && jsx("li", { style: { width: startIndex * itemWidth, flexShrink: 0 } }), items.slice(startIndex, endIndex).map((item, i) => {
                        const index = startIndex + i;
                        return (jsx(SpinSliderItem, { item: item, index: index, width: itemWidth, sidePeek: sidePeek, currentIndex: currentIndex, totalItems: totalItems, wasSwipedRef: wasSwipedRef, onClick: handleItemClick, renderItem: renderItem }, index));
                    }), endIndex < totalItems && jsx("li", { style: { width: (totalItems - endIndex) * itemWidth, flexShrink: 0 } })] }), showPagination && (jsx(SpinSliderPagination, { itemsLength: items.length, visibleCount: visibleCount, currentIndex: currentIndex, setCurrentIndex: handleIndexChange, maxVisible: 10, styles: styles, accessibility: accessibility }))] }));
};

// 메인 컴포넌트

export { SpinSlider, SpinSliderItem, SpinSliderPagination, SpinSlider as default, getCurrentPage, getNextIndex, getPreviousIndex, getRenderRange, getTotalPages, getVisiblePages, isValidIndex, useSwipe };
//# sourceMappingURL=index.esm.js.map
