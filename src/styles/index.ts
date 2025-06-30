import styled from 'styled-components';

import { SpinSliderStyles } from '../types';

// CSS 변수 기본값
const defaultStyles: Required<SpinSliderStyles> = {
  trackTransition: 'transform 0.3s ease-in-out',
  buttonSize: 40,
  paginationDotSize: 32,
  buttonBackground: 'rgba(255, 255, 255, 0.9)',
  buttonColor: '#333',
  activePaginationColor: '#007bff',
  inactivePaginationColor: '#ddd',
};

export const SpinSliderWrapper = styled.div<{ userSelect?: string }>`
  position: relative;
  overflow: hidden;
  width: 100%;
  ${({ userSelect }) => userSelect && `user-select: ${userSelect};`}
`;

export const SpinSliderTrack = styled.ul<{
  $translateX: number;
  $transitionDuration?: number;
}>`
  display: flex;
  transition: ${({ $transitionDuration }) =>
    $transitionDuration ? `transform ${$transitionDuration}ms ease-in-out` : defaultStyles.trackTransition};
  width: fit-content;
  transform: translateX(${({ $translateX }) => $translateX}px);
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const SpinSliderItemWrapper = styled.li<{
  width: number;
  sidePeek?: number;
}>`
  flex: 0 0 ${({ width }) => width}px;
  padding: 0 ${({ sidePeek }) => sidePeek ?? 8}px;
  box-sizing: border-box;
`;

export const SpinSliderButton = styled.button<{
  $position: 'left' | 'right';
  $styles?: SpinSliderStyles;
}>`
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

export const SpinSliderPaginationWrapper = styled.div`
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

export const PaginationDot = styled.button<{
  $active: boolean;
  $styles?: SpinSliderStyles;
}>`
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
    background: ${({ $active, $styles }) =>
      $active
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
