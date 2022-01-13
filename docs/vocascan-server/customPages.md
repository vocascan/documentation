# Custom Pages

We provide you with the possibility to host your own static pages or make redirects to other websites on your Vocascan
server and make them accessible to the public. This can be very helpful if you have to comply with legal requirements
and therefore have to provide a privacy policy or other information. To add your page to the server, you need to add the
files as a volume to the Docker container and define them in `vocascan.config.js` or the `env variables`.

!> The Vocascan frontend needs predefined routes (`url`) to find specific pages:</br> 1. Legal Notice:
`/legal-notice`</br>2. Privacy Policy: `/privacy-policy`</br>3. Terms and Conditions: `/terms-and-conditions`

## Create a folder

Create a folder in the folder where your `docker-compose.yml` is located. In this you store all your static files.

```bash
mkdir staticPages
```

After that, add your HTML files in that folder. In our example, we have this folder structure.

```
|-- staticPages
|   |-- pageOne
|   |   |-- pageOne-de.html
|   |   `-- pageOne-en.html
|   `-- pageTwo
|       |-- pageTwo-de.html
|       `-- pageTwo-fr.html
```

## Update Docker-Compose file (only when using Docker)

When using Docker, you have to add your newly created folder as a volume to your Docker container.

Open your `docker-compose.yml` file

```bash
nano docker-compose.yml
```

and add the volume for your `staticPages` folder

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

## Update Vocascan config file

After that, you only have to update the config file so that your static pages are recognized and displayed by the
server. To achieve this, you just have to add the path to your desired static pages or redirects.

This is an example configuration to show you how it can look like with the files created above.

?> In our example, we created the volume for our files under `/root/vocascan/`. This is why we use this path as our
absolute path. If you don't use Docker or used a different path, please make sure to use this.

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

For more information about the props, visit our
[configuration sheet](vocascan-server/configuration?id=custom-pages-pages).

?> the `langs` prop is just optional. If you don't want to provide any translations, you can also set your single static
page or redirect under the `fallback` prop.

## Update container (only when using Docker)

Keep in mind to update your Docker container

```bash
sudo docker-compose up -d
```

## Usage

Now all your static pages and redirects are accessible under their respective routes. If you now want to display a
specific language defined by you, you can do this via the `lang` query parameter. Just a small example.

`https://our-domain.com/page-one?lang=en`: will lead us to the page defined under `pageOne.langs.de`.

`https://our-domain.com/page-one?lang=ru`: will redirect us to the fallback page, because this language is not defined.

`https://our-domain.com/page-one`: will render the fallback page or redirect to the link defined in the fallback prop.
