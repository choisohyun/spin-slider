import { SpinSliderItemProps } from '../types';
import { SpinSliderItemWrapper } from '../styles';

/**
 * SpinSlider의 개별 아이템 컴포넌트
 */
export const SpinSliderItem = <T,>({
  item,
  index,
  width,
  sidePeek,
  currentIndex,
  totalItems,
  wasSwipedRef,
  onClick,
  renderItem,
}: SpinSliderItemProps<T>) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (wasSwipedRef.current) {
      e.preventDefault();
      (wasSwipedRef as React.MutableRefObject<boolean>).current = false;
      return;
    }
    onClick?.(item, index);
  };

  return (
    <SpinSliderItemWrapper
      width={width}
      sidePeek={sidePeek}
      aria-roledescription="carousel item"
      aria-label={`carousel item ${index + 1} of ${totalItems}`}
      aria-current={currentIndex === index ? 'true' : 'false'}
      onClick={handleClick}
    >
      {renderItem(item, index)}
    </SpinSliderItemWrapper>
  );
};
