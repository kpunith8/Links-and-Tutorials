## Django Sample App

### Example code

[github-repo](https://github.com/kpunith8/django-products-app)

Install `Django` and run the following command in a folder
```
django-admin startproject djangoapp .
```
above command creates the project with predefined files in it

Run the server and open the port, `http://127.0.0.1:8000/` to check the server running
```
python3 manage.py runserver
```

Create a separate project in the same folder to modularise
```
python3 manage.py startapp products
```

Open the `views.py` in `products` folder to update the UI

### Mapping urls

Create `urls.py` in the `products` root folder. (naming conventions must be followed)

Add the `urlpatterns` list with the same name and map the `views index`

Open and add an entry `products/` in `urlpatterns` list in `djangoapp/urls.py`

> Restart the server and access '/products' page

### Add models

`products/models.py` - add the model for the product, fields can be used create DB entry

Add a class here for each model being created and run `makemigrations` followed by `migrate`
commands each time `models.py` is being added or modified with a new entry

### Migrations

Run the following commands to create a migrations for `sqlite DB`, so that we can create the
DB for testing
```
python3 manage.py makemigrations
```

Prints out `No changes detected`, because django needs to know how to add these apps

Open `products/apps.py` and copy the class name it created, `ProductsConfig`. need to add
this to `djangoapp/settings.py`'s  `INSTALLED_APPS` list as follows, `products.apps.ProductsConfig`

After adding the entry run the `makemigrations` command again
```
python3 manage.py makemigrations
```

It creates a migration in `products/migrations` folder

### Generate the table in SQLite based on the migrations

Run the following,
```
python3 manage.py migrate
  ```

## Django Admin Panel

Access it from `http://http://127.0.0.1:8000/admin`

Create a super user to access the admin panel, run the following and fill in the details
```
python manage.py createsuperuser
```

Open the admin to manage other apps

To manage `products` in the `admin` panel go to `products/admin.py` to specify the Models to be managed

Once done, visit the admin page to `add` and `delete` the products directly from the admin page.

## Templates - To display the html content

Create `templates` folder in `products` and add `index.html` to templates folder

Show the markup in `products` page, use `render()` in `views.py` to render the markup.

Add bootstarp and other frameworks for css and look and feel

Move the `base template` outside so that we can reuse in multiple places, and need to update the
`TEMPLATES -> DIRS` list in `settings.py` with `os.path.join(BASE_DIR, 'templates')`
so that django can look for templates
