'use strict';function _toConsumableArray(a){if(Array.isArray(a)){for(var b=0,c=Array(a.length);b<a.length;b++)c[b]=a[b];return c}return Array.from(a)}var playDuration,clock,clockState,tier,signList=['<i class="fa fa-internet-explorer"></i>','<i class="fa fa-firefox"></i>','<i class="fa fa-chrome"></i>','<i class="fa fa-opera"></i>','<i class="fa fa-safari"></i>','<i class="fa fa-edge"></i>','<i class="fa fa-stack-overflow"></i>','<i class="fa fa-github"></i>'],moves=0,scores=0,name='',rank=[],matchMode=!1,gameLocked=!0,elemPlayDuration=$('#play-duration'),elemMoves=$('#moves'),elemAside=$('aside'),elemBoard=$('.board'),elemBoardSlide=$('.board__slide'),elemBoardScores=$('#scores'),elemBoardSumMoves=$('#summarize-moves');function createSignArray(a){return[].concat(_toConsumableArray(a),_toConsumableArray(a))}function shuffle(a){for(var b,d,c=a.length;c;)b=Math.floor(Math.random()*c--),d=a[c],a[c]=a[b],a[b]=d;return a}function setCookie(a,b,c){var d=new Date;d.setTime(d.getTime()+1e3*(60*(60*(24*c)))),document.cookie=a+'='+b+';expires='+d.toUTCString()+';path=/'}function getCookie(a){for(var b,c=a+'=',d=document.cookie.split(';'),e=0;e<d.length;e++){for(b=d[e];' '==b.charAt(0);)b=b.substring(1);if(0==b.indexOf(c))return b.substring(c.length,b.length)}return''}function deleteCookie(a){document.cookie=a+'=; expires=Thu, 01 Jan 1970 00:00:01 GMT;'}function addToRank(){rank.push([name,scores])}function ranking(){rank.sort(function(c,a){return a[1]-c[1]}),rank.splice(10,rank.length-10)}function saveRank(){var a=[],b=!0,c=!1,d=void 0;try{for(var e,f,g=rank[Symbol.iterator]();!(b=(e=g.next()).done);b=!0)f=e.value,a.push(f.join('@'))}catch(a){c=!0,d=a}finally{try{!b&&g.return&&g.return()}finally{if(c)throw d}}a=a.join('&'),setCookie('rank',a,7)}function loadRank(){var a=[],b=getCookie('rank');if(b){b=b.split('&');var c=!0,d=!1,e=void 0;try{for(var f,g,h=b[Symbol.iterator]();!(c=(f=h.next()).done);c=!0)g=f.value,g=g.split('@'),a.push(g)}catch(a){d=!0,e=a}finally{try{!c&&h.return&&h.return()}finally{if(d)throw e}}rank=a}}function resetRank(){getCookie('rank')&&(rank=[],$('#rankboard').empty(),deleteCookie('rank'),refreshRankBoard())}function refreshRankBoard(){if(getCookie('rank')){$('#rankboard').empty();var d=1,e=!0,f=!1,g=void 0;try{for(var a,b,c=rank[Symbol.iterator]();!(e=(a=c.next()).done);e=!0)b=a.value,$('#rankboard').append('<li class="rankboard__entry"><span class="rankboard__rank">'+d++ +'</span><span class="rankboard__name">'+b[0]+'</span><span class="rankboard__scores">'+b[1]+'</span></li>')}catch(a){f=!0,g=a}finally{try{!e&&c.return&&c.return()}finally{if(f)throw g}}}else $('#rankboard').empty(),$('#rankboard').append('<li class="rankboard__empty-info">Haven\'t Got Any Rank Yet</li><li class="rankboard__empty-info">Go Play Around</li><li class="rankboard__empty-info">And Enjoy Yourself</li>')}function showRank(){elemAside.css('display','flex')}function hideRank(){elemAside.css('display','none')}function initGame(){playDuration=0,moves=0,scores=0,elemPlayDuration.text('--'),elemMoves.text('--');var a=shuffle(createSignArray(signList));$('.card').each(function(b){$(this).removeClass('card--flag-matched card--animation-reveal card--animation-match card--animation-unmatch card--flag-active'),$(this).html(a[b])})}function refreshStatus(){elemPlayDuration.text(playDuration++),elemMoves.text(moves)}function startGame(){clockState=20,gameLocked=!1}function pauseGame(){clockState=0,gameLocked=!0}function resumeGame(){clockState=20,gameLocked=!1}function saveGame(){pauseGame();var a='';$('.card').each(function(){a+=$(this).attr('class')+'@'+$(this).html()+'@@'}),localStorage.setItem('cardsData',a),localStorage.setItem('clockState',clockState),localStorage.setItem('playDuration',playDuration),localStorage.setItem('moves',moves),resumeGame()}function loadGame(){pauseGame();var a=localStorage.getItem('cardsData');a=a.split('@@'),a.forEach(function(b,c){a[c]=b.split('@')}),$('.card').each(function(b){$(this).removeClass('card card--flag-matched card--animation-reveal card--animation-match card--animation-unmatch card--flag-active'),$(this).addClass(a[b][0]),$(this).html(a[b][1])}),clockState=+localStorage.getItem('clockState'),playDuration=+localStorage.getItem('playDuration'),moves=+localStorage.getItem('moves'),resumeGame()}function isEnabled(a){var b=gameLocked||matchMode||a.hasClass('card--flag-matched');return!b}function activate(a){a.addClass('card--animation-reveal card--flag-active')}function matching(a){2==a.length&&(matchMode=!0,a.first().html()==a.last().html()?(moves++,a.addClass('card--animation-match'),window.setTimeout(function(){a.addClass('card--flag-matched'),a.removeClass('card--animation-reveal card--flag-active'),matchMode=!1},600)):(moves++,a.addClass('card--animation-unmatch'),window.setTimeout(function(){a.removeClass('card--animation-reveal card--animation-unmatch card--flag-active'),matchMode=!1},1e3)))}function isGameCompleted(){return 16==$('.card--flag-matched').length}function finishGame(){var a=Math.floor;tier=a(--playDuration/30);var b=$('#board-stars');0==tier?b.html('<i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i>'):1==tier?b.html('<i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i>'):b.html('<i class="fa fa-star" aria-hidden="true"></i>'),scores=a(180*moves/playDuration),elemBoardSumMoves.text(moves),elemBoardScores.text(scores),showBoard()}function showBoard(){elemBoardSlide.removeClass('board__slide--animation-slidetoleft board__slide--animation-slidetoorigin'),elemBoard.removeClass('board--hide')}function hideBoard(){elemBoardSlide.removeClass('board__slide--animation-slidetoleft board__slide--animation-slidetoorigin'),elemBoard.addClass('board--hide')}function boardShowLog(){elemBoardSlide.removeClass('board__slide--animation-slidetoleft board__slide--animation-slidetoorigin'),elemBoardSlide.addClass('board__slide--animation-slidetoleft')}function boardReturn(){elemBoardSlide.removeClass('board__slide--animation-slidetoleft board__slide--animation-slidetoorigin'),elemBoardSlide.addClass('board__slide--animation-slidetoorigin')}$(document).ready(function(){clock=window.setInterval(function(){switch(clockState){case 0:break;case 20:refreshStatus();}},1e3),initGame(),loadRank(),refreshRankBoard()}),$('#btn-start').click(function(){initGame(),startGame()}),$('#btn-save').click(function(){saveGame()}),$('#btn-load').click(function(){loadGame()}),$('.card').click(function(){isEnabled($(this))&&(activate($(this)),matching($('.card--flag-active')),setTimeout(function(){isGameCompleted()&&(pauseGame(),finishGame())},600))}),$('#btn-replay').click(function(){initGame(),hideBoard()}),$('#btn-log').click(function(){boardShowLog()}),$('#btn-return').click(function(){boardReturn()}),$('#btn-confirm').click(function(){name=$('#ipt-name').val(),name&&(addToRank(),ranking(),saveRank(),refreshRankBoard(),initGame(),hideBoard())}),$('#btn-resetrank').click(function(){resetRank()}),$('#btn-rank').click(function(){showRank()}),$('#btn-close').click(function(){hideRank()}),$(window).resize(function(){769<$(document).width()?'none'==elemAside.css('display')&&showRank():hideRank()});