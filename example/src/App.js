import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ReactOSMAuth from 'react-osm-auth';

const options =   {
  // url: "https://www.openstreetmap.org",
  oauth_consumer_key: "uoe2GoWiE4r2ZiyuEfe7aFNtQDyPsAI5Wj1enx56",
  oauth_secret: "ytLPz9BYxex5CoL8SSf8wxt2gWk7ky0W4XS4nA4M",
  single_page: true,
  landing: "/authorized",
  auto: true  // show a login form if the user is not authenticated and you try to do a call
}

var onAuthenticated = (details)=>{
  console.log('details',details) // an XML DOM of user details
}

var authInstance = (authInstance)=>{
  console.log('>>>',authInstance) // authInstance of osm-auth
}

const Home = ()=>{
  return(
      <div style={{"textAlign": "center", "marginTop": "50px"}}>
      <ReactOSMAuth {...options} onAuthenticated={onAuthenticated} authInstance={authInstance}/>
    </div>
  )

}

function OsmAuthRedirect() {
  const closeWindow = () => {
   // eslint-disable-next-line no-restricted-globals
    opener && opener.authComplete(window.location.href);
    window.close();
  };
  return <div> {closeWindow()};</div>;
}

function App() {
  return (
    <Router>
       <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/authorized" element={<OsmAuthRedirect/>}/>
        </ Routes>
    </Router>
    
  );
}

export default App;
