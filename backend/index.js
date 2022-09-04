const http = require("http");
const https = require("https");

// Forward incoming request to email service
const requestHandler = function (req, res) {
  const requestPath = req.url;

  // Verify that request path is valid
  if (requestPath !== "/contact_form") {
    res.writeHead(404);
    res.end();
    return;
  }

  // Parse data from frontend request
  let body = "";
  req.on("data", (data) => (body += data));

  // Send contact form submission as an email using SendGrid API
  req.on("end", () => {
    const contactDetails = JSON.parse(body);

    // Verify that request parameters are valid
    if (
      contactDetails.hasOwnProperty("contactName") &&
      contactDetails.hasOwnProperty("contactEmail") &&
      contactDetails.hasOwnProperty("contactMessage")
    ) {
      if (
        contactDetails.contactName === "" &&
        contactDetails.contactEmail === "" &&
        contactDetails.contactMessage === ""
      ) {
        res.writeHead(422);
        res.end();
        return;
      }
    } else {
      res.writeHead(422);
      res.end();
      return;
    }

    const contactFormData = JSON.stringify({
      personalizations: [
        {
          to: [
            {
              email: "kelsey.lee.werner@gmail.com",
              name: "Kelsey Werner",
            },
          ],
          subject: "Contact request from kelseywerner.com",
        },
      ],
      content: [
        {
          type: "text/plain",
          value: `From Name: ${contactDetails.contactName}\n\nFrom Email Address: ${contactDetails.contactEmail}\n\nMessage:\n\n${contactDetails.contactMessage}`,
        },
      ],
      from: {
        email: "kelsey.lee.werner@gmail.com",
        name: "Kelsey Werner",
      },
    });

    const options = {
      hostname: "api.sendgrid.com",
      port: 443,
      path: "/v3/mail/send",
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
        "Content-Type": "application/json",
        "Content-Length": contactFormData.length,
      },
    };

    const sendGridRequest = https.request(options, (sendGridResponse) => {
      sendGridResponse.on("data", (data) => {
        process.stdout.write(data);
      });
    });

    sendGridRequest.on("error", (error) => {
      console.error(error);
    });

    sendGridRequest.write(contactFormData);
    sendGridRequest.end();

    res.writeHead(200);
    res.end();
  });
};

// Create server to handle incoming requests
const host = "localhost";
const port = 8000;
const server = http.createServer(requestHandler);

server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
