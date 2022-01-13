# Custom Pages

We provide you with the possibility to host your own static pages or make redirects to other websites on your Vocascan
server and make them accessible to the public. This can be very helpful if you have to comply with legal requirements
and therefore have to provide a privacy statement or other information. To add your page to the server, you need to
define it in `vocascan.config.js` or the `env variables`.

!> The Vocascan frontend needs predefined routes (`url`) to find specific pages:</br> 1. Legal Notice:
`/legal-notice`</br>2. Privacy Policy: `/privacy-policy`</br>3. Terms and Conditions: `/terms-and-conditions`

## Create a folder

Create a folder in the folder where your `docker-compose.yml` is located. In this you store all your static files.

```bash
mkdir staticPages
```

After that, add your html files in that folder. In our example we have this folder structure

```
|-- staticPages
|   |-- pageOne
|   |   |-- pageOne-de.html
|   |   `-- pageOne-en.html
|   `-- pageTwo
|       |-- pageTwo-de.html
|       `-- pageTwo-fr.html
```

## Update Docker-Compose file

Open your `docker-compose.yml` file

```bash
nano docker-compose.yml
```

and add your newly created folder as a volume to your Docker container

```yaml
vocascan:
  image: vocascan/server:latest
  ...
  volumes:
    - "/root/vocascan/vocascan.config.js:/root/vocascan/vocascan.config.js:ro"
    - "/root/vocascan/staticPages/:/root/vocascan/staticPages/"
  ...
```

?> As with the config file, we also store our folder under `/root/vocascan`. You are welcome to use a different path,
but remember to use it in the config as well.

## Update vocascan config file

After that you only have to update the config file so that your static pages are recognized and displayed by the server.

This is an example configuration to show you how it can look like with the files created above.

```js
...
pages: {
    pageOne: {
      url: '/page-one',
      fallback: { type: 'redirect', location: '/page-one?lang=en' },
      langs: {
        en: { type: 'file', location: '/root/vocascan/staticPages/privacy-en.html' },
        de: { type: 'file', location: '/root/vocascan/staticPages/privacy-de.html' },
        fr: { type: 'redirect', location: 'https://my-redirect-page.com'}
      },
    },
    pageTwo: {
      url: '/page-two',
      fallback: { type: 'redirect', location: '/page-two?lang=en' },
      langs: {
        en: { type: 'file', location: '/root/vocascan/staticPages/privacy-en.html' },
        fr: { type: 'file', location: '/root/vocascan/staticPages/privacy-fr.html' },
      },
    },
    pageThree: {
      url: '/page-three',
      fallback: { type: 'redirect', location: 'https://another-custom-redirect' },
    },
  },
...
```

| Name       | Required | Description                                                                                                                                                                                                        |
| ---------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `url`      | `true`   | The route on which your page will be displayed                                                                                                                                                                     |
| `fallback` | `true`   | Defines a fallback page, if the language in the query parameter `?lang=` was not found. You can either set a static page or a redirect to one of the defined languages (recommended if you use multiple languages) |
| `type`     | `true`   | Defines whether the server renders a static page or just redirects to another. Options: `file` or `redirect`                                                                                                       |
| `location` | `true`   | Either the path to your html file, or the address for the redirect                                                                                                                                                 |
| `langs`    | `false`  | Option to define multiple language for your static file or redirect                                                                                                                                                |

?> the `langs` prop is just optional. If you want to offer only one language, you can also set it under `fallback`.

## Update container

Keep in mind to update your Docker container

```bash
sudo docker-compose up -d
```

Now all your static pages and redirects are accessible under their respective URIs. If you now want to display a
specific language defined by you, you can do this via the `lang` query parameter. Just a small example.

`our-domain.com/page-one?lang=en`: will lead us to the page defined under `pageOne.langs.de`.

`our-domain.com/page-one?lang=ru`: will redirect us to the fallback page, because this language is not defined
