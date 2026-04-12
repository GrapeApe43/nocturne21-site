//the footer of the site would be handled in this javascript file, so you don't have to copypaste the whole thing onto every page.
//at the bottom of your page, but before the js script calls and the closing body tag, put an empty div with a class of "writeFooter"
document.querySelector(".writeFooter").innerHTML = `

<hr>
    <footer align="center">
        <div align="center" id="nav">
            <a href="index.html">HOME</a> |
            <a href="archive.html">ARCHIVE</a> |
            <a href="about.html">ABOUT</a> |
            <a href="cast.html">CAST</a>  |
            <a href="n21-journal.html">BLOG</a> |  
            <a href="extras.html">EXTRAS</a> |    
            <a href="support.html">SUPPORT</a>
        </div><br><br>
  <script type="text/javascript" src="https://www.comicad.net/r/Q4qCNYu30R/" width="100%"></script>     

             <p>Copyright 2026 April Ferrero</p>    
             
          
             
              <p><strong>Powered by</strong></p>
        <a href="https://rarebit.neocities.org"><img src="img/rarebitlogo_small.png" height = "30" /></a>     
        
     
        
    </div>
    </footer>
`;
