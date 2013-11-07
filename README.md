## Asset pipeline basics
   * Provides
     * A framework to concatenate and minify or compress JavaScript and CSS assets. 
     * Adds the ability to write these assets in other languages such as CoffeeScript, Sass and ERB.
   * Concatenates Assets Javascript and CSS, each into one file.
     * Adds a "fingerprint", MD5 hash of the file contents, to the file name. 
       This allows the browser to cache the file. Anytime the Javascript OR CSS changes this 
       concatenated fingerprint will change and the browser cache will be updated.
   * Minifies the JS and CSS. 
     * We saw how this is done with libraries like jQuery. Reduces the file size so there is less
     to transfer over the "wire", internet.
   * Allows one to code assets to a higer level language.
     * Write Coffescript that will compile down to JS. 
     * Write SASS/SCSS that will compile down to CSS. 
     * Mix in Ruby, using ERB, with you Javascript, CSS, Coffeescript or SASS.
     * Scaffolding will generate Coffeescript and SCSS files in their respective directories.
       app/assets/javascript/project.js.coffee and app/assets/javascript/project.css.scss. 

## Concatenate Assets, Javascript and CSS.

### Step One
   * Generate a rails app. rails new songs_app -D postgres -T 
   * Do all the init stuff. Create db, fix database.yml, etc.
   * Generate a scaffold controller for the Song model.
     
     <code>rails g scaffold Song name:string duration:integer price:float</code>
   * Notice that 2 asset files have been generated. **We'll come back to this in Advanced Rails.**

      <code>app/assets/javascripts/songs.js.coffee and app/assets/stylesheets/songs.css.scss </code>

   * Start the server and goto 
     http://localhost:3000/assets/application.js
     We'll see a very large file with lots of js. This is the concatenation of all the app's js
     into one file. Done by the asset pipeline.
   * Create a file named greeting.txt and enter some text.

      <code>touch app/assets/javascripts/greeting.txt</code>
   	* Go to the [Greeting URL](http://localhost:3000/assets/greeting.js).
      Notice it just displays the file at that location.
   * Move the greeting.txt file to greeting.txt.erb and add this to the contents

   	<code>
     <% 5.times do %>
       Hello Cruel World.
     <% end %>
     </code>

  *  Go to the [Greeting URL](http://localhost:3000/assets/greeting.js)
    
    Notice how we ran ruby using ERB. This executed the ruby and created a text file, greeting.txt, with 5 "Hello, Cruel World." strings.

    This is how the asset pipeline works with SASS and Coffeescript files. It runs
    the SASS and Coffescript preprocessor to create css and js file.


### Step Two
    * Open the js manifest, app/assets/javascript/application.js. This contains commands that are processed by the "Sprockets" gem. 
    
    The jquery, jquery_ujs and turbolinks are required. They are gems include in your Gemfile. These  gems contain the files that are concatenated into  http://localhost:3000/assets/application.js

    * Let remove all the //= require lines

    * goto http://localhost:3000/assets/application.js
      Now there is no js shown, boohoo.

### Step Three
    * Put the two jquery require lines back and add an alert to the end of applicaton.js
      <code>
        alert("hey I'm in the application.js file");
      </code>      
    * goto http://localhost:3000/assets/application.js
      At the end of the file is our alert.
    * goto http://localhost:3000/songs
      The alert box will be shown.
    We are seeing that anything that we put in the manifest file is included in each
    page we visit. This is included by the following line in your layout file.
     <%= javascript_include_tag "application", "data-turbolinks-track" => true %>
    
### Step Four
    * create a main.js in the javascript assets directory and add it to manifest
      touch app/assets/javascript/main.js
    * move the alert from the application.js to the main.js.
    * goto http://localhost:3000/songs
      $(document).ready(function(){
        alert("hey I'm in the main.js file");
      });

### Step Five
    * Create a seed file for songs and seed db.
    Song.create(name: "Royals", duration: 186, price: 3.99)
    Song.create(name: "Wrecking Ball", duration: 195, price: 3.49)
    Song.create(name: "Roar", duration: 205, price: 2.99)
    Song.create(name: "Wake me up", duration: 243, price: 2.49)
    * goto /songs and view songs.

### Step Six
    * This should be the contents of the app/views/songs/index.html.erb file.
    <ul id='songs'>
    <%= @songs.each do |song| %>
      <li>Name: <%=song.name %>, Duration(minutes): <%=song.duration %>, Price(dollars): <%=song.price %> </li>
    <% end %>
    </ul>
    <br>

    <%= link_to 'New Song', new_song_path, id: 'new_link', remote: true %>

    * Notice that we've added the 'remote: true' to the new song link. This make 
    the form submit an ajax request. It will *not* reload the page.

### Step Seven
    * Create a new.js.erb file with this contents.
      $('#new_link').hide().after('<%= j render("form") %>')
    * Change the first line of the _form.html.erb to be.
      <%= form_for(@song, :remote => true) do |f| %>
    * Update the create action to respond to a javascript/ajax request. 
    def create
    ... # add under the format.json {...} 
      format.js 
    ..
    end
    
    * Add a create.js.erb file with the below contents.
    $('#new_task').remove();
    $('#new_link').show();
    $('#songs').append("<li>"+ "Name: <%=@song.name %>" + ", Duration(minutes): <%=@song.duration %>" + ", Price(dollars): <%=@song.price %>" + "</li>");
    $('#new_song').hide();

    * This will use jquery selectors to change the index page.

## Step Eight
   * Create a file show.js.erb with this contents.
     <li><%=song.name%></li>

   * Goto http://localhost:3000/songs and create a new song.
   Notice how there are *no* page reloads when creating new songs. All 
   the creations are done via ajax and jquery.

## Resources
   * Watch railscast for asset pipeline. Couple of thngs are outdated, but still very good.
     [Railscast for Asset Pipeline](http://railscasts.com/episodes/279-understanding-the-asset-pipeline
   * [Rails Guide for Asset Pipeline](http://guides.rubyonrails.org/asset_pipeline.html)
   * [JQuery and Ajax](http://railscasts.com/episodes/136-jquery-ajax-revised)
