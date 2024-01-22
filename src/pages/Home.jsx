import Main from '../components/Main';
import Row from '../components/Row';
import requests from '../Requests';

function Home() {
  return (
    <div>
      <Main />
      <Row title="Up coming" fetchURL={requests.requestUpcoming} />
      <Row title="Popular" fetchURL={requests.requestPopular} />
      <Row title="Trending" fetchURL={requests.requestTrending} />
      <Row title="Top rated" fetchURL={requests.requestTopRated} />
    </div>
  );
}

export default Home;
