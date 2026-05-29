-- CreateTable
CREATE TABLE `movimentacao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dataEntrada` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dataSaida` DATETIME(3) NULL,
    `valorHora` DECIMAL(10, 2) NOT NULL,
    `valorTotal` DECIMAL(10, 2) NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'Aberto',
    `criadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `veiculoId` INTEGER NOT NULL,
    `vagaId` INTEGER NOT NULL,
    `usuarioId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `movimentacao` ADD CONSTRAINT `movimentacao_veiculoId_fkey` FOREIGN KEY (`veiculoId`) REFERENCES `veiculo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `movimentacao` ADD CONSTRAINT `movimentacao_vagaId_fkey` FOREIGN KEY (`vagaId`) REFERENCES `vaga`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `movimentacao` ADD CONSTRAINT `movimentacao_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
