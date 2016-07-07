(function($) {

"use strict";

var Fittable = {
  init: function(options) {
    this.options = options;
    this.el = $(options.el);

    this.originalWidth = options.width || this.el.attr('width');
    this.originalHeight = options.height || this.el.attr('height');

    $(window).on('resize.fittable', $.proxy(this, 'resize'));
    $(window).trigger('resize.fittable');
  },

  resize: function() {
    this.el.css({
      width: this.width(),
      height: this.height(),
      marginTop: this.marginTop(),
      marginLeft: this.marginLeft()
    });
  },

  width: function() {
    if (this.shouldFitToWidth()) {
      return this.parentWidth();
    } else {
      return this.adjustedWidth();
    }
  },

  height: function() {
    if (this.shouldFitToHeight()) {
      return this.parentHeight();
    } else {
      return this.adjustedHeight();
    }
  },

  marginTop: function() {
    return (this.parentHeight() - this.height()) / 2;
  },

  marginLeft: function() {
    return (this.parentWidth() - this.width()) / 2;
  },

  parentWidth: function() {
    return this.el.parent().width();
  },

  parentHeight: function() {
    return this.el.parent().height();
  },

  parentRatio: function() {
    return this.parentWidth() / this.parentHeight();
  },

  adjustedWidth: function() {
    return this.parentHeight() * this.ratio();
  },

  adjustedHeight: function() {
    return this.parentWidth() / this.ratio();
  },

  ratio: function() {
    return this.originalWidth / this.originalHeight;
  },

  shouldFitToWidth: function() {
    throw 'NotImplementedError';
  },

  shouldFitToHeight: function() {
    throw 'NotImplementedError';
  }
};

var Fit = function() { this.init.apply(this, arguments); };
var Fill = function() { this.init.apply(this, arguments); };

$.extend(Fit.prototype, Fittable, {
  shouldFitToWidth: function() {
    return this.parentRatio() < this.ratio();
  },

  shouldFitToHeight: function() {
    return this.parentRatio() > this.ratio();
  }
});

$.extend(Fill.prototype, Fittable, {
  shouldFitToWidth: function() {
    return this.parentRatio() > this.ratio();
  },

  shouldFitToHeight: function() {
    return this.parentRatio() < this.ratio();
  }
});

$.fn.fit = function(options) {
  return this.each(function() {
    new Fit($.extend(options, { el: this }));
  });
};

$.fn.fill = function(options) {
  return this.each(function() {
    new Fill($.extend(options, { el: this }));
  });
};

})(jQuery);
