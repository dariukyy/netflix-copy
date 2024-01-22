const key = '47311d3e26f3d7e64f7a4bba01e6e3cb';

const requests = {
  requestUpcoming: `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=en-US&page=1`,

  requestTrending: `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=en-US&page=2`,

  requestPopular: `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1`,
  requestTopRated: `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US&page=1`,
};

export default requests;
