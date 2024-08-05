
import './App.css';
import {BrowserRouter ,Route,Routes} from 'react-router-dom'

import Navbar from './navbar/Navbar';
import Card from './component/certificates/indexCard/Card';
import Org from './component/certificates/genneration/OrignalCertificate'
import Find from './component/find/Find';

import PdfView from './component/view/PdfView';

import CertificateTemplate from './component/certificates/programCertificate/CertificateTemplate';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
    
      <Routes>
        
        <Route path='/' element={<Card/>}/>
        <Route path='/org' element={<Org/>}/>
        <Route path='/find' element = {<Find/>}/>
        
        <Route path='/pdf' element ={<PdfView/>}/>
        
        
        <Route path="/view/:id" element={<CertificateTemplate />} />
       
      </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
