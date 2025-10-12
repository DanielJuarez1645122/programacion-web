from django.urls import path
from api.views import ocultar_secreto, revelar_secreto

urlpatterns = [
    path('api/ocultar/', ocultar_secreto),
    path('api/revelar/<str:key>/', revelar_secreto),
]
