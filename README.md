# Protranslating Test Project

**Version 1.0.0**

This is a quick guide on how to run the application

## Getting Started

Protranslating is a test project

## Prerequisites

An Ubuntu 20.04 server or Desktop operating system installed in your machine.
A root password is set up in your system.

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

curl -sL https://deb.nodesource.com/setup_14.x | bash -
```
The above command will download and install the Node.js version 14 PPA to the APT repository.

You can now install the Node.js version 14 by running the following command:
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
git clone <url> <appname>
cd <appname>
```

Install all dependences by running:
```
npm install
```

Then run the app by running:
```
npm run dev
```
Now, open another terminal and connect to your server using the curl command as shown below:

```
curl http://localhost:5000
```

If everything is fine, you should get the following output:

**Welcome**

Now, press CTRL + C to stop the application.

Note: Node.js application is configured to listen on localhost so it can be accessed only from the localhost. It can not be accessed from the remote host.

## Create a Systemd File to Manage the Node.js Application

Next, you will need to create a systemd unit file for managing your Node.js application. This way Node.js application run in the background and you don’t need to start your application at system reboot.

Let’s create a systemd unit file for Node.js using the following command;
```
nano /lib/systemd/system/protranslating.service
```
Add the following lines:
```
[Unit]
Description=Node.js Application
After=syslog.target network.target
[Service]
Type=simple
User=root
WorkingDirectory=/root
Environment=NODE_ENV=production
ExecStart=/usr/bin/node app.js
Restart=always
[Install]
WantedBy=multi-user.target
```

Save the file when you are finished then reload the systemd daemon to apply the configuration changes:
```
systemctl daemon-reload
```

Next, start the protranslating service and enable it so that it can start automatically at system reboot:
```
systemctl start protranslating
```
```
systemctl enable protranslating
```
You should get the following output:

```
● protranslating.service - Node.js Application
     Loaded: loaded (/lib/systemd/system/protranslating.service; disabled; vendor preset: enabled)
     Active: active (running) since Thu 2020-12-31 12:25:11 UTC; 6s ago
   Main PID: 2678 (node)
      Tasks: 7 (limit: 4691)
     Memory: 7.4M
     CGroup: /system.slice/protranslating.service
             └─2678 /usr/bin/node app.js
Dec 31 12:25:11 ubuntu2004 systemd[1]: Started Node.js Application.
Dec 31 12:25:11 ubuntu2004 node[2678]: Server running at http://127.0.0.1:5000/
```
At this point, your application is started and listening on port 5000. You can check it with the following command:
```
ss -antpl | grep 8000
```

## Configure Nginx as a Reverse Proxy

At this point, your helloworld application is accessible only from the localhost. You can not access it from the remote machine.

So you will need to configure Nginx as a reverse proxy for the helloworld application. So you can access the application from the remote machine through port 80.

First, install the Nginx package by running the following command:

```
apt-get install nginx -y
```

Once the Nginx has been installed, create an Nginx virtual host configuration file to host protranslating application.
```
nano /etc/nginx/conf.d/protranslating.conf
```
Add the following code:
```
upstream backend {
   server localhost:5000;
   keepalive 32;
}

server {
   listen 80;
   server_name protranslating.example.com;

   location / {
       client_max_body_size 50M;
       proxy_set_header X-Real-IP $remote_addr;
       proxy_http_version 1.1;
       proxy_pass http://backend;
   }
}
```
Save and close the file when you are finished then verify the Nginx for any syntax error using the following command:
```
nginx -t
```

If everything is fine, you should get the following output:

```
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok

nginx: configuration file /etc/nginx/nginx.conf test is successful
```

Finally, restart the Nginx service to apply the configuration changes:
```
systemctl restart nginx
```
You can verify the status of the Nginx service using the following command:
```
systemctl status nginx
```
You should see the following output:
```
● nginx.service - A high performance web server and a reverse proxy server
     Loaded: loaded (/lib/systemd/system/nginx.service; enabled; vendor preset: enabled)
     Active: active (running) since Thu 2020-12-31 12:29:23 UTC; 20min ago
       Docs: man:nginx(8)
    Process: 3490 ExecStartPre=/usr/sbin/nginx -t -q -g daemon on; master_process on; (code=exited, status=0/SUCCESS)
    Process: 3491 ExecStart=/usr/sbin/nginx -g daemon on; master_process on; (code=exited, status=0/SUCCESS)
   Main PID: 3492 (nginx)
      Tasks: 3 (limit: 4691)
     Memory: 3.6M
     CGroup: /system.slice/nginx.service
             ├─3492 nginx: master process /usr/sbin/nginx -g daemon on; master_process on;
             ├─3493 nginx: worker process
             └─3494 nginx: worker process
Dec 31 12:29:23 ubuntu2004 systemd[1]: Starting A high performance web server and a reverse proxy server...
Dec 31 12:29:23 ubuntu2004 systemd[1]: Started A high performance web server and a reverse proxy server.
```
## Verify the Application
Now, Nginx is configured to serve your protranslating application. You can now access it using the URL http://protranslating.example.com in your web browser. You should see a with Welcome on the screen

Thank you.
---

## Code Owner

Williams Ozuem

---

## Reference 
https://blog.eduonix.com/web-programming-tutorials/deploy-node-js-application-linux-server/

