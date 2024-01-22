import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { UserAuth } from '../context/AuthContext';
import { useEffect, useRef, useState } from 'react';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { AiOutlineClose } from 'react-icons/ai';
import toast from 'react-hot-toast';
import useCustomSlider from '../hooks/useSliderHook';
import { useMediaQuery } from 'react-responsive';

function SavedShows() {
  const [movies, setMovies] = useState([]);
  const { user } = UserAuth();
  const sliderRef = useRef(null); // Create a ref for the slider element
  const isHoverEnabled = useMediaQuery({ query: '(hover: hover)' });

  const { showLeftArrow, showRightArrow, slideLeft, slideRight } =
    useCustomSlider(sliderRef);

  const moviesLenght = movies?.length;

  useEffect(() => {
    const fetchData = async () => {
      const userDocRef = doc(db, 'users', `${user?.email}`);
      const unsubscribe = onSnapshot(userDocRef, (doc) => {
        setMovies(doc.data()?.savedShows);
      });

      return () => unsubscribe(); // Cleanup function to unsubscribe from the snapshot listener
    };

    fetchData();
  }, [user?.email]);

  const movieRef = doc(db, 'users', `${user?.email}`);

  const deleteShow = async (passedID) => {
    try {
      const result = movies.filter((item) => item.id !== passedID);
      await updateDoc(movieRef, {
        savedShows: result,
      });
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div>
      <h2 className="text-white font-bold md:text-xl p-4">
        My Shows {`(${moviesLenght})`}
      </h2>
      <div className="relative flex items-center group">
        {isHoverEnabled && showLeftArrow && (
          <MdChevronLeft
            onClick={slideLeft}
            className="bg-white rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block left-0"
            size={40}
          />
        )}
        <div
          ref={sliderRef} // Attach the ref to the slider element
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative"
        >
          {movies.map((item, id) => (
            <div
              key={id}
              className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2 text-white"
            >
              <img
                className="w-full h-auto block"
                src={`https://image.tmdb.org/t/p/w500/${item?.img}`}
                alt={item?.title}
              />
              <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
                <p className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center">
                  {item?.title}
                </p>
                <p
                  onClick={() => deleteShow(item.id)}
                  className="absolute text-gray-300 top-4 right-4"
                >
                  <AiOutlineClose />
                </p>
              </div>
            </div>
          ))}
        </div>
        {isHoverEnabled && showRightArrow && (
          <MdChevronRight
            onClick={slideRight}
            className="bg-white rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block right-0 md:hidden"
            size={40}
          />
        )}
      </div>
    </div>
  );
}

export default SavedShows;
