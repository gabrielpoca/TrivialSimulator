(function ($) {

    var cheeses = [ 
    { name: "Roman Law" },
    { name: "Criminal Law" },
    { name: "Constitutional Law" },
    { name: "Commercial Law" },
    { name: "Property Law" },
    { name: "Family Law" }
    ];

    var Cheese = Backbone.Model.extend({
        defaults: {
            image: "img/cheese.jpeg"
        }
    });

    var PlaceCheese = Backbone.Collection.extend({
        model: Cheese
    });

    var CheeseView = Backbone.View.extend({
        tagName: "div",
        className: "span2",
        template: $("#cheeseTemplate").html(),
        initialize: function() {
            // setup window resize listener
            var that = this;
            $(window).resize(function() { 
                that.update(); 
            });
        },
        update: function() {
            $('.cheese').css('width',$(window).height()*0.08);
        },
        render: function() {
            var tmpl = _.template(this.template);
            this.$el.html(tmpl(this.model.toJSON()));
            return this;
        }
    });

    var PlaceCheeseView = Backbone.View.extend({
        el: $("#cheesePlace"),
        initialize: function() {
            this.collection = new PlaceCheese(cheeses);
            this.render();
        },
        render: function() {
            var that = this;
            _.each(this.collection.models, function(item) {
                that.renderCheese(item);
            }, this);
        },
        renderCheese: function(item) {
            var cheeseView = new CheeseView({
                model: item
            });
            this.$el.append(cheeseView.render().el);
            cheeseView.update();
        }
    });

    var TableView = Backbone.View.extend({
        el: $("#table"),
        initialize: function() {
            // setup window resize listener
            var that = this;
            $(window).resize(function() { 
                that.setSize(); 
            });
            // setup initial sizes
            this.setSize();
        },
        setSize: function() {
            height = $(window).height();
            this.$el.css('height', height);
        }
    });


    var placeCheese = new PlaceCheeseView();
    var table = new TableView();

} (jQuery));