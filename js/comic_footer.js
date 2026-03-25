//the footer of the site would be handled in this javascript file, so you don't have to copypaste the whole thing onto every page.
//at the bottom of your page, but before the js script calls and the closing body tag, put an empty div with a class of "writeFooter"
document.querySelector(".writeFooter").innerHTML = `
    <footer align="center">
  <div align="center">
      <p><b><a href="https://nocturne21.neocities.org/">HOME</a> | 
      <a href="https://nocturne21.neocities.org/archive">ARCHIVE</a> | 
      <a href="https://nocturne21.neocities.org/about">ABOUT</a> | 
      <a href="https://nocturne21.neocities.org/cast">CAST</a> | 
      <a href="blog.html">BLOG</a>  |
      <a href="https://www.patreon.com/nocturne21">PATREON</a></b></p><br>
      
          <div class="socialicons" align="center">
<a href="https://discord.gg/FCkUWf7awk" target="blank"><img src="img/social/discord.png" onmouseover="this.src='/img/social/discord2.png'" onmouseout="this.src='/img/social/discord.png'"/></a>
<a href="https://bsky.app/profile/grape-ape.bsky.social" target="blank"><img src="img/social/bluesky.png" onmouseover="this.src='/img/social/bluesky2.png'" onmouseout="this.src='/img/social/bluesky.png'"/></a>
<a href="https://cara.app/grapeape" target="blank"><img src="img/social/cara.png" onmouseover="this.src='/img/social/cara2.png'" onmouseout="this.src='/img/social/cara.png'"/></a>
<a href="https://twitter.com/aprilferreroart" target="blank"><img src="img/social/twitter.png" onmouseover="this.src='/img/social/twitter2.png'" onmouseout="this.src='/img/social/twitter.png'"/></a>
<a href="https://www.tumblr.com/nocturne-21" target="blank"><img src="img/social/tumblr.png" onmouseover="this.src='/img/social/tumblr2.png'" onmouseout="this.src='/img/social/tumblr.png'"/></a>
<a href="https://instagram.com/aprilferreroart" target="blank"><img src="img/social/instagram.png" onmouseover="this.src='/img/social/instagram2.png'" onmouseout="this.src='/img/social/instagram.png'"/></a>
<a href="https://ko-fi.com/nocturne21" target="blank"><img src="img/social/kofi.png" onmouseover="this.src='/img/social/kofi2.png'" onmouseout="this.src='/img/social/kofi.png'"/></a>
<a href="https://www.patreon.com/nocturne21" target="_blank"><img src="img/social/patreon.png" alt="ALTTEXT" onmouseover="this.src='/img/social/patreon2.png'" onmouseout="this.src='/img/social/patreon.png'"/></a>
<a href="https://www.tiktok.com/@aprilferrero?_t=8p1tFELZj6X&_r=1" target="blank"><img src="img/social/tiktok.png" onmouseover="this.src='/img/social/tiktok2.png'" onmouseout="this.src='/img/social/tiktok.png'"/></a>
        </div>
        
        <br><br>

             <p>Copyright 2024 April Ferrero</p>    
             
          
             
              <p><strong>Powered by</strong></p>
        <a href="https://rarebit.neocities.org"><img src="img/rarebitlogo_small.png" height = "30" /></a>     
        
     
        
    </div>
    </footer>
`;
