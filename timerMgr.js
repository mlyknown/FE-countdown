// http://www.xuanfengge.com/js-realizes-precise-countdown.html
;
(function(window, undefined) {
  
 
  function timer(delay) {
    this._queue = [];
    this.stop = false;
    this._createTimer(delay);
  }

  timer.prototype = {
    constructor: timer,
    _createTimer: function(delay) {
      var self = this;
      var first = true;
      (function() {
        var s = new Date();
        for (var i = 0; i < self._queue.length; i++) {
          self._queue[i]();
        }
        if (!self.stop) {
          var cost = new Date() - s;
          delay = first ? delay : ((cost > delay) ? cost - delay : delay);
          setTimeout(arguments.callee, delay);
        }
      })();
      first = false;
    },
    add: function(cb) {
      this._queue.push(cb);
      this.stop = false;
      return this._queue.length - 1;
    },
    remove: function(index) {
      this._queue.splice(index, 1);
      if(!this._queue.length){
        this.stop = true;
      }
    }
  };

  function TimePool(){
    this._pool = {}; 
  }

  TimePool.prototype = {
    constructor:TimePool,
    getTimer:function(delayTime){
      var t = this._pool[delayTime];
      return t ? t : (this._pool[delayTime] = new timer(delayTime));
    },
    removeTimer:function(delayTime){
      if(this._pool[delayTime]){
        delete this._pool[delayTime];
      }
    }
  };


  var timerMgr = function(){
    this._timePool = new TimePool();
  }
  timerMgr.prototype.getTimer = function(delay){
    this._timePool.getTimer(delay)
  }

  // UMD
  function umd(name, component) {
    switch (true) {
      case typeof module === 'object' && !!module.exports:
        module.exports = component;
        break;
      case typeof define === 'function' && !!define.amd:
        define(name, function() {
          return component;
        });
        break;
      default:
        try { /* Fuck IE8- */
          if (typeof execScript === 'object') execScript('var ' + name);
        } catch (error) {}
        window[name] = component;
    }
  }


  // exports to global
  umd("timerMgr", timerMgr);
})(window, void 0)



