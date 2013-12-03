var AppRouter = Backbone.Router.extend({

    routes:{
        "": "list",
        "new": "newstudent",
        "students/:id": "studentDetails"
    },

    
    initialize:function () {
        this.collection = new app.ListStudents( );
        this.collection.fetch();
        this.lsview = new app.ListStudentsView({collection: this.collection } );
        //$('#header').html(new HeaderView().render().el);
    },

    list:function () {
        
        console.log("route.list");
        console.log(this.collection);
        this.lsview.render();
        //new app.ListStudentsView({collection: this.collection } );
        
    },
    newstudent: function () {
        console.log("route.newstudent");
        if (this.newStudentView)
            this.newStudentView.undelegateEvents();
        var item = new app.Student();
        this.newStudentView = new app.NewStudentView({model: item, collection: this.collection});
    },

    studentDetails: function( id ) {
        console.log(id);
        var item=this.collection.get(id);
        if (this.newStudentView)
            this.newStudentView.undelegateEvents();
        
        //new app.MainView({model: item});
        this.newStudentView = new app.NewStudentView({model: item,  collection: this.collection});

    }
    

});

var app = app || {};
var route = new AppRouter();
Backbone.history.start({pushState: false});
