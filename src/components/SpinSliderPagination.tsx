import { SpinSliderPaginationProps } from '../types';
import { SpinSliderPaginationWrapper, PaginationDot } from '../styles';
import { getVisiblePages, getCurrentPage, getTotalPages } from '../utils/carousel';

/**
 * SpinSlider의 페이지네이션 컴포넌트
 */
export const SpinSliderPagination = ({
  itemsLength,
  visibleCount,
  currentIndex,
  setCurrentIndex,
  maxVisible = 7,
  styles,
  accessibility,
}: SpinSliderPaginationProps) => {
  const totalPages = getTotalPages(itemsLength, visibleCount);
  const currentPage = getCurrentPage(currentIndex, visibleCount);

  const visiblePages = getVisiblePages(totalPages, currentPage, maxVisible);

  const goToPage = (pageIndex: number) => {
    const newIndex = pageIndex * visibleCount;
    setCurrentIndex(Math.min(newIndex, itemsLength - visibleCount));
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <SpinSliderPaginationWrapper role="tablist" aria-label={accessibility?.paginationLabel || '페이지네이션'}>
      {visiblePages[0] > 0 && (
        <>
          <PaginationDot
            $active={false}
            $styles={styles}
            onClick={() => goToPage(0)}
            aria-label={
              accessibility?.paginationLabel ? `${accessibility.paginationLabel} 첫 페이지로 이동` : '첫 페이지로 이동'
            }
            role="tab"
          />
          {visiblePages[0] > 1 && <span>...</span>}
        </>
      )}

      {visiblePages.map(pageIndex => (
        <PaginationDot
          key={pageIndex}
          $active={pageIndex === currentPage}
          $styles={styles}
          onClick={() => goToPage(pageIndex)}
          aria-label={
            accessibility?.paginationLabel
              ? `${accessibility.paginationLabel} ${pageIndex + 1}페이지로 이동`
              : `${pageIndex + 1}페이지로 이동`
          }
          role="tab"
          aria-selected={pageIndex === currentPage}
        />
      ))}

      {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
        <>
          {visiblePages[visiblePages.length - 1] < totalPages - 2 && <span>...</span>}
          <PaginationDot
            $active={false}
            $styles={styles}
            onClick={() => goToPage(totalPages - 1)}
            aria-label={
              accessibility?.paginationLabel
                ? `${accessibility.paginationLabel} 마지막 페이지로 이동`
                : '마지막 페이지로 이동'
            }
            role="tab"
          />
        </>
      )}
    </SpinSliderPaginationWrapper>
  );
};
