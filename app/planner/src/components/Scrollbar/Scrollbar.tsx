import React from 'react'

import css from '@repo/app-commons/css'
import './Scrollbar.css'

interface ScrollbarProps {
  className?: string;

  padding?: number | string;

  borderRadius?: number | string;

  maxHeight: number | string;

  children?: React.ReactNode;
}

export function Scrollbar(
  {
    className = '',
    padding,
    borderRadius,
    maxHeight,
    children
  } : ScrollbarProps ) {
  const thumbRef = React.useRef<HTMLDivElement>(null);
  const trackRef = React.useRef<HTMLDivElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const resizeObserver = React.useRef<ResizeObserver>(null);
  const [ thumbHeight, setThumbHeight ] = React.useState(20);

  function handleResize(ref : Element) {
    requestAnimationFrame(() => {
      const scrollRatio = ref.clientHeight / ref.scrollHeight;
      setThumbHeight(Math.max(scrollRatio * 100, 20));
    });
  }

  React.useEffect(() => {
    if (thumbRef.current && contentRef.current) {
      const contentEle = contentRef.current;

      resizeObserver.current = new ResizeObserver(() => {
        handleResize(contentEle);
      });
      resizeObserver.current.observe(contentEle);
      return () => {
        resizeObserver.current?.unobserve(contentEle);
      };
    }
    return;
  }, []);

  const handleMouseDown = React.useCallback((e: React.MouseEvent) => {
    const ele = thumbRef.current;
    const contentEle = contentRef.current;
    if (!ele || !contentEle) {
      return;
    }
    const startPos = {
      top: contentEle.scrollTop,
      x: e.clientX,
      y: e.clientY,
    };

    const handleMouseMove = (e: MouseEvent) => {
      const dy = e.clientY - startPos.y;
      const scrollRatio = contentEle.clientHeight / contentEle.scrollHeight;
      contentEle.scrollTop = startPos.top + dy / scrollRatio;
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, []);

  const handleScrollContent = () => {
    if (thumbRef.current && contentRef.current) {
      const thumbEle = thumbRef.current;
      const contentEle = contentRef.current;
      thumbEle.style.top = `${(contentEle.scrollTop * 100) / contentEle.scrollHeight}%`;
    }
  };

  const handleTrackClick = React.useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    const trackEle = trackRef.current;
    const contentEle = contentRef.current;
    if (trackEle && contentEle) {
      const { clientY } = e;

      const target = e.target as HTMLDivElement;
      const rect = target.getBoundingClientRect();
      const trackTop = rect.top;

      const thumbOffset = -(thumbHeight / 2);
      const clickRatio = (clientY - trackTop + thumbOffset) / trackEle.clientHeight;
      const scrollAmount = Math.floor(clickRatio * contentEle.scrollHeight);

      contentEle.scrollTo({
        top: scrollAmount,
        behavior: 'smooth',
      });
    }
  }, [thumbHeight]);

  if (thumbHeight === 100) {
    return children;
  }

  return (
    <div
      style={{
        height: maxHeight,
        maxHeight: maxHeight,
      }}
      className={"scroll-container"}>
      <div
        ref={contentRef}
        className={"scroll-containerContent"}
        onScroll={handleScrollContent}>
        {children}
      </div>
      <div className={"scrollbar"}>
        <div
          ref={trackRef}
          onClick={handleTrackClick}
          className={"scrollbar-track"}
        />
        <div
          ref={thumbRef}
          style={{
            height: `${thumbHeight}%`,
            padding: padding,
            borderRadius: borderRadius,
          }}
          className={css("scrollbar-thumb", className)}
          onMouseDown={handleMouseDown}
        />
      </div>
    </div>
  )
}