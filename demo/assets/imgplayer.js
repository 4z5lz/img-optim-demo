!function(I){window.sarineAssets&&window.sarineAssets.imagePlayerPlugin||(window.sarineAssets||(window.sarineAssets={}),window.sarineAssets.imagePlayerPlugin||(window.sarineAssets.imagePlayerPlugin=!0),I.imgplay=function(e,d){var t={startImage:0,totalImages:null,imageName:null,urlDir:null,rate:null,height:null,width:null,autoPlay:!0,autoReverse:!1,userInteraction:!0,interactionMode:"default",sharding:!1},i=I(e),a=null,h=null,n=!1,f="forward",p=0,v=0,s=null,r=0,o=0,l=!1,w=this,g=!0;w.settings={},w.frames=[];var u=window.cdn_subdomains||[];w.getShardingURL=function(e,t){return w.settings.sharding&&u.length?(shard=u[t%u.length],e.replace(/\/[^.]*/,"//"+shard)):e},w.init=function(){var n;w.settings=I.extend({},t,d),(a=I('<canvas class="imgplay-canvas">')).prop({height:d.height,width:d.width}),h=a.get(0).getContext("2d"),i.append(a),w.settings.rate||(w.settings.rate=parseInt(w.settings.totalImages/10)),Object.keys(w.settings).map(function(e,t){null===w.settings[e]&&console.error("Sarine imageplayer error: "+e+" is undefined in plugin configuration")}),-1===w.settings.urlDir.indexOf("{num}")&&console.error("Sarine imageplayer error: urlDir should contain {num} string in the image name, like: Image_{num}.jpg"),p=w.settings.totalImages,(n=new Image).onload=function(){i.trigger("firstimgloaded");for(var e=0,t=w.settings.startImage;t<w.settings.totalImages;++t)n='<img class="imageplay_loaded" src="'+w.getShardingURL(w.settings.urlDir,t).replace("{num}",t)+'" />',i.append(n),w.frames[e]=I(n).get(0),e++;if(i.addClass("sarine_imgplay"),i.css({height:d.height,width:d.width}),m(),i.find("img.imageplay_loaded").detach(),w.settings.rate=w.settings.rate<.001?.001:w.settings.rate,w.settings.rate=100<w.settings.rate?100:w.settings.rate,w.settings.autoPlay)w.play();else var a=setInterval(function(){I(n).get(0).complete&&(clearInterval(a),w.toFrame(0==w.settings.startImage?1:w.settings.startImage))},100)},n.src=w.getShardingURL(w.settings.urlDir,w.settings.startImage).replace("{num}",w.settings.startImage)},w.play=function(){n=!0,null!=s&&clearTimeout(s),c(),i.trigger("play")},w.pause=function(){n=!1,null!=s&&clearTimeout(s),i.trigger("pause")},w.stop=function(){n=!1,v="forward"==f?0:w.frames.length-1,w.settings.autoReverse&&(w.frames.reverse(),v=w.frames[v]?v+1:v+2),w.play(),i.trigger("stop",w)},w.toFrame=function(e){if(e=e<0?0:e,w.frames[e])return v=e,c(),I.Deferred().resolve()};var m=function(){var g=I('<div class="imgplay-progress" id="imgplay_move">'),e=I('<div class="imgplay-play-bar">');function u(e,t){return(t.originalEvent&&t.originalEvent.touches?(t.originalEvent&&t.originalEvent.touches[0]||t.originalEvent.changedTouches[0]).pageX:t.pageX)-e.offset().left}var m=!1,c=-1;mousePosOnMouseDown=-1,curPosX=0,prevPosX=0,isRightDirection=!1,w.settings.userInteraction&&(w.settings.interactionMode,g.on("mousedown touchstart",function(e){var t;e.cancelable&&e.preventDefault(),l=!0,t=e,w.pause(),m=!0,mousePosOnMouseDown=u(g,t),c=v}).on("mousemove touchmove",function(e){e.cancelable&&e.preventDefault(),(n||w.settings.autoPlay||l)&&function(e){if(m){var t=g,a=u(t,e),n=t.width();Math.floor(a/n*p);isRightDirection=a>=prevPosX,f=isRightDirection?"forward":"backward";var i,s=Math.floor(p/n*mousePosOnMouseDown),r=Math.floor(p/n*a);v=r>=mousePosOnMouseDown?(i=Math.floor(r-s),c+i):(i=Math.floor(s-r),c-i),p<v?v-=p:v<1&&(v=p+v);var o=w.frames[v],l=I(o);o&&o.complete&&0<l.prop("naturalHeight")&&(h.clearRect(0,0,d.width,d.height),h.drawImage(o,0,0,d.width,d.height)),prevPosX=a}}(e)}).on("mouseleave mouseup touchend",function(e){(n||w.settings.autoPlay||l)&&(w.play(),m=!1)})),g.append(e),i.append(g)},c=function(){if(null!=h){g=!0;var e=w.frames[v],t=I(e);if(e&&e.complete&&0<t.prop("naturalHeight")?(h.clearRect(0,0,d.width,d.height),h.drawImage(e,0,0,d.width,d.height)):g=!1,v>=w.frames.length-1&&"forward"==f)return void w.stop();if(n){if("forward"==f)g&&v++;else if(g&&--v<0)return void w.stop();var a=Math.ceil(1e3/w.settings.rate);s=setTimeout(c,a)}y()}},y=function(){r=w.frames.length/p*100,o=v/w.frames.length*100,r=100<r?100:r,o=100<o?100:o,i.find(".imgplay-play-bar").css("width",o+"%")};w.init()},I.fn.imgplay=function(t){return this.each(function(){if(null==I(this).data("imgplay")){var e=new I.imgplay(this,t);I(this).data("imgplay",e)}}),this})}(jQuery);