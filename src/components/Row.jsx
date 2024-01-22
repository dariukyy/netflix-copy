import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import Movie from './Movie';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import useCustomSlider from '../hooks/useSliderHook';
import { useMediaQuery } from 'react-responsive'; //
// Import the custom hook

function Row({ title, fetchURL }) {
  const [movies, setMovies] = useState([]);
  const sliderRef = useRef(null); // Create a ref for the slider

  useEffect(() => {
    axios.get(fetchURL).then((res) => setMovies(res.data.results));
  }, [fetchURL]);

  // Use the custom hook
  const { showLeftArrow, showRightArrow, slideLeft, slideRight } =
    useCustomSlider(sliderRef);

  const isHoverEnabled = useMediaQuery({ query: '(hover: hover)' });

  return (
    <>
      <h2 className="text-white font-bold md:text-xl p-4">{title}</h2>
      <div className="relative flex items-center group">
        {isHoverEnabled && (
          <MdChevronLeft
            onClick={slideLeft}
            className={`bg-white rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 ${
              showLeftArrow ? 'block' : 'hidden'
            } left-0`}
            size={40}
          />
        )}
        <div
          ref={sliderRef} // Assign the ref to the slider
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative"
        >
          {movies.map((item, id) => (
            <Movie item={item} key={id} />
          ))}
        </div>
        {isHoverEnabled && (
          <MdChevronRight
            onClick={slideRight}
            className={`bg-white rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 ${
              showRightArrow ? 'block' : 'hidden'
            } right-0`}
            size={40}
          />
        )}
      </div>
    </>
  );
}

export default Row;
