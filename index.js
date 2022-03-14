function App() {
  const [quotes, setQuotes] = React.useState([]);
  const [randomQuote, setRandomQuotes] = React.useState("");
  const [currColor, setColor] = React.useState("#2c3e50")
  const [loaded, setLoaded] = React.useState(false)
  const el = React.useRef(null);
  const typed = React.useRef(null);

  const lightpaperfibersURL = "url(https://i.ibb.co/MfhZHTF/lightpaperfibers.png)"
  const transparentpaperfibersURL = "url(https://i.ibb.co/4RVzYhF/transparent.png)"

  const colors = [
    '#0d0036',
    '#02797d',
    '#197041',
    '#2c3e50',
    '#9c5e00',
    '#e74c3c',
    '#ba332f',
    '#342224',
    '#818500',
    '#5e8c8c',
    '#307a21',
    '#802485',
    '#033814',
    '#0e08a6'
  ];
    
  const type = () => {
    var author = randomQuote.author ? randomQuote.author : "No author"

    typed.current = new Typed(el.current, { strings: [
      randomQuote.text + '\n- ' + author
    ],
    typeSpeed: 50});
  }

  const getNewQuote = () => {
    let randomIndex = Math.floor(Math.random() * quotes.length)
    setRandomQuotes(quotes[randomIndex])

    let randColorIndex = Math.floor(Math.random() * colors.length)
    setColor(colors[randColorIndex])
    animateCSS('.card', 'flipInX');
    typed.current.destroy()
  }

  const animateCSS = (element, animation, prefix = 'animate__') =>
    new Promise((resolve, reject) => {
      const animationName = `${prefix}${animation}`;
      const node = document.querySelector(element);

      node.classList.add(`${prefix}animated`, animationName);

      function handleAnimationEnd(event) {
        event.stopPropagation();
        node.classList.remove(`${prefix}animated`, animationName);
        resolve('Animation ended');
      }

      node.addEventListener('animationend', handleAnimationEnd, {once: true});
  });

  React.useEffect(() => {
    async function fetchData() {
      const response = await fetch("https://type.fit/api/quotes")
      const data  = await response.json()
      setQuotes(data);
      let randomIndex = Math.floor(Math.random() * data.length)
      setRandomQuotes(data[randomIndex])
      if(data) {
          setTimeout(() => {setLoaded(true)}, 1000)
      }
    }
    fetchData();
  }, []); 
  
  return (
    <div className="background" style={{backgroundColor: currColor, 
                backgroundImage: transparentpaperfibersURL, 
                    minHeight: "100vh", width: "100vw"}}>
      <div className="container d-flex justify-content-center" 
        style={{minHeight: "100vh"}}>
          <div className="card d-flex align-self-center p-3" 
              style={{ backgroundImage: lightpaperfibersURL,
                        maxWidth: "45vw", minWidth: "45vw"}}>
            <div  id="quote-box" className="card-body" 
                style={{fontFamily: "Special Elite", color: currColor}}>
              <div className="type-wrap">
              <i className="fa fa-quote-left" style={{color: currColor}}> </i> 
              <span className="card-text" style={{whiteSpace: 'pre-wrap'}} ref={el}/>
              </div>
              {
                randomQuote && loaded ? (
                    <>
                    {type()}
                    <span id="text"><i className="fa fa-quote-left" style={{color: currColor}}>
                      </i>{randomQuote.text}</span>
                    <br/>
                    <span id="author" className="pb-2">
                    - {randomQuote.author || "No author"}
                    </span>
                    <div className="row me-2">
                        <div className="col">
                          <a id="tweet-quote" href={
                            "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" +
                            encodeURIComponent('"' + randomQuote.text + '" ' + randomQuote.author)}
                            target="_blank" className="btn pb-0 me-1 col-1"
                            style={{backgroundColor: currColor, 
                                    backgroundImage: transparentpaperfibersURL}}>
                            <i className="fa fa-twitter"></i>
                          </a>
                          <button onClick={(e) => {
                              e.preventDefault();
                              window.open("https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=" +
                              encodeURIComponent(randomQuote.author) +
                              '&content=' +
                              encodeURIComponent(randomQuote.text) +
                              "&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button", "_blank")
                              }}
                              className="btn pb-0 col-1"
                            style={{backgroundColor: currColor, 
                                    backgroundImage: transparentpaperfibersURL, 
                                    outline: 'none'}}>
                            <i className="fa fa-tumblr"></i>
                          </button>
                        </div>
                        <button id="new-quote" onClick={getNewQuote} className="btn col-1 pb-0" 
                        style={{backgroundColor: currColor, backgroundImage: transparentpaperfibersURL}}>
                            <i className="fa fa-chevron-right"></i></button>
                    </div> 
                    </> 
                      ) : (
                        <>
                        <h2 className="animated-background text-area">hidden</h2>
                        <h2 className="animated-background text-area">hidden</h2>
                        <p className="pb-2 d-flex">
                          <span className="animated-background">hidden author name</span>
                        </p>
                        <div className="row me-2">
                          <div className="col">
                            <div className="btn animated-background pb-0 me-1 col-1">
                              <i className="fa fa-tumblr"></i></div>
                            <div className="btn animated-background pb-0 col-1">
                              <i className="fa fa-tumblr"></i></div>
                          </div>
                            <div className="btn animated-background pb-0 col-1">
                              <i className="fa fa-chevron-right"></i></div>
                        </div> 
                        </>
                    )
                  }
            </div>
        </div>
     </div>
    </div>
  );
}
  
ReactDOM.render(<App/>, document.getElementById('app'))