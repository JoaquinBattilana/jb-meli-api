# Instalación

Para instalar el proyecto es necesario tenér node 12+ y npm 6+ el cual actualmente viene con la última versión de node que se puede instalar desde [ACA](https://nodejs.org/en/).
Una vez tengamos npm y node tenemos que clonar el proyecto, nos colocamos dentro de la carpeta que queramos y ejecutamos:

### Clonar con HTML
```sh
git clone https://github.com/JoaquinBattilana/jb-meli-api.git
````

### Clonar con SSH
```sh
git clone git@github.com:JoaquinBattilana/jb-meli-api.git
```

Una vez tengamos el proyecto ejecutamos:
```sh
cd jb-meli-api
```
Y estaremos parados en el directorio del proyecto.
Lo siguiente es dentro de este directorio crear un archivo llamado .env y abrirlo
```
touch .env
gedit .env
````
Dentro del .env vamos a definir las variables de entorno de nuestra API que pueden ser las siguientes:
```code
PORT = puerto que se ejecutara el servidor
MELI_API_BASE_URL = url base de la api de mercadolibre para nuestros requests
SEARCH_QUANTITY = cantidad de respuestas que queremos pedir a la api de mercadolibre al solicitar items
AUTHOR_NAME = nombre del autor para devolver la firma en la request
AUTHOR_SURNAME = apellido del autor para devolver la firma en la request
```
Un ejemplo( este es el que actualmente se va a usar para el ejercicio) podría ser:
```code
PORT = 3005
MELI_API_BASE_URL = https://api.mercadolibre.com
SEARCH_QUANTITY = 4
AUTHOR_NAME = Joaquin
AUTHOR_SURNAME = Battilana
```

Una vez definamos el .env guardamos, instalamos las dependencias y ejecutamos el servidor:
```bash
npm install
npm start
```
Ya tenemos la api corriendo y escuchando en el puerto que definimos!.

## Endpoints

### **Busqueda**

  Retorna un json con los items que matchean la busqueda indicada

* **URL**
  /items
* **Method:**
  `GET`
*  **URL Params**
   `q=[string]`

* **Data Params**
  None
 
* **Ejemplo:**

  ```bash
    curl -X GET https://jb-meli-api.herokuapp.com/api/items?q=:query
  ```
  
### **Item**

  Retorna un json con los datos del objeto indicado

* **URL**
  /items/:id
* **Method:**
  `GET`
*  **URL Params**
   None

* **Data Params**
  `id=[string]`
 
* **Ejemplo:**

  ```bash
    curl -X GET https://jb-meli-api.herokuapp.com/api/items/${id}
  ```

# Decisiones del proyecto

### Framework
Se utilizo node con express ya que el ejercicio lo pedía especificamente. Se utilizo nodemon para el servidor de desarrollo para no tener que reiniciar el server cada vez que había cambios.
### Linter
Se utilizo eslint con la configuración de airbnb ( ya que es el más normal).
### CI
Se utilizo travis ya que es muy fácil de configurar para proyectos de github con repositorios públicos y es gratis. Actualmente corre el linter cada vez que se hace un PR y el repositorio de github esta configurado para que si el linter no pasa no te deje mergear.
### CD
Se utilizo heroku para el deploy automatico de la branch development cada vez que hay un push. Esto fue porque es gratis y muy fácil de configurar

# Problemas encontrados
### Categorias
En el ejercicio nos pedia que armemos un breadcrumb en dos casos, en la vista de busqueda y en la vista de un producto en particular. En la vista de busqueda debiamos responder las categorias que más match hicieron con la busqueda( aca se tomo en cuenta la busqueda entera, no solo la busqueda de nuestros 4 primeros items), y en la vista del producto debiamos armar el breadcrumb con la categoria especifica del producto.
#### Caso endpoint `GET /items?q=:query`
Dentro del endpoint de search que nos da la api de mercadolibre ( [EJEMPLO](https://api.mercadolibre.com/sites/MLA/search?q=asd&limit=4) ) las categorias con su numero de items encontrados podrian estar en dos campos `filters` y `available_filters`, que son muy ambiguos, ya que los casos que se pueden encontrar son muchos. Aca es donde se necesito hacer un request a otro endpoint de la api de mercadolibre que no menciona el ejercicio, este endpoint es `GET /items/:id/categories`
##### Casos
1. `filters` venia con el filtro de categoria y `available_filters` no:
Ejemplo de este caso [ACA](https://api.mercadolibre.com/sites/MLA/search?q=%22apple%20iphone%22).
En este caso se decidio devolver directamente la categoria que hay en `filters`, dentro del objeto con id `filters`, con su campo `path_from_root`
2. `filters` no venia con el filtro de categoria y `available_filters` si:
Ejemplo de este caso [ACA]()
En este caso habia un problema y es que teniamos las categorias dentro de `available_filters`, dentro del objeto con id `category`, y no estaban ordenadas, en el ejemplo se puede ver que la primer categoria tiene menos resultados que la segunda, por lo que se tuvo que navegar por todas las categorias hasta encontrar la que tenía más busquedas. El segundo problema es que las categorias dentro de `available_filters` no venian con su `path_from_root`, por lo que en este caso hubo que nestear otra llamada a la api de mercadolibre para pedir la categoria con su id y tener su ruta.
3- `filters` y `available_filters` venian los dos con filtros de categorias:
Ejemplo de este caso [ACA](https://api.mercadolibre.com/sites/MLA/search?q=%22aaa%22)
Este caso se tomo como el segundo debido a que necesitabamos la categoria que más busquedas matcheaba.
4- Este caso en el que ni `filters` ni `available_filters` tienen el filtro de categoria no deberia existir ya que mercadolibre te obliga a tener una categoria en tu producto.

Vale aclarar que mercadolibre actualmente en su página utiliza solamente `filters` para armar su breadcrumb, si `filters` no tiene el filtro de categorias directamente no muestra el breadcrumb, pero debido a que el ejercicio pedia especificamente **"el breadcrumb que se muestra en el listado de búsqueda debe armarse basado en la categoría que más resultados obtuvo"** se optó por seguir la lógica explicada arriba.

#### Caso endpoint `GET /items/:id`
Este caso fue más simple, el problema que me encontre es que el endpoint `/items/:id` de la api de mercadolibre no me traía la categoria con su `path_from_root`, si no que me traía solo su ID. Para esto tuve que encadenar de nuevo una llamada al endpoint de categorias de mercadolibre para tener el `path_from_root`.
