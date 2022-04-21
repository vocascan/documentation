# Themes

You can include custom themes in your vocascan-frontend installation by mounting a directory containing your themes into `/usr/share/nginx/html/themes`.
A theme has to define all the variables defined by the [default themes](https://github.com/vocascan/vocascan-frontend/tree/main/public/default-themes).
To create a new theme, you can therefore copy one of the default themes and adjust the values.

### Example

Folder structure:

```
|-- themes
|   |-- my-theme.css
```

Example theme (`my-theme.css`):

```css
:root {
    --background-color: #fff;
    /* Further configuration... */
}
```

Mounting the `themes/` directory:

```bash
docker run -v ./themes:/usr/share/nginx/html/themes ...
```
