-- Passo 2: marcar key permanente + conta white (requer coluna isPermanent do passo 1)

UPDATE `Key`
SET `isPermanent` = 1,
    `expiresAt` = '2099-12-31 23:59:59.999'
WHERE `value` = 'ALCATEIA-1045-5971';

UPDATE `Client`
SET `expiresAt` = '2099-12-31 23:59:59.999'
WHERE `username` = 'white';

SELECT k.`value`, k.`isPermanent`, k.`expiresAt`, c.`username`, c.`expiresAt` AS clientExpires
FROM `Key` k
LEFT JOIN `Client` c ON c.`keyId` = k.`id`
WHERE k.`value` = 'ALCATEIA-1045-5971' OR c.`username` = 'white';
