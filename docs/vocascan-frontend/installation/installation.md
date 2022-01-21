# Installation

This guide will get you through the installation of your own vocascan-frontend installation.

Currently, we offer three ready-made solutions for setting up your Vocascan frontend server.

## 1.&nbsp;[Apache](vocascan-frontend/installation/apache) _(coming soon)_

This tutorial shows you how to set up a Vocascan frontend using apache2, a webserver for servers.

| Pros ✔️                 | Cons ❌                                |
| ----------------------- | -------------------------------------- |
| You don't need docker   | More suitable for the internal network |
| You don't need a domain | No SSL encryption                      |
|                         | No own domain                          |

## 2.&nbsp;[Webspace](vocascan-frontend/installation/webspace) _(coming soon)_

This tutorial shows you how to set up a Vocascan frontend using a webspace.

| Pros ✔️                                                  | Cons ❌ |
| -------------------------------------------------------- | ------- |
| You don't need to care about hosting a own apache server |         |
| Easy to setup in the webinterface of your provider       |         |

## 3.&nbsp;[Docker](vocascan-frontend/installation/docker)

This tutorial shows you how to easily set up a Vocascan frontend with minimal effort, ideal for your own home network
inside of docker.

| Pros ✔️                                                                    | Cons ❌                                |
| -------------------------------------------------------------------------- | -------------------------------------- |
| Easy to set up                                                             | More suitable for the internal network |
| You don't need a domain                                                    | No SSL encryption                      |
| Scalability                                                                | No own domain                          |
| Its easy to integrate if you already host vocascan-server inside of docker |                                        |

## 4.&nbsp;[Traefik](vocascan-frontend/installation/traefik)

This tutorial shows you how to set up a Vocascan frontend with a Traefik reverse proxy to achieve maximum security with
SSL encryption and make the server easier to reach using a domain. This guide requires the
[traefik installation](vocascan-server/installation/traefik) of the server.

| Pros ✔️                                                                   | Cons ❌           |
| ------------------------------------------------------------------------- | ----------------- |
| SSL encryption (more secure)                                              | more complex      |
| Own domain to make server easier to reach                                 | You need a domain |
| Scalability                                                               |                   |
| Easy to integrate if you already set up your vocascan-server with traefik |                   |
