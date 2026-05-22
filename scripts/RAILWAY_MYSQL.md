# MySQL no Railway — erro perto de `Key`

No MySQL, **`Key` é palavra reservada**. Consultas sem crase falham:

```sql
-- ERRADO (gera ERROR 1064 near 'Key')
UPDATE Key SET isPermanent = 1;

-- CORRETO
UPDATE `Key` SET `isPermanent` = 1;
```

O painel do Railway às vezes monta SQL sem crases — use uma das opções abaixo.

## Opção A — Script automático (recomendado)

1. Instale [Railway CLI](https://docs.railway.app/develop/cli) e faça login.
2. Na pasta do backend:

```powershell
cd "c:\Users\white7\Desktop\AlcateiaAuth"
railway link
railway run npm run db:fix-lifetime
```

Isso marca `ALCATEIA-1045-5971` como permanente e ajusta o usuário `white`.

## Opção B — SQL manual (aba Query)

Cole **tudo** de `scripts/fix-lifetime-manual.sql` (já usa `` `Key` ``).

## Opção C — Prisma Studio

```powershell
railway run npx prisma studio
```

Edite manualmente a key e o client.

## Depois

1. Confirme deploy **Active** do backend (com `prestart` + migration `isPermanent`).
2. Login no cheat com usuário `white`.
3. Deve aparecer **Lifetime**.
