$(document).ready(function() {
  $('.productItem-parent').click(function() {
    let lisOfProducts = $(this).children(),
        product = $(lisOfProducts).each(() => {
          return $(this).find(".product");
        });
        if (product !== null || typeof product !== undefined) {
          if ($(product).hasClass('active')) {
            $(product).removeClass('active');
          }
          else {
            $(product).addClass('active');
          }
        }
      });
    });
