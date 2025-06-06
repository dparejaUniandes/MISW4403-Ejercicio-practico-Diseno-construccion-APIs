# MISW4403-Ejercicio-practico-Diseno-construccion-APIs
Esté repositorio es creado con el fin de realizar el ejercicio práctico propuesto en la semana siete del curso de diseño y construcción de APIs Rest, el trabajo realizado en este repositorio toma como base lo explicado en el tutorial de persistencia, a nivel de código también se tiene en cuenta el repositorio de [Persistencia](https://github.com/MISW4403-Diseno-y-construccion-de-APIs/MISW4403_202214_Persistencia)

Antes de ejecutar la aplicación se deben descargar todas las dependencias, se puede utilizar `npm i`

La aplicación se ejecuta por medio del siguiente comando:
> npm run start:dev

La versión de Node utilizada fue la `v20.11.1` como se puede ver en la versión verde a continuación:
<img width="737" alt="image" src="https://github.com/user-attachments/assets/97f2461d-a989-4897-98e5-fb4479b5023b" />

<br>

Para ejecutar los tests de la aplicación se puede utilizar el comando:
> npm run test:watch

# Documentación de la API

## Recurso Libro

### Obtener Todos los Libros

**Método:** GET

**Endpoint:** /books

**Descripción:** Obtiene todos los libros con sus bibliotecas asociadas

**Código éxito:** 200

**Respuesta éxito**
```json
[
    {
        "id": "550e8400-e29b-41d4-a716-446655440000",
        "title": "The Great Gatsby",
        "author": "F. Scott Fitzgerald",
        "publication_date": "1925",
        "isbn": "978-0743273565",
        "libraries": []
    }
]
```

### Obtener Libro por ID

**Método:** GET

**Endpoint:** /books/:bookId

**Descripción:** Obtiene un libro específico por su ID

**Código éxito:** 200

**Código error:** 404

**Respuesta éxito**
```json
{
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "publication_date": "1925",
    "isbn": "978-0743273565",
    "libraries": []
}
```

**Respuesta error**
```json
{
    "statusCode": 404,
    "message": "The book with the given identifier was not found"
}
```

### Crear Libro

**Método:** POST

**Endpoint:** /books

**Descripción:** Crea un nuevo libro

**Código éxito:** 201

**Cuerpo petición**
```json
{
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "publication_date": "1925",
    "isbn": "978-0743273565"
}
```

**Respuesta éxito**
```json
{
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "publication_date": "1925",
    "isbn": "978-0743273565"
}
```

### Actualizar Libro

**Método:** PUT

**Endpoint:** /books/:bookId

**Descripción:** Actualiza un libro existente

**Código éxito:** 200

**Código error:** 404

**Cuerpo petición**
```json
{
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "publication_date": "1925",
    "isbn": "978-0743273565"
}
```

**Respuesta éxito**
```json
{
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "publication_date": "1925",
    "isbn": "978-0743273565"
}
```

**Respuesta error**
```json
{
    "statusCode": 404,
    "message": "The book with the given identifier was not found"
}
```

### Eliminar Libro

**Método:** DELETE

**Endpoint:** /books/:bookId

**Descripción:** Elimina un libro

**Código éxito:** 204

**Código error:** 404

**Respuesta error**
```json
{
    "statusCode": 404,
    "message": "The book with the given identifier was not found"
}
```

## Recurso Biblioteca

### Obtener Todas las Bibliotecas

**Método:** GET

**Endpoint:** /libraries

**Descripción:** Obtiene todas las bibliotecas con sus libros asociados

**Código éxito:** 200

**Respuesta éxito**
```json
[
    {
        "id": "550e8400-e29b-41d4-a716-446655440000",
        "name": "Central Library",
        "address": "123 Main St",
        "city": "New York",
        "opening_time": 9,
        "closing_time": 18,
        "books": []
    }
]
```

### Obtener Biblioteca por ID

**Método:** GET

**Endpoint:** /libraries/:libraryId

**Descripción:** Obtiene una biblioteca específica por su ID

**Código éxito:** 200

**Código error:** 404

**Respuesta éxito**
```json
{
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Central Library",
    "address": "123 Main St",
    "city": "New York",
    "opening_time": 9,
    "closing_time": 18,
    "books": []
}
```

**Respuesta error**
```json
{
    "statusCode": 404,
    "message": "The library with the given identifier was not found"
}
```

### Crear Biblioteca

**Método:** POST

**Endpoint:** /libraries

**Descripción:** Crea una nueva biblioteca

**Código éxito:** 201

**Cuerpo petición**
```json
{
    "name": "Central Library",
    "address": "123 Main St",
    "city": "New York",
    "opening_time": 9,
    "closing_time": 18
}
```

**Respuesta éxito**
```json
{
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Central Library",
    "address": "123 Main St",
    "city": "New York",
    "opening_time": 9,
    "closing_time": 18
}
```

### Actualizar Biblioteca

**Método:** PUT

**Endpoint:** /libraries/:libraryId

**Descripción:** Actualiza una biblioteca existente

**Código éxito:** 200

**Código error:** 404

**Cuerpo petición**
```json
{
    "name": "Central Library",
    "address": "123 Main St",
    "city": "New York",
    "opening_time": 9,
    "closing_time": 18
}
```

**Respuesta éxito**
```json
{
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Central Library",
    "address": "123 Main St",
    "city": "New York",
    "opening_time": 9,
    "closing_time": 18
}
```

**Respuesta error**
```json
{
    "statusCode": 404,
    "message": "The library with the given identifier was not found"
}
```

### Eliminar Biblioteca

**Método:** DELETE

**Endpoint:** /libraries/:libraryId

**Descripción:** Elimina una biblioteca

**Código éxito:** 204

**Código error:** 404

**Respuesta error**
```json
{
    "statusCode": 404,
    "message": "The library with the given identifier was not found"
}
```

## Asociación Biblioteca-Libro

### Agregar Libro a Biblioteca

**Método:** POST

**Endpoint:** /libraries/:libraryId/books/:bookId

**Descripción:** Asocia un libro con una biblioteca

**Código éxito:** 200

**Código error:** 404, 412

**Respuesta éxito**
```json
{
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Central Library",
    "address": "123 Main St",
    "city": "New York",
    "opening_time": 9,
    "closing_time": 18,
    "books": [
        {
            "id": "550e8400-e29b-41d4-a716-446655440001",
            "title": "The Great Gatsby",
            "author": "F. Scott Fitzgerald",
            "publication_date": "1925",
            "isbn": "978-0743273565"
        }
    ]
}
```

**Respuesta error**
```json
{
    "statusCode": 404,
    "message": "The book/library with the given id was not found"
}
```

### Obtener Libros de Biblioteca

**Método:** GET

**Endpoint:** /libraries/:libraryId/books

**Descripción:** Obtiene todos los libros asociados a una biblioteca

**Código éxito:** 200

**Código error:** 404

**Respuesta éxito**
```json
[
    {
        "id": "550e8400-e29b-41d4-a716-446655440001",
        "title": "The Great Gatsby",
        "author": "F. Scott Fitzgerald",
        "publication_date": "1925",
        "isbn": "978-0743273565"
    }
]
```

**Respuesta error**
```json
{
    "statusCode": 404,
    "message": "The library with the given id was not found"
}
```

### Obtener Libro Específico de Biblioteca

**Método:** GET

**Endpoint:** /libraries/:libraryId/books/:bookId

**Descripción:** Obtiene un libro específico de una biblioteca

**Código éxito:** 200

**Código error:** 404, 412

**Respuesta éxito**
```json
{
    "id": "550e8400-e29b-41d4-a716-446655440001",
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "publication_date": "1925",
    "isbn": "978-0743273565"
}
```

**Respuesta error**
```json
{
    "statusCode": 404,
    "message": "The book/library with the given id was not found"
}
```
o
```json
{
    "statusCode": 412,
    "message": "The book with the given id is not associated to the library"
}
```

### Actualizar Libros de Biblioteca

**Método:** PUT

**Endpoint:** /libraries/:libraryId/books

**Descripción:** Actualiza todos los libros asociados a una biblioteca

**Código éxito:** 200

**Código error:** 404

**Cuerpo petición**
```json
[
    {
        "id": "550e8400-e29b-41d4-a716-446655440001",
        "title": "The Great Gatsby",
        "author": "F. Scott Fitzgerald",
        "publication_date": "1925",
        "isbn": "978-0743273565"
    }
]
```

**Respuesta éxito**
```json
{
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Central Library",
    "address": "123 Main St",
    "city": "New York",
    "opening_time": 9,
    "closing_time": 18,
    "books": [
        {
            "id": "550e8400-e29b-41d4-a716-446655440001",
            "title": "The Great Gatsby",
            "author": "F. Scott Fitzgerald",
            "publication_date": "1925",
            "isbn": "978-0743273565"
        }
    ]
}
```

**Respuesta error**
```json
{
    "statusCode": 404,
    "message": "The library/book with the given id was not found"
}
```

### Eliminar Libro de Biblioteca

**Método:** DELETE

**Endpoint:** /libraries/:libraryId/books/:bookId

**Descripción:** Elimina la asociación de un libro con una biblioteca

**Código éxito:** 204

**Código error:** 404, 412

**Respuesta error**
```json
{
    "statusCode": 404,
    "message": "The book/library with the given id was not found"
}
```
o
```json
{
    "statusCode": 412,
    "message": "The book with the given id is not associated to the library"
}
``` 

## Base de datos

La base de datos utilizada cuando se ejecuta la aplicación es post, a continuación se puede ver las tablas que se crearon, la base de datos creado se llama gestion_bibliotecas, se debe crear la base de datos `gestion_bibliotecas`:

<img width="1026" alt="image" src="https://github.com/user-attachments/assets/1019f0bc-5bd8-4c67-8e9c-82053272c8bf" />

<br>

## Emplos en colecciones postman

En cada colección de Postman existe una carpeta denominada casos de error, esta carpeta se creó con el fin de probar los casos de error de cada en Point, por fuera de esta carpeta se encuentran las peticiones con los casos de éxito, sin embargo, cada petición tiene los ejemplos ya sea de éxito o de error, como se puede ver a continuación para la colección de biblioteca:

<br>

<img width="295" alt="image" src="https://github.com/user-attachments/assets/7ed6284a-e484-441d-ae0f-aebb32535940" />

<br>

## Ejecución de tests unitarios

Se realizan los tests unitarios para las colecciones mencionadas en el enunciado, las cuales son biblioteca, libro, la relación entre biblioteca y libro, a continuación se puede ver la ejecución de las pruebas:

### Cobertura de las pruebas
Podemos observar que para el servicio de biblioteca, libro y la asociación entre biblioteca y libro la cobertura es del 100%, además, en total, se ejecutaron 45 tests y todos pasaron satisfactoriamente. Se utilizó el comando `npm run test:cov`
<br>
<img width="811" alt="image" src="https://github.com/user-attachments/assets/2b07fe83-a51b-4c21-bbc8-0bfd248c7872" />

<br>

## ejecución de las pruebas en Postman

Se realizan todos los casos planteados para probar en el enunciado, además, se crean nuevos casos en el caso de qué una fecha de publicación sea incorrecta para un libro o que para una biblioteca la fecha de cierre sea menor a la fecha de apertura:

En los casos de error, las peticiones que tienen **(is not a test)** son peticiones de soporte, necesarias para probar otros tests, pero como tal, no realizan pruebas. En la carpeta de casos de éxito están todas las peticiones que se ejecutan satisfactoriamente. Por fuera de estas carpetas están las peticiones sin tests que se pueden utilizar para invocar el API.

### Definición de tests para Libro

<img width="488" alt="image" src="https://github.com/user-attachments/assets/71591909-8155-4ff5-8487-d892285b8ecd" />


### Resultados de la ejecución de tests para Libro éxito

<img width="1196" alt="image" src="https://github.com/user-attachments/assets/04ebc421-7ed4-48ba-8ac5-bed8208e830e" />


### Resultados de la ejecución de tests para Libro error

<img width="1198" alt="image" src="https://github.com/user-attachments/assets/2f52d336-4eed-45e7-82e4-0624f3e9c6fc" />


### Definición de tests para Biblioteca
<img width="573" alt="image" src="https://github.com/user-attachments/assets/e75ba596-ab23-4529-87d6-45c100a1e5d3" />


### Resultados de la ejecución de tests para Biblioteca éxito
<img width="1184" alt="image" src="https://github.com/user-attachments/assets/3f923bbe-c53b-4872-83e4-4377d59445de" />


### Resultados de la ejecución de tests para Biblioteca error
<img width="1162" alt="image" src="https://github.com/user-attachments/assets/b18c333a-fc87-4de1-9642-b7147c7af34d" />


### Definición de tests para Biblioteca-Libro
<img width="491" alt="image" src="https://github.com/user-attachments/assets/d588d950-4e4c-4c7c-aeb6-d1fb10956b0a" />


### Resultados de la ejecución de tests para Biblioteca-Libro éxito
<img width="1199" alt="image" src="https://github.com/user-attachments/assets/97c2d8d9-6c78-463e-ad5e-e6fd571cdd5d" />


### Resultados de la ejecución de tests para Biblioteca-Libro error
<img width="1185" alt="image" src="https://github.com/user-attachments/assets/652f56cf-83f5-4bec-ae38-63b878ff6c87" />
