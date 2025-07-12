import styled from 'styled-components';

import { DemoItem } from '../data/demoData';

const Card = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  cursor: pointer;
  height: 100%;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const Content = styled.div`
  padding: 20px;
`;

const Category = styled.span`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const Title = styled.h3`
  margin: 12px 0 8px 0;
  font-size: 18px;
  font-weight: 700;
  color: #2d3748;
`;

const Description = styled.p`
  color: #718096;
  font-size: 14px;
  line-height: 1.5;
  margin: 0;
`;

interface DemoCardProps {
  item: DemoItem;
  onClick?: (item: DemoItem) => void;
}

export const DemoCard = ({ item, onClick }: DemoCardProps) => {
  const handleClick = () => {
    onClick?.(item);
  };

  return (
    <Card onClick={handleClick}>
      <Image src={item.image} alt={item.title} />
      <Content>
        <Category>{item.category}</Category>
        <Title>{item.title}</Title>
        <Description>{item.description}</Description>
      </Content>
    </Card>
  );
};
