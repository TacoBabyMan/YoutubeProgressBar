// ==UserScript==
// @name         YT Progress Bar
// @namespace    bing bong
// @version      1.0.0
// @description  Adds a progress bar to youtube
// @author       Neo Sahadeo
// @match        https://www.youtube.com/*
// ==/UserScript==

(function() {
const run = setInterval(()=>{
  if(document.getElementById('end')!=null){
    clearInterval(run);
    document.querySelector('html').insertAdjacentHTML("afterbegin",`
    <youtube-progress-bar-neoVersion style="top:0px;left:0px;display:none;">
      <highlightbar></highlightbar>
    </youtube-progress-bar-neoVersion>
    <style>
      menuContainerPBmini{
        display: flex;
        max-width: 48px;
        max-height: 48px;
        min-width: 48px;
        min-height: 48px;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        z-index: 9997;
      }
      menuContainerPB{
        display: flex;
        padding-right: 11px;
        max-width: 40px;
        max-height: 40px;
        min-width: 40px;
        min-height: 40px;
        justify-content: center;
        align-items: center;
      }
      youtube-progress-bar-neoVersion{
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        transform: translate(-50%,-50%);
        height: 2vh;
        background-color: #212121;
        z-index: 9998;
        border-radius: 36px;
        box-shadow: 0px 9px 6px -2px rgba(0,0,0,0.69);

      }
      highlightbar{
        display: block;
        position: relative;
        margin-left: 20px;
        margin-right: 20px;
        width: 100%;
        height: 0.3vh;
        background-color: white;
        z-index: 9999;
      }
      #progressBarSVG{
        cursor: pointer;
      }
      #progressBarSVG * {
        pointer-events: none;
      }
      #progressBarSVG:hover + moveOptionPB{
        animation-name: animateIn;
        animation-duration: 0.2s;
      }
      #progressBarSVGmini{
        z-index: 9999;
        cursor: pointer;
      }
      #progressBarSVG * {
        pointer-events: none;
      }
      #progressBarSVGmini:hover + moveOptionPBmini{
        animation-name: animateIn;
        animation-duration: 0.2s;
      }
      input{
        cursor: pointer;
      }
      @keyframes animateIn{
        0%{
          opacity: 0;
          width: 150px;
        }
        65%{
          opacity: 1;
          width: 166px;
        }
        100%{
          width: 162px;
        }
      }
    </style>
    `);

    let duration = document.querySelector('video').duration;
    let calcRect = false;

    document.getElementById('end').insertAdjacentHTML("afterbegin",`
    <menuContainerPB>
      <svg id="progressBarSVG" width="24" height="24" viewBox="0 0 45 44" fill="none" xmlns="http://www.w3.org/2000/svg" style="filter: invert(1);">
        <path d="M11.9329 40.9819L0.78443 19.5108C0.275628 18.5308 0.103106 17.4108 0.293437 16.3232C1.15119 11.4218 7.84209 10.6036 9.85562 15.1539L11.8273 19.6098C11.9423 19.8696 12.0756 20.1209 12.2262 20.3619L21.6474 35.4358C23.9775 39.164 21.2972 44 16.9007 44C14.8113 44 12.8958 42.8363 11.9329 40.9819Z" fill="#111111"/>
        <path d="M15.4892 8.81728L31.1285 38.2245C32.7802 41.3303 36.7374 42.3554 39.6893 40.4421L40.326 40.0295C42.9617 38.3211 43.8338 34.8692 42.3259 32.114L26.4572 3.11942C25.4046 1.19602 23.3866 0 21.194 0H20.7866C16.2602 0 13.3638 4.82088 15.4892 8.81728Z" fill="#111111"/>
        <path d="M44.7 7.79167L42.3019 2.12952C41.7552 0.83862 40.4893 0 39.0874 0C36.692 0 35.0082 2.35731 35.7851 4.62318L37.8122 10.5357C38.4699 12.4537 40.5507 13.4831 42.4743 12.8419C43.9826 12.3391 45 10.9276 45 9.33772V9.26924C45 8.76159 44.898 8.25912 44.7 7.79167Z" fill="#111111"/>
      </svg>
      <moveOptionPB style="width:162px;border-radius:10px;align-items:center;justify-content:center;flex-direction:column;display:none;height:65px;position:absolute;top:56px;filter:drop-shadow(-2px 8px 10px black);background-color:#303030;">
        <p><input type="range" min="1" max="100" value="50" id="rangeX">x</p>
        <p><input type="range" min="1" max="100" value="50" id="rangeY">y</p>
      </moveOptionPB>
    </menuContainerPB>
    `);
    // document.querySelector('[class="ytp-right-controls"]').insertAdjacentHTML("afterbegin",`
    // <menuContainerPBmini>
    //   <svg id="progressBarSVGmini" width="24" height="24" viewBox="0 0 45 44" fill="none" xmlns="http://www.w3.org/2000/svg" style="filter: invert(1);">
    //     <path d="M11.9329 40.9819L0.78443 19.5108C0.275628 18.5308 0.103106 17.4108 0.293437 16.3232C1.15119 11.4218 7.84209 10.6036 9.85562 15.1539L11.8273 19.6098C11.9423 19.8696 12.0756 20.1209 12.2262 20.3619L21.6474 35.4358C23.9775 39.164 21.2972 44 16.9007 44C14.8113 44 12.8958 42.8363 11.9329 40.9819Z" fill="#111111"/>
    //     <path d="M15.4892 8.81728L31.1285 38.2245C32.7802 41.3303 36.7374 42.3554 39.6893 40.4421L40.326 40.0295C42.9617 38.3211 43.8338 34.8692 42.3259 32.114L26.4572 3.11942C25.4046 1.19602 23.3866 0 21.194 0H20.7866C16.2602 0 13.3638 4.82088 15.4892 8.81728Z" fill="#111111"/>
    //     <path d="M44.7 7.79167L42.3019 2.12952C41.7552 0.83862 40.4893 0 39.0874 0C36.692 0 35.0082 2.35731 35.7851 4.62318L37.8122 10.5357C38.4699 12.4537 40.5507 13.4831 42.4743 12.8419C43.9826 12.3391 45 10.9276 45 9.33772V9.26924C45 8.76159 44.898 8.25912 44.7 7.79167Z" fill="#111111"/>
    //   </svg>
    //   <div style="position:absolute;">
    //     <moveOptionPBmini style="left:-76px;width:162px;border-radius:10px;align-items:center;justify-content:center;flex-direction:column;display:none;height:90px;position:absolute;top:-110px;filter:drop-shadow(-2px 8px 10px black);background-color:#303030;">
    //       <p><input type="range" min="1" max="100" value="50" id="rangeXmini">x</p>
    //       <p><input type="range" min="1" max="100" value="50" id="rangeYmini">y</p>
    //     </moveOptionPBmini>
    //   </div>
    // </menuContainerPBmini>
    // `);document.querySelector('[class="ytp-right-controls"]').style.display='flex';

    const sliderX = document.getElementById('rangeX');
    const sliderY = document.getElementById('rangeY');
    let pixXValue;
    let pixYValue;
    sliderX.oninput = () => {
      document.querySelector('youtube-progress-bar-neoVersion').style.left = sliderX.value + "%";
      document.cookie = `pixXValue=${sliderX.value}`;
      console.log(sliderX.value);
    };
    sliderY.oninput = () => {
      document.querySelector('youtube-progress-bar-neoVersion').style.top = sliderY.value + "%";
      document.cookie = `pixYValue=${sliderY.value}`;

    };

    mouseOnMenu = false;
    const menuMouseOver = () => {
      let pos = document.querySelector('#progressBarSVG').getBoundingClientRect();
      document.querySelector('moveOptionPB').style.right = (window.innerWidth - pos.left - 69) + "px";
      document.querySelector('moveOptionPB').style.display = 'flex';
    };
    const menuMouseOut = () => {
      setTimeout(()=>{
        if(!mouseOnMenu){
          document.querySelector('moveOptionPB').style.display = 'none';
        }
      },1000);
    };
    //-------------------------
    // const menuMouseOvermini = () => {
    //   document.querySelector('moveOptionPBmini').style.display = 'flex';
    // };
    // const menuMouseOutmini = () => {
    //   setTimeout(()=>{
    //     if(!mouseOnMenu){
    //       document.querySelector('moveOptionPBmini').style.display = 'none';
    //     }
    //   },600);
    // };
    //------------------------------

    document.querySelector('#progressBarSVG').addEventListener('click',function(){
      if(!calcRect){
        menuMouseOver();

        document.querySelector('moveOptionPB').addEventListener('mouseover',()=>{
          mouseOnMenu = true;
        });
        document.querySelector('moveOptionPB').addEventListener('mouseout',()=>{
          mouseOnMenu = false;
          menuMouseOutmini();
        });

        calcRect = true;
      }
      if(document.querySelector('youtube-progress-bar-neoVersion').style.display === 'none'){
        document.querySelector('youtube-progress-bar-neoVersion').style.display = 'flex';
        document.querySelector('#progressBarSVG').style.filter = 'drop-shadow(1px -1px 1px white)';
        //-------
        // document.querySelector('#progressBarSVGmini').style.filter = 'drop-shadow(1px -1px 1px white)';
        //-------
        menuMouseOver();
        document.querySelector('#progressBarSVG').addEventListener('mouseover',menuMouseOver);
        document.querySelector('#progressBarSVG').addEventListener('mouseout',menuMouseOut);
        document.querySelector('moveOptionPB').addEventListener('mouseout',menuMouseOut);
        // //----------------------
        // document.querySelector('#progressBarSVGmini').addEventListener('mouseover',menuMouseOvermini);
        // menuMouseOvermini();
        // document.querySelector('#progressBarSVGmini').addEventListener('mouseout',menuMouseOutmini);

      }else{
        document.querySelector('youtube-progress-bar-neoVersion').style.display = 'none';
        document.querySelector('#progressBarSVG').style.filter = 'invert(1)';
        //--------------
        // document.querySelector('#progressBarSVGmini').style.filter = 'invert(1)';
        //----------------
        document.querySelector('#progressBarSVG').removeEventListener('mouseover',menuMouseOver);
        document.querySelector('#progressBarSVG').removeEventListener('mouseout',menuMouseOut);
        document.querySelector('moveOptionPB').removeEventListener('mouseout',menuMouseOut);
        document.querySelector('moveOptionPB').style.display = 'none';
        menuMouseOut();
        //---------------------------
        // document.querySelector('#progressBarSVGmini').removeEventListener('mouseover',menuMouseOvermini);
        // document.querySelector('#progressBarSVGmini').removeEventListener('mouseout',menuMouseOutmini);
        // menuMouseOutmini();
      }
    });

    //  ##### Removed as is was uncomfortable to used ##### Switched to sliders as it's much of a pleasurable expierence

    // let mouseX;
    // let mouseY;
    // let elementH;
    // let elementW;
    // let initialMouseX;
    // let initialMouseY;
    // let mouseIsDown = false;
    // document.querySelector('body').addEventListener('mousemove',function(event){
    //   if(mouseIsDown){
    //     mouseX = event.clientX;
    //     mouseY = event.clientY;
    //     //document.querySelector('youtube-progress-bar-neoVersion').style.transform = `translate(${100*initialMouseX/elementW},-50%)`;
    //     document.querySelector('youtube-progress-bar-neoVersion').style.top = mouseY + "px";
    //     document.querySelector('youtube-progress-bar-neoVersion').style.left = mouseX + "px";
    //   }
    // });

    // #####


    // document.querySelector('youtube-progress-bar-neoVersion').addEventListener('mousedown',function(event){
    //   document.querySelector('html').insertAdjacentHTML("afterbegin",`
    //   <cssInjection>
    //     <style>
    //       *{
    //         user-select: none;
    //       }
    //     </style>
    //   </cssInjection>
    //   `);
    //   elementH = window.innerHeight*2/100;
    //   elementW = document.querySelector('youtube-progress-bar-neoVersion').style.width
    //   elementW = elementW.replace(/\D/g,'');
    //   initialMouseX = event.clientX;
    //   initialMouseY = event.clientY;
    //   mouseIsDown = true;
    // })
    // document.querySelector('youtube-progress-bar-neoVersion').addEventListener('mouseup',function(){
    //   document.querySelector('cssInjection').remove();
    //   mouseIsDown = false;
    // });

    let currentTime;
    let customisable = false;
    async function playbackTrack(){
      currentTime = document.querySelector('video').currentTime;
      let watched = 100*(currentTime/duration);
      document.querySelector('highlightbar').style.width = watched + "%";
      setTimeout(playbackTrack,1);
    }
    playbackTrack();

    const sizeObserver = function(){
      if(!customisable){
        let width = document.querySelector('video').style.width;
        width = width.replace(/\D/g,'');
        width = width - (0.1*width);
        duration = document.querySelector('video').duration;

        if(document.cookie.split('; ').find((row) => row.startsWith('sliderX=')) === undefined){
          pixXValue = (sliderX.value/100) * window.innerWidth;
          pixYValue = (sliderY.value/100) * window.innerHeight;
        }else{
          let localX = parseInt(document.cookie.split('; ').find((row) => row.startsWith('pixXValue='))?.split('=')[1]);
          let localY = parseInt(document.cookie.split('; ').find((row) => row.startsWith('pixYValue='))?.split('=')[1]);
          document.getElementById('rangeX').value = localX;
          document.getElementById('rangeY').value = localY;
          pixXValue = (localX/100) * window.innerWidth;
          pixYValue = (localY/100) * window.innerHeight;
        }

        document.querySelector('youtube-progress-bar-neoVersion').style.width = width + "px";
        document.querySelector('youtube-progress-bar-neoVersion').style.top = pixYValue + "px";
        document.querySelector('youtube-progress-bar-neoVersion').style.left = pixXValue + "px";
      }
    }
    const observer = new MutationObserver(sizeObserver);
    observer.observe(document.querySelector('video'),{attributes:true})
  }
},50);
})();
