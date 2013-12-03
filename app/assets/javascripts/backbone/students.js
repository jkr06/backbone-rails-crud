
var app = app || {};

app.Student = Backbone.Model.extend({
    defaults: {
        firstname: 'None',
        lastname: 'None',
        age: 'Unknown',
        address: 'Unknown',
        email: 'Unknown',
        doj: 'Unknown'
   },

   urlRoot: '/students'
});

app.ListStudents = Backbone.Collection.extend({
    model: app.Student,
    url: '/students'
});


app.StudentView = Backbone.View.extend({

    tagName: 'tr',
    className: 'studentRow',
    events: {

        'click .remove': 'removeStudent'
    },

    removeStudent: function() {

        //console.log(this.model.toJSON());
        this.model.destroy();
        //this.$el.remove();
    },
    //className: 'container',
    //el: '.studentlist',
    template: JST['studentTemplate'],


    render: function() {
        
        //var tmpl = _.template( $(this.template).html() );

        this.$el.html( this.template( this.model.toJSON() ) );
        
        return this;
    }
});




app.ListStudentsView = Backbone.View.extend({
    el: '#main',

    initialize: function( ) {
        //console.log("ListStudentsView.initialize");
        
        this.render();

        this.listenTo( this.collection, 'add', this.render );
        this.listenTo( this.collection, 'remove', this.render );
        this.listenTo( this.collection, 'change', this.render );
    },

    template: JST['listStudent'],

    render: function() {
        
        //this.$el.html('<table><tr><th>Id </th><th>Firstname </th></tr></table>');

        //console.log("ListStudentsView.render");
        this.$el.html(this.template);
        this.collection.each(function( item ) {
            this.renderStudent( item );
        }, this );
    },


    renderStudent: function( item ) {
        //console.log("ListStudentsView.renderStudent");
        var studentView = new app.StudentView({
            model: item
        });
        
        $("#studentlist").append( studentView.render().el );

    }
});

app.NewStudentView = Backbone.View.extend ({

    el: '#main',
    tagName: 'form',
    roleName: "form",
    template: JST['newStudentView'],

    initialize: function () {
        
        this.render();
    },

    events: {

        'click .save': 'saveStudent',
        'click .cancel': 'cancelStudent'
    },

    saveStudent: function() {
        
        this.model.set({
            firstname:$('#firstname').val(),
            lastname:$('#lastname').val(),
            address:$('#address').val(),
            age:$('#age').val(),
            doj:$('#doj').val(),
            email:$('#email').val()
        });

        var collection = this.collection;
        
        this.model.save(null,{
            success: function(model, response) {
                
                collection.add(model);
            }
        });
        //this.$el.empty();
        route.navigate("", {trigger: true});
        //window.history.back();
        //console.log(this.model.toJSON());

    },

    cancelStudent: function () {
        //this.$el.empty();
        this.undelegateEvents();
        //this.model.unbind();
        //this.unbind();
        //this.collection.unbind();
        route.navigate("", {trigger: true, replace: true});
        //window.history.back();
        console.log("cancel clicked");

    },

    render: function() {
        
        //var tmpl = _.template( $(this.template).html() );

        this.$el.html( this.template( this.model.toJSON() ));
        
        return this;
    }

});




