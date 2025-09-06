from django.db import models # type: ignore

class Autor(models.Model):
    nombre = models.CharField(max_length=100)
    nacionalidad = models.CharField(max_length=50)

    def __str__(self):
        return self.nombre

class Libro(models.Model):
    titulo = models.CharField(max_length=100)
    fecha_publicacion = models.DateField()
    autor = models.ForeignKey(Autor, on_delete=models.CASCADE)

    def __str__(self):
        return self.titulo
    
class Editorial(models.Model):
    nombre = models.CharField(max_length=100)
    pais = models.CharField(max_length=50)
    libro = models.ForeignKey(Libro, on_delete=models.CASCADE)

    def __str__(self):
        return self.nombre