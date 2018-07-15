# hotspots
Hotspots are a type of application used in market research where a respondent can click on different lines of text which
get highligted.  This is to gather data on the respondent's opinions of key statements.  

Currently we are using this technique for a company who is utilizing flash to achieve this.  The xml files that set the 
highlighted blocks of text are set manually by stating x/y cooridantes of each block of text along with it's width and height.
This is being done by guessing what those values need to be, then saving and refreshing the page, testing to see it's 
accuracy compared to it's concept (image of text), then refactoring for accuracy.  Being a daunting process this app was built
to create a GUI to simplify and expedite this process.  


A user can upload a concept (image that has lines of text), add new highlighted blocks, move them to thier location via 
the mouse, set the width/height with the mouse.  For pixel perfect accuracy the user can adjust the x/y location, height/width
by pressing the corresponding buttons associated with each feature which will increase/decrease 1 pixel at a time.

Each concept line and value (key) associated with it can be pasted into the app which will intuitively orgainze it then 
load it visually into the app.  These values can be linked to different blocks by selecting the block then double clicking
it's corresponding concept/key value in the Key's Table.

When done the user can click the export button which will generate the default header/tail needed for this particular 
company then iterate through each box(highlited object) and produce the xml code needed to plug into the flash app.
