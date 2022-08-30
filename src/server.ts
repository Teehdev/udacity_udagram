import express from 'express';
import { Request, Response } from 'express'
import bodyParser from 'body-parser';
import morgan from 'morgan'
import {filterImageFromURL, deleteLocalFiles} from './util/util';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());
  app.use(
    morgan(
      ":date[iso] :method :url :status :res[content-length] - :response-time ms"
    )
  );


  



  /**************************************************************************** */

  //! END @TODO1
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req: Request, res: Response ) => {
    return res.status(200).json("try GET /filteredimage?image_url={{}}, Welcome to the Cloud!")
  } );

  app.get("/filteredimage",  async ( req: Request, res: Response) => {
    
    let image_url: string
    try {
     image_url = req.query.image_url;
     console.log(image_url)
  
      if(!image_url) {
        return res.status(400).json({message: "no image url query found"})
      }
      const file_response = await filterImageFromURL(image_url);
      console.log(file_response)

     res.status(200).sendFile(file_response)
     console.log(file_response)
     req.on('close', ()=> deleteLocalFiles([file_response]))


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