import { useEffect, useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { UserAuth } from '../context/AuthContext';
import { db } from '../firebase';
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from 'firebase/firestore';
import toast from 'react-hot-toast';
function Movie({ item }) {
  const [like, setLike] = useState(false);
  const [saved, setSaved] = useState(false);
  const { user } = UserAuth();

  const movieId = doc(db, 'users', `${user?.email}`);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docSnapshot = await getDoc(movieId);
        const data = docSnapshot.data();
        if (data && data.savedShows) {
          const isMovieSaved = data.savedShows.some(
            (show) => show.id === item.id,
          );
          setSaved(isMovieSaved);
          setLike(isMovieSaved);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (user?.email) {
      fetchData();
    }
  }, [user?.email, item.id, movieId]);

  const saveShow = async () => {
    if (user?.email) {
      // Use functional form for state updates
      setSaved((prevSaved) => !prevSaved);

      // Update database
      await updateDoc(movieId, {
        savedShows: saved
          ? arrayRemove({
              id: item.id,
              title: item.title,
              img: item.backdrop_path,
            })
          : arrayUnion({
              id: item.id,
              title: item.title,
              img: item.backdrop_path,
            }),
      });

      // Use functional form for state updates
      setLike((prevLike) => !prevLike);
    } else {
      toast.error('Please sign up to save a movie');
    }
  };

  return (
    <div
      key={item.id}
      className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2 text-white"
    >
      <img
        className="w-full h-auto block"
        src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`}
        alt={item?.title}
      />
      <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
        <p className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center">
          {item?.title}
        </p>
        <p onClick={saveShow}>
          {like || saved ? (
            <FaHeart className="absolute left-4 top-4 text-red-700" />
          ) : (
            <FaRegHeart className="absolute left-4 top-4 text-gray-300" />
          )}
        </p>
      </div>
    </div>
  );
}

export default Movie;
