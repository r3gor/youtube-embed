import React, { useEffect, useRef } from 'react';

export const YtbVideo = () => {
  const playerRef = useRef(null);
  const img = useRef(null);
  const playerContainer = useRef(null);

  const onYouTubeIframeAPIReady = () => {
    playerRef.current = new window.YT.Player(playerRef.current, {
      height: '360',
      width: '640',
      // videoId: 'sS5iXkuVJ_k',
      videoId: 'oGT9zLC5h3s',
      playerVars: {
        autoplay: 1,
        controls: 0,
        modestbranding: 1,
        rel: 0,
        iv_load_policy: 3,
        fs: 0,
        showinfo: 0,
      },
      events: {
        'onReady': (event) => {
          event.target.playVideo();
        },
        'onStateChange': (event) => {
          if (event.data === window.YT.PlayerState.ENDED) {
            playerContainer.current.style.display = 'none';
            img.current.style.display = 'block';
          }
        },
      },
    });
  };

  useEffect(() => {
    if (window.YT && window.YT.Player) {
      onYouTubeIframeAPIReady();
    } else {
      window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
    }

    return () => {
      if (playerRef.current && playerRef.current.destroy) {
        playerRef.current.destroy();
      }
    };
  }, []);

  const play = () => {
    playerContainer.current.style.display = 'block';
    img.current.style.display = 'none';
    playerRef.current.playVideo();
  }

  return <div>
    <div style={{display: "none"}} ref={playerContainer}>
      <div id="player" ref={playerRef}></div>
    </div>

    <img ref={img} onClick={play} src='https://i0.wp.com/puppis.blog/wp-content/uploads/2022/02/abc-cuidado-de-los-gatos-min.jpg?resize=521%2C346&ssl=1'/>

    {/* <div> */}
    {/*   <iframe  */}
    {/*     // id="player" ref={playerRef}  */}
    {/*     class="object-cover w-full h-full scale-[1.02]"  */}
    {/*     style={{display: "none"}} */}
    {/*     src="https://www.youtube.com/embed/sS5iXkuVJ_k?autoplay=1&amp;controls=0&amp;modestbranding=1&amp;rel=0&amp;iv_load_policy=3&amp;fs=0" */}
    {/*     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" */}
    {/*     allowfullscreen="" */}
    {/*   ></iframe> */}
    {/* </div> */}
  </div>;
}
