import fs from 'fs';
import { Router } from 'express';
// types
import { App } from '../types/global.type';

const app = global as App;

const AuthRouter = Router();

AuthRouter.get('/auth', (_, res) => {

  if (app.authenticated) {

    res.write("<html><body><h2>Already Authenticated</h2></body></html>");
    res.end();

  } else {

    fs.readFile('./code.qr', (error, qrcode) => {

      if (error) throw error;

      res.write(`
        <html>
        <body>
            <div id="qrcode"></div>
            <script type="module">
                import QrCreator from "https://cdn.jsdelivr.net/npm/qr-creator/dist/qr-creator.es6.min.js";
                let container = document.getElementById("qrcode");
                QrCreator.render({
                    text: "${qrcode}",
                    radius: 0.5,
                    ecLevel: "H",
                    fill: "#000000",
                    background: null,
                    size: 256,
                }, container);
            </script>
        </body>
        </html>`);
      res.end();

    });
  }
});

export default AuthRouter;