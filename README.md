# MISW4403-Ejercicio-practico-Diseno-construccion-APIs
Esté repositorio es creado con el fin de realizar el ejercicio práctico propuesto en la semana siete del curso de diseño y construcción de APIs Rest

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
    "isbn": "978-0743273565",
    "libraries": []
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
    "closing_time": 18,
    "books": []
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
