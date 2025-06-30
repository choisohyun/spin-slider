import { useRef, TouchEvent, MouseEvent, KeyboardEvent } from 'react';

import { UseSwipeOptions, UseSwipeReturn } from '../types';

/**
 * 터치, 마우스, 키보드 스와이프 기능을 제공하는 훅
 */
export const useSwipe = ({ onSwipeLeft, onSwipeRight, minSwipeDistance = 50 }: UseSwipeOptions): UseSwipeReturn => {
  const startRef = useRef<{ x: number; y: number } | null>(null);
  const isMouseDownRef = useRef(false);
  const wasSwipedRef = useRef(false);

  /**
   * 시작점과 현재점의 차이를 계산합니다.
   */
  const getDelta = (x: number, y: number) => {
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
  const handleSwipe = (deltaX: number) => {
    if (Math.abs(deltaX) <= minSwipeDistance) {
      return;
    }
    wasSwipedRef.current = true;
    if (deltaX < 0) {
      onSwipeLeft();
    } else {
      onSwipeRight();
    }
  };

  /**
   * 터치 시작 핸들러
   */
  const handleTouchStart = (e: TouchEvent) => {
    const touch = e.touches[0];
    startRef.current = { x: touch.clientX, y: touch.clientY };
  };

  /**
   * 터치 종료 핸들러
   */
  const handleTouchEnd = (e: TouchEvent) => {
    if (!startRef.current) return;
    const touch = e.changedTouches[0];
    const { deltaX } = getDelta(touch.clientX, touch.clientY);
    handleSwipe(deltaX);
    startRef.current = null;
  };

  /**
   * 마우스 다운 핸들러
   */
  const handleMouseDown = (e: MouseEvent) => {
    isMouseDownRef.current = true;
    startRef.current = { x: e.clientX, y: e.clientY };
  };

  /**
   * 마우스 업 핸들러
   */
  const handleMouseUp = (e: MouseEvent) => {
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
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      onSwipeRight();
    } else if (e.key === 'ArrowRight') {
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
