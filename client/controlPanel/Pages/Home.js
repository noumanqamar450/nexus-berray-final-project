import { useEffect } from 'react';
import '../Assets/Css/App.css';
import PendingOrder from '../Components/Home/PendingOrder';
import MakingOrder from '../Components/Home/MakingOrder';
import ShippedOrder from '../Components/Home/ShippedOrder';
import CompleteOrder from '../Components/Home/CompleteOrder';

function App() {
  useEffect(()=>{
    document.title = 'Dashboard - LFC'
  },[])
  return (
    <div className="App dashboard">
      <h2 className="py-3">Dashboard</h2>
      <div className="row">
        <div className="col-lg-3 col-md-6">
          <PendingOrder/>
        </div>
        <div className="col-lg-3 col-md-6">
          <MakingOrder/>
        </div>
        <div className="col-lg-3 col-md-6">
          <ShippedOrder/>
        </div>
        <div className="col-lg-3 col-md-6">
          <CompleteOrder/>
        </div>
      </div>
    </div>
  );
}

export default App;
