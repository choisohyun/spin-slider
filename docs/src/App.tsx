import styled, { createGlobalStyle } from 'styled-components';

import { DemoSection } from './components/DemoSection';
import { demoItems } from './data/demoData';
import { DemoItem } from './data/demoData';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
  }

  html {
    scroll-behavior: smooth;
  }
`;

const Header = styled.header`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 20px;
  text-align: center;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
`;

const HeaderTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 8px;
`;

const HeaderSubtitle = styled.p`
  color: #718096;
  font-size: 1.1rem;
`;

const Main = styled.main`
  padding: 40px 0;
`;

const Footer = styled.footer`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 40px 20px;
  text-align: center;
  margin-top: 60px;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const FooterTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 16px;
`;

const FooterText = styled.p`
  color: #718096;
  margin-bottom: 24px;
`;

const GitHubLink = styled.a`
  display: inline-block;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

function App() {
  const handleItemClick = (item: DemoItem) => {
    // 실제 앱에서는 모달이나 상세 페이지로 이동
    console.log('Clicked item:', item);
    alert(`Clicked: ${item.title}`);
  };

  return (
    <>
      <GlobalStyle />
      <Header>
        <HeaderTitle>Spin Slider</HeaderTitle>
        <HeaderSubtitle>A modern, accessible carousel/slider component for React</HeaderSubtitle>
      </Header>

      <Main>
        <DemoSection
          title="Basic Slider"
          subtitle="Simple slider with navigation and pagination"
          items={demoItems}
          visibleCount={3}
          sidePeek={8}
          showPagination={true}
          showNavigation={true}
          onItemClick={handleItemClick}
        />

        <DemoSection
          title="Auto Play Slider"
          subtitle="Slider with automatic playback and infinite loop"
          items={demoItems}
          visibleCount={2}
          autoPlay={true}
          infinite={true}
          showPagination={true}
          showNavigation={true}
          onItemClick={handleItemClick}
        />

        <DemoSection
          title="Minimal Slider"
          subtitle="Clean slider with just navigation buttons"
          items={demoItems}
          visibleCount={4}
          showPagination={false}
          showNavigation={true}
          onItemClick={handleItemClick}
        />
      </Main>

      <Footer>
        <FooterContent>
          <FooterTitle>Get Started with Spin Slider</FooterTitle>
          <FooterText>
            Install the library and start building beautiful carousels in your React applications.
          </FooterText>
          <GitHubLink href="https://github.com/choisohyun/spin-slider" target="_blank">
            View on GitHub
          </GitHubLink>
        </FooterContent>
      </Footer>
    </>
  );
}

export default App;
