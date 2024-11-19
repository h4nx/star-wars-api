### Instrucciones de Uso

1. Instalar dependencias:
```bash
npm install
npm run dynamodb:install
```

2. Iniciar DynamoDB local y el servidor:
```bash
npm run dynamodb:start
npm run dev
```

3. Para probar los endpoints:

POST - Crear personaje:
```bash
curl -X POST http://localhost:3000/dev/personajes \
-H "Content-Type: application/json" \
-d '{"swapiId": 1}'
```

GET - Listar personajes:
```bash
curl http://localhost:3000/dev/personajes
```

4. Para desplegar en AWS:
```bash
npm run deploy
```

Esta implementación incluye:
- Conexión completa a DynamoDB
- Estructura de proyecto organizada
- Manejo de errores robusto
- Configuración local y de producción
- CORS habilitado
- Tipos TypeScript completos
- Documentación de uso