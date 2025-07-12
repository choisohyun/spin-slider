import styled from 'styled-components';
import { SpinSlider } from 'spin-slider';

import { DemoItem } from '../data/demoData';

import { DemoCard } from './DemoCard';

const Section = styled.section`
  padding: 60px 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 16px;
`;

const Subtitle = styled.p`
  text-align: center;
  font-size: 1.1rem;
  color: #718096;
  margin-bottom: 40px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const SliderContainer = styled.div`
  margin-bottom: 40px;
`;

const ConfigSection = styled.div`
  background: #f7fafc;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 40px;
`;

const ConfigTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 16px;
`;

const ConfigList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ConfigItem = styled.li`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  font-size: 14px;
  color: #4a5568;

  &:before {
    content: '✓';
    color: #48bb78;
    font-weight: bold;
    font-size: 16px;
  }
`;

interface DemoSectionProps {
  title: string;
  subtitle: string;
  items: DemoItem[];
  visibleCount?: number;
  sidePeek?: number;
  autoPlay?: boolean;
  infinite?: boolean;
  showPagination?: boolean;
  showNavigation?: boolean;
  onItemClick?: (item: DemoItem) => void;
}

export const DemoSection = ({
  title,
  subtitle,
  items,
  visibleCount = 3,
  sidePeek = 8,
  autoPlay = false,
  infinite = false,
  showPagination = true,
  showNavigation = true,
  onItemClick,
}: DemoSectionProps) => {
  const getConfigItems = () => {
    const items = [];

    if (autoPlay) items.push('Auto Play enabled');
    if (infinite) items.push('Infinite Loop enabled');
    if (showPagination) items.push('Pagination enabled');
    if (showNavigation) items.push('Navigation buttons enabled');

    items.push(`Visible items: ${visibleCount}`);
    items.push(`Side peek: ${sidePeek}px`);

    return items;
  };

  return (
    <Section>
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>

      <ConfigSection>
        <ConfigTitle>Configuration</ConfigTitle>
        <ConfigList>
          {getConfigItems().map((item, index) => (
            <ConfigItem key={index}>{item}</ConfigItem>
          ))}
        </ConfigList>
      </ConfigSection>

      <SliderContainer>
        <SpinSlider
          items={items}
          renderItem={item => <DemoCard item={item} onClick={onItemClick} />}
          visibleCount={visibleCount}
          sidePeek={sidePeek}
          autoPlay={autoPlay}
          infinite={infinite}
          showPagination={showPagination}
          showNavigation={showNavigation}
          callbacks={{
            onItemClick: item => onItemClick?.(item),
          }}
        />
      </SliderContainer>
    </Section>
  );
};
