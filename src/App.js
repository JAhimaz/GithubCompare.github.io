import logo from './logo.svg';
import './css/App.css';
import './css/ProfileCompare.css'
import ProfileCompare from './components/ProfileCompare';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <ProfileCompare />
    </div>
  );
}

export default App;
