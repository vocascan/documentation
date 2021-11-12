# Installation

This guide will get you through the installation of your own vocascan-server installation.

Currently we offer three ready-made solutions for setting up your Vocascan server

1. [PM2](vocascan-server/installation/pm2)

   This tutorial shows you how to set up a Vocascan server using PM2, a production process manager for Node.js
   applications that has a built-in load balancer.

   | Pros ✔️                                             | Cons ❌                                |
   | --------------------------------------------------- | -------------------------------------- |
   | reloads without downtime                            | More suitable for the internal network |
   | Helps with application logging, monitoring, logging | No SSL encryption                      |
   |                                                     | No own domain                          |

2. [Docker](vocascan-server/installation/docker)

   This tutorial shows you how to easily set up a Vocascan server with minimal effort, ideal for your own home network.

   | Pros ✔️                 | Cons ❌                                |
   | ----------------------- | -------------------------------------- |
   | Easy to set up          | More suitable for the internal network |
   | You don't need a domain | No SSL encryption                      |
   | Scalability             | No own domain                          |

3. [Traefik](vocascan-server/installation/traefik)

   This tutorial shows you how to set up a Vocascan server with a Traefik reverse proxy to achieve maximum security with
   SSL encryption and make the server easier to reach using a domain

   | Pros ✔️                                   | Cons ❌           |
   | ----------------------------------------- | ----------------- |
   | SSL encryption (more secure)              | more complex      |
   | Own domain to make server easier to reach | You need a domain |
   | Scalability                               |                   |
