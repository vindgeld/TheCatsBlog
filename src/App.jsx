import { useEffect, useState } from 'react';
import './App.css';


function App() {

/* Papaprase to import our goggle sheet 1BMroS0nG5xjp08i4pElZF6Mn4qPix8Ui-CrCgd2SEGI ######## 2PACX-1vTuRicELuRPIJutCDIi9BdcY3jc_SUGfdiNOaaVHC476070kXj3EQO_Zv9EH21w5BhH9b4O6KyujXwE    */
  const Papa = require("papaparse");

  const filePrasing = () => new Promise((resolve)=> {
    Papa.parse("https://docs.google.com/spreadsheets/d/e/2PACX-1vRYbEFf1j2Ehu_-sl-SSVRupZvIWUAzJ0wi5fPpuORyM1atNSfxtqDAnrpcPH3EXciltIbH0LOiGfZE/pub?gid=0&single=true&output=csv", {
      download: true,
      header: true,
      newline: "",
      complete: function(results, file) {
        resolve(results.data);
      }
    })
  })

  const getData = async() => {
    const data = await filePrasing();
    return data
  }
/* Papaprase to import our goggle sheet */

/* our data variable */
  const [data, setData] = useState([])

  useEffect(() => {
    getData().then((res)=> setData([...res]))
  }, []);
/* our data variable */

/* Article popup */
  const loadArticle = (id) => {
    document.getElementById('article').innerHTML= data[id-1].body //adds the article body to the articleParagraph/article <p>
    document.getElementById('articles').style.filter = 'blur(10px)' //adds the blur effect to the background
    document.getElementById('articleParagraph').style.visibility = 'visible' //makes the articleParagraph <div> visible
    document.querySelector('body').style.overflow ='hidden' //Disables the website scrolling feature
  }
/* Article popup */

/* Article close toggle */
  const hide = () => {
    document.getElementById('articles').style.filter = 'blur(0px)' //Removes the blur effect
    document.getElementById('articleParagraph').style.visibility = 'hidden' //hides the articleParagraph <div>
    document.querySelector('body').style.overflow ='scroll' //enables the website scrolling feature
  }
/* Article close toggle */

  return (
    <div className="App">
      <div className='header'>
        <h1 className='logo'>The Cats Blog</h1>
      </div>
      <div id='articleParagraph' >
        <p id='article'></p>
        <img src="../close.svg" className='closeIcon' onClick={()=>hide()} />
      </div>
      <div className='articlesContainer'>
        <div id='articles'>
          {
            data.map(
              (el)=>(
                <div className='block' key={el.ID} >
                  <h1 className='articleTitle' onClick={()=>loadArticle(el.ID)}>{el.title}</h1>
                  <img src={el.image} className='image' onClick={()=>loadArticle(el.ID)}/>
                </div>
              )
            )
          }
        </div>
          <div className='footer'>
            <p className='footerText'>This web site was created by Reda-codes</p>
            <ul>
              <li><a href="https://github.com/Reda-codes" target="_blank">GitHub</a></li>
              <li><a href="https://www.linkedin.com/in/reda-med/" target="_blank">LinkedIn</a></li>
            </ul>
          </div>
      </div>
    </div>
  );
}

export default App;
