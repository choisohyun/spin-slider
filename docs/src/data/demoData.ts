export interface DemoItem {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
}

export const demoItems: DemoItem[] = [
  {
    id: 1,
    title: 'Modern Web Design',
    description: 'Beautiful and responsive web design principles',
    image: 'https://picsum.photos/400/300?random=1',
    category: 'Design',
  },
  {
    id: 2,
    title: 'React Development',
    description: 'Building modern applications with React',
    image: 'https://picsum.photos/400/300?random=2',
    category: 'Development',
  },
  {
    id: 3,
    title: 'TypeScript Mastery',
    description: 'Advanced TypeScript patterns and best practices',
    image: 'https://picsum.photos/400/300?random=3',
    category: 'Development',
  },
  {
    id: 4,
    title: 'UI/UX Excellence',
    description: 'Creating exceptional user experiences',
    image: 'https://picsum.photos/400/300?random=4',
    category: 'Design',
  },
  {
    id: 5,
    title: 'Performance Optimization',
    description: 'Making your apps lightning fast',
    image: 'https://picsum.photos/400/300?random=5',
    category: 'Performance',
  },
  {
    id: 6,
    title: 'Accessibility First',
    description: 'Building inclusive digital experiences',
    image: 'https://picsum.photos/400/300?random=6',
    category: 'Accessibility',
  },
  {
    id: 7,
    title: 'Mobile-First Design',
    description: 'Designing for the mobile generation',
    image: 'https://picsum.photos/400/300?random=7',
    category: 'Design',
  },
  {
    id: 8,
    title: 'Testing Strategies',
    description: 'Comprehensive testing approaches',
    image: 'https://picsum.photos/400/300?random=8',
    category: 'Testing',
  },
  {
    id: 9,
    title: 'Performance Optimization',
    description: 'Making your apps lightning fast',
    image: 'https://picsum.photos/400/300?random=9',
    category: 'Performance',
  },
];
