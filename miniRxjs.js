;
(function(window, undefined) {
  
  // 发布者模型
  var _Observable = function(generator) {
    this._generator = generator;
  };
  _Observable.prototype.subscribe = function(observer) {
    this._generator.call(this, observer);
  };

  // 订阅对象模型
  var _Observer = function(consumer) {
    this._consumer = consumer;
  };
  _Observer.prototype.onNext = function(data) {
    this._consumer.call(this, data);
  };

  var Observable = {
    create: function(fn) {
      return new _Observable(fn)
    }
  };

  var Observer = {
    create: function(fn) {
      return new _Observer(fn)
    }
  }

  var miniRx = {
    Observable: Observable,
    Observer: Observer
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
  umd("miniRx", miniRx);
})(window, void 0)



// var blogger = {
//   recommend: function(id) {
//     var msg = 'dudu 推荐了的帖子:' + id;
//     this.publish(msg);
//   }
// };
//
// var user = {
//   vote: function(id) {
//     var msg = '有人投票了!ID=' + id;
//     this.publish(msg);
//   }
// };
//
// observer.make(blogger);
// observer.make(user);
//
//
// var tom = {
//   read: function(what) {
//     console.log('Tom看到了如下信息：' + what)
//   }
// };
//
// var mm = {
//   show: function(what) {
//     console.log('mm看到了如下信息：' + what)
//   }
// };
//
// // 订阅
// blogger.addSubscriber(tom.read);
// blogger.addSubscriber(mm.show);
// blogger.recommend(123); //调用发布
//
// //退订
// blogger.removeSubscriber(mm.show);
// blogger.recommend(456); //调用发布
//
// //另外一个对象的订阅
// user.addSubscriber(mm.show);
// user.vote(789); //调用发布
