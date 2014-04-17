Conceptual Chains
=================
An app even Plato would be proud of, Conceptual Chains is my first application using Node/Express and Angular.js. It is based on the <a href='https://github.com/btford/angular-express-blog'>Angular-Express-Blog</a> by Brian Ford, which is an excellent jumping off point for folks who want to learn Angular. 

The app saves chains of concepts in graph form using the Neo4j graph database. At the home page one can initialize new "master" concepts, view and delete chains. The chain view allows users to add child concepts on to the master, creating concept chains of the following structure:

Master Node (most general concept) -> Child -> Child -> Terminal Child (most specific concept)

Possibilities for further development include automatic chain linking via shared child concepts to create convergent concept chains. Divergent chains are way too mind blowing for me to consider at this point.

To fiddle thusly   
1) clone the app  
2) npm install  
3) start neo4j  
4) ascend into the highest reaches of the universe