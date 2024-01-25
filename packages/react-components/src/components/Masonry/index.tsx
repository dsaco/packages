import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import styled from '@emotion/styled';
import { animated, useTransition } from '@react-spring/web';
import { debounce } from '@dsaco/utils';

import { useMeasure, useMedia } from '../hooks';

const StyledContainer = styled.div`
  position: relative;
  width: 100%;
`;

const StyledAnimatedItem = styled(animated.div)<{ gutter: number }>`
  position: absolute;
  will-change: transform, width, height, opacity;
  padding: ${({ gutter }) => gutter}px;
`;

export type MasonryProps<T = any> = {
  list: T[];
  render?: (props: T) => React.ReactNode;
  gutter?: number;
  rowKey?: string | number;
};

export const Masonry: React.FC<MasonryProps> = ({
  list = [],
  render,
  gutter = 16,
  rowKey = 'id',
}) => {
  const columns = useMedia(
    ['(min-width: 1500px)', '(min-width: 1000px)', '(min-width: 600px)'],
    [5, 4, 3],
    2
  );

  const [ref, { width }] = useMeasure<HTMLDivElement>();
  const [items, setItems] = useState<{ height: number; [key: string]: any }[]>(
    []
  );

  const [heights, gridItems] = useMemo(() => {
    const heights = new Array(columns).fill(0);
    const columnWidth = width / columns;
    const gridItems = items.map((item) => {
      const column = heights.indexOf(Math.min(...heights));
      const height = item.height;
      const y = (heights[column] += height) - height;

      return {
        ...item,
        x: columnWidth * column,
        y,
        width: columnWidth,
        height,
      };
    });

    return [heights, gridItems];
  }, [columns, width, items]);
  const transitions = useTransition(gridItems, {
    key: (item: { key: string | number }) => item.key,
    from: ({ x, y, width, height }) => ({ x, y, width, height, opacity: 0 }),
    enter: ({ x, y, width, height }) => ({ x, y, width, height, opacity: 1 }),
    update: ({ x, y, width, height }) => ({ x, y, width, height }),
    leave: { opacity: 0 },
    config: { mass: 5, tension: 500, friction: 100 },
    trail: 25,
  });

  const heightMap = useMemo(() => new Map(), []);

  const generate: any = useCallback(
    debounce(() => {
      const _items = list.map((item) => {
        return Object.assign(item, {
          height: heightMap.get(item),
          key: item[rowKey],
        });
      });
      setItems(_items);
    }, 100),
    [list]
  );

  return (
    <div>
      <StyledContainer ref={ref} style={{ height: Math.max(...heights) }}>
        {transitions((style, item) => (
          <StyledAnimatedItem style={style} gutter={gutter}>
            {render?.(item)}
          </StyledAnimatedItem>
        ))}
      </StyledContainer>
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          width: width / columns,
          visibility: 'hidden',
          zIndex: -1,
          height: 0,
          overflow: 'hidden',
        }}
      >
        {list.map((item) => (
          <Layout
            key={item[rowKey]}
            onLayout={(h) => {
              heightMap.set(item, h);
              if (heightMap.size === list.length && list.length !== 0) {
                generate();
              }
            }}
          >
            <div style={{ padding: gutter }}>{render?.(item)}</div>
          </Layout>
        ))}
      </div>
    </div>
  );
};

const Layout: React.FC<{
  children?: React.ReactNode;
  onLayout: (h: number) => void;
}> = ({ children, onLayout }) => {
  const ref = useRef(null);
  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      onLayout(entries[0].contentRect.height);
    });
    observer.observe(ref.current as unknown as HTMLElement);

    return () => {
      observer.disconnect();
    };
  }, []);
  return <div ref={ref}>{children}</div>;
};

// const Item: React.FC<{
//   children?: React.ReactNode;
//   onLayout?: (height: number) => void;
// }> = ({ children, onLayout }) => {
//   const ref = useRef<HTMLDivElement>(null);
//   useLayoutEffect(() => {
//     if (ref.current) {
//       const imgs = ref.current?.querySelectorAll('img') ?? [];
//       const len = imgs.length;
//       if (len === 0) {
//         onLayout?.(ref.current.clientHeight);
//         setTimeout(() => {
//           console.log(ref.current?.clientHeight);
//         }, 10);
//       } else {
//         let loadedImages = 0;
//         imgs.forEach((img) => {
//           img.onload = () => {
//             loadedImages++;
//             if (loadedImages === len) {
//               onLayout?.((ref.current as HTMLElement).clientHeight);
//             }
//           };
//         });
//       }
//     }
//   }, []);
//   return (
//     <div ref={ref} style={{ width: '100%' }}>
//       {children}
//     </div>
//   );
// };
// const childMap = useMemo(() => {
//   return new Map();
// }, []);
// const [ts, setTs] = useState(0);

// const items = useMemo(() => {
//   return (
//     React.Children.map(children, (c) => {
//       if ((c as any)?.key) {
//         return c;
//       }
//       return null;
//     })?.filter(Boolean) ?? []
//   );
// }, [children]);
// const [heights, gridItems] = useMemo(() => {
//   const heights = new Array(columns).fill(0);
//   const columnWidth = width / columns;
//   const total = items.length;
//   const gridItems =
//     items.map((item, i) => {
//       const column = heights.indexOf(Math.min(...heights));
//       console.log(item);
//       const height = childMap.get((item as React.ReactElement).key) || 0;
//       const x = columnWidth * column;
//       const y = (heights[column] += height) - height;

//       return {
//         node: (
//           <Item
//             onLayout={(h) => {
//               if (h && !childMap.has((item as React.ReactElement).key)) {
//                 childMap.set((item as React.ReactElement).key, h);
//                 console.log(childMap.size, total);
//                 if (childMap.size === total && total !== 0) {
//                   console.log('start ?');
//                   setTs(Date.now());
//                   // setTimeout(() => {
//                   // setTs((prev) => prev++);
//                   // }, 1000);
//                 }
//               }
//             }}
//           >
//             {item}
//           </Item>
//         ),
//         x,
//         y,
//         width: columnWidth,
//         height: height || '',
//         id: (item as React.ReactElement).key,
//       };
//     }) ?? [];

//   return [heights, gridItems];
// }, [columns, width, items, ts]);
