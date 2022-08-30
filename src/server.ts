import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());



  /**************************************************************************** */

  //! END @TODO1
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );

  app.get("/filteredimage",  async (req, res) => {
    try {
      var image_url = req.query.image_url;
  
      if(!image_url) {
        return res.status(400).json({message: "no image url query found"})
      }
     var file_response = await filterImageFromURL(image_url);
     res.sendFile(file_response)
     deleteLocalFiles([file_response])
    } catch (error) {
      return res.status(500).json({message: error})
    }


  })
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();