import { useState, useMemo, useEffect, useRef } from 'react';

import { SpinSliderProps } from '../types';
import { useSwipe } from '../hooks/useSwipe';
import { getRenderRange, getNextIndex, getPreviousIndex } from '../utils/carousel';
import { SpinSliderWrapper, SpinSliderTrack, SpinSliderButton } from '../styles';

import { SpinSliderPagination } from './SpinSliderPagination';
import { SpinSliderItem } from './SpinSliderItem';

/**
 * 메인 SpinSlider 컴포넌트
 */
export const SpinSlider = <T,>({
  items,
  renderItem,
  visibleCount = 1,
  sidePeek = 32,
  autoPlay = false,
  autoPlayInterval = 3000,
  infinite = false,
  showPagination = true,
  showNavigation = true,
  minSwipeDistance = 50,
  transitionDuration,
  initialIndex = 0,
  styles,
  callbacks,
  accessibility,
  className,
}: SpinSliderProps<T>) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [viewportWidth, setViewportWidth] = useState(0);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

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
    if (!autoPlay || items.length <= visibleCount) return;

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

  const { startIndex, endIndex } = useMemo(
    () => getRenderRange(currentIndex, visibleCount, totalItems),
    [currentIndex, visibleCount, totalItems],
  );

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
  const {
    handleTouchStart,
    handleTouchEnd,
    handleMouseDown,
    handleMouseUp,
    handleMouseLeave,
    handleKeyDown,
    isMouseDown,
    wasSwipedRef,
  } = useSwipe({
    onSwipeLeft: goToNext,
    onSwipeRight: goToPrevious,
    minSwipeDistance,
  });

  // 아이템 클릭 핸들러
  const handleItemClick = (item: T, index: number) => {
    callbacks?.onItemClick?.(item, index);
  };

  // 인덱스 변경 핸들러
  const handleIndexChange = (newIndex: number) => {
    setCurrentIndex(newIndex);
    callbacks?.onSlideChange?.(newIndex);
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <SpinSliderWrapper
      className={className}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyDown}
      tabIndex={isMouseDown ? -1 : 0}
      userSelect={isMouseDown ? 'none' : undefined}
      role="region"
      aria-roledescription="carousel"
      aria-label={accessibility?.label || '슬라이더'}
    >
      {showNavigation && (
        <>
          <SpinSliderButton
            $position="left"
            $styles={styles}
            onClick={goToPrevious}
            aria-label={accessibility?.previousButtonLabel || '이전 슬라이드'}
          >
            &#8249;
          </SpinSliderButton>
          <SpinSliderButton
            $position="right"
            $styles={styles}
            onClick={goToNext}
            aria-label={accessibility?.nextButtonLabel || '다음 슬라이드'}
          >
            &#8250;
          </SpinSliderButton>
        </>
      )}

      <SpinSliderTrack $translateX={translateX} $transitionDuration={transitionDuration}>
        {startIndex > 0 && <li style={{ width: startIndex * itemWidth, flexShrink: 0 }} />}
        {items.slice(startIndex, endIndex).map((item, i) => {
          const index = startIndex + i;
          return (
            <SpinSliderItem
              key={index}
              item={item}
              index={index}
              width={itemWidth}
              sidePeek={sidePeek}
              currentIndex={currentIndex}
              totalItems={totalItems}
              wasSwipedRef={wasSwipedRef}
              onClick={handleItemClick}
              renderItem={renderItem}
            />
          );
        })}
        {endIndex < totalItems && <li style={{ width: (totalItems - endIndex) * itemWidth, flexShrink: 0 }} />}
      </SpinSliderTrack>

      {showPagination && (
        <SpinSliderPagination
          itemsLength={items.length}
          visibleCount={visibleCount}
          currentIndex={currentIndex}
          setCurrentIndex={handleIndexChange}
          maxVisible={10}
          styles={styles}
          accessibility={accessibility}
        />
      )}
    </SpinSliderWrapper>
  );
};
