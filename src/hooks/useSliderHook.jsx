import { useEffect, useState } from 'react';

const useCustomSlider = (sliderRef) => {
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const handleScroll = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      const isScrollable = scrollLeft + clientWidth < scrollWidth;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(isScrollable);
    }
  };

  const slideLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft -= 500;
    }
  };

  const slideRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft += 500;
    }
  };

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (sliderRef.current) {
        sliderRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, [sliderRef]);

  return {
    showLeftArrow,
    showRightArrow,
    slideLeft,
    slideRight,
  };
};

export default useCustomSlider;
