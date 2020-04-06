let moduleIsInited = false;

const setMain = (($) => {
  return (context) => {
    if (moduleIsInited) {
      return;
    }
    moduleIsInited = true;
    let $root = $('html, body', context);

    let $next_scroll_link = $('.js-scroll-next-link', context);

    $next_scroll_link.on({
      click: function (e) {
        e.preventDefault();
        let $next = $(this).closest('.block-section').next().offset().top;
        $root.animate({scrollTop: $next}, 'slow');
      }
    });

    let $chat_widget = $('#chat-widget-container', context);
    setTimeout(function () {
      if ($chat_widget.length) {
        $root.addClass('is-cart');
      }
    }, 3000);

    // Animate forms placeholder:

    let $animate_placeholder = $('.js-animate-placeholder', context);
    let $fields = 'input[type="text"],' +
            'input[type="password"],' +
            'input[type="email"],' +
            'input[type="number"],' +
            'input[type="month"],' +
            'input[type="date"],' +
            'input[type="time"],' +
            'input[type="search"],' +
            'input[type="tel"], ' +
            'textarea';
    let $field = $animate_placeholder.find($fields);
    if ($animate_placeholder.length) {
      $field.each(function () {
        let $that = $(this);
        let $holder = $that.attr('placeholder');
        let $value = $that.val();
        if ($holder.length) {
          $('<div class="placeholder-label">' + $holder + '</div>')
                  .insertBefore($that);
          if ($value) {
            $that.prev('.placeholder-label').addClass('is-active');
            return
          }
          $that.prev('.placeholder-label').removeClass('is-active');
        }
      });
    }

    $field.on('keydown keyup', function () {
      let $that = $(this);
      let $value = $that.val();
      let $holder = $that.prev('.placeholder-label');
      if ($holder.length) {
        if ($value) {
          $holder.addClass('is-active');
          return
        }
        $holder.removeClass('is-active');
      }
    });

    const animate_init = () => {
      skrollr.init();
    };
    const animate_destroy = () => {
      skrollr.init().destroy();
    };

    // Mobile:
    addMediaQueryListener(devicesMQ.mobileMQ, function (match) {
      if (match) {

      } else if (match == false) {

      }
    });

    // Tablet:
    addMediaQueryListener(devicesMQ.desktopMMQ, function (match) {
      if (match) {
        animate_destroy();
      } else if (match == false) {
        animate_init();
      }
    });

  };
})(window.jQuery);
export default setMain;

jQuery(document).on('click', '.video-component .play-btn', function (e) {
  e.preventDefault();
  jQuery(this).parent().find('iframe')[0].src += "?autoplay=1";
  jQuery(this).parent().find('iframe').show();
  jQuery(this).parent().find('img').hide();
  jQuery(this).hide();
});
jQuery(document).ready(function () {
  jQuery(document).find('.general-cms table .check').html('');
  jQuery(document).find('.general-cms table .cross').html('<span></span>');
  jQuery(document).find('.form-type-textarea label').appendTo('.form-type-textarea .form-textarea-wrapper');
  jQuery('.webform-submission-contact-add-form').find('input:not(.webform-button--submit):not(),textarea').each(function () {
    addclasses(this);
  });
  jQuery('.webform-submission-contact-add-form').find('input:not(.webform-button--submit):not([required="required"]),textarea').blur(function () {
    addclasses(this);
  });
});
function addclasses(el) {
  if (jQuery(el).val()) {
    jQuery(el).addClass('valid');
  } else {
    jQuery(el).addClass('notvalid');
  }
}