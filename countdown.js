(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports =
    factory() : typeof define === 'function' && define.amd ? define(factory) :
    global.countdown = factory();
})(this, function() {







  function _erro(err) {
    throw new Error(err);
  };

  function _mixin(source, target) {
    for (var i in target) {
      if (!source[i] && target.hasOwnProperty(i)) {
        source[i] = target[i];
      }
    }
    return source;
  };

  function _noop() {

  }

  // var tickStream = miniRx.Observable.create(function(observer) {
  //  setInterval(function() {
  //    observer.onNext(getTime());
  //  }, 1000);
  // });
  // var uiRefresher = miniRx.Observer.create(function(data) {
  //  elClock.textContent = data;
  // });
  // tickStream.subscribe(uiRefresher);

     //若是首次进入，则根据当前时间的毫秒数进行纠偏，延迟1000-当前毫秒数达到整数秒后开始更新UI
            //否则直接1秒后更新UI
            //若当前毫秒数大于MILLS_OFFSET 15，则修正延时数值与系统时间同步
            // mills = new Date().getMilliseconds();
            // timer = setTimeout(arguments.callee,first?(1000 -mills):(mills>MILLS_OFFSET?(1000-mills):1000));



  var countdown = function(opts) {
    var defaultOptions = {
      fixNow: 3 * 1000,
      fixNowDate: false,
      now: new Date().valueOf(),
      template: '{d}:{h}:{m}:{s}',
      render: function(outstring) {
        console.log(outstring);
      },
      end: function() {
        console.log('the end!');
      },
      endTime: new Date().valueOf() + 5 * 1000 * 60,
      cb: _noop,
      timeDelay: 1000,
      maxCount: 1000
    };

    _mixin(opts, defaultOptions);

    var init = function() {

      var tickStream = miniRx.Observable.create(function(observer) {
        var timeDelay = opts.timeDelay;
        var maxCount = opts.maxCount;
        var timer = setInterval(function() {

          observer.onNext(maxCount--);
          if (maxCount < 0) {
            clearInterval(timer);
            return;
          }
        }, timeDelay);
      });
      var uiRefresher = miniRx.Observer.create(opts.cb);
      tickStream.subscribe(uiRefresher);
    }
    init();
  }

  return countdown;
});


// function getTimeRemaining(endtime){
//   var t = Date.parse(endtime) - Date.parse(new Date());
//   var seconds = Math.floor( (t/1000) % 60 );
//   var minutes = Math.floor( (t/1000/60) % 60 );
//   var hours = Math.floor( (t/(1000*60*60)) % 24 );
//   var days = Math.floor( t/(1000*60*60*24) );
//   return {
//     'total': t,
//     'days': days,
//     'hours': hours,
//     'minutes': minutes,
//     'seconds': seconds
//   };
// }
