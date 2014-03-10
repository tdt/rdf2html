// plugins should be put in the plugins directory under: "plugins/{name}/{name}.js"
var plugins = [ "triples" ];

require.config({
  paths: {
    jquery: 'bower_components/jquery/dist/jquery.min',
    levelgraph : 'bower_components/levelgraph/build/levelgraph.min',
    levelgraphN3 : 'bower_components/levelgraph-n3/build/levelgraph-n3.min'
  },
  //For development purposes. (Quick fix)
  urlArgs: "bust=" + (new Date()).getTime()
});

define( function () {
  return function(turtle){
    require(["levelgraph","levelgraphN3","jquery"], function(levelgraph,levelgraphN3, jquery) {
      var db = levelgraphN3(levelgraph('triples'));
      
      db.n3.put(turtle, function(err) {
        if(err){
          console.log("Uh oh - something nasty happened when adding triples: " + err);
        }
      });
      
      $.each(plugins, function (index,pl) {
        require(["plugins/" + pl + "/" + pl], function (plugin) {
          plugin(db);
        });
      });

    });
  }; 
});