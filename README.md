# FoodSteps
Repo for Food supply chain
<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Contributing](#contributing)
* [License](#license)
* [Contact](#contact)
* [Acknowledgements](#acknowledgements)



<!-- ABOUT THE PROJECT -->
## About The Project
FoodSteps can be used to track a particular product end-to-end from manufacturers to distributors/retailers and anyother parties invovled in the supply chain process.


### Built With
This section should list any major frameworks that you built your project using. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.
* [Multichain 1.0](https://www.multichain.com)
* [Node.js](https://nodejs.org)
* [Express](https://expressjs.com)



<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
```sh
npm install npm@latest -g
```

### Installation

1. Clone the repo
```sh
git clone https://github.com/statwig-public/FoodSteps.git
```
2. Install NPM packages
```sh
npm install
```
3. Run the below command  
```JS
Start the server using 'npm start' or 'node server.js' on the default port 3000
This should run on the same node as the multichain software.
Credentials of multichain are picked up from environment settings.
Store PORT,HOST,USERNAME,PASSWORD,MC_VERSION for multichain in .env file.
```

### Local Configuration:
Copy the username and password from multichain.conf file.
Notedown the port and host where multichain is running.

Create a file .env inside the cloned project folder and copy the contents in below format.
```sh
PORT = XXXX
HOST = 'XXXX'
USERNAME = 'multichainrpc'
PASSWORD = '8XXXXXXXXXXXXXXXXX'
```


<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b foodchain`)
3. Commit your Changes (`git commit -m 'Initial commit'`)
4. Push to the Branch (`git push origin foodchain`)
5. Open a Pull Request



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.



<!-- CONTACT -->
## Contact

Please contact us at - contactus@statwig.com

Project Link:https://github.com/statwig-public/FoodSteps.git










