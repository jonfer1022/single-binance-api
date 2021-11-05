echo "Primero extraemos el modelo de la db a prisma..."
npx prisma db pull
echo "Segundo generamos el esquema de prisma..."
npx prisma generate
echo "Tercero levantamos el servicio..."
npm run start