//the header of the site would be handled in this javascript file, so you don't have to copypaste the whole thing onto every page.
//at the bottom of your page, but before the js script calls and the closing body tag, put an empty div with a class of "writeHeader"
document.querySelector(".writeHeader").innerHTML = `
    <header align="center">
        

        <div align="center" id="nav">
            <a href="index.html">HOME</a> |
            <a href="archive.html">ARCHIVE</a> |
            <a href="about.html">ABOUT</a> |
            <a href="cast.html">CAST</a>  |
            <a href="blog.html">BLOG</a>  |
            <a href="extras.html">EXTRAS</a> |
            
            
            <a href="https://patreon.com/nocturne21">PATREON</a>
        </div>
       
         <a href="index.html"><img src="./img/logo.png" alt="" /></a> 

    
    </div>    
    </header>
    
`;