# My Test Project

**Version 1.0.0**

This is a quick guide on how to run the application

## Getting Started

My is a test project

## Prerequisites

An Ubuntu 20.04 server or Desktop operating system installed in your machine.
A root password is set up in your system.
Install Docker

## Update System packages

Before starting, I recommend you update your system’s package cache to the updated version.

Run the following command to update the package cache:

```
apt-get update -y
```

Once the package cache has been updated, install some required packages by running the following command:

```
apt-get install curl apt-transport-https gnupg2 wget build-essential unzip nano -y
```

## Installing Node.js

By default, the latest release of Node.js is not available in the Ubuntu 20.04 default APT repository. So you will need to install the NodeSource PPA to get the latest Node.js release.

You can run the following command to install the NodeSource PPA to your system:

```
curl -sL https://deb.nodesource.com/setup_16.x | bash -
```

The above command will download and install the Node.js version 16 PPA to the APT repository.

You can now install the Node.js version 16 by running the following command:

```
apt-get install nodejs -y
```

After the Node.js installation, check the Node.js installed version by running the command below:

```
node -v
```

and also check the NPM version

```
npm -v
```

## Cloning and Creating the Node.js Application

Clone the repository by running this command:

```
git clone https://github.com/ozuem-liam/my-backend my-backend
cd my-backend
```

Install all dependences by running:

```
npm install
```

Then run the app by running:

```
npm run dev
```
Stop the server by holding ctrl+C

Set the Docker image by running this code

```
docker build -t My .
```

Run docker compose to build the application

```
docker-comepose up
```

Now your server should be running on port 5000
and your mongodb successfully connected

## Thank you.

## Code Owner

Williams Ozuem

---

## Reference

https://medium.com/zenofai/how-to-build-a-node-js-and-mongodb-application-with-docker-containers-15e535baabf5
