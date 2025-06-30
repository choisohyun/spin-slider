# Spin Slider

A modern, accessible carousel/slider component for React with TypeScript support.

## Features

- 🎯 **TypeScript Support** - Full TypeScript support with generic types
- ♿ **Accessible** - ARIA attributes and keyboard navigation
- 📱 **Touch & Mouse Support** - Swipe gestures and mouse drag
- 🎨 **Customizable** - Extensive styling and behavior options
- 🔄 **Auto Play** - Optional auto-play with configurable intervals
- ♾️ **Infinite Loop** - Optional infinite scrolling
- 📊 **Pagination** - Built-in pagination with smart page display
- 🎛️ **Navigation** - Optional navigation buttons
- 📐 **Responsive** - Responsive design with viewport-based sizing

## Installation

```bash
npm install spin-slider
```

## Quick Start

```tsx
import { SpinSlider } from 'spin-slider';

const items = [
  { id: 1, title: 'Item 1', image: '/image1.jpg' },
  { id: 2, title: 'Item 2', image: '/image2.jpg' },
  { id: 3, title: 'Item 3', image: '/image3.jpg' },
];

function App() {
  return (
    <SpinSlider
      items={items}
      renderItem={item => (
        <div>
          <img src={item.image} alt={item.title} />
          <h3>{item.title}</h3>
        </div>
      )}
      visibleCount={3}
      autoPlay
      infinite
    />
  );
}
```

## Props

### SpinSliderProps

| Prop                 | Type                                    | Default | Description                        |
| -------------------- | --------------------------------------- | ------- | ---------------------------------- |
| `items`              | `T[]`                                   | -       | Array of items to display          |
| `renderItem`         | `(item: T, index: number) => ReactNode` | -       | Function to render each item       |
| `visibleCount`       | `number`                                | `1`     | Number of items visible at once    |
| `sidePeek`           | `number`                                | `32`    | Side peek amount in pixels         |
| `autoPlay`           | `boolean`                               | `false` | Enable auto-play                   |
| `autoPlayInterval`   | `number`                                | `3000`  | Auto-play interval in milliseconds |
| `infinite`           | `boolean`                               | `false` | Enable infinite loop               |
| `showPagination`     | `boolean`                               | `true`  | Show pagination dots               |
| `showNavigation`     | `boolean`                               | `true`  | Show navigation buttons            |
| `minSwipeDistance`   | `number`                                | `50`    | Minimum swipe distance             |
| `transitionDuration` | `number`                                | -       | Custom transition duration         |
| `initialIndex`       | `number`                                | `0`     | Initial slide index                |
| `styles`             | `SpinSliderStyles`                      | -       | Custom styles                      |
| `callbacks`          | `SpinSliderCallbacks`                   | -       | Event callbacks                    |
| `accessibility`      | `SpinSliderAccessibility`               | -       | Accessibility options              |
| `className`          | `string`                                | -       | CSS class name                     |

### SpinSliderStyles

| Prop                      | Type     | Default                        | Description               |
| ------------------------- | -------- | ------------------------------ | ------------------------- |
| `trackTransition`         | `string` | `'transform 0.3s ease-in-out'` | Track transition CSS      |
| `buttonSize`              | `number` | `40`                           | Navigation button size    |
| `paginationDotSize`       | `number` | `32`                           | Pagination dot size       |
| `buttonBackground`        | `string` | `'rgba(255, 255, 255, 0.9)'`   | Button background color   |
| `buttonColor`             | `string` | `'#333'`                       | Button text color         |
| `activePaginationColor`   | `string` | `'#007bff'`                    | Active pagination color   |
| `inactivePaginationColor` | `string` | `'#ddd'`                       | Inactive pagination color |

### SpinSliderCallbacks

| Prop              | Type                               | Description                  |
| ----------------- | ---------------------------------- | ---------------------------- |
| `onSlideChange`   | `(currentIndex: number) => void`   | Called when slide changes    |
| `onItemClick`     | `(item: T, index: number) => void` | Called when item is clicked  |
| `onSwipeStart`    | `() => void`                       | Called when swipe starts     |
| `onSwipeEnd`      | `() => void`                       | Called when swipe ends       |
| `onAutoPlayStart` | `() => void`                       | Called when auto-play starts |
| `onAutoPlayStop`  | `() => void`                       | Called when auto-play stops  |

## Examples

### Basic Usage

```tsx
<SpinSlider items={items} renderItem={item => <div>{item.title}</div>} />
```

### Multiple Items Visible

```tsx
<SpinSlider items={items} renderItem={item => <div>{item.title}</div>} visibleCount={3} sidePeek={16} />
```

### Auto-play with Infinite Loop

```tsx
<SpinSlider items={items} renderItem={item => <div>{item.title}</div>} autoPlay autoPlayInterval={2000} infinite />
```

### Custom Styling

```tsx
<SpinSlider
  items={items}
  renderItem={item => <div>{item.title}</div>}
  styles={{
    buttonSize: 50,
    buttonBackground: '#ff6b6b',
    buttonColor: '#fff',
    activePaginationColor: '#ff6b6b',
  }}
/>
```

### Event Handling

```tsx
<SpinSlider
  items={items}
  renderItem={item => <div>{item.title}</div>}
  callbacks={{
    onSlideChange: index => console.log('Slide changed to:', index),
    onItemClick: (item, index) => console.log('Clicked item:', item, 'at index:', index),
  }}
/>
```

### Accessibility

```tsx
<SpinSlider
  items={items}
  renderItem={item => <div>{item.title}</div>}
  accessibility={{
    label: 'Product carousel',
    previousButtonLabel: 'Previous product',
    nextButtonLabel: 'Next product',
    paginationLabel: 'Product navigation',
  }}
/>
```

## Hooks

### useSwipe

Custom hook for handling swipe gestures:

```tsx
import { useSwipe } from 'spin-slider';

const { handleTouchStart, handleTouchEnd, handleMouseDown, handleMouseUp } = useSwipe({
  onSwipeLeft: () => console.log('Swiped left'),
  onSwipeRight: () => console.log('Swiped right'),
  minSwipeDistance: 50,
});
```

## Utilities

The library also exports utility functions:

```tsx
import {
  getVisiblePages,
  getRenderRange,
  getNextIndex,
  getPreviousIndex,
  isValidIndex,
  getCurrentPage,
  getTotalPages,
} from 'spin-slider';
```

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## License

MIT
