CREATE TABLE `addresses` (
	`id` int AUTO_INCREMENT NOT NULL,
	`address` varchar(42) NOT NULL,
	`network` enum('ethereum','bsc','polygon') NOT NULL,
	`riskScore` int NOT NULL DEFAULT 0,
	`isWhitelisted` boolean NOT NULL DEFAULT false,
	`isBlacklisted` boolean NOT NULL DEFAULT false,
	`label` text,
	`totalTransactions` int NOT NULL DEFAULT 0,
	`suspiciousTransactions` int NOT NULL DEFAULT 0,
	`firstSeen` timestamp NOT NULL DEFAULT (now()),
	`lastSeen` timestamp NOT NULL DEFAULT (now()),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `addresses_id` PRIMARY KEY(`id`),
	CONSTRAINT `addresses_address_unique` UNIQUE(`address`)
);
--> statement-breakpoint
CREATE TABLE `alerts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`transactionId` int NOT NULL,
	`severity` enum('low','medium','high','critical') NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text NOT NULL,
	`riskFactors` text,
	`isRead` boolean NOT NULL DEFAULT false,
	`isResolved` boolean NOT NULL DEFAULT false,
	`resolvedBy` int,
	`resolvedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `alerts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `reports` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`type` enum('daily','weekly','monthly','custom') NOT NULL,
	`startDate` timestamp NOT NULL,
	`endDate` timestamp NOT NULL,
	`totalTransactions` int NOT NULL,
	`suspiciousTransactions` int NOT NULL,
	`alertsGenerated` int NOT NULL,
	`pdfUrl` text,
	`generatedBy` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `reports_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `systemConfig` (
	`id` int AUTO_INCREMENT NOT NULL,
	`key` varchar(100) NOT NULL,
	`value` text NOT NULL,
	`description` text,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `systemConfig_id` PRIMARY KEY(`id`),
	CONSTRAINT `systemConfig_key_unique` UNIQUE(`key`)
);
--> statement-breakpoint
CREATE TABLE `transactions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`txHash` varchar(66) NOT NULL,
	`network` enum('ethereum','bsc','polygon') NOT NULL,
	`fromAddress` varchar(42) NOT NULL,
	`toAddress` varchar(42) NOT NULL,
	`value` varchar(78) NOT NULL,
	`gasPrice` varchar(78),
	`gasUsed` varchar(78),
	`blockNumber` int NOT NULL,
	`timestamp` timestamp NOT NULL,
	`isSuspicious` boolean NOT NULL DEFAULT false,
	`riskScore` int NOT NULL DEFAULT 0,
	`riskFactors` text,
	`mlPrediction` varchar(20),
	`mlConfidence` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `transactions_id` PRIMARY KEY(`id`),
	CONSTRAINT `transactions_txHash_unique` UNIQUE(`txHash`)
);
