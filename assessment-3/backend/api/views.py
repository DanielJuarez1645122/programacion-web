from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import redis, uuid, json

r = redis.Redis(host='redis', port=6379, db=0)

@csrf_exempt
def ocultar_secreto(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            secreto = data.get("secreto")
            if not secreto:
                return JsonResponse({"error": "No se proporcionó ningún secreto"}, status=400)
            key = str(uuid.uuid4())
            while r.exists(key):
                key = str(uuid.uuid4())
            r.set(key, secreto)
            return JsonResponse({"key": key})
        except json.JSONDecodeError:
            return JsonResponse({"error": "JSON inválido"}, status=400)
    else:
        return JsonResponse({"error": "Use POST para enviar secretos"}, status=405)

@csrf_exempt
def revelar_secreto(request, key):
    if request.method == "GET":
        secreto = r.get(key)
        if secreto:
            r.delete(key)
            return JsonResponse({"secreto": secreto.decode()})
        else:
            return JsonResponse({"error": "Secreto no encontrado o ya revelado"}, status=404)
    else:
        return JsonResponse({"error": "Algo sucedio"}, status=405)
