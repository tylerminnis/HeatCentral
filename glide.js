var sliders = document.querySelectorAll('.glide');
      // var glide = new Glide(sliders)
      for (var i = 0; i < sliders.length; i++) {
        console.log(`#${sliders[i].getAttribute('id')}`);

      var glide = new Glide(`#${sliders[i].getAttribute('id')}`, {
        
        // options
        type: 'carousel',
        slidesToShow: 1,
        dots: 'dots',
        autoplay: 5000,
        hoverpause: true,
        focusAt: 'center',
        startAt: 0,
        arrows: {
            prev: '.glider-prev',
            next: '.glider-next'
          }
        
      });
      glide.mount();
    } 

