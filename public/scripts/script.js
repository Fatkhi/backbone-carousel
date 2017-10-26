(function ($) {

  const VISIBLE_BLOCKS = 4;
  const Block = Backbone.Model.extend({
    defaults: {
      title: '',
      images: [],
      imageToShow: null
    },

    setRandomImageToShow() {
      const length = this.get('images').length;
      const randomNumber = Math.floor(Math.random() * length);
      const image = this.get('images')[randomNumber];
      this.set('imageToShow', image);
    }
  });

  const Blocks = Backbone.Collection.extend({
    initialize() {
      var self = this;
      this.fetch({
        success() {
          self.models.forEach(model => {
            model.setRandomImageToShow();
          });
          self.trigger('state:ready');
        }
      });
    },
    url: '/blocks',
    model: Block
  });


  const Carousel = Backbone.View.extend({
    events: {
      'click .js-carousel-prev': 'prev',
      'click .js-carousel-next': 'next'
    },
    initialize(options) {
      this.nextDisabled = true;
      this.prevDisabled = true;

      this.firstBlockIndex = 0;
      this.visibleBlocks = VISIBLE_BLOCKS;
      this.lastBlockIndex = this.firstBlockIndex + this.visibleBlocks;

      this.listenTo(this.collection, 'state:ready', this.render);
      document.addEventListener('keydown', (event) => {
        const keyName = event.key;

        if (keyName === 'ArrowRight') {
          this.next();
        }
        else if (keyName === 'ArrowLeft') {
          this.prev()
        }
      }, false);
    },

    carouselItemTemplate: _.template(`
      <div class="carousel-item js-carousel-item">
        <img src="<%= imageToShow %>" alt="<%= title %>" class="carousel-img">
      </div>
    `),

    render() {
      if (this.collection.length > this.visibleBlocks) {
        const placeholder = $('.js-carousel-placeholder');
        const el = $('<div/>');

        placeholder.empty();

        for (let i = this.firstBlockIndex; i < this.lastBlockIndex; i++) {
          const model = this.collection.at(i);
          el.append(this.carouselItemTemplate(model.toJSON()));
        }

        placeholder.append(el);

        this.disableButtonsIfNeeded();
        $('.js-carousel-next').attr('disabled', this.nextDisabled);
        $('.js-carousel-prev').attr('disabled', this.prevDisabled);
      }

      return this;
    },
    
    prev() {
      if(this.prevDisabled) return;

      if (this.firstBlockIndex - this.visibleBlocks < 0) {
        this.firstBlockIndex = 0;
        this.lastBlockIndex = this.firstBlockIndex + this.visibleBlocks;
      }
      else {
        this.lastBlockIndex -= this.visibleBlocks;
        this.firstBlockIndex -= this.visibleBlocks;
      }
      this.render();
    },

    next() {
      if(this.nextDisabled) return;

      if (this.lastBlockIndex + this.visibleBlocks > this.collection.length) {
        this.lastBlockIndex = this.collection.length;
        this.firstBlockIndex = this.lastBlockIndex - this.visibleBlocks;
      }
      else {
        this.lastBlockIndex += this.visibleBlocks;
        this.firstBlockIndex += this.visibleBlocks;
      }
      this.render();
    },

    disableButtonsIfNeeded() {
      if (this.lastBlockIndex === this.collection.length) {
        this.nextDisabled = true;
      }
      else {
        this.nextDisabled = false;
      }
      
      if (!this.firstBlockIndex) {
        this.prevDisabled = true;
      }
      else {
        this.prevDisabled = false;
      }
    }
  });

  new Carousel({
    el: '.js-carousel',
    collection: new Blocks()
  }).render();

})(jQuery);